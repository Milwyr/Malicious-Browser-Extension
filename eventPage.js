// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
		case 'setSelectedOption':
			localStorage.setItem(
        "question".concat(request.questionNumber),
        JSON.stringify(request.question));
        
        localStorage.setItem(
          "answer".concat(request.questionNumber),
          JSON.stringify(request.answer));
			break;
    }
  }
);