$(document).ready(function() {
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
        if (data[i].image == null) {{
          data[i].image = '';
        }}
        var course_row = `<tr class="tr-shadow" data-id="${data[i].id}">
        <td class="courses-column-1">${i+1}</td>
        <td class="courses-column-2">${data[i].name}</td>
        <td class="courses-column-3">
        <span class="block-email">${data[i].subjectName}</span>
        </td>
        <td class="courses-column-4">${data[i].description}</td>
        <td class="courses-column-5">${data[i].teacher}</td>
        <td class="courses-column-6">
        <span class="status--process">Processing</span>
        </td>
        <td class="courses-column-7">
        <div class="table-data-feature">
        <button class="item update-btn" data-toggle="tooltip" data-placement="top" title="Edit">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item update-img-btn" data-toggle="tooltip" data-placement="top" title="Update image" data-src="${data[i].image}">
        <i class="far fa-image"></i>
        </button>
        <button class="item delete-btn" data-toggle="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        console.log(data);
        $('#courses-table-content').append(course_row);
      }

      $('.update-btn').click(function() {
        console.log('click');
        $('#update-course-modal').css('display', 'block');
        $('#update-course-modal input').val('');
        var row = $(this).parent().parent().parent();
        $('#update-course-name').val(row.find('.courses-column-2').html());
        $('#update-course-subject').val(row.find('.courses-column-3 span').html());
        $('#update-description').val(row.find('.courses-column-4').html());
        $('#update-course-teacher').val(row.find('.courses-column-5').html());
        $('#update-course-form').attr('data-id', row.attr('data-id'));
      });

      $('.update-img-btn').click(function() {
        console.log('click');
        $('#update-img-modal').css('display', 'block');
        $('#update-img-modal input').val('');
        var row = $(this).parent().parent().parent();
        if ($(this).attr('data-src') != '') {
          $('#load-course-image').prop('src', 'https://teaching-online-lms.herokuapp.com' + $(this).attr('data-src'));
        }
        else {
          $('#load-course-image').prop('src', '../../images/default-banner.jpg');
        }

        $('#update-img-form').attr('data-id', row.attr('data-id'));
      });

      $('.delete-btn').click(function() {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this course!",
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
              url: 'https://teaching-online-lms.herokuapp.com/api/admin/delete-course',
              type: 'POST',
              headers: {
                'Authorization': sessionStorage.getItem('admin_token')
              },
              data: {
                courseId: id
              },
              dataType: 'json',
              error: function(e) {
                console.log(e.message);
                swal("Error when delete the course!", {
                  icon: "warning",
                });
              },
              success: function(data) {
                for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                  var no_cell = $('.courses-column-1')[i+1]
                  $(no_cell).html(parseInt($(no_cell).html()) - 1)
                }
                btn.parent().parent().parent().remove();
                swal("Poof! The course has been deleted!", {
                  icon: "success",
                });
                console.log(data);
              }
            });
          } else {
            swal("The course is safe!");
          }
        });
      });
    }
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/admin/subject-list',
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
        var subject_option = `<option value="${data[i].subjectId}">${data[i].subjectName}</option>`
        console.log(data);
        $('#newco-subject-id').append(subject_option);
      }
    }
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/admin/search-teacher',
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
        var subject_option = `<option value="${data[i].username}">${data[i].username}</option>`
        console.log(data);
        $('#newco-teacher').append(subject_option);
      }
    }
  });

  $('#open-newco-modal').click(function() {
    $('#new-course-modal').css('display', 'block');
    $('#new-course-modal input').val('');
  });

  $('.close-newco-modal-btn').click(function() {
    $('#new-course-modal').css('display', 'none');
  });

  $('.close-updateco-modal-btn').click(function() {
    $('#update-course-modal').css('display', 'none');
  });

  $('.close-updateimg-modal-btn').click(function() {
    $('#update-img-modal').css('display', 'none');
  });

  $('#new-course-form').submit(function(e) {
    e.preventDefault();
    var subject_id = $('#newco-subject-id').find(":selected").val();
    var course_name = $('#new-course-name').val();
    var username = $('#newco-teacher').find(":selected").val();
    var description = $('#new-description').val();
    console.log(subject_id + course_name + description);
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/new-course',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        subjectId: subject_id,
        username: username,
        courseName: course_name,
        description: description
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        swal("Tạo khóa học không thành công", {
          icon: "warning",
        });
      },
      success: function(data) {
        var number_rows = $('.tr-shadow').length;
        var course_row = `<tr class="tr-shadow" data-id="${data.id}">
        <td class="courses-column-1">${number_rows+1}</td>
        <td class="courses-column-2">${data.courseName}</td>
        <td class="courses-column-3">
        <span class="block-email">${data.subjectName}</span>
        </td>
        <td class="courses-column-4">${data.description}</td>
        <td class="courses-column-5">${data.teacher.username}</td>
        <td class="courses-column-6">
        <span class="status--process">Processing</span>
        </td>
        <td class="courses-column-7">
        <div class="table-data-feature">
        <button class="item update-btn" data-toggle="tooltip" data-placement="top" title="Edit">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item" data-toggle="tooltip" data-placement="top" title="Update image" data-src="">
        <i class="far fa-image"></i>
        </button>
        <button class="item delete-btn" data-toggle="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        $('#courses-table-content').append(course_row);
        console.log(data);

        $($('.update-btn')[$('.update-btn').length-1]).click(function() {
          console.log('click');
          $('#update-course-modal').css('display', 'block');
          $('#update-course-modal input').val('');
          var row = $(this).parent().parent().parent();
          $('#update-course-name').val(row.find('.courses-column-2').html());
          $('#update-course-subject').val(row.find('.courses-column-3 span').html());
          $('#update-description').val(row.find('.courses-column-4').html());
          $('#update-course-teacher').val(row.find('.courses-column-5').html());
          $('#update-course-form').attr('data-id', row.attr('data-id'));
        });

        $($('.update-img-btn')[$('.update-img-btn').length-1]).click(function() {
          console.log('click');
          $('#update-img-modal').css('display', 'block');
          $('#update-img-modal input').val('');
          var row = $(this).parent().parent().parent();
          $('#load-course-image').prop('src', 'https://teaching-online-lms.herokuapp.com' + $(this).attr('data-src'));
          $('#update-img-form').attr('data-id', row.attr('data-id'));
        });

        $($('.delete-btn')[$('.delete-btn').length-1]).click(function() {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: ["Stop", "Delete it"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var btn = $(this);
              var id = btn.parent().parent().parent().attr('data-id');
              $.ajax({
                url: 'https://teaching-online-lms.herokuapp.com/api/admin/delete-course',
                type: 'POST',
                headers: {
                  'Authorization': sessionStorage.getItem('admin_token')
                },
                data: {
                  courseId: id
                },
                dataType: 'json',
                error: function(e) {
                  console.log(e.message);
                  swal("Error when delete the course!", {
                    icon: "warning",
                  });
                },
                success: function(data) {
                  for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                    var no_cell = $('.courses-column-1')[i+1];
                    $(no_cell).html(parseInt($(no_cell).html()) - 1);
                  }
                  btn.parent().parent().parent().remove();
                  swal("Poof! The course has been deleted!", {
                    icon: "success",
                  });
                  console.log(data);
                }
              });
            } else {
              swal("The course is safe!");
            }
          });
          $('#new-course-modal').css('display', 'none');
        });
        swal("Tạo khóa học thành công!", {
          icon: "success",
        });
      }
    });
    $('#new-course-modal').css('display', 'none');
  });

  $('#update-course-form').submit(function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var course_name = $('#update-course-name').val();
    console.log(course_name);
    var description = $('#update-description').val();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/update-course',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        courseId: id,
        courseName: course_name,
        description: description,
        completed: 'false'
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        swal("Cập nhật khóa học không thành công", {
          icon: "warning",
        });
      },
      success: function(data) {
        $('[data-id="' + data.id + '"] .courses-column-2').html(data.courseName);
        $('[data-id="' + data.id + '"] .courses-column-4').html(data.description);
        swal("Cập nhật khóa học thành công", {
          icon: "success",
        });
        console.log(data);
      }
    });
    $('#update-course-modal').css('display', 'none');
  });

  $('#course-img-file').on('change', function() {
    var reader = new FileReader();

    reader.onloadend = function() {
      $('#load-course-image').prop('src', reader.result);
    }
    reader.readAsDataURL(this.files[0]);
  });

  $('#update-img-form').submit(function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    console.log(id);
    var image = $('#course-img-file').prop('files')[0];
    var fd = new FormData();
    fd.append('courseId', id);
    fd.append('file', image);
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/upload-banner-course',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: fd,
      contentType: false,
      processData: false,
      dataType: 'json',
      error: function(e) {
        swal("Cập nhật ảnh bìa không thành công", {
          icon: "warning"
        });
      },
      success: function(data) {
        $('[data-id="' + id + '"] .update-img-btn').attr('data-src', data.url);
        alert('Cập nhật ảnh bìa thành công');
        location.reload();
      }
    });
    $('#update-img-modal').css('display', 'none');
  });
})
