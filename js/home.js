$(document).ready(function() {
  console.log("Feed");
  var prev_next_buttons = $(".flickity-prev-next-button");
  $("#home-slide").mouseover(function() {
    prev_next_buttons[0].style.opacity = 1;
    prev_next_buttons[1].style.opacity = 1;
  });
  $("#home-slide").mouseout(function() {
    prev_next_buttons[0].style.opacity = 0;
    prev_next_buttons[1].style.opacity = 0;
  });

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    console.log("click");
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = $(".item");
    var dots = $(".dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      $(slides[i]).removeClass("active");
    }
    for (i = 0; i < dots.length; i++) {
      $(dots[i]).removeClass("active");
    }
    $(slides[slideIndex-1]).addClass("active");
    $(dots[slideIndex-1]).addClass("active");
  }

  $($(".flickity-button-icon")[0]).click(function() {
    plusSlides(-1)
  });

  $($(".flickity-button-icon")[1]).click(function() {
    plusSlides(1)
  });

  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/subjects',
    dataType: 'json',
    error: function(e) {
      $('#lesson-info').html('<p>An error has occurred</p>');
      console.log(e);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var subject_block = `<li>
                <a href="courses.html?subjectId=${data[i].id}" class="u-tags-mini">
                  <p>
                    <i class="fas fa-language" aria-hidden="true"></i>
                    ${data[i].name}
                  </p>
                </a>
              </li>`
        $('#subjects-list').append(subject_block);
      }
      console.log(data);
    },
    type: 'GET'
  });
});
