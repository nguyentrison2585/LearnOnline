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
})
