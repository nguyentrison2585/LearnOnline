$(document).ready(function() {
  $('#search-form').submit(function(e) {
    e.preventDefault();
    var key = $('#search-form input[name="key"]').val();
    window.location.href = 'search.html?key=' + key;
  });
})
