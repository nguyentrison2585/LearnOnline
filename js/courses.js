$(document).ready(function() {
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

  var subjectId = parseURLParams(window.location.href);
  console.log(subjectId);

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/subjects',
    dataType: 'json',
    error: function(e) {
      alert('Đã có lỗi xảy ra khi lấy dữ liệu');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var subject_block = `<li>
          <a title="Khóa học ${data[i].name}" data-id="${data[i].id}" class="subject-link" href="courses.html?subjectId=${data[i].id}">
            <i class="fas fa-language" aria-hidden="true"></i> ${data[i].name}
          </a>
        </li>`
        $('#subjects-list').append(subject_block);
      }
      subjects = $('.subject-link');
      for (let i = 0; i < subjects.length; i++) {
        if ($(subjects[i]).attr('data-id') == subjectId.subjectId[0]) {
          $(subjects[i]).addClass('active');
          $('#subject-name').html(data[i].name)
          document.title = 'Khóa học' + data[i].name;
        }
      }
      console.log(data);
    },
    type: 'GET'
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/courses',
    dataType: 'json',
    data: {subjectId: subjectId.subjectId[0]},
    error: function(e) {
      alert('Đã có lỗi xảy ra khi lấy dữ liệu');
      console.log(e);
    },
    success: function(data) {
      $($('.p-or')[0]).html(data.length);
      for(let i = 0;i < data.length;i++) {
        if (data[i].image == null) {
          data[i].image = '../../images/default-banner.png'
        }
        else {
          data[i].image = 'https://teaching-online-lms.herokuapp.com' + data[i].image
        }
        var course_block = `<li>
          <div class="box-pop ">
            <a href="course_detail.html?courseId=${data[i].id}" class="course-box-slider pop" data-placement="right" data-toggle="popover" data-container="body" data-html="true" data-original-title="Nuôi dạy con " title="">
              <div class="img-course">
                <img class="img-responsive " src="${data[i].image}" alt="19 Tuyệt chiêu nuôi dạy con thành tài">
              </div>
              <div class="content-course">
                <h3 class="title-course" style="font-size:15px;overflow: hidden;margin-top: 8px;height: 44px;"><span>${data[i].name}</span></h3>
                <div class="name-gv">
                  <b>${data[i].teacher}</b>
                </div>
                <div class="rate-course" style="display: inline-block;" itemscope="">
                  <span class="star-rate">
                    <i class="fas fa-star co-or" aria-hidden="true"></i><i class="fas fa-star co-or" aria-hidden="true"></i><i class="fas fa-star co-or" aria-hidden="true"></i><i class="fas fa-star co-or" aria-hidden="true"></i><i class="fas fa-star co-or" aria-hidden="true"></i>                </span>
                    <span class="n-rate">(<span>28</span>)</span>
                  </div>
                </div>
             </a>
          </div>
        </li>`
        $('#courses-list').append(course_block);
      }
      console.log(data);
    },
    type: 'GET'
  });
});
