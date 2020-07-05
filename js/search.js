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

  var key = parseURLParams(window.location.href);

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/courses',
    dataType: 'json',
    data: {
      courseName: key.key[0]
    },
    error: function(e) {
      alert('Đã có lỗi xảy ra khi lấy dữ liệu');
      console.log(e);
    },
    success: function(data) {
      $('#search-key').html(key.key[0]);
      $('#number-course').html(data.length);
      for(let i = 0;i < data.length;i++) {
        if (data[i].image == null) {
          data[i].image = '../../images/default-banner.png'
        }
        else {
          data[i].image = 'https://teaching-online-lms.herokuapp.com' + data[i].image
        }
        var course_block = `<div class="col-lg-3 form-group">
                  <a href="course_detail.html?courseId=${data[i].id}" class="course-box-slider pop" data-original-title="" title="">
                    <div class="img-course">
                      <img class="img-responsive " src="${data[i].image}" alt="Course image">
                    </div>
                    <div class="content-course">
                      <h3 class="title-course">
                        <span>${data[i].name}</span>
                      </h3>
                      <div class="name-gv">
                        <b>${data[i].teacher}</b>
                      </div>
                    </div>
                  </a>
                </div>`
        $('#search-courses-list').append(course_block);
      }
      console.log(data);
    },
    type: 'GET'
  });
})
