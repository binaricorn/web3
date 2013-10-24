/* Create empty array and objects */
var userInfo = [];
var thisUser = {};
var data = {};
var editing = false;
var socket = io.connect('http://localhost');

initPage();                              
pageLoad();

function initPage() {
	/* Hide all the pages except for the first one on load */
	for(var i = 1; i < 5; i++) {
		$(".page section").eq(i).css("display","none");
	}

	$('#submit0').click(function() { 
		$(".page section").eq(0).fadeOut("slow", function() {
			$(".page section").eq(1).fadeIn("slow");
			$("#progress-bar").fadeIn("slow").css("width","25%");
		});
	});
	
	/* First page: Get username */
	$('#submit1').click(function() {
		thisUser.name = $("#name").val();
		
		$(".page section").eq(1).fadeOut("slow", function() {
			$(".page section").eq(2).fadeIn("slow");
			$("#progress-bar").css("width","50%");
		});
		
	});
}

		
function pageLoad() {
		
	/* Initialize time variable from HTML*/
	var timeVal = parseInt($("#time-val").text());
	
	/* Do math on time variable and display on HTML page */
	if (localStorage.userInfo) {
			userInfo = localStorage.userInfo;
			userInfo = JSON.parse(userInfo);
			var currentEdit = userInfo.length-1;
			$('#time-val').text(userInfo[currentEdit].time);
			
			
			
			$("#decrease-time").click(function() {
				timeVal -= 5;
				$("#time-val").text(timeVal);
			});
			
			$("#increase-time").click(function() {
				timeVal = +timeVal + 5;
				$("#time-val").text(timeVal);	
			});
			
		} else {
			$("#decrease-time").click(function() {
				timeVal -= 5;	
				$("#time-val").text(timeVal);	
			});
			
			$("#increase-time").click(function() {
				timeVal = +timeVal + 5;
				$("#time-val").text(timeVal);	
			});
	}
	
	
	/* Second page: Get exercise selection */
	$('#submit2').click(function() {
		thisUser.pushups = $("input[value='push ups']").is(':checked');
		thisUser.stretches = $("input[value='stretches']").is(':checked');	
		$(".page section").eq(2).fadeOut("slow", function() {
			$(".page section").eq(3).fadeIn("slow");
			$("#progress-bar").css("width","75%");
		});
		
	});
	
	/* Third page: Get timer selection */
	$('#submit3').click(function() {
		thisUser.time = $("#time-val").text();			
			
			
		// if we are currently editing
		if (editing == true) {
			console.log(editing)
			userInfo.push(thisUser);
			storeUser(userInfo);
			setTimeout(function() {
				location.reload();
			}, 500)
		} else {
			$(".page section").eq(3).fadeOut("slow", function() {
			$(".page section").eq(4).fadeIn("slow");
			$("#progress-bar").css("width","100%");
		});

	}
	});	

}
	/* Fourth page: Get timer selection */
	$('#submit4').click(function() {
		userInfo.push(thisUser);
		storeUser(userInfo);
		setTimeout(function() {
			location.reload();
		}, 500)
		
	});

function storeUser(userInfo) {
	/* localStorage.deleteItem('userInfo'); */
	if(localStorage.getItem('userInfo') === null) {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	} else {
		localStorage.removeItem('userInfo');
		setTimeout(function() {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		}, 500);
	}
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
	goGoGo();
}

			
			function hideGo() {
				$('#overlay').fadeOut("fast");
			}
			
			function goGoGo() {
			/* Initiating values */	
				var num = 10;			
				var step1, step2, step3 = false;
				var skips = {};
				var skipsData = [];
				
			
				$("body").append('<section id="overlay"><article id="cover"><div id="warning"><div id="warning-content"><div id="warning-text"><p>I\'m sorry '+ userInfo[0].name +' but you must complete ' +num+ ' Browsercizes to continue using this site.</p><p><a href="#" id="start" class="goBtn">Start</a>&nbsp;&nbsp;<a href="#" id="skip" class="goBtn">Skip</a>&nbsp;&nbsp;</p><div id="edit"></div></div><div class="clear"></div></div></div><div id="cover-content"></div></article></section>');

				var winHeight = $(window).height();
				var coverHeight = $("#cover").height();
				var topPlace = winHeight - coverHeight - (coverHeight/3);
			
			
				$("#cover-content").css("margin-top", topPlace);
			
				
				$('#skip').click(function() {
					if (localStorage.userInfo) {
						userInfo = localStorage.userInfo;
						userInfo = JSON.parse(userInfo);
						var currentEdit = userInfo.length-1;
						
						skips.skipTime = new Date();
						skipsData.push(skips);
						skipsData = JSON.stringify(skipsData);
						localStorage.skipsData = skipsData;
						
						/* Read-out of how many and when skips take place in the storage */
						if (localStorage.skipsData) {
						skipsData = localStorage.skipsData;
						skipsData = JSON.parse(skipsData);
						for(i = 0; i < skipsData.length; i++) {
							console.log(i + ": " + skipsData[i].skipTime);	
							
						} 
						data.skips = skipsData[skipsData.length-1].skipTime;
						
					}
						data.name = userInfo[currentEdit].name;
						socket.emit('sending name', data);
						console.log(data);
						
					}
					
					setTimeout(function() {
						window.open('','_self',''); 
						window.close();
					}, 500);
						
					/*
					hideGo(); 	
					*/
					
					
				});
				
				$('#edit').mouseover(function() {
					$(this).css({"opacity":"0.5","transition":"opacity 0.3s ease-in-out"});
				}).mouseout(function() {
					$(this).css({"opacity":"1","transition":"opacity 0.3s ease-in-out"});
				}).click(function() {
					hideGo();
					pageLoad();
					editing = true;
					
					
					$(".page section").eq(0).css("display","none");
					$(".page section").eq(1).css("display","block");
						
					
					if (localStorage.userInfo) {
						userInfo = localStorage.userInfo;
						userInfo = JSON.parse(userInfo);
						console.log(userInfo.length);
						
						/* Getting the new editted values */
						var currentEdit = userInfo.length-1;
						$('input#name').val(userInfo[currentEdit].name);

						
						if(userInfo[currentEdit].pushups == true) {
							$("input[value='push ups']").prop('checked', true);
						}
						if(userInfo[currentEdit].stretches == true) {
							$("input[value='stretches']").prop('checked', true);
						}
						
					}
				});
				
				

				$("#warning p a#start").click(function() {
					$("#warning-img").fadeOut(300, function() {
						$(this).remove();
					});
				
					
					$("#warning-text").fadeOut(300, function() {
						$(this).css("width","100%").text("1. Make sure both your feet are placed correctly on the mat.").fadeIn();
					});
					
					//now hold this for __ seconds
					//score-card grays out if the feet are not placed on the mat properly
					
					$("#cover-content").fadeOut(300, function() {
						$("#cover").css("margin-top", "0px");
						$(this).append("<div id='touchCounter'><div class='stretch-count'></div></div><div id='leftFoot'></div><div id='rightFoot'></div>").css({"position":"relative", "margin-top":"150px", "background-image": "none", "width":"382px", "height":"580px", "border":"5px solid white"}).fadeIn();
					});
					
					});
				};
					

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
						$("#warning-text").fadeOut(300, function() {
							$(this).css("width","100%").text("Excellent job!").fadeIn();
					});
						setTimeout(function() {
							$('#overlay').hide("fast");
						}, 2000);
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