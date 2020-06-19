$(document).ready(function() {
  $('#password, #password-confirm').on('keyup', function () {
    if ($('#password').val() == $('#password-confirm').val()) {
      $('#password-confirm-message').html('Matching').css('color', '#63c76a');
    }
    else {
      $('#password-confirm-message').html('Not Matching').css('color', '#dc3545');
    }
  });

  $('#user-signup-form').submit(function(evt) {
    evt.preventDefault();
    console.log('click');
    if ($('#password').val() == $('#password-confirm').val()) {
      var username = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var password = $('#password').val();
      var role = $('input:radio[name="userrole"]').index($('input:radio[name="userrole"]').filter(':checked'));
      console.log(username + email + password);
      if (role == 0) {
        $.ajax({
          url: 'https://teaching-online-lms.herokuapp.com/api/user/signup',
          type: 'POST',
          data: {
            username: username,
            password: password,
            email: email
          },
          dataType: 'json',
          error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            $('#user-signup-alert').html("Username or password are not correct!");
            $('#user-signup-alert').addClass('alert-danger');
            window.scrollTo(0, 0);
          },
          success: function(data) {
            sessionStorage.setItem('user_token', data.token);
            sessionStorage.setItem('user_role', 0);
            sessionStorage.setItem('setupTimeUser', new Date().getTime());
            window.location.href = 'home.html';
          }
        });
      }
      else {
        $.ajax({
          url: 'https://teaching-online-lms.herokuapp.com/api/teacher/signup',
          type: 'POST',
          data: {
            username: username,
            password: password,
            email: email
          },
          dataType: 'json',
          error: function(e) {
            $('#user-signup-alert').html("Username or password are not correct!");
            $('#user-signup-alert').addClass('alert-danger');
            window.scrollTo(0, 0);
          },
          success: function(data) {
            sessionStorage.setItem('user_token', data.token);
            sessionStorage.setItem('user_role', 1);
            sessionStorage.setItem('setupTimeUser', new Date().getTime());
            window.location.href = 'home.html';
          }
        });
      }
    }
    else {
      $('#user-signup-alert').html("Password confirm is not matching");
      $('#user-signup-alert').addClass('alert-danger');
      window.scrollTo(0, 0);
    }
  });
})
