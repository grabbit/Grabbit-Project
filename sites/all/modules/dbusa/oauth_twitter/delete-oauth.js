Drupal.behaviors.grabbitDeleteTwitter = function (context) {

  $('.views-field-action-link-requestee a').click(function(elem){
	jConfirm("Do you really want to remove your twitter account on grabbit? This action cannot be undone.", 'Remove account',function(confirm){
	if(confirm==false){
	  return 0;	// return empty 
	}
	panel=12345;
	$('.views-field-action-link-requestee').html('<img src="'+Drupal.settings.basePath+'sites/all/modules/dbusa/facebook_grabbit/working.gif"> Removing... this may take several minutes, do not close this window. please wait...');
	$.get(Drupal.settings.basePath+"twitter/remove",{panel:panel},function(data){
		if (data){
			$('.views-field-action-link-requestee').html('Your twitter account has been removed');
			return false;
		}else{
			$('.views-field-action-link-requestee').html('There was a problem connecting to the server, please try again latter');
			return false;
		}
     });
	
    });
  });


};