$(document).ready(function() {
  var itemsmenu = $('.js-item-menu');
  $('.js-item-menu').click(function() {
    console.log('click');
    $(this).toggleClass('show-dropdown');
    for (let i = 0; i < itemsmenu.length; i++) {
      if(itemsmenu[i] != this && itemsmenu[i].classList.contains('show-dropdown')) {
        $(itemsmenu[i]).removeClass('show-dropdown');
      }
    }
  });

  $('#user-logout').click(function() {
    sessionStorage.removeItem('user_token');
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('setupTimeUser');
    window.location.href = 'login.html'
  })
});
