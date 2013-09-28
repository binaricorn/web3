/**
 * advanced:
 * make this work offline
 * https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache
 * note: you must edit the manifest to update files
 *
 */



var posts, selectedPosts = [];
var postId = 0;

/**
 * form action
 *
 */



$('#draft button').click( function(event){
    // stop form from trying to send & refresh page
   /*  event.preventDefault(); */

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
    
    
    var html = '<article id=postId' + postId + '><h2>'+ thisPost.title +'</h2><p>'+ thisPost.content +'</p></article>';
    $('#feed').prepend(html);
   
    postId ++;
    
    
}





function storePosts(posts){

    console.log('array: ' + posts);

    // make the array a string
    posts = JSON.stringify(posts);
    console.log('json: ' + posts);

    // store the string
    localStorage.posts = posts;

}



/*
function storeSelected(selectedPosts) {
	selectedPosts
}
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

// Must go after loadPosts() because the DOM does not have any <article>s inside it yet?
$("article").click(function() { 
	   $(this).toggleClass("selected");
	   
	   if($(this).hasClass("selected")) {
		 selectedPosts.push($(this).attr('id'));
	   } else {
	   	 //removes $(this) element's id from the array	
	   	 selectedPosts.splice($.inArray($(this).attr('id'), selectedPosts), 1); 
	   }
	   
	   console.log(selectedPosts);
    });

/*
function storeSelected() {
	selectedPosts = JSON.stringify(selectedPosts);
	localStorage.selectedPosts = selectedPosts;
}
*/


  /*
 $(this).toggleClass("selected");
   if($(this).hasClass("selected")) {
	    // console.log($(this).attr('id') + " has class selected"); 
	    selectedPosts.push($(this).attr('id'));
	    console.log(selectedPosts);
	   //     storeSelected(selectedPosts);
   }
*/
   
/* }); */
	

	
