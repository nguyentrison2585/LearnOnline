$(document).ready(function() {
  function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false)
    {
      alert('Invalid Email Address');
      return false;
    }
    return true;
  }

  $('#user-login-form').submit(function(e) {
    e.preventDefault();
    console.log('click');
    var username = $('#username').val();
    console.log(username);
    var password = $('#password').val();
    console.log(password);
    var role = $('input:radio[name="userrole"]').index($('input:radio[name="userrole"]').filter(':checked'));
    if (role == 0) {
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/user/login',
        type: 'POST',
        data: {
          username: username,
          password: password
        },
        dataType: 'json',
        error: function(xhr, status, error) {
          var err = JSON.parse(xhr.responseText);
          $('#user-login-alert').html(err.message);
          $('#user-login-alert').addClass('alert-danger');
          window.scrollTo(0, 0);
        },
        success: function(data) {
          sessionStorage.setItem('user_token', data.token);
          sessionStorage.setItem('user_role', 0);
          sessionStorage.setItem('setupTimeUser', new Date().getTime());
          if (sessionStorage.getItem('previous_url') === null) {
            window.location.href = 'home.html';
          }
          else
          {
            window.location.href = sessionStorage.getItem('previous_url').replace(/.*[\/\\]/, '');
            sessionStorage.removeItem('previous_url')
          }
        }
      });
    }
    else {
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/teacher/login',
        type: 'POST',
        data: {
          username: username,
          password: password
        },
        dataType: 'json',
        error: function(xhr, status, error) {
          var err = JSON.parse(xhr.responseText);
          $('#user-login-alert').html(err.message);
          $('#user-login-alert').addClass('alert-danger');
          window.scrollTo(0, 0);
        },
        success: function(data) {
          sessionStorage.setItem('user_token', data.token);
          sessionStorage.setItem('user_role', 1);
          sessionStorage.setItem('setupTimeUser', new Date().getTime());
          if (sessionStorage.getItem('previous_url') === null) {
            window.location.href = 'home.html';
          }
          else
          {
            window.location.href = sessionStorage.getItem('previous_url').replace(/.*[\/\\]/, '');
            sessionStorage.removeItem('previous_url');
          }
        }
      });
    }

  });
});
