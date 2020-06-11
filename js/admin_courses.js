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
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
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
            swal("Poof! The course has been deleted!", {
              icon: "success",
            });
            var id = $(this).parent().parent().parent().attr('data-id');
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
                alert('Subject name has existed!');
              },
              success: function(data) {
                $(this).parent().parent().parent().remove();
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
        alert('Subject name has existed!');
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
              swal("Poof! The course has been deleted!", {
                icon: "success",
              });
              var id = $(this).parent().parent().parent().attr('data-id');
              var btn = $(this);
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
                  alert('Subject name has existed!');
                },
                success: function(data) {
                  console.log(this);
                  $(btn).parent().parent().parent().remove();
                  console.log(data);
                }
              });
            } else {
              swal("The course is safe!");
            }
          });
          $('#new-course-modal').css('display', 'none');
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
      alert('Subject name has existed!');
    },
    success: function(data) {
      $('[data-id="' + data.id + '"] .courses-column-2').html(data.courseName);
      $('[data-id="' + data.id + '"] .courses-column-4').html(data.description);
      console.log(data);
    }
  });
  $('#update-course-modal').css('display', 'none');
});
})
