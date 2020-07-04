$(document).ready(function() {
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/lessons',
    type: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('admin_token')
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
      swal("Lấy dữ liệu không thành công!", {
        icon: "warning",
      });
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        if (data[i].offlineUrl == null) {
          data[i].offlineUrl = 'Chưa có';
        }
        console.log(data[i].liveStreamUrl);
        var lesson_row = `<tr class="tr-shadow" data-id="${data[i].id}">
        <td class="courses-column-1">${i+1}</td>
        <td class="courses-column-2">${data[i].lessonName}</td>
        <td class="courses-column-3">
        <span class="block-email">${data[i].courseName}</span>
        </td>
        <td class="courses-column-4">${data[i].description}</td>
        <td class="courses-column-5">${data[i].offlineUrl}</td>
        <td class="courses-column-6">
        <div class="table-data-feature">
        <button class="item update-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item delete-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="More">
        <i class="fas fa-ellipsis-v"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        console.log(data);
        $('#lessons-table-content').append(lesson_row);
      }

      $('.update-btn').click(function() {
        console.log('click');
        $('#update-lesson-modal').css('display', 'block');
        $('#update-course-modal input').val('');
        var row = $(this).parent().parent().parent();
        $('#update-lesson-name').val(row.find('.courses-column-2').html());
        $('#update-lesson-course').val(row.find('.courses-column-3 span').html());
        $('#update-description').val(row.find('.courses-column-4').html());
        if (row.find('.courses-column-5').html() == 'Chưa có') {
          $('#update-offliveurl').val('');
        }
        else {
          $('#update-offliveurl').val(row.find('.courses-column-5').html());
        }
        $('#update-lesson-form').attr('data-id', row.attr('data-id'));
      });

      $('.delete-btn').click(function() {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this lesson!",
          icon: "warning",
          buttons: ["Stop", "Delete it"],
          dangerMode: true,
          timer: 5000,
        })
        .then((willDelete) => {
          if (willDelete) {
            var btn = $(this);
            var id = btn.parent().parent().parent().attr('data-id');
            $.ajax({
              url: 'https://teaching-online-lms.herokuapp.com/api/admin/delete-lesson',
              type: 'POST',
              headers: {
                'Authorization': sessionStorage.getItem('admin_token')
              },
              data: {
                lessonId: id
              },
              dataType: 'json',
              error: function(e) {
                console.log(e.message);
                swal("Error when delete the lesson!", {
                  icon: "warning",
                });
              },
              success: function(data) {
                for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                  var no_cell = $('.courses-column-1')[i+1]
                  $(no_cell).html(parseInt($(no_cell).html()) - 1)
                }
                btn.parent().parent().parent().remove();
                swal("Poof! The lesson has been deleted!", {
                  icon: "success",
                });
                console.log(data);
              }
            });
          } else {
            swal("The lesson is safe!");
          }
        });
      });
    }
  });

$.ajax({
  url: 'https://teaching-online-lms.herokuapp.com/api/user/courses',
  type: 'GET',
  headers: {
    'Authorization': sessionStorage.getItem('admin_token')
  },
  dataType: 'json',
  error: function(e) {
    console.log(e.message);
    swal("Lấy dữ liệu không thành công!", {
        icon: "warning",
      });
  },
  success: function(data) {
    for(let i = 0;i < data.length;i++) {
      var subject_option = `<option value="${data[i].id}">${data[i].name}</option>`
      console.log(data);
      $('#newls-course-id').append(subject_option);
    }
  }
});

$('#open-newls-modal').click(function() {
  $('#new-lesson-modal').css('display', 'block');
  $('#new-lesson-modal input').val('');
  $('#newls-start-time').val(new Date().toISOString().substring(0, 16));
});

$('.close-newls-modal-btn').click(function() {
  $('#new-lesson-modal').css('display', 'none');
});

$('.close-updatels-modal-btn').click(function() {
  $('#update-lesson-modal').css('display', 'none');
});


$('#new-lesson-form').submit(function(e) {
  e.preventDefault();
  var course_id = $('#newls-course-id').find(":selected").val();
  var lesson_name = $('#new-lesson-name').val();
  var start_time = new Date().getTime();
  console.log(start_time);
  var description = $('#new-description').val();
  console.log(course_id + lesson_name + description);
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/admin/new-lesson',
    type: 'POST',
    headers: {
      'Authorization': sessionStorage.getItem('admin_token')
    },
    data: {
      courseId: course_id,
      lessonName: lesson_name,
      time: start_time,
      description: description
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
      swal("Tạo mới bài học không thành công!", {
        icon: "warning",
      });
    },
    success: function(data) {
      var number_rows = $('.tr-shadow').length;
      var lesson_row = `<tr class="tr-shadow" data-id="${data.id}">
      <td class="courses-column-1">${number_rows+1}</td>
      <td class="courses-column-2">${data.lessonName}</td>
      <td class="courses-column-3">
      <span class="block-email">${data.courseName}</span>
      </td>
      <td class="courses-column-4">${data.description}</td>
      <td class="courses-column-5">Chưa có</td>
      <td class="courses-column-6">
      <div class="table-data-feature">
      <button class="item update-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
      <i class="fas fa-pen"></i>
      </button>
      <button class="item delete-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
      <i class="fas fa-trash-alt"></i>
      </button>
      <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="More">
      <i class="fas fa-ellipsis-v"></i>
      </button>
      </div>
      </td>
      </tr>
      <tr class="spacer"></tr>`
      $('#lessons-table-content').append(lesson_row);
      console.log(data);
      $('.update-btn').click(function() {
        console.log('click');
        $('#update-lesson-modal').css('display', 'block');
        $('#update-course-modal input').val('');
        var row = $(this).parent().parent().parent();
        $('#update-lesson-name').val(row.find('.courses-column-2').html());
        $('#update-lesson-course').val(row.find('.courses-column-3 span').html());
        $('#update-description').val(row.find('.courses-column-4').html());
        if (row.find('.courses-column-5').html() == 'Chưa có') {
          $('#update-offliveurl').val('');
        }
        else {
          $('#update-offliveurl').val(row.find('.courses-column-5').html());
        }
        $('#update-lesson-form').attr('data-id', row.attr('data-id'));
      });

      $($('.delete-btn')[$('.delete-btn').length-1]).click(function() {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this lesson!",
          icon: "warning",
          buttons: ["Stop", "Delete it"],
          dangerMode: true,
          timer: 5000,
        })
        .then((willDelete) => {
          if (willDelete) {
            var btn = $(this);
            var id = btn.parent().parent().parent().attr('data-id');
            $.ajax({
              url: 'https://teaching-online-lms.herokuapp.com/api/admin/delete-lesson',
              type: 'POST',
              headers: {
                'Authorization': sessionStorage.getItem('admin_token')
              },
              data: {
                lessonId: id
              },
              dataType: 'json',
              error: function(e) {
                console.log(e.message);
                swal("Error when delete the lesson!", {
                  icon: "warning",
                });
              },
              success: function(data) {
                for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                  var no_cell = $('.courses-column-1')[i+1]
                  $(no_cell).html(parseInt($(no_cell).html()) - 1)
                }
                btn.parent().parent().parent().remove();
                swal("Poof! The lesson has been deleted!", {
                  icon: "success",
                });
                console.log(data);
              }
            });
          } else {
            swal("The lesson is safe!");
          }
        });
      });
      swal("Cập nhật khóa học thành công", {
    icon: "success",
  });
    }
  });
  $('#new-lesson-modal').css('display', 'none');
  });

  $('#update-lesson-form').submit(function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var lesson_name = $('#update-lesson-name').val();
    console.log(lesson_name);
    var description = $('#update-description').val();
    var time_start = new Date().getTime();
    console.log(time_start);
    var streamurl = '';
    var offliveurl = $('#update-offlineurl').val();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/update-lesson',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        lessonId: id,
        lessonName: lesson_name,
        description: description,
        streaming: false,
        timeStart: time_start,
        livestreamUrl: streamurl,
        offliveUrl: offliveurl,
        completed: false
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        swal("Cập nhật khóa học không thành công!", {
        icon: "warning",
      });
      },
      success: function(data) {
        $('[data-id="' + data.id + '"] .courses-column-2').html(data.lessonName);
        $('[data-id="' + data.id + '"] .courses-column-4').html(data.description);
        $('[data-id="' + data.id + '"] .courses-column-5').html(offliveurl);
        console.log(data);
      }
    });
    $('#update-lesson-modal').css('display', 'none');
    swal("Cập nhật khóa học thành công", {
      icon: "success",
    });
  });
})
