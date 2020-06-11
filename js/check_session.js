var hours = 24;
var now = new Date().getTime();
var setupTime = sessionStorage.getItem('setupTime');
if (setupTime == null) {
  sessionStorage.setItem('setupTime', now)
} else {
  if(now - setupTime > hours*60*60*1000) {
    sessionStorage.removeItem('admin_token');
    sessionStorage.setItem('setupTime', now);
  }
}
if (sessionStorage.getItem("admin_token") === null) {
  window.location.href = 'login.html';
}
