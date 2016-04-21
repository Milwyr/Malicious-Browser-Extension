// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
      case "getBaseUrl":
        // Return the URL the user was browsing
        sendResponse({baseUrl: localStorage["baseUrl"]});
      break;
      case "setBaseUrl":
        localStorage.setItem("baseUrl", JSON.stringify(request.baseUrl));
        break;
      
      case "getEmailAddress":
        // Return the URL the user was browsing
        sendResponse({emailAddress: localStorage["emailAddress"]});
      break;
      case "setUserEmailAddress":
        localStorage.setItem("emailAddress", JSON.stringify(request.emailAddress));
        break;
      
      case "getAnswers":
        sendResponse({answers: localStorage["answers"]});
        break;
      case "setSelectedOption":
        localStorage.setItem("questions", JSON.stringify(request.questions));
        localStorage.setItem("answers", JSON.stringify(request.answers));
        break;
      
      case "setBallotTrackerNumber":
        localStorage.setItem("trackerNumber", JSON.stringify(request.trackerNumber));
        break;
    }
  }
);