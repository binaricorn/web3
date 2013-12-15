var http = require('http');
var util = require('util');
var fs = require('fs');
var Twit = require('twit');
var connect = require('connect');

var T = new Twit({
    consumer_key:         'XoYdXmSJ9Ti1AnISjgYtSg',
    consumer_secret:      'pVRJhpIqIohe0bC50hMVL2DxDHxVNLxn52s1WqTqGyM',
    access_token:         '18158426-tKpdoYiCwdbWOtlJRIbDNOlcX2AkLuDHKjMGVHdem',
    access_token_secret:  'nukr1QU7oYEjY3WNJHFI8e59c0r2yFawLIT2lRbR6AbTU'
});


var binaricornLines = [];
var FeiLiuNLPLines = [
	" sorry ",
	" Robust finite-time estimation of Markovian jumping systems with bounded transition probabilities ",
	" apologise ",
	" Average waiting time of customers in a new queue system with different classes. ",
	" remember ",
	" Computer-aided 3D human modeling for portrait-based product development using point- and curve-based deformation ",
	" forget ",
	" Bayesian method for state estimation of batch process with missing data.",
	" dream ",
	" Parameter estimation in batch process using EM algorithm with particle filter",
	" perhaps ",
	" Acceleration of Early-Photon Fluorescence Molecular Tomography with Graphics Processing Units. ",
	" Recent developments in the organization goals conformance using ontology. ",
	" name ",
	" everyone ",
	" always ",
	" Input Space Partitioning for Neural Network Learning ",
	" alike ",
	" like ",
	" Queuing system for different classes of customers ",
	" different ",
	" Dynamical consensus seeking of heterogeneous multi-agent systems under input delays. ",
	" can ",
	"  Modeling of pure percussive drilling for autonomous robotic bridge decks rehabilitation. ",
	" because ",
	" Document Summarization via Guided Sentence Compression. ",
	" sorry ",
	" A Participant-based Approach for Event Summarization Using Twitter Streams. ",
	" apologise ",
	" Protection through Intelligent and Multimedia Captchas.",
	" Irregular community discovery for cloud service improvement.",
	" remember ",
	" forget ",
	" Improving Wireless Security for Bidirectional Communication Scenarios.",
	" HealthyLife: An Activity Recognition System with Smartphone Using Logic-Based Stream Reasoning. ",
	" dreamt ",
	" dream ",
	" perhaps ",
	" An efficient method for unfolding colored Petri nets. ",
	"  Robust finite-time control for a class of extended stochastic switching systems. ",
	" everyone ",
	" always ",
	" Insertion, Deletion, or Substitution? Normalizing Text Messages without Pre-categorization nor Supervision.",
	" alike ",
	" like ",
	" different ",
	" can ",
	" because ",
	" sorry ",
	" apologise ",
	" remember ",
	" forget ",
	" dreamt ",
	" dream ",
	" perhaps ",
	" Creation of Different Groundwater Conditions and Acclimation of Chlorinated Carbons Degradation Microorganisms.",
	" everyone ",
	" always ",
	" alike ",
	"  Learning from Chinese-English Parallel Data for Chinese Tense Prediction.",
	" like ",
	" different ",
	" can ",
	" because ",
	" sorry ",
	" apologise ",
	" remember ",
	" forget ",
	" dreamt ",
	" dream ",
	" perhaps ",
	" name ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" can ",
	" because "
];
var binaricornElizaLines = [
	" I'm sorry ",
	" I apologise ",
	" I remember ",
	" I forget ",
	" I dreamt ",
	" I had a dream ",
	" perhaps ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" I can ",
	" I'm sorry ",
	" I apologise ",
	" I remember ",
	" I forget ",
	" I dreamt ",
	" I had a dream ",
	" perhaps ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" I can ",
	" I'm sorry ",
	" I apologise ",
	" I remember ",
	" I forget ",
	" I dreamt ",
	" I had a dream ",
	" perhaps ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" I can ",
	" I'm sorry ",
	" I apologise ",
	" I remember ",
	" I forget ",
	" I dreamt ",
	" I had a dream ",
	" perhaps ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" I can ",
	" I'm sorry ",
	" I apologise ",
	" I remember ",
	" I forget ",
	" I dreamt ",
	" I had a dream ",
	" perhaps ",
	" everyone ",
	" always ",
	" alike ",
	" like ",
	" different ",
	" I can "
	
	
	
];
var FeiLiuJewelleryLines = [];

// This is the syntax for Heroku to understand what port is requested
var port = process.env.PORT || 5000;

var app = connect.createServer(
	connect.static(__dirname + "/public")
).listen(port);

util.log("server running at port: " + port);

var io = require("socket.io").listen(app);
// if .listen() is set to another port then that means the socket is listening on another port...

var onlineUser = [];

io.sockets.on('connection', function(socket) {
	
	T.get('statuses/user_timeline', { screen_name: 'LiuYiFeiOff', exclude_replies:'true', include_rts:'0', count:'200' },  function (err, reply) {
	  for (i = 0; i < 50; i ++ ) {
	  		reply[i].text = reply[i].text.replace(/#|@([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function($0) { return ""; });  //Replacement for var regexp = new RegExp('#|@([^\\s]*)','g'); which removes # and @s
	  		reply[i].text = reply[i].text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function($0) { return ""}); // Removes urls in their entirety
			// need to select random text
		    binaricornLines.push(reply[i].text);
		    
		    if(i < binaricornElizaLines.length) {
		  		binaricornLines.push(binaricornElizaLines[i]);	  
		  	}
	  }
	});
	
	T.get('statuses/user_timeline', { screen_name: 'binaricorn', exclude_replies:'true', include_rts:'0', count:'200' },  function (err, reply) {

	 for (i = 0; i < 50; i ++ ) {
      reply[i].text = reply[i].text.replace(/#|@([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function($0) { return ""; });  //Replacement for var regexp = new RegExp('#|@([^\\s]*)','g'); which removes # and @s
      reply[i].text = reply[i].text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function($0) { return ""}); // Removes urls in their entirety     		
	  FeiLiuJewelleryLines.push(reply[i].text);
	  
		  if(i < binaricornElizaLines.length) {
		  	FeiLiuJewelleryLines.push(binaricornElizaLines[i]);	  
		  }
	   
	}
	  	  
	});
	
	socket.emit("tweets", {binaricornLines: binaricornLines, FeiLiuJewelleryLines: FeiLiuJewelleryLines, FeiLiuNLPLines: FeiLiuNLPLines});

	
	
});