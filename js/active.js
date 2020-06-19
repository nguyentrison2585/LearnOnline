$(document).ready(function() {
  function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
    queryEnd   = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }

  var token = parseURLParams(window.location.href);
  if (token != null) {
    console.log(token.token[0]);
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/teacher/verify_token',
      dataType: 'json',
      data: {
        token: token.token[0]
      },
      error: function(e) {
        alert('Có lỗi trong quá trình xác minh');
      },
      success: function(data) {
        sessionStorage.setItem('user_token', token);
        sessionStorage.setItem('user_role', 1);
        sessionStorage.setItem('setupTimeUser', new Date().getTime());
        alert('Tài khoản đã được kích hoạt');
      },
      type: 'POST'
    });
  }
})
