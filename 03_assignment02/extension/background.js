var started = false;

			

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
        	started = true;
	
            if (started == true) {
            	//setInterval(function() { 
            		colorDivs();
            	//}, 1000);
            }
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
		console.log("hi");
	});
}

