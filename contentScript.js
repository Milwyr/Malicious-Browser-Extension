// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system

var userId;

// Text of option on the selected check box
var selectedAnswer;

$(document).ready(function() {
});

// Add click listner to all the option check boxes
$(document).on('click', '.ballot_answer', function() {
	// Retrieve the option selected by the user
	var selectedCheckBox = $("#" + this.id);
	selectedAnswer = selectedCheckBox[0].nextSibling.nodeValue;
});

// Add click listener to the 'Next' button
$(document).on('click', ':button[value="Next"]', function() {
	// Send the question and answer message to store in local storage
	chrome.runtime.sendMessage(
	{
		type: "setSelectedOption",
		questionNumber: $("input[name='question_num']").val(),
		question: $('#answer_form > p > b').text(), 
		answer: selectedAnswer
	});
});