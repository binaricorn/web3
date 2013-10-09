chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
        console.log("message recieved");
        port.postMessage("hello background.js");
  });
});

/*

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
        
    }
    return true;
});


// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "Start!"});
	});
}
*/