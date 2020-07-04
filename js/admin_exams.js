$(document).ready(function() {
  function isEmpty( el ){
    return !$.trim(el.html())
  }
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/user/courses',
    type: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('admin_token')
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var exam_row = `<tr class="tr-shadow" data-id="${data[i].id}">
        <td class="courses-column-1">${i+1}</td>
        <td class="courses-column-2">${data[i].name}</td>
        <td class="courses-column-3">${data[i].examNumber}</td>
        <td class="courses-column-4">
        <div class="table-data-feature">
        <button class="item exam-details-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="More">
        <i class="far fa-eye"></i>
        </button>
        <button class="item update-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
        <i class="fas fa-pen"></i>
        </button>
        <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        </td>
        </tr>
        <tr class="spacer"></tr>`
        console.log(data);
        $('#exams-table-content').append(exam_row);
      }

      $('.exam-details-btn').click(function() {
        if (isEmpty($('#questions-list'))){
          id = $(this).parent().parent().parent().attr('data-id');
          $('#btn-add-ques').attr('data-id', id);
          console.log('click');
          $('#exam-details-modal').css('display', 'block');
          document.documentElement.style.overflow = 'hidden';
          $.ajax({
            url: 'https://teaching-online-lms.herokuapp.com/api/exam/get-examination',
            type: 'GET',
            headers: {
              'Authorization': sessionStorage.getItem('admin_token')
            },
            data: {
              courseId: id
            },
            dataType: 'json',
            error: function(e) {
              console.log(e.message);
            },
            success: function(data) {
              for(let i = 0;i < data.length;i++) {
                var question_row = `<div class="quizitem normal open">
                <div class="quizitem-heading clear">
                <div class="questions-no">${i+1}.</div>
                <div class="right">
                <a href="javascript:;" class="btn btn-danger btn-quiz-del" data-id=${data[i].id}><i class="fa fa-times"></i></a>
                <span class="indicator"><i class="fa fa-angle-down"></i></span>
                </div>
                <p class="tt-store">${data[i].question}</p>
                </div>
                <div class="quizitem-body">
                <div class="form-row">
                <div class="lb">Nội dung câu hỏi</div>
                <textarea class="form-control quiz-content-input" placeholder="Nội dung của câu hỏi." rows="10" maxlength="800" required="" oninvalid="checkVisible(this)">${data[i].question}</textarea>
                </div>
                <div class="form-row answer-wrap">
                <div class="lb clear">Câu trả lời </div>
                <ul class="answer-list">
                </ul>
                <a href="javascript:;" class=" btn btn-danger btn-quiz-que-add" data-guid="lmdw"><i class="fa fa-plus"></i>Thêm câu trả lời</a>
                </div>
                <div class="update-question">
                <button type="button" class="btn update-question-btn" data-id=${data[i].id}>
                Cập nhật
                </button>
                </div>
                </div>
                </div>`
                console.log(data);
                $('#questions-list').append(question_row);

                for (let j = 0; j < data[i].answers.length; j++) {
                  var answer_row = `<li id="answer-rrwf" class="answer-item col-md-12 clear" style="margin-bottom: 0.5em;margin-top: 0.5em;">
                  <div class="correct-answer">
                  <div class="form-check">
                  <label class="checklb">
                  <input class="form-check-input" type="radio" name="correct-answer-${i}" required><span class="ip-avata"></span>
                  </label>
                  </div>
                  </div>
                  <div class="answer-content">
                  <input class="form-control col-md-11" name="answer-text-${i}" placeholder="Nội dung câu trả lời." value="${data[i].answers[j]}" type="text" required="">
                  </div>
                  <div class="delete-answer">
                  <a href="javascript:;" class="btn btn-danger btn-quiz-que-del"><i class="fa fa-trash"></i></a>
                  </div>
                  </li>`
                  $($('.answer-list')[i]).append(answer_row);
                }

                $($('input[name="correct-answer-' + (i) + '"]')[data[i].result]).attr('checked', true);

                $('.btn-quiz-del').click(function() {
                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this question!",
                    icon: "warning",
                    buttons: ["Stop", "Delete it"],
                    dangerMode: true,
                    timer: 5000,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      var btn = $(this);
                      var id = btn.attr('data-id');
                      $.ajax({
                        url: 'https://teaching-online-lms.herokuapp.com/api/exam/delete-exam',
                        type: 'POST',
                        headers: {
                          'Authorization': sessionStorage.getItem('admin_token')
                        },
                        data: {
                          examId: id
                        },
                        dataType: 'json',
                        error: function(e) {
                          console.log(e.message);
                          swal("Error when delete the lesson!", {
                            icon: "warning",
                          });
                        },
                        success: function(data) {
                          for (let i = $('.btn-quiz-del').index(btn) + 1; i < $('.btn-quiz-del').length; i++) {
                            var no_cell = $('.questions-no')[i]
                            $(no_cell).html(parseInt($(no_cell).html()) - 1)
                          }
                          btn.parent().parent().parent().remove();
                          swal("Poof! The question has been deleted!", {
                            icon: "success",
                          });
                          console.log(data);
                        }
                      });
                    } else {
                      swal("The question is safe!");
                    }
                  });
                });
              }

              $('.btn-quiz-que-add').click(function() {
                var index = $('.btn-quiz-que-add').index(this);
                var answer_block = `<li id="answer-rrwf" class="answer-item col-md-12 clear" style="margin-bottom: 0.5em;margin-top: 0.5em;">
                <div class="correct-answer">
                <div class="form-check">
                <label class="checklb">
                <input class="form-check-input" type="radio" name="correct-answer-${index}" required><span class="ip-avata"></span>
                </label>
                </div>
                </div>
                <div class="answer-content">
                <input class="form-control col-md-11" name="answer-text-${index}" placeholder="Nội dung câu trả lời." value="" type="text" required="">
                </div>
                <div class="delete-answer">
                <a href="javascript:;" class="btn btn-danger btn-quiz-que-del"><i class="fa fa-trash"></i></a>
                </div>
                </li>`

                $(this).prev().append(answer_block);

                var btn_dels = $($('.answer-list')[index]).find('.btn-quiz-que-del');
                var number_answers = btn_dels.length;
                $(btn_dels[number_answers-1]).click(function() {
                  console.log('click');
                  $(this).parent().parent().remove();
                });
              });

              $('.btn-quiz-que-del').click(function() {
                $(this).parent().parent().remove();
              });

              $('.indicator').click(function() {
                console.log('click');
                $(this).parent().parent().next().toggleClass('show');
                $(this).find('i').toggleClass('expand');
              });

              $('.update-question-btn').click(function() {
                var index =  $('.update-question-btn').index(this);
                var id = $(this).attr('data-id');
                var question = $($('.quiz-content-input')[index]).val();
                var answers = [];
                $('input[name="answer-text-' + index + '"]').each(function() {
                  answer = $(this).val();
                  answers.push(answer);
                })
                console.log(answers);
                var radio_result = $('input[name="correct-answer-' + index + '"]');
                var result = radio_result.index(radio_result.filter(':checked'));
                console.log(result);
                $.ajax({
                  url: 'https://teaching-online-lms.herokuapp.com/api/exam/update-examination',
                  type: 'POST',
                  headers: {
                    'Authorization': sessionStorage.getItem('admin_token')
                  },
                  data: {
                    id: id,
                    question: question,
                    answers: answers,
                    result: result
                  },
                  dataType: 'json',
                  error: function(e) {
                    console.log(e.message);
                    alert('Subject name has existed!');
                  },
                  success: function(data) {
                    console.log(data);
                  }
                });
              });
            }
          });
        }
        else {
          $('#exam-details-modal').css('display', 'block');
        }
      });
    }
  });

  $('.close-exam-details-modal-btn').click(function() {
    $('#exam-details-modal').css('display', 'none');
  });

  $('#btn-add-ques').click(function() {
    $('#add-question-modal').css('display', 'block');
  })

  $('.btn-new-quiz-que-add').click(function() {
    var answer_block = `<li id="answer-rrwf" class="answer-item col-md-12 clear" style="margin-bottom: 0.5em;margin-top: 0.5em;">
    <div class="correct-answer">
    <div class="form-check">
    <label class="checklb">
    <input class="form-check-input" type="radio" name="new-correct-answer" required><span class="ip-avata"></span>
    </label>
    </div>
    </div>
    <div class="answer-content">
    <input class="form-control col-md-11" name="new-answer-text" placeholder="Nội dung câu trả lời." value="" type="text" required="">
    </div>
    <div class="delete-answer">
    <a href="javascript:;" class="btn btn-danger btn-new-quiz-que-del"><i class="fa fa-trash"></i></a>
    </div>
    </li>`

    $(this).prev().append(answer_block);

    var new_btns_del = $('.btn-new-quiz-que-del');
    var number_new_answers = new_btns_del.length;
    $(new_btns_del[number_new_answers-1]).click(function() {
      console.log('click');
      $(this).parent().parent().remove();
    });
  })

  $('.close-addques-modal-btn').click(function() {
    $('#add-question-modal').css('display', 'none');
  });

  $('#new-question-form').submit(function(e) {
    e.preventDefault();
    var courseId = $('#btn-add-ques').attr('data-id');
    var question = $('#new-quiz-content-input').val();
    var answers = [];
    $('input[name="new-answer-text"]').each(function() {
      answer = $(this).val();
      answers.push(answer);
    })
    var radio_result = $('input[name="new-correct-answer"]');
    var result = radio_result.index(radio_result.filter(':checked'));
    console.log(result);
    $.ajax({
      url: 'https://teaching-online-lms.herokuapp.com/api/exam/new-examination',
      type: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('admin_token')
      },
      data: {
        courseId: courseId,
        question: question,
        answers: answers,
        result: result
      },
      dataType: 'json',
      error: function(e) {
        console.log(e.message);
        alert('Subject name has existed!');
      },
      success: function(data) {
        var number_rows = $('#questions-list .quizitem').length;
        var question_row = `<div class="quizitem normal open">
        <div class="quizitem-heading clear">
        <div class="questions-no">${number_rows+1}.</div>
        <div class="right">
        <a href="javascript:;" class="btn btn-danger btn-quiz-del" data-id=${data.id}><i class="fa fa-times"></i></a>
        <span class="indicator"><i class="fa fa-angle-down"></i></span>
        </div>
        <p class="tt-store">${data.question}</p>
        </div>
        <div class="quizitem-body">
        <div class="form-row">
        <div class="lb">Nội dung câu hỏi</div>
        <textarea class="form-control quiz-content-input" placeholder="Nội dung của câu hỏi." rows="10" maxlength="800" required="" oninvalid="checkVisible(this)">${data.question}</textarea>
        </div>
        <div class="form-row answer-wrap">
        <div class="lb clear">Câu trả lời </div>
        <ul class="answer-list">
        </ul>
        <a href="javascript:;" class=" btn btn-danger btn-quiz-que-add" data-guid="lmdw"><i class="fa fa-plus"></i>Thêm câu trả lời</a>
        </div>
        <div class="update-question">
        <button type="button" class="btn update-question-btn" data-id=${data.id}>
        Cập nhật
        </button>
        </div>
        </div>
        </div>`
        console.log(data);
        $('#questions-list').append(question_row);

        for (let j = 0; j < data.answers.length; j++) {
          var answer_row = `<li id="answer-rrwf" class="answer-item col-md-12 clear" style="margin-bottom: 0.5em;margin-top: 0.5em;">
          <div class="correct-answer">
          <div class="form-check">
          <label class="checklb">
          <input class="form-check-input" type="radio" name="correct-answer-${number_rows}" value="rrwf"><span class="ip-avata"></span>
          </label>
          </div>
          </div>
          <div class="answer-content">
          <input class="form-control col-md-11" name="answer-text-${number_rows}" placeholder="Nội dung câu trả lời." value="${data.answers[j]}" type="text" required="">
          </div>
          <div class="delete-answer">
          <a href="javascript:;" class="btn btn-danger btn-quiz-que-del"><i class="fa fa-trash"></i></a>
          </div>
          </li>`
          $($('.answer-list')[number_rows]).append(answer_row);
        }

        $($('input[name="correct-answer-' + (number_rows) + '"]')[data.result]).attr('checked', true);

        $($('.btn-quiz-del')[$('.btn-quiz-del').length-1]).click(function() {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this question!",
            icon: "warning",
            buttons: ["Stop", "Delete it"],
            dangerMode: true,
            timer: 5000,
          })
          .then((willDelete) => {
            if (willDelete) {
              btn = $(this);
              var id = btn.attr('data-id');
              $.ajax({
                url: 'https://teaching-online-lms.herokuapp.com/api/exam/delete-exam',
                type: 'POST',
                headers: {
                  'Authorization': sessionStorage.getItem('admin_token')
                },
                data: {
                  examId: id
                },
                dataType: 'json',
                error: function(e) {
                  console.log(e.message);
                  alert('Subject name has existed!');
                },
                success: function(data) {
                  for (let i = $('.btn-quiz-del').index(btn) + 1; i < $('.btn-quiz-del').length; i++) {
                    var no_cell = $('.questions-no')[i]
                    $(no_cell).html(parseInt($(no_cell).html()) - 1)
                  }
                  btn.parent().parent().parent().remove();
                  swal("Poof! The question has been deleted!", {
                    icon: "success",
                  });
                  console.log(data);
                }
              });
            } else {
              swal("The question is safe!");
            }
          });
        });
        console.log(data);
      }
    });
  });
})
