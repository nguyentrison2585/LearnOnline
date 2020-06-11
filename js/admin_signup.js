$(document).ready(function() {
  $('#password, #password-confirm').on('keyup', function () {
    if ($('#password').val() == $('#password-confirm').val()) {
      $('#password-confirm-message').html('Matching').css('color', '#63c76a');
    }
    else {
      $('#password-confirm-message').html('Not Matching').css('color', '#dc3545');
    }
  });

  $('#admin-signup-form').submit(function(evt) {
    evt.preventDefault();
    console.log('click');
    if ($('#password').val() == $('#password-confirm').val()) {
      var username = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var password = $('#password').val();
      console.log(username + email + password);
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/admin/signup',
        type: 'POST',
        data: {
          username: username,
          password: password,
          email: email
        },
        dataType: 'json',
        error: function(e) {
          $('#sign-up-alert').html("Username or password are not correct!");
          $('#sign-up-alert').addClass('alert-danger');
          window.scrollTo(0, 0);
        },
        success: function(data) {
          sessionStorage.setItem('admin_token', data.token);
          sessionStorage.setItem('setupTime', new Date().getTime());
          window.location.href = 'dashboard.html';
        }
      });
    }
    else {
      $('#sign-up-alert').html("Password confirm is not matching");
      $('#sign-up-alert').addClass('alert-danger');
      window.scrollTo(0, 0);
    }
  });
})
