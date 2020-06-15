var hours = 24;
var now = new Date().getTime();
var setupTime = sessionStorage.getItem('setupTimeUser');
if (setupTime == null) {
  sessionStorage.setItem('setupTimeUser', now)
} else {
  if(now - setupTime > hours*60*60*1000) {
    sessionStorage.removeItem('user_token');
    sessionStorage.setItem('setupTimeUser', now);
  }
}
if (sessionStorage.getItem("user_token") === null) {
  window.location.href = 'login.html';
  alert('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn');
}
