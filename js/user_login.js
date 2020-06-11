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
        error: function(e) {
          console.log(e.message);
          $('#user-login-alert').html('Username or password incorrect!');
          $('#user-login-alert').addClass('alert-danger');
          window.scrollTo(0, 0);
        },
        success: function(data) {
          sessionStorage.setItem('user_token', data.token);
          sessionStorage.setItem('setupTimeUser', new Date().getTime());
          window.location.href = '../static_pages/home.html';
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
        error: function(e) {
          console.log(e.message);
          $('#user-login-alert').html('Username or password incorrect!');
          $('#user-login-alert').addClass('alert-danger');
        },
        success: function(data) {
          sessionStorage.setItem('user_token', data.token);
          sessionStorage.setItem('setupTimeUser', new Date().getTime());
          window.location.href = '../static_pages/home.html';
        }
      });
    }
  });
});
