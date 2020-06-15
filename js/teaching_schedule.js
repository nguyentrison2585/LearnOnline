$(document).ready(function() {
  var date = new Date();
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/teacher/schedule',
    dataType: 'json',
    headers: {
      'Authorization': sessionStorage.getItem('user_token')
    },
    data: {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var course = `<li>
        <a href="" class="tablink" data-id="${data[i].id}">
        <i class="fas fa-book"></i>
        ${data[i].lessonName}
        </a>
        </li>`
        $('#courses-list').append(course);
      }
      console.log(data);
    },
    type: 'GET'
  });

  $('#update-url-form').submit(function(e) {
    e.preventDefault();
    var iframe = $('#embbed-link').val();
    var link = $('#embbed-link').val();
    srcWithQuotes = link.match(/src\=([^\s]*)\s/)[1],
    link = srcWithQuotes.substring(1,srcWithQuotes.length - 1);
    console.log(link);
    var iframe = `<iframe id="preview-video-frame" src = "${link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    $('#preview-block').append(iframe);
  });
})
