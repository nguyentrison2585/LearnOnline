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
        var subject_block = `<div class="span3" id="yui_3_17_2_2_1587460599521_208">
          <div class="fp-coursebox" id="yui_3_17_2_2_1587460599521_209">
            <div class="fp-coursethumb" id="yui_3_17_2_2_1587460599521_212">
              <img src="../../images/ky_nang_mem.jpg" width="243" height="165" alt="Kỹ năng mềm ED3220_116879" id="yui_3_17_2_2_1587460599521_210">
            </div>
            <div class="fp-courseinfo" id="yui_3_17_2_2_1587460599521_249">
              <h5 id="yui_3_17_2_2_1587460599521_248"><a href="https://lms.hust.edu.vn/course/view.php?id=256">${data[i].name}</a></h5>
              <div class="readmore" id="yui_3_17_2_2_1587460599521_250">
                <a href="../subjects/courses.html" class="subject-detail" id=${data[i].id}>Readmore<i class="fa fa-angle-double-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>`
        $('#subjects-block').append(subject_block);
        if (i != 0 && i % 3 == 0) {
          var next_line = `<div class="clearfix hidexs" id="yui_3_17_2_2_1587460599521_213"></div>`
          $('#subjects-block').append(next_line);
        }
      }
      console.log(data);
    },
    type: 'GET'
  });
});
