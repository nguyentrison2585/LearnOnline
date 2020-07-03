$(document).ready(function() {
  if (sessionStorage.getItem("user_role") == 0) {
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/user/profile',
      dataType: 'json',
      headers: {
        'Authorization': sessionStorage.getItem('user_token')
      },
      error: function(e) {
        alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
        console.log(e);
      },
      success: function(data) {
        $('#username').html(data.username);
        $('#email-address').html(data.email)
        $('input[name="fullname"').val(data.fullName);
        $('input[name="address"').val(data.address);
        $('input[name="phonenumber"').val(data.phone);
        console.log(data);
      },
      type: 'GET'
    });

    $('#update-profile-form').submit(function(e) {
      e.preventDefault();
      var fullname = $('input[name="fullname"').val();
      var address = $('input[name="address"').val();
      var phonenumber = $('input[name="phonenumber"').val();
      console.log(fullname + address + phonenumber);
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/user/update-profile',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          fullName: fullname,
          phoneNumber: phonenumber,
          address: address
        },
        error: function(e) {
          alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
          console.log(e);
        },
        success: function(data) {
          alert('Success');
          console.log(data);
        },
        type: 'POST'
      });
    });
  }
  else if (sessionStorage.getItem("user_role") == 1){
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/teacher/profile',
      dataType: 'json',
      headers: {
        'Authorization': sessionStorage.getItem('user_token')
      },
      error: function(e) {
        alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
        console.log(e);
      },
      success: function(data) {
        $('#username').html(data.username);
        $('#email-address').html(data.email)
        $('input[name="fullname"').val(data.fullName);
        $('input[name="address"').val(data.address);
        $('input[name="phonenumber"').val(data.phoneNumber);
        if (data.avatar != null) {
          $('#load-user-image').prop('src', 'https://teaching-online-lms.herokuapp.com' + data.avatar);
        }
        else {
          $('#load-user-image').prop('src', '../../images/default-avatar.png');
        }
        console.log(data);
      },
      type: 'GET'
    });

    $('#update-profile-form').submit(function(e) {
      e.preventDefault();
      var fullname = $('input[name="fullname"').val();
      var address = $('input[name="address"').val();
      var phonenumber = $('input[name="phonenumber"').val();
      console.log(fullname + address + phonenumber);
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/teacher/update-profile',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: {
          fullName: fullname,
          phoneNumber: phonenumber,
          address: address
        },
        error: function(e) {
          alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
          console.log(e);
        },
        success: function(data) {
          alert('Success');
          console.log(data);
        },
        type: 'POST'
      });
    });
  }

  $('#user-img-file').on('change', function() {
    var reader = new FileReader();

    reader.onloadend = function() {
      $('#load-user-image').prop('src', reader.result);
    }
    reader.readAsDataURL(this.files[0]);
  });

  $('#update-img-form').submit(function(e) {
    e.preventDefault();
    if ($('#user-img-file').prop('files').length > 0) {
      var image = $('#user-img-file').prop('files')[0];
      var fd = new FormData();
      fd.append('file', image);
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/teacher/upload-avatar',
        dataType: 'json',
        headers: {
          'Authorization': sessionStorage.getItem('user_token')
        },
        data: fd,
        contentType: false,
        processData: false,
        error: function(e) {
          alert('<p>Đã có lỗi xảy ra khi lấy dữ liệu</p>');
          console.log(e);
        },
        success: function(data) {
          alert('Success');
          location.reload();
          console.log(data);
        },
        type: 'POST'
      });
    }
    else {
      alert('Bạn cần tải ảnh lên để cập nhật!');
    }
  });
})
