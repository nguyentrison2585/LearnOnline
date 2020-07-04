$(document).ready(function() {
  if (sessionStorage.getItem("user_token") === null) {
    var user_zone = `<li><a class="unica-reg-acc" href="login.html">Đăng nhập</a></li>
    <li><a class="unica-log-acc" href="signup.html">Đăng ký</a></li>`
    $('#user-account-zone').empty();
    $('#user-account-zone').append(user_zone);
  }
  else {
    if (sessionStorage.getItem("user_role") == 0) {
      var user_zone = `<li class="account-wrap">
      <div class="account-item clearfix js-item-menu">
      <div class="image">
      <img id="user-img-header" alt="User Image">
      </div>
      <div class="content">
      <a class="js-acc-btn" href="#" id="acc-btn-name"></a>
      <i class="fas fa-angle-down"></i>
      </div>
      <div class="account-dropdown js-dropdown">
      <div class="info clearfix">
      <div class="image">
      <a href="#">
      <img id="user-img-dropdown" alt="User Image">
      </a>
      </div>
      <div class="content">
      <h5 class="name">
      <a href="#" id="dropdown-acc-name"></a>
      </h5>
      <span class="email" id="dropdown-acc-email"></span>
      </div>
      </div>
      <div class="account-dropdown__body">
      <div class="account-dropdown__item">
      <a href="profile.html">
      <i class="fas fa-user"></i>Thay đổi thông tin
      </a>
      </div>
      <div class="account-dropdown__item">
      <a href="change_password.html">
      <i class="fas fa-cog"></i>Đổi mật khẩu
      </a>
      </div>
      </div>
      <div class="account-dropdown__footer">
      <a href="login.html" id="user-logout">
      <i class="fas fa-power-off"></i>Đăng xuất
      </a>
      </div>
      </div>
      </div>
      </li>`
      $('#user-account-zone').empty();
      $('#user-account-zone').append(user_zone);
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
          $('#acc-btn-name').html(data.username);
          $('#dropdown-acc-name').html(data.username);
          $('#dropdown-acc-email').html(data.email);
          if (data.avatar != null) {
            $('#user-img-header').prop('src', 'https://teaching-online-lms.herokuapp.com' + data.avatar);
            $('#user-img-dropdown').prop('src', 'https://teaching-online-lms.herokuapp.com' + data.avatar);
          }
          else {
            $('#user-img-header').prop('src', '../../images/default-avatar.png');
            $('#user-img-dropdown').prop('src', '../../images/default-avatar.png');
          }
          console.log(data);
        },
        type: 'GET'
      });
    }
    else if (sessionStorage.getItem("user_role") == 1){
      var user_zone = `<li class="account-wrap">
      <div class="account-item clearfix js-item-menu">
      <div class="image">
      <img id="user-img-header" alt="User Image">
      </div>
      <div class="content">
      <a class="js-acc-btn" href="#" id="acc-btn-name"></a>
      <i class="fas fa-angle-down"></i>
      </div>
      <div class="account-dropdown js-dropdown">
      <div class="info clearfix">
      <div class="image">
      <a href="#">
      <img id="user-img-dropdown" alt="User Image">
      </a>
      </div>
      <div class="content">
      <h5 class="name">
      <a href="#" id="dropdown-acc-name"></a>
      </h5>
      <span class="email" id="dropdown-acc-email"></span>
      </div>
      </div>
      <div class="account-dropdown__body">
      <div class="account-dropdown__item">
      <a href="profile.html">
      <i class="fas fa-user"></i>Thay đổi thông tin
      </a>
      </div>
      <div class="account-dropdown__item">
      <a href="change_password.html">
      <i class="fas fa-cog"></i>Đổi mật khẩu
      </a>
      </div>
      <div class="account-dropdown__item">
      <a href="teaching_schedule.html">
      <i class="far fa-calendar-alt"></i>Khóa học của tôi
      </a>
      </div>
      </div>
      <div class="account-dropdown__footer">
      <a href="login.html" id="user-logout">
      <i class="fas fa-power-off"></i>Đăng xuất
      </a>
      </div>
      </div>
      </div>
      </li>`
      $('#user-account-zone').empty();
      $('#user-account-zone').append(user_zone);
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
          $('#acc-btn-name').html(data.username);
          $('#dropdown-acc-name').html(data.username);
          $('#dropdown-acc-email').html(data.email);
          if (data.avatar != null) {
            $('#user-img-header').prop('src', 'https://teaching-online-lms.herokuapp.com' + data.avatar);
            $('#user-img-dropdown').prop('src', 'https://teaching-online-lms.herokuapp.com' + data.avatar);
          }
          else {
            $('#user-img-header').prop('src', '../../images/default-avatar.png');
            $('#user-img-dropdown').prop('src', '../../images/default-avatar.png');
          }
          console.log(data);
        },
        type: 'GET'
      });
    }
  }
})
