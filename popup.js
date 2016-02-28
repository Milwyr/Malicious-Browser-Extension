// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system
$(document).ready(function() {
	if (localStorage.question1 != null) {
		$('#display').append("Question: ".concat(localStorage.question1));
	}
	if (localStorage.answer1 != null) {
		$('#display').append("Answer: ".concat(localStorage.answer1));
	}
});