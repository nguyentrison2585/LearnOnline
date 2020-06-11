$(document).ready(function() {
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/subjects',
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
        var subject_row = `<tr class="tr-shadow" data-id="${data[i].id}">
        <td class="courses-column-1">${i+1}</td>
        <td class="courses-column-2">${data[i].name}</td>
        <td class="courses-column-3">${data[i].description}</td>
        <td class="courses-column-4">
        <span class="status--process">Processing</span>
        </td>
        <td class="courses-column-5">
        <div class="table-data-feature">
        <button class="item update-btn">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item delete-btn">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="item">
        <i class="fas fa-ellipsis-v"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        console.log(data);
        $('#subjects-table-content').append(subject_row);
      }

      $('.update-btn').click(function() {
        console.log('click');
        $('#update-subject-modal').css('display', 'block');
        $('#update-subject-modal input').val('');
        var row = $(this).parent().parent().parent();
        $('#update-subject-name').val(row.find('.courses-column-2').html());
        $('#update-description').val(row.find('.courses-column-3').html());
        $('#update-subject-form').attr('data-id', row.attr('data-id'));
      });

      $('.delete-btn').click(function() {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this subject!",
          icon: "warning",
          buttons: ["Stop", "Delete it"],
          dangerMode: true,
          timer: 5000,
        })
        .then((willDelete) => {
          if (willDelete) {
            var id = $(this).parent().parent().parent().attr('data-id');
            console.log(id);
            $.ajax({
              url: 'https://teaching-online-lms.herokuapp.com/api/admin/delete-subject',
              type: 'POST',
              headers: {
                'Authorization': sessionStorage.getItem('admin_token')
              },
              data: {
                subjectId: id
              },
              dataType: 'json',
              error: function(e) {
                console.log(e.message);
                swal("You cann't delete this subject!");
              },
              success: function(data) {
                swal("Poof! The subject has been deleted!", {
                  icon: "success",
                });
                $(this).parent().parent().parent().remove();
                console.log(data);
              }
            });
          } else {
            swal("The subject is safe!");
          }
        });
      });
    }
  });

  $('#open-newsj-modal').click(function() {
    $('#new-subject-modal').css('display', 'block');
    $('#new-subject-modal input').val('');
  });

  $('.close-newsj-modal-btn').click(function() {
    $('#new-subject-modal').css('display', 'none');
  });

  $('.close-updatesj-modal-btn').click(function() {
    $('#update-subject-modal').css('display', 'none');
  });

  $('#new-subject-form').submit(function(e) {
    e.preventDefault();
    var subject_name = $('#new-subject-name').val();
    var description = $('#new-description').val();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/new-subject',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        subjectName: subject_name,
        description: description
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        alert('Subject name has existed!');
      },
      success: function(data) {
        var number_rows = $('.tr-shadow').length;
        var subject_row = `<tr class="tr-shadow" data-id="${data.id}">
        <td class="courses-column-1">${number_rows+1}</td>
        <td class="courses-column-2">${data.subjectName}</td>
        <td class="courses-column-3">${data.description}</td>
        <td class="courses-column-4">
        <span class="status--process">Processing</span>
        </td>
        <td class="courses-column-5">
        <div class="table-data-feature">
        <button class="item update-btn">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item delete-btn" data-original-title="Delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="item">
        <i class="fas fa-ellipsis-v"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        $('#subjects-table-content').append(subject_row);
        console.log(data);

        $('#new-subject-modal').css('display', 'none');

        $($('.update-btn')[$('.update-btn').length-1]).click(function() {
          console.log('click');
          $('#update-subject-modal').css('display', 'block');
          $('#update-subject-modal input').val('');
          var row = $(this).parent().parent().parent();
          $('#update-subject-name').val(row.find('.courses-column-2').html());
          $('#update-description').val(row.find('.courses-column-3').html());
          $('#update-subject-form').attr('data-id', row.attr('data-id'));
        });

        $($('.delete-btn')[$('.delete-btn').length-1]).click(function() {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this subject!",
            icon: "warning",
            buttons: ["Stop", "Delete it"],
            dangerMode: true,
            timer: 5000,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! The subject has been deleted!", {
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
                  subjectId: id
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
              swal("The subject is safe!");
            }
          });
        });
      }
    });
  });

  $('#update-subject-form').submit(function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var subject_name = $('#update-subject-name').val();
    console.log(subject_name);
    var description = $('#update-description').val();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/update-subject',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        subjectId: id,
        subjectName: subject_name,
        description: description
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        alert('Subject name has existed!');
      },
      success: function(data) {
        $('[data-id="' + data.id + '"] .courses-column-2').html(data.subjectName);
        $('[data-id="' + data.id + '"] .courses-column-3').html(data.description);
        console.log(data);
      }
    });
    $('#update-subject-modal').css('display', 'none');
  });
})
