</ul>
			<div class="clear"></div>
		</section>
</article>
</body>
<script>
	
	$(document).ready(function() {
		var opacityAbs;
		
		/* $("#experiment a").click(function() { */
			if (window.DeviceOrientationEvent) {
				  // Listen for the deviceorientation event and handle the raw data
				  window.addEventListener('deviceorientation', function(eventData) {
				  
			    // gamma is the left-to-right tilt in degrees, where right is positive
			    var tiltLR = eventData.gamma;
			    
		
			    // beta is the front-to-back tilt in degrees, where front is positive
			    var tiltFB = eventData.beta;
		
			    // alpha is the compass direction the device is facing in degrees
			    var dir = eventData.alpha;
		
			    // call our orientation event handler
			    
			    opacityAbs = Math.round(tiltFB)
			    $('#experiment').text(tiltLR);
			    	    setInterval(function() {
					    
		
					    	
					    	//bouncing ball?
					    	
					    	if (opacityAbs >=30){
						    	$('#over').fadeIn("slow",function() {
							    	//animation complete
						    	});
					    	} else {
					    		$('#over').fadeOut("slow",function() {
						    		//animation complete
					    		});

					    	}
					    	
					    	}, 1000);
					    	
					    
					    deviceOrientationHandler(tiltLR, tiltFB, dir);
					  }, false);
					} else {
					 /*  document.getElementById("doEvent").innerHTML = "Not supported." */
					}
					
			
		/* }); */
	});

</script>
</html>