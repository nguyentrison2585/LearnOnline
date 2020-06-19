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

  $('#password, #password-confirm').on('keyup', function () {
    if ($('#password').val() == $('#password-confirm').val()) {
      $('#password-confirm-message').html('Matching').css('color', '#63c76a');
    }
    else {
      $('#password-confirm-message').html('Not Matching').css('color', '#dc3545');
    }
  });

  $('#reset-password-form').submit(function(e) {
    e.preventDefault();
    var password = $('#password').val();
    if (token != null) {
      $.ajax({
        url: 'https://teaching-online-lms.herokuapp.com/api/teacher/verify-password',
        dataType: 'json',
        data: {
          token: token.token[0],
          new_password: password
        },
        error: function(e) {
          alert('Đã có lỗi trong quá trình xử lý!');
          console.log(e);
        },
        success: function(data) {
          alert('Đổi mật khẩu thành công!');
        },
        type: 'POST'
      });
    }

  });
})
