

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			setTimeout(function() {
				location.replace('http://localhost:9000');	
			}, 1000);
			
		

			
		break;
	}
});