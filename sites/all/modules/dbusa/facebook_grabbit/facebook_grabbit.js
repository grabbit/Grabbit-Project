$(document).ready(function() {

	$(document).scrollTo($(document).children(),0);
	
	var stories_at_first = 4;
	var stories_per_slide = 4;
	// save in 'current' the first one
	var current = $('#0').children().next().children().attr('id');
	current = $('#'+current);
	current.slideToggle('medium');
	
	for (var i = 1; i< stories_at_first; i++){
		current = current.next();
		current.show();
	}
	
	// Everything that executes once the page is totally loaded
	$('#0').append('<div class="panel-controller"></a><a class="main-stream-next" href="javascript:void(0)">more</a></div>');
	
	// IMPORTANT: Validate and save these for each panel (further), when using both at the same time, it doesn't work properly
	var document_height;
	var acum_height;
	var stories_per_slide = 3;
	var current_story = '';
	var first_story = '';
	var slide_height_array = new Array();
	var padding = 28; //Padding in pixels by each one, Problems with these because it seems each element (facebook, twitter, news, etc) has different paddings
	
	$('.main-stream-next').click(function(){
		// The story I am focusing the user to read
		//var scroll_to = current.child().next().child().next('.facebook-comment-form');
		var scroll_to = current.next();
		for (var i = 0; i< stories_per_slide; i++){
			current = current.next();
			current.show();
		}
		$(document).scrollTo(scroll_to,2500,{axis:'y'});
	});
	
	$(".facebook-makecomment-link").click(function () {
	  var input = $(this).next("div").children("form").children("input").prev();
		$(this).next("div").slideToggle("medium",function(){
			input.focus();
		});
		$(this).next("div").children("form").children("input").prev().attr("value","");
		
	});

// When user submits a comment in facebook
	$(".facebook_comment_submit").click(function () {
		var tag = $(this);
		var post_id = $(this).attr("id");
		var comment = $(this).prev("input").attr("value");		
		
		$.get(Drupal.settings.basePath+"facebook/comment",{post_id:post_id,comment:comment,mode:"create"},function(data){
	      // Comment has succesfully added and the comment box is hidden again
				if (data){
								//Try grabbit/facebook/getuserinfo?params=first_name,last_name,sex
								//To know the order facebook returns values
								var params = "name,pic_square,profile_url";
								
								$.get(Drupal.settings.basePath+"facebook/getuserinfo",{params:params},function(data1){
									var params_values = data1.split(",");
									var name 				= params_values[0];
									var pic_square 	= params_values[2];
									var profile_url = params_values[3];								
									
									var d = new Date();
									var curr_date 		= d.getDate();
									var curr_day 			= d.getDay();
									var curr_month 		= d.getMonth();
									var curr_year 		= d.getFullYear();
									var curr_hour 		= d.getHours();
									var curr_minutes 	= d.getMinutes();													
								
									var date 		= curr_date+", "+curr_month+"/"+curr_day+"/"+curr_year+" - "+ curr_hour+":"+curr_minutes;
									var comment = tag.prev("input").attr("value");
									
									var new_content 	= '<div id="'+data+'" class="facebook-comments" style="display:none"><a target="_blank" title="'+name+'" class="facebook-story-pic" href="'+profile_url+'"><span class="facebook-user-pic"><img class="facebook-image-s" alt="'+name+'" src="'+pic_square+'" width="30"/></span></a>';
									    new_content  += '<span class="facebook-comment-timeline"><a target="_blank" title="'+name+'" class="facebook-comment-link" href="'+profile_url+'">'+name+'</a> commented on '+date+'</span>';
											new_content  += '<span class="facebook-comment-text">'+comment+'</span><br /><span><a id="facebook-comment-delete-'+data+'" class="facebook-comment-delete" href="javascript:void(0)">delete comment</a></span></div></div>';
									
									// Add the new comment								
									tag.closest("div").parent().prev().append(new_content);
									var id = data;
									
									// Add the new handler to jQuery using live() function
									$('#facebook-comment-delete-'+data).live('click',function(){
										var tag = $(this).parent().parent();
										var post_id = id;
										
										$.get(Drupal.settings.basePath+"facebook/comment",{post_id:post_id,mode:"delete"},function(data){
												// Comment has been deleted
												if (data){
													tag.slideUp('medium',function(){
														tag.remove();
													});		
												}else{
														// An error has occurred, catch it depending on the incoming design
												}
										});	
									});
									
									// Reset comment textbox
									tag.prev("input").attr("value","");
									tag.prev("input").focus();
									// Call a funcion to extend the stream and enable the new comment
									tag.closest("div").parent().prev().children("#"+data).slideToggle('medium');						
								});								
				}else{
								alert ("There was a connection problem. Try later");
				}
    });
	});
		
	$(".facebook-comment-delete").click(function () {
		var tag = $(this).parent().parent();
		var post_id = tag.attr("id");
		
		$.get(Drupal.settings.basePath+"facebook/comment",{post_id:post_id,mode:"delete"},function(data){
	      // Comment has been deleted
				if (data){
					tag.slideToggle('medium');																				
				}else{
						// An error has occurred, catch it depending on the incoming design
				}
    });
	});
	
	
	$(".twit-reply").click(function () {
	  var to = $(this).attr("id"); 
	  $("#edit-status").val(to);
	  $("#edit-status").focus();
	});		
	
	$(".twitter_favorite").click(function () {
	  var id = $(this).attr("id"); //post_id
	  var tag = $(this);
	  
	  if (tag.text() == "Add to favorites"){
	    tag.text("Adding to favorites...");
	    $.get(Drupal.settings.basePath+"twitter/addfavorite",{id:id,mode:"create"},function(data){
	      //Successfully added to favorites
	      //Testing if it works
				if (data){
								tag.text("Remove from favorites");
				}else{
								alert ("There was a connection problem. Try later");
				}
	    });
	  }
	  else{ //Remove from favorites
	  tag.text("Removing from favorites...");
	    $.get(Drupal.settings.basePath+"twitter/addfavorite",{id:id,mode:"destroy"},function(data){
	      //Successfully removed from favorites
	      //Testing if it works
				if (data){
								tag.text("Add to favorites");		
				}else{								
								alert ("There was a connection problem. Try later");
				}
	    });		    
	  }  		  
	});
});