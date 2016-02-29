// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system

var questions = [];
var answers = []

$(document).ready(function() {
  
  // Save the first question when the user clicks the start button
  $(document).on("click", ':button:contains("Start")', function() {
    questions[0] = $("#answer_form > p > b").text();
  });
  
  // Save the answer selected by the user on the check box
  $(document).on('click', '.ballot_answer', function() {
    var index = $("input[name='question_num']").val();
    var answer = $("#" + this.id)[0].nextSibling.nodeValue;
    answers[index] = answer;
  });
  
  // Save the questions from question two when the user clicks the next button
  $(document).on('click', ':button[value="Next"]', function() {
    var index = $("input[name='question_num']").val();
    questions[index] = $('#answer_form > p > b').text();
  });
  
  // Save all the questions and answers when the user clicks the proceed button
  $(document).on('click', ':button[value="Proceed"]', function() {
    chrome.runtime.sendMessage(
      {
        type: "setSelectedOption",
        questions: questions,
        answers: answers
      }
    );
  });
});