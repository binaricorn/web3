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
    event.preventDefault();

    // create post from form
    var thisPost = {};
    thisPost.title = $('#title').val();
    thisPost.content = $('#content').val();

    // add post to posts
    posts.push(thisPost);

    console.log('post: ',thisPost);
    console.log('posts: ',thisPost);
    // post.id = posts.length + 1;
    // Can also try using eq: or .index()
    // Using time of post and store it in .data() ?
   
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


selectPosts();

function storePosts(posts){

    posts = JSON.stringify(posts);
    localStorage.posts = posts;

}



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

loadPosts();

function selectPosts() {
	$("#feed").on('click', 'article', function() {  // Must go after loadPosts() because the DOM does not have any <article>s inside it yet?
	   $(this).toggleClass("selected");
	   
		 
	   if($(this).hasClass("selected")) {
		 selectedPosts.push($(this).attr('id'));
	   } else {
	   	 selectedPosts.splice($.inArray($(this).attr('id'), selectedPosts), 1); 
	   }
	   
	   storeSelected(selectedPosts);
	   
	});
}



    

function storeSelected(selectedPosts) {

	selectedPosts = JSON.stringify(selectedPosts);
	localStorage.selectedPosts = selectedPosts;

}



function displaySelected() {
	if (localStorage.selectedPosts) {
		selectedPosts = localStorage.selectedPosts;
		selectedPosts = JSON.parse(selectedPosts);
		
		for( i=0, count=selectedPosts.length; i<count; i++) {
			$("#" + selectedPosts[i]).addClass("selected");
			
		}
		
	}
}

displaySelected();

/* console.log(selectedPosts); */



	
