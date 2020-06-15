$(document).ready(function() {
  $('#new-password, #new-password-confirm').on('keyup', function () {
    if ($('#new-password').val() == $('#new-password-confirm').val()) {
      $('#password-confirm-message').html('Matching').css('color', '#63c76a');
    }
    else {
      $('#password-confirm-message').html('Not Matching').css('color', '#dc3545');
    }
  });

  if (sessionStorage.getItem("user_role") == 0) {
    $('#change-password-form').submit(function(e) {
      e.preventDefault();
      var password = $('#old-password').val();
      var new_password = $('#new-password').val();
      console.log(password + new_password);
      $.ajax({
        url: ' https://teaching-online-lms.herokuapp.com/api/user/update-pass',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          password: password,
          new_password: new_password
        },
        error: function(e) {
          alert('Đã có lỗi xảy ra khi lấy dữ liệu');
          console.log(e);
        },
        success: function(data) {
          alert(data);
          console.log(data);
        },
        type: 'POST'
      });
    });
  }
  else if (sessionStorage.getItem("user_role") == 1){
    $('#change-password-form').submit(function(e) {
      e.preventDefault();
      var password = $('#old-password').val();
      var new_password = $('#new-password').val();
      console.log(password + new_password);
      $.ajax({
        url: ' https://teaching-online-lms.herokuapp.com/api/teacher/update-pass',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          password: password,
          new_password: new_password
        },
        error: function(e) {
          alert('Đã có lỗi xảy ra khi lấy dữ liệu');
          console.log(e);
        },
        success: function(data) {
          alert(data);
          console.log(data);
        },
        type: 'POST'
      });
    });
  }
})
