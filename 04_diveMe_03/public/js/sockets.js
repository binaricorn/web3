window.onload = function() {
	var socket = io.connect(window.location.hostname);
	
	// initialize with argument 'true': no random choices
	var eliza = new ElizaBot(true);
	var exampleCursor=0;
	var typePlace = 0;
	var readingText = false;
	
	// Create array to store all the Fei objects, for looping through
	var totalFeis = [];
	
	var userinput;

	// Identify all the characters of each Fei	
	var feiDesigner = {
		'title' : 'Fei Liu, the Designer',
		'id': 'fei-designer',
		'cache' : {
			'_start': []
		},
		'lines' : []
	},
	feiJeweler = {
		'title' : 'Fei Liu, the Jeweler',
		'id': 'fei-jeweler',
		'cache' : {
			'_start': []
		},
		'lines' : []
	},
	feiNLP = {
		'title' : 'Fei Liu, Natural Processing Specialist',
		'id': 'fei-nlp',
		'cache' : {
			'_start': []
		},
		'lines' : []
	};
	
	
	
	
	
	
	// Push all the objects into the larger totalFeis array
	totalFeis.push(feiDesigner);
	totalFeis.push(feiJeweler);
	totalFeis.push(feiNLP);
	
	// Look through each Fei
		for (i = 0; i < totalFeis.length; i++) {
			
			// Appending Fei clones to page
			$('#fei-clone').clone().appendTo('#content');
			
			// Change each cloned and appended fei-clone's to their respective divs
			$('#fei-clone').eq(0).attr('id',totalFeis[i].id);
		}
		
	
	socket.on("tweets", function(data) {
		
		for (i = 0; i < data.binaricornLines.length; i++) {
			feiDesigner.lines.push(data.binaricornLines[i]);
		}
		
		for (i = 0; i < data.FeiLiuJewelleryLines.length; i++) {
			feiJeweler.lines.push(data.FeiLiuJewelleryLines[i]);
		}
		
		for (i = 0; i < data.FeiLiuNLPLines.length; i++) {
			feiNLP.lines.push(data.FeiLiuNLPLines[i]);
		}
		
		feiDesigner.lines = feiDesigner.lines.join("");
		feiJeweler.lines = feiJeweler.lines.join("");
		feiNLP.lines = feiNLP.lines.join("");
		
		var choice;
	
	
		$('input#submit').click(function() {
			choice = $("input#choice").val();
			if(choice == 'j') {
				$('#' + totalFeis[0].id).fadeIn(20);
				$('#' + totalFeis[0].id + ' > #out').append('<p>Waiting for user to join...</p>');
				getTextInAndPass(0);	
				
			}	
			if(choice == 'k') {
				$('#' + totalFeis[1].id).fadeIn(20);
				$('#' + totalFeis[1].id + ' > #out').append('<p>Waiting for user to join...</p>');
				getTextInAndPass(1);	
			}
			
			if(choice == 'e') {
				$('#' + totalFeis[2].id).fadeIn(20);
				$('#' + totalFeis[2].id + ' > #out').append('<p>Waiting for user to join...</p>');
				getTextInAndPass(2);	
			} 
			
		
		});
		
		$('input#submit').keydown(function(e) {
			if(e.keyCode == 13) {
				$('#input#submit').trigger('click');
			}
		});
		$('#fei-clone').remove();
		
		function getTextInAndPass(attr) {
		var currentWord = '_start';
			var str = '';
			
			//var text = $('#' + totalFeis[attr].id + ' > #in').text();
			var text = totalFeis[attr].lines;
			text = text.split(/\s+/g);

			if (!text.length) return;
			
			// Set the text from each Fei input to the right Fei object
			totalFeis[attr].cache._start.push(text[0]);
			
			
			for (var i = 0; i < text.length - 1; i++) {
		        if (!totalFeis[attr].cache[text[i]]) totalFeis[attr].cache[text[i]] = [];
		        
		        totalFeis[attr].cache[text[i]].push(text[i + 1]);
		        
		        // If it's the beginning of a sentence, add the next word to the start node too
		        if (text[i].match(/\.$/)) totalFeis[attr].cache._start.push(text[i + 1]);
		        
		        
		    }
		    
		    // Generate 300 words of text
		    for (var i = 0; i < 200; i++) {
		        
		        // Follow a random node, append it to the string, and move to that node
		        var rand = Math.floor(Math.random() * totalFeis[attr].cache[currentWord].length);
		        str += totalFeis[attr].cache[currentWord][rand];
		        
		        // No more nodes to follow? Start again. (Add a period to make things look better.)
		        if (!totalFeis[attr].cache[totalFeis[attr].cache[currentWord][rand]]) {
		            currentWord = '_start';
		            if (!totalFeis[attr].cache[currentWord][rand].match(/\.$/))
		                str += '. ';
		            else
		                str += ' ';
		        } else {
		            currentWord = totalFeis[attr].cache[currentWord][rand];
		            str += ' ';
		        }     
		    }
		    // Split up the post-Markov text by punctuation
		    str = str.replace(/\.\s+/g,'.|').replace(/\?\s/g,'?|').replace(/\!\s/g,'!|').split("|");

		setInterval(function() {
			elizaNext(str, attr);	
		}, 10000);
		
	};
		
		// Without ticker-tape effect
		function elizaNext(str, attr) {
			
			readingText = true;
		
			
			if (readingText == true) {
				userinput = str[exampleCursor++];
				$('#' + totalFeis[attr].id + ' > #out').append('<p>FEI > ' + userinput + '</p>');
				setTimeout(function() {
					$('#' + totalFeis[attr].id + ' > #out').append('<p>ELIZA > ' + eliza.transform(userinput) + '</p>');		
				}, 5000);
			}
				
	}
	});
	
	
	

}
