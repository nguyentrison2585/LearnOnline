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
      swal("Lấy dữ liệu không thành công!", {
        icon: "warning",
      });
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
          title: "Bạn đã chắc chắn?",
          text: "Sau khi xóa bạn sẽ không thể khôi phục lĩnh vực!",
          icon: "warning",
          buttons: ["Dừng lại", "Tiếp tục"],
          dangerMode: true,
          timer: 5000,
        })
        .then((willDelete) => {
          if (willDelete) {
            var btn = $(this);
            var id = btn.parent().parent().parent().attr('data-id');
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
                swal("Xóa lĩnh vực không thành công!", {
                  icon: "warning",
                });
              },
              success: function(data) {
                swal("Lĩnh vực đã bị xóa!", {
                  icon: "success",
                });
                for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                  var no_cell = $('.courses-column-1')[i+1]
                  $(no_cell).html(parseInt($(no_cell).html()) - 1)
                }
                btn.parent().parent().parent().remove();
                console.log(data);
              }
            });
          } else {
            swal("Lĩnh vực đã được giữ lại!");
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
        swal("Tạo mới lĩnh vực không thành công!", {
        icon: "warning",
      });
      },
      success: function(data) {
        var number_rows = $('.tr-shadow').length;
        var subject_row = `<tr class="tr-shadow" data-id="${data.id}">
        <td class="courses-column-1">${number_rows+1}</td>
        <td class="courses-column-2">${data.subjectName}</td>
        <td class="courses-column-3">${description}</td>
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
            title: "Bạn đã chắc chắn?",
            text: "Sau khi xóa bạn sẽ không thể khôi phục lĩnh vực!",
            icon: "warning",
            buttons: ["Dừng lại", "Tiếp tục"],
            dangerMode: true,
            timer: 5000,
          })
          .then((willDelete) => {
            if (willDelete) {
              var btn = $(this);
              var id = btn.parent().parent().parent().attr('data-id');
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
                  swal("Xóa lĩnh vực không thành công!", {
                    icon: "warning",
                  });
                },
                success: function(data) {
                  swal("Lĩnh vực đã bị xóa!", {
                    icon: "success",
                  });
                  for (let i = $('.delete-btn').index(btn) + 1; i < $('.delete-btn').length; i++) {
                    var no_cell = $('.courses-column-1')[i+1]
                    $(no_cell).html(parseInt($(no_cell).html()) - 1)
                  }
                  btn.parent().parent().parent().remove();
                  console.log(data);
                }
              });
            } else {
              swal("Lĩnh vực đã được giữ lại!");
            }
          });
        });
        swal("Tạo mới lĩnh vực thành công!", {
          icon: "success",
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
        swal("Cập nhật lĩnh vực không thành công!", {
        icon: "warning",
      });
      },
      success: function(data) {
        $('[data-id="' + data.id + '"] .courses-column-2').html(data.subjectName);
        $('[data-id="' + data.id + '"] .courses-column-3').html(data.description);
        swal("Cập nhật lĩnh vực thành công!", {
                  icon: "success",
                });
        console.log(data);
      }
    });
    $('#update-subject-modal').css('display', 'none');
  });
})
