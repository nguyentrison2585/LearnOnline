$(document).ready(function() {
  $('#course-dropdown').click(function dropdown(e) {
    e.preventDefault();
    $('#course-content').toggleClass('show');
  });

  var tablinks = $('.tablink');
  $(tablinks[0]).click(function(e) {
    e.preventDefault();
    console.log('click');
    openTab(e, '#u-course-intro');
  })

  $(tablinks[1]).click(function(e) {
    e.preventDefault();
    openTab(e, '#u-course-teacher');
  })

  $(tablinks[2]).click(function(e) {
    e.preventDefault();
    openTab(e, '#u-course-test');
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
      dataType: 'json',
      data: {courseId: courseId.courseId[0]},
      error: function(e) {
        alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
        console.log(e);
      },
      success: function(data) {
        for(let i = 0;i < data.length;i++) {
          var lesson_block = `<li>
          <a>
          <i class="fas fa-play-circle"></i>
          ${data[i].lessonName}
          </a>
          </li>`
          $('#course-content').append(lesson_block);
        }
        console.log(courseId);
      },
      type: 'GET'
    });
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
    $(tabId).addClass('show-inline');
    evt.currentTarget.className += " active";
  }

  $('#default-open').click();

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

  var courseId = parseURLParams(window.location.href);
  console.log(courseId);
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
    dataType: 'json',
    data: {courseId: courseId.courseId[0]},
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var lesson_block = `<li>
        <a>
        <i class="fas fa-play-circle"></i>
        ${data[i].lessonName}
        </a>
        </li>`
        $('#course-content').append(lesson_block);
      }
      console.log(courseId);
    },
    type: 'GET'
  });
});
