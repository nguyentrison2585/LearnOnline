$(document).ready(function() {
  $('#reset-password-form').submit(function(e) {
    e.preventDefault();
    var email = $('input[name="email"').val();
    $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/resetPassword',
    dataType: 'json',
    headers: {
      'Authorization': sessionStorage.getItem('user_token')
    },
    data: {
      email: email,
    },
    error: function(e) {
      alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
      console.log(e);
    },
    success: function(data) {
      console.log(data);
    },
    type: 'POST'
  });
  });
})
