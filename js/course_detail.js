$(document).ready(function() {
  var courseId = parseURLParams(window.location.href);
  console.log(courseId);

  function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
    queryEnd   = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/subject-byCourseId',
    dataType: 'json',
    data: {
      courseId: courseId.courseId[0],
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      var subject_name = `<a href="courses.html?subjectId=${data.id}>${data.subjectName}</a>`;
      $('#subject-name').append(subject_name);
      console.log(data);
    },
    type: 'GET'
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/course-detail',
    dataType: 'json',
    data: {
      courseId: courseId.courseId[0],
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      $('#course-name-header').html(data.courseName);
      $('#course-name').html(data.courseName);
      $('#course-description').html(data.description);
      $('#teacher-name-header').html(data.teacher.fullName);
      $('#teacher-name').html(data.teacher.fullName);
      document.title = data.courseName;
      console.log(data);
    },
    type: 'GET'
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
    dataType: 'json',
    data: {
      courseId: courseId.courseId[0]
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var lesson_block = `<li>
        <a class="lesson-link" data-id=${data[i].id}>
        <i class="fas fa-play-circle"></i>
        ${data[i].lessonName}
        </a>
        </li>`
        $('#course-content').append(lesson_block);
      }
      console.log(data);

      $('.lesson-link').click(function() {
        console.log('click');
        var lessonId = $(this).attr('data-id');
        $.ajax({
          url: 'https://teaching-online-lms.herokuapp.com/api/user/lessonDetail',
          dataType: 'json',
          data: {
            lessonId: lessonId
          },
          error: function(e) {
            alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
            console.log(e);
          },
          success: function(data) {
            $('#lesson-name').html(data.lessonName);
            $('#lesson-description').html(data.description);
            $('#lesson-video-frame').attr('src', data.liveStreamUrl);
            $('#lesson-video-frame').attr('width', '100%');
            $('#lesson-video-frame').attr('height', '450px');
            console.log(data);
          },
          type: 'GET'
        });
        var tabscontent = $('.tab-content');
        var tablinks = $('.tablink');
        for (i = 0; i < tablinks.length; i++) {
          $(tablinks[i]).removeClass('active');
        }
        for (i = 0; i < tabscontent.length; i++) {
          $(tabscontent[i]).removeClass('show-inline');
        }
        $('#u-course-test-result').removeClass('show-inline');
        $('#u-lesson-content').addClass('show-inline');
        $('#course-dropdown').addClass('active');
        $('.lesson-link').removeClass('active');
        $(this).addClass('active');
      })
    },
    type: 'GET'
  });

  $('#course-dropdown').click(function dropdown(e) {
    e.preventDefault();
    $('#course-content').toggleClass('show');
    if ($('#course-content').hasClass('show')) {
      $($('.u-detail-block-right')[0]).attr('height', '665px');
    }
    else {
      $($('.u-detail-block-right')[0]).attr('height', '220px');
    }
  });

  var tablinks = $('.tablink');
  $(tablinks[0]).click(function(e) {
    e.preventDefault();
    console.log('click');
    openTab(e, '#u-course-intro');
    window.scrollTo(0, 0);
  })

  $(tablinks[1]).click(function(e) {
    e.preventDefault();
    openTab(e, '#u-course-teacher');
    window.scrollTo(0, 0);
  })

  $(tablinks[3]).click(function(e) {
    e.preventDefault();
    openTab(e, '#u-course-test');
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/exam/get-examination',
      dataType: 'json',
      data: {
        courseId: courseId.courseId[0]
      },
      error: function(e) {
        alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
        console.log(e);
      },
      success: function(data) {
        for(let i = 0;i < data.length;i++) {
          var question_block = `<div class="u-course-test-question">
          <div class="question" data-id="${data[i].id}">
          ${data[i].question}
          </div>
          <div class="answers">
          <label class="answer">
          ${data[i].answers[0]}
          <input type="radio" checked="true" name="answer-queston-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[1]}
          <input type="radio" name="answer-queston-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[2]}
          <input type="radio" name="answer-queston-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[3]}
          <input type="radio" name="answer-queston-${i+1}">
          <span class="checkmark"></span>
          </label>
          </div>
          </div>`
          $('#list-questions').append(question_block);
          console.log(data[i].id);
        }
        console.log(data);
      },
      type: 'GET'
    });
    window.scrollTo(0, 0);
  })

  function openTab(evt, tabId) {
    var i, tabscontent, tablinks;
    tabscontent = $('.tab-content');
    for (i = 0; i < tabscontent.length; i++) {
      $(tabscontent[i]).removeClass('show-inline');
    }
    if ($('#course-content').hasClass('show')) {
      $('#course-content').removeClass('show');
    }
    tablinks = $('.tablink');
    for (i = 0; i < tablinks.length; i++) {
      $(tablinks[i]).removeClass('active');
    }
    $('.lesson-link').removeClass('active');
    $(tabId).addClass('show-inline');
    $('#u-course-test-result').removeClass('show-inline');
    evt.currentTarget.className += " active";
  }

  $('#default-open').click();

  $('#btn-submit-answers').click(function() {
    window.scrollTo(0, 0);
    var questions = $('.question');
    var answers = [];
    for (let i = 0; i < questions.length; i++) {
      let id = $(questions[i]).attr('data-id');
      console.log(id);
      let answer = {
        id: id,
        answer: $($('.u-course-test-question')[i]).find('input:radio').index($($('.u-course-test-question')[i]).find('input:radio').filter(':checked'))
      }
      answers.push(answer);
      console.log(answers)
    }

    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/exam/submit-examination',
      dataType: 'json',
      data: {
        courseId: courseId.courseId[0],
        answers: answers
      },
      error: function(e) {
        alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
        console.log(e);
      },
      success: function(data) {
        $('#number-questions').html(data.numberOfQuestion);
        $('#number-correct-answers').html(data.numberOfCorrect)
        console.log(data);
      },
      type: 'POST'
    });
    $($('.u-detail-block-right')[0]).parent().attr('height', '220px');
    $('#u-course-test').removeClass('show-inline');
    $('#u-course-test-result').addClass('show-inline');
  })

  $('#redo-test').click(function() {
    $('#u-course-test').addClass('show-inline');
    $('#u-course-test-result').removeClass('show-inline');
    $('#list-questions').empty();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/exam/get-examination',
      dataType: 'json',
      data: {
        courseId: courseId.courseId[0]
      },
      error: function(e) {
        alert('Đã có lỗi xảy ra khi lấy dữ liệu');
        console.log(e);
      },
      success: function(data) {
        for(let i = 0;i < data.length;i++) {
          var question_block = `<div class="u-course-test-question">
          <div class="question" data-id="${data[i].id}">
          ${data[i].question}
          </div>
          <div class="answers">
          <label class="answer">
          ${data[i].answers[0]}
          <input type="radio" checked="true" name="answer-question-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[1]}
          <input type="radio" name="answer-question-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[2]}
          <input type="radio" name="answer-question-${i+1}">
          <span class="checkmark"></span>
          </label>
          <label class="answer">
          ${data[i].answers[3]}
          <input type="radio" name="answer-question-${i+1}">
          <span class="checkmark"></span>
          </label>
          </div>
          </div>`
          $('#list-questions').append(question_block);
        }
        console.log(data);
      },
      type: 'GET'
    });
  })
});
