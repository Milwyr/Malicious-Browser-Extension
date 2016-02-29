// Author: Milton Li 2015-2016, Newcastle University
// Project: Attack on Helios voting system
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
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