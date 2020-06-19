$(document).ready(function() {
  $('#forgot-password-form').submit(function(e) {
    e.preventDefault();
    var email = $('input[name="email"').val();
    $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/teacher/resetPassword',
    dataType: 'json',
    data: {
      email: email,
    },
    error: function(e) {
      alert('Đã có lỗi trong quá trình xử lý!');
      console.log(e);
    },
    success: function(data) {
      alert('Vui lòng kiểm tra email của bạn để đổi mật khẩu!');
      console.log(data);
    },
    type: 'POST'
  });
  });
})
