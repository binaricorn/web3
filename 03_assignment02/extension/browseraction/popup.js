window.onload = function() {
	document.getElementById("button").onclick = function() {
	
		var port = chrome.extension.connect({name: "Sample Communication"});
			port.postMessage("Hi BackGround");
			port.onMessage.addListener(function(msg) {
			        console.log("message recieved from background.js: "+ msg);
		});
/*
		val name = $("#name").val();
		console.log(name);
*/
		/*
chrome.extension.sendMessage({
	        type: "color-divs"
	    });
*/
	}
	

	}
