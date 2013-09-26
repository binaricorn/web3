/**
 * advanced:
 * make this work offline
 * https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache
 * note: you must edit the manifest to update files
 *
 */



var posts = [];

/**
 * form action
 *
 */



$('#draft button').click( function(event){
    // stop form from trying to send & refresh page
    event.preventDefault();

    // create post from form
    var thisPost = {};
    thisPost.title = $('#title').val();
    thisPost.content = $('#content').val();

    // add post to posts
    posts.push(thisPost);

    console.log('post: ',thisPost);
    console.log('posts: ',thisPost);

    displayPost(thisPost);
    storePosts(posts);

});


/**
 * display posts
 *
 */

function displayPost(thisPost){
    
    var html = '<article><h2>'+ thisPost.title +'</h2><p>'+ thisPost.content +'</p></article>';
    $('#feed').prepend(html);
   
    //I'm guessing the <article> doesn't exist anywhere else other than in this function?
    $("article").click(function() {
		console.log("clicked");
	    $(this).toggleClass("selected");
		});
}



/**
 * store posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be STRINGIFIED
 *          numbers are fine but will be returned as a strong
 *
 */

function storePosts(posts){

    console.log('array: ' + posts);

    // make the array a string
    posts = JSON.stringify(posts);
    console.log('json: ' + posts);

    // store the string
    localStorage.posts = posts;

}



/**
 * localStorage = STRINGS only!!
 *
 * note: localStorage only stores STRINGS
 *  - arrays/objects must be STRINGIFIED before storage, PARSED after retrieval. 
 *  - numbers also: 
 *       var num = localStorage.mynumber;   // '10.123' 
 *           num = parseFloat(num);         // 10.123 
 *           num = parseInt(num);           // 10
 *
 */


/**
 * load posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be PARSED
 *          numbers also: var num = parseInt(); 
 *
 */

function loadPosts(){

    // check for posts in storage
    if (localStorage.posts) { 

        posts = localStorage.posts;

        // turn string into an array
        posts = JSON.parse(posts);

        // loop thru items in the array
        for( i=0, count=posts.length; i<count; i++ ){

            var thisPost = posts[i]
            console.log( thisPost );
            displayPost(thisPost);
        }
    } else { // nothing in storage?
    
        posts = []; 
    
    }

}

// load posts on page load
loadPosts();


/**
 * advanced
 * alternative way to organize your code
 * not currently in use
 */

var app = {
    load : function(){
        if (localStorage.posts) { 
            posts = localStorage.posts;
            posts = JSON.parse(posts);
            for( i=0, count=posts.length; i<count; i++ ){
                var thisPost = posts[i]
                displayPost(thisPost);
            }
        }        
    },
    store : function(posts){
        posts = JSON.stringify(posts);
        localStorage.posts = posts;
    }
}

// app.load();
// app.store(posts);
