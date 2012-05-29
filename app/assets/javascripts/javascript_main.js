// JavaScript Document
$(function() {
		$( "#tabs" ).tabs({
		});
});

$( "#create, #search" ).click(function() {
	var new_shadow = '<div id="shadow"></div>';
	$( "#topContent" ).before(new_shadow);
	$( "#shadow" ).css("height", $(document).height());  
	$( "#shadow" ).css("z-index", 90);
	$( "#shadow" ).css("display", "block");

	$( "#shadow" ).click(function(){  
    var sha = parent.document.getElementById("shadow");
	sha.parentNode.removeChild(sha);
	var win = parent.document.getElementById("window");
	win.parentNode.removeChild(win);
	});
});

$( "#close" ).click(function(){  
    var sha = parent.document.getElementById("shadow");
	sha.parentNode.removeChild(sha);

	var win = parent.document.getElementById("window");
	win.parentNode.removeChild(win);

    //$( "#shadow" ).css("height", 0);  
	//$( "#shadow" ).css("z-index", -100);
	//$( "#window" ).css("height", 0);  
	//$( "#window" ).css("z-index", -100); 

	//alert('Handler for .submit() called.');
	document.getElementById("new_cloth").style.display='block';
});

/*$( ".submit_all" ).click(function(){
	  alert('Handler for .submit() called.');
 
  
    $( "#shadow" ).css("height", 0);  
	$( "#shadow" ).css("z-index", -100);
	$( "#window" ).css("height", 0);  
	$( "#window" ).css("z-index", -100); 

	$( "#new_cloth").style.display='block';
	
});*/

$( "#create" ).click(function() {
	var new_window = '<div id="window"></div>';
	$( "#topContent" ).before(new_window);
	$( "#window" ).css("z-index", 100);
	$( "#window" ).css("height", "330px").show("clip",{},'fast');
	document.getElementById( 'window' ).innerHTML = '<iframe src="create.html" scrolling="yes" frameborder="0" width="900px" height="100%"></iframe>';
});

/*$(  "td" ).mouseover(function() {
	$(this).addClass( 'closet_mouseover' );
});

$(  "td" ).mouseout(function() {
	$(this).removeClass( 'closet_mouseover' );
});*/

$( "#new_cloth" ).draggable();
$( ".shelf_space" ).droppable({
	hoverClass: "cloth_on",
	drop: function( event, ui ) {
		$("#new_cloth").hide("scale", {percent: 0}, 500);//.hide("slow"); //.remove()
	}
});



$(" #settings ").click(function(){
/*	var isResizable = $('.shelf_space').resizable('option', 'disabled');
    if(isResizable)*/
		$( ".shelf_space" ).resizable({ grid: 50 });
	/*}
	else{
		$( ".shelf_space" ).resizable({ disabled: true });
	}*/
});

$( "#submit_cloth" ).click(function(){
	//var ifr = parent.document.getElementById("create_iframe");
	//ifr.parentNode.removeChild(ifr);
	/*var sha = parent.document.getElementById("shadow");
	sha.parentNode.removeChild(sha);

	var win = parent.document.getElementById("window");
	win.parentNode.removeChild(win);*/
});