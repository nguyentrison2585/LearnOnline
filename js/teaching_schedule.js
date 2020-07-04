$(document).ready(function() {
  function processData(data, course_name) {
    $('#course-name').html(course_name);
    $('#list-lessons').empty();
    for(let i = 0;i < data.length;i++) {
      var file_name = '';
      var href = '';
      var src = '';
      var iframe = '';
      if (data[i].file != null) {
        file_name = data[i].file.replace(/.*[\/\\]/, '');
        src = '../../images/pdf-file.jpg';
        href = 'https://teaching-online-lms.herokuapp.com' + data[i].file;
      }

      if (data[i].offlineUrl != null) {
        iframe = `<iframe id="preview-video-frame" src ="${data[i].offlineUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      }
      var lesson = `<div class="quizitem">
        <div class="quizitem-heading clear">
          <div class="right">
            <span class="indicator"><i class="fa fa-angle-down"></i></span>
          </div>
          <p class="tt-store">${data[i].lessonName}</p>
        </div>
        <div class="quizitem-body">
          <form class="upload-file-form" data-id="${data[i].id}">
            <div class="form-row">
              <div class="lb">Tải file lên</div>
              <div class="upload-file-row">
                <div class="col-lg-5">
                  <div class="lesson-file-block">
                    <a class="lesson-file-link" href="${href}" target="_blank">
                      <img class="pdf-img" src="${src}">
                      <div class="file-name">${file_name}</div>
                    </a>
                  </div>
                </div>
                <div class="col-lg-7">
                  <div class="form-group">
                    <div class="custom-file-image">
                      <input type="file" id="lesson-${i+1}-file" class="lesson-file input-custom" hidden="" accept="application/pdf">
                      <label class="label-custom" for="lesson-${i+1}-file">Chọn</label>
                      <span class="font-italic font13">Chấp nhận PDF với kích thước tối đa 5.0 MB</span>
                    </div>
                  </div>
                  <button class="btn update-img-btn" type="submit">Cập nhật</button>
                </div>
              </div>
            </div>
          </form>
          <form class="update-url-form" data-id="${data[i].id}">
            <div class="form-row">
              <div class="lb">Đường dẫn tới video live stream</div>
              <textarea class="form-control quiz-content-input embbed-link" placeholder="Mã nhúng < >" rows="10" maxlength="800" required=""></textarea>
              <div class="update-question">
                <button type="submit" class="btn update-question-btn">
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
          <div class="form-row answer-wrap">
            <div class="lb clear">Xem trước video</div>
            <div class="preview-video preview-block">
              ${iframe}
            </div>
          </div>
        </div>
      </div>`
      $('#list-lessons').append(lesson);
      $($('.quiz-content-input')[i]).val(iframe);
    }

    $('.indicator').click(function() {
      console.log('click');
      $(this).parent().parent().next().toggleClass('show');
      $(this).find('i').toggleClass('expand');
    });
    console.log(data);

    // for (let i = 0; i < $('.lesson-file').length; i++) {
    //   $($('.lesson-file')[i]).on('change', function() {
    //     $($('.file-name')[i]).html(this.value.replace(/.*[\/\\]/, ''));
    //     $($('.pdf-img')[i]).prop('src', '../../images/pdf-file.jpg');
    //   });
    // }

    $.each($('.lesson-file'), function(index) {
      $(this).on('change', function() {
        $($('.file-name')[index]).html(this.value.replace(/.*[\/\\]/, ''));
        $($('.pdf-img')[index]).prop('src', '../../images/pdf-file.jpg');
      });
    })

    $.each($('.upload-file-form'), function(index) {
      $(this).on('submit', function(e) {
        e.preventDefault();
        var files = $($('.lesson-file')[index]).prop('files');
        if (files.length > 0) {
          if (files[0].size/1024/1024 <= 5) {
            var id = $(this).attr('data-id');
            var file = $($('.lesson-file')[index]).prop('files')[0];
            var fd = new FormData();
            fd.append('lessonId', id);
            fd.append('file', file);
            $.ajax({
              url: 'https://teaching-online-lms.herokuapp.com/api/teacher/upload-file-lesson',
              dataType: 'json',
              headers: {
                'Authorization': sessionStorage.getItem('user_token')
              },
              data: fd,
              contentType: false,
              processData: false,
              error: function(e) {
                alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
                console.log(e);
              },
              success: function(data) {
                alert('Success');
                $($('.lesson-file-link')[index]).attr('href', 'https://teaching-online-lms.herokuapp.com' + data.url)
                console.log(data);
              },
              type: 'POST'
            });
          }
          else {
            alert('Kích thước file vượt quá 5Mb, xin hãy chọn file có kích thước nhỏ hơn!');
          }

        }
        else {
          alert('Bạn cần tải file lên để cập nhật!');
        }
      });
    })

    $('.update-url-form').submit(function(e) {
      e.preventDefault();
      var link = $($(this).find('.embbed-link')[0]).val();
      srcWithQuotes = link.match(/src\=([^\s]*)\s/)[1],
      link = srcWithQuotes.substring(1,srcWithQuotes.length - 1);
      console.log(link);
      var iframe = `<iframe id="preview-video-frame" src ="${link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      $($(this).next().find('.preview-block')[0]).append(iframe);

      var id = $(this).attr('data-id');

      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/teacher/update-offUrl',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          lessonId: id,
          url: link
        },
        error: function(e) {
          alert('Đã có lỗi xảy ra khi lấy dữ liệu');
          console.log(e);
        },
        success: function(data) {
          alert('Cập nhật đường dẫn thành công')
        },
        type: 'POST'
      });
    });
  }
  var date = new Date();
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/teacher/courses',
    dataType: 'json',
    headers: {
      'Authorization': sessionStorage.getItem('user_token')
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var course;
        if (i == 0) {
          course = `<li>
            <a href="" class="tablink active" data-id="${data[i].id}">
            <i class="fas fa-book"></i>
            ${data[i].courseName}
            </a>
          </li>`
        }
        else {
          course = `<li>
            <a href="" class="tablink" data-id="${data[i].id}">
            <i class="fas fa-book"></i>
            ${data[i].courseName}
            </a>
          </li>`
        }
        $('#courses-list').append(course);
      }

      course_name = $($('.tablink')[0]).text();
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          courseId: data[0].id
        },
        error: function(e) {
          alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
          console.log(e);
        },
        success: function(data) {
          processData(data, course_name)
        }
      });

      $('.tablink').click(function(e) {
        e.preventDefault();
        var tablinks = $('.tablink');
        for (i = 0; i < tablinks.length; i++) {
          $(tablinks[i]).removeClass('active');
        }
        $(this).addClass('active');
        var id = $(this).attr('data-id');
        var course_name = $(this).text();
        $.ajax({
          url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
          dataType: 'json',
          headers: {
            'Authorization': sessionStorage.getItem('user_token')
          },
          data: {
            courseId: id
          },
          error: function(e) {
            alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
            console.log(e);
          },
          success: function(data) {
            processData(data, course_name);
          },
          type: 'GET'
        });
      });
      console.log(data);
    },
    type: 'GET'
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/courses',
    type: 'GET',
    data: {
      courseName: 'Mar'
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
      swal("Lấy dữ liệu không thành công!", {
        icon: "warning",
      });
    },
    success: function(data) {
      console.log(data);
    }
  });
})
