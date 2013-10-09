var userInfo = [];



$('#submit').click(function() {
	var thisUser = {};
	
	thisUser.name = $("#name").val();
	thisUser.pushups = $("input[value='push ups']").is(':checked');
	thisUser.stretches = $("input[value='stretches']").is(':checked');		
	thisUser.time = $("#time").val();
		
	userInfo.push(thisUser);
	storeUser(userInfo);
});



function storeUser(userInfo) {
	userInfo = JSON.stringify(userInfo);
	localStorage.userInfo = userInfo;

}


checkForUserName();

function checkForUserName() {	
	if (localStorage.userInfo) {
		userInfo = localStorage.userInfo;
		userInfo = JSON.parse(userInfo);
		if (userInfo[0].name != '') haveName();
	}
}

function haveName() {
	$('body').append("hello " + userInfo[0].name);
}


jQuery( document ).ready( function () {
		
				
		var stretches = 11;

		var $lastA = -1;
		var $lastB = -1;
		var $lastC = -1;
		var $lastD = -1;
		var onCounter = 0;
		
		var startCount = false;
		


		var socket = io.connect( "/", {
			"reconnect"                :true,
			"reconnection delay"       :500,
			"max reconnection attempts":10
		} );

		socket.on( "message", function ( data ) {
			data = process_data( data );

			/* Initialize position */
			$lastA = data.a;
			$lastB = data.b;
			$lastC = data.c;
			$lastD = data.d;
			
			/* Get initial counter */
			function keepCount() {
				/* If both feet are properly on the mat, start the counter */
				if(($lastA >= 1000) && ($lastB >=1000)) {
					$("#leftFoot").css({"opacity": "1.0", "background":"url('img/leftFoot_on.png') no-repeat"});
					$("#rightFoot").css({"opacity": "1.0", "background":"url('img/rightFoot_on.png') no-repeat"});
					onCounter++;
				/* Or else, keep flickering */	
				} else {
					$("#leftFoot").css({"opacity": $lastA/2000, "background":"url('img/leftFoot.png') no-repeat"});
					$("#rightFoot").css({"opacity": $lastB/2000, "background":"url('img/rightFoot.png') no-repeat"});
				}
			};
			
			/* If the onCounter is larger than 10, start counting the hands */
			function startCount() {
				if(($lastC >= 1000) && ($lastD >= 1000)) {
					stretches--;
					$('div.stretch-count').replaceWith('<div class="stretch-count">' + stretches +'</div>');
					$("#warning-text").replaceWith("<div id='warning-text'>2. On the way to becoming a better you!</div>");
					console.log(stretches);
				
					
					if (stretches <= 0) {
						$('#overlay').hide("fast");
					}
				}
				
				
			};
			
			
			
			/* Keep flickering if the counter has not reached 10 */
			if(onCounter < 10) {
				setInterval(keepCount(), 1000/30);
			} else {
			/* Or else, just set the feet to ON */	
				$lastA, $lastB = 1050;
				setInterval(startCount(), 1000/30);
			}
			
			
		
		
		} );

		


		function process_data( data ) {

			var ret = {
				a:0,
				b:0,
				c:0,
				d:0
			};

			var array = data.split( ',' );

			if ( array.length < 3 )
				return ret;

			ret.a = array[0];
			ret.b = array[1];
			ret.c = array[2];
			ret.d = array[3];

			//ret = sanitize_size( ret );

			return ret;
		}

		
		

	}
);