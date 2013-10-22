var fs = require( "fs" );
var url = require( "url" );
var io = require('socket.io');

// Initialize a REST client in a single line:
var client = require('twilio')('AC2a00c102356a809f11d7d5db0dbdb77d','c21abe3d71181b2409877728886f9b54');

var myPhone = '+15103585332';
var twilioPhone = '+17066863423';



/* Create the server in the port 9000 */
var http = require( "http" ).createServer(function ( req, res ) {
		var request = url.parse( req.url, false );
		var filename = request.pathname;

		if ( filename == "/" )
			filename = "/index.html";

		/* Append the frontend folder */
		filename = 'frontend' + filename;

		fs.readFile( filename, function ( err, data ) {
			/* Any error on reading the file? */
			if ( err ) {
				if ( err.errno == 34 )  // File not found
					res.writeHead( 404 );
				else
					res.writeHead( 500 );
				res.end();
				return;
			}

			res.writeHead( 200 );
			res.write( data );
			res.end();
		} );
	}
).listen( 9000 );



var socketServer = io.listen( http );
/* io */

socketServer.set('log level', 1);

socketServer.sockets.on( "connection", function ( socket ) {
	// On a new Socket.io connection, load the data provider we want. For now, just Arduino.
	var $provider = require( './providers/arduino.js' ).init( socket );
	
	socket.on("sending name", function(data) {
		console.log(data);
		client.sendSms({ 
			to: myPhone,
			from: twilioPhone,
			body: data.name + ' skipped his/her Browsercize at ' + data.skips + ' .'
		}, function(error, message) {
			if (!error) {
				console.log('Success! The SID for this SMS message is:');
				console.log(message.sid);
				
				console.log('Message sent on:');
				console.log(message.dateCreated);
			} else {
				console.log('Oops! There was an error.');
			}
		});

	});
} );

