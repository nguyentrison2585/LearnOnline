$(document).ready(function() {
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/admin/teacher-list',
    type: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('admin_token')
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
    },
    success: function(data) {
      console.log(data);
      $('#number-teachers').html(data.length)
    }
  });
})
