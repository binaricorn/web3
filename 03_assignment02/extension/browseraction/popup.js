window.onload = function() {
	document.getElementById("button").onclick = function() {
		// only happens on just one page, and not all tabs
		/* setInterval(function() {  */
				chrome.extension.sendMessage({
			        type: "color-divs"
			    });
			    
			/*  }, 2000);  */
		
			
setTimeout(function() {
				window.close();
			}, 1000);


		
	}
}