// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system
$(document).ready(function() {
  
  if (localStorage["emailAddress"] != null) {
    var emailAddress = JSON.parse(localStorage["emailAddress"]);
    $('#display')
      .append("Email Address: ")
      .append(emailAddress)
      .append("<br>");
  }
  
  // Display answers on the popup page
	if (localStorage["questions"] != null) {
    var questions = JSON.parse(localStorage["questions"]);
    
    $.each(questions, function(index, value) {
      $('#display').append("Question ")
        .append(index + 1).append(": ")
        .append(value).append("<br>");
    });
    $('#display').append("<br>")
	}
  
  // Display answers on the popup page
	if (localStorage["answers"] != null) {
    var answers = JSON.parse(localStorage["answers"]);
    
		$.each(answers, function(index, value) {
      $('#display').append("Answer ")
        .append(index + 1).append(": ")
        .append(value).append("<br>");
    });
	}
  
  // Display ballot tracker number on the popup page
	if (localStorage["trackerNumber"] != null) {
    var trackerNumber = JSON.parse(localStorage["trackerNumber"]);
    $('#display')
      .append("Smart ballot tracker number: ")
      .append(trackerNumber);
	}
  
  // Clear local storage, i.e. initialise the popup page to the original state
  $(document).on("click", ":button#clear", function() {
    localStorage.clear();
  });
});