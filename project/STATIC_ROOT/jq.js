$(document).ready(function(){
						   
	$("div").bind("mouseover", function(){
		$(this).css({"background-color":"#FAFFEA",cursor:"pointer"});	
		
	}).bind("mouseout", function(){
		$(this).css("background-color", "");		
	});

});
