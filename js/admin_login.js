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
  $('#admin-login-form').submit(function(e) {
    e.preventDefault();
    console.log('click');
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/admin/login',
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      error: function(e) {
        $('#admin-login-alert').html('Sai tên đang nhập hoặc mật khẩu');
        $('#admin-login-alert').addClass('alert-danger');
      },
      success: function(data) {
        window.open('darkboard.html');
      }
    });
  });
});
