$(document).ready(function() {
	$(".facebook-makecomment-link").click(function () {
	  $(this).next("div").slideToggle("slow");
		$(this).next("div").children("form").children("input").prev().attr("value","");
		$(this).next("div").children("form").children("input").prev().focus();
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
									
									$('#facebook-comment-delete-'+data).live('click',function(){
										var tag = $(this).parent().parent();
										var post_id = id;
										
										$.get(Drupal.settings.basePath+"facebook/comment",{post_id:post_id,mode:"delete"},function(data){
												// Comment has been deleted
												if (data){
													tag.slideToggle("slow");																						
												}else{
														// An error has occurred, catch it depending on the incoming design
												}
										});	
									});
									
									// Reset comment textbox
									tag.prev("input").attr("value","");
									tag.prev("input").focus();
									
									// Slide the new comment to make it invisible, it is missing to remove it (Performance issue)
									tag.closest("div").parent().prev().children("#"+data).slideToggle("slow");										
								});								
				}else{
								tag.prev("input").attr("value","There was a connection problem. Try later");
				}
    });
	});
		
	$(".facebook-comment-delete").click(function () {
		var tag = $(this).parent().parent();
		var post_id = tag.attr("id");
		
		$.get(Drupal.settings.basePath+"facebook/comment",{post_id:post_id,mode:"delete"},function(data){
	      // Comment has been deleted
				if (data){
					tag.slideToggle("slow");																						
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