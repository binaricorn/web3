<?php include('../header_other.php');?>



			
			<ul>
				<div>
				<h2>Browsercize</h2>
				<li><iframe src="//player.vimeo.com/video/63757336?title=0&amp;byline=0&amp;portrait=0" width="700" height="394" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
					
				<div class="portfolio-content">
					
					<p class="excerpt">A system which forces its user to make healthy lifestyle choices in order to properly operate the web browser.</h3></p>
						<p class="skills">Skills: Arduino, NODEjs, Chrome Extensions</p>
						<p class="update">Update: This project was recently shown at MakerFaire.</p>
						
						<p>In a previous blog post I wrote about how I setup communication between Arduino and Node.js. Since then I’ve completed the first prototype of the Browsercize Mat and the software (Node, Chrome Extensions) that goes with it. I will be moving onto the next iteration of this project and might even scrap the whole Node part of it in favor of using a HTTP proxy. Will investigate further. Here I’ll give a quick break down of how it all came together (apologies for the low-res iPhone photos). 
						
<h3>1. Browsercize Mat + Arduino</h3> 

<p>This mat is made out of 4 Velostat and tin foil pressure sensors connected to the Arduino analog input pins. The Arduino then reads the input and Serialprint the values to the serial port, for the Node to pick up.</p>

<h3>2. Node + Javascript</h3>

<p>I continued to modify Dan Dvorkin’s Etch-a-Sketch code from where I left off on the previous post, this time adding the ability to read in all 4 inputs from the Arduino. I then wrote an if statement, making sure that the back 2 sensors (where the feet will go) are being pressed down before checking the front 2. Only if all 4 are pressed down does the counter on the website (right now set to 10) reduce. Once the counter is at 0, then the block lifts from the page and its business as usual. I used jQuery replaceWith() to replace the value of the stretch counter each time we have detected a new toe-touch. Right now if someone keeps proper contact with the board for a couple seconds, they could lift the block without doing toe-touches the “right” way- touching toes, raising body back up, touching toes again, etc. I”m also not convinced that this is the best stretch for desk-dwellers. These are all things that came up during my critique and user testing sessions and I will improve upon them in the next iteration.</p>

<h3>3. Chrome extensions</h3> 

<p>Right now there are some repetition in my files that I need to sort out.</p>
				</div>

				</li>
				<div class="clear"></div>
				</div>
				
								
				
				
				
			



<?php include('../footer.php');?>
