// JavaScript Document
$(function() {
		$( "#tabs" ).tabs({
		});
});

$( "#create, #search, #remind, .shelf_space" ).click(function() {
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
	$( "#window" ).css("height", "500px").show("clip",{},'fast');
	document.getElementById( 'window' ).innerHTML = '<iframe src="create.html" scrolling="yes" frameborder="0" width="900px" height="100%"></iframe>';
});

$( "#search" ).click(function() {
	var new_window = '<div id="window"></div>';
	$( "#topContent" ).before(new_window);
	$( "#window" ).css("z-index", 100);
	$( "#window" ).css("height", "500px").show("clip",{},'fast');
	document.getElementById( 'window' ).innerHTML = '<iframe src="search.html" scrolling="yes" frameborder="0" width="900px" height="100%"></iframe>';
});

$(" #remind ").click(function(){
	var new_window = '<div id="window"></div>';
	$( "#topContent" ).before(new_window);
	$( "#window" ).css("z-index", 100);
	$( "#window" ).css("height", "500px").show("clip",{},'fast');
	document.getElementById( 'window' ).innerHTML = '<iframe src="remind.html" scrolling="yes" frameborder="0" width="900px" height="100%"></iframe>';
});

/*$(  "td" ).mouseover(function() {
	$(this).addClass( 'closet_mouseover' );
});

$(  "td" ).mouseout(function() {
	$(this).removeClass( 'closet_mouseover' );
});*/
$( "#new_cloth" ).live("mouseover", function(){ $(this).draggable(); });

$( ".shelf_space" ).droppable({
	hoverClass: "cloth_on",
	drop: function( event, ui ) {
		//console.log($(this).attr('id'));
		$("#new_cloth").hide("scale", {percent: 0}, 500);//.hide("slow"); //.remove()
		$.ajax({
			url: "/cloths/drop_method",
			data: { shelf: $(this).attr('id') }
		});/*.done(function ( data ) {
		  	if( console && console.log ) {
			    console.log("Sample of data:", data.slice(0, 100));
	  		}
		});*/
	}
});



/*$(" #settings ").click(function(){
/*	var isResizable = $('.shelf_space').resizable('option', 'disabled');
    if(isResizable)*/
//		$( ".shelf_space" ).resizable({ grid: 50 });
	/*}
	else{
		$( ".shelf_space" ).resizable({ disabled: true });
	}*/
//});

$( ".shelf_space" ).click(function(){
	$.ajax({
		url: "/cloths/browse_method",
		data: { shelf: $(this).attr('id') },
		success: function(data){
		 	var new_window = '<div id="window"></div>';
			$( "#topContent" ).before(new_window);
			$( "#window" ).css("z-index", 100);
			$( "#window" ).css("height", "500px").show("clip",{},'fast');
			document.getElementById( 'window' ).innerHTML = '<iframe src="browse.html" scrolling="yes" frameborder="0" width="900px" height="100%"></iframe>';
		 	console.log("yabi");
		}

	});
	
});

$( ".signal" ).click(function(){
	var now;
	var changeTo;
	if(($(this).attr('class')).search("lightAvailable") != -1)
	{
		now = "lightAvailable";
		changeTo = "lightNotAvailable";
	}
	else
	{
		now = "lightNotAvailable";
		changeTo = "lightAvailable";
	}
	
	$.ajax({
		context: this,
		url: "/cloths/switch",
		data: { id: $(this).attr('title'), changeTo: changeTo },
		success: function(data){
		 	$(this).switchClass(now, changeTo);
		 	//$(this).removeClass(now);
		 	//$(this).addClass(changeTo, 1000);
		 	console.log("yabi");
		},
		error: function(data){
			console.log("QQ");
		}
	});
	
});

window.onload = function() {
   document.getElementById("siteLoader").style.display = "block";
   document.getElementById("container").style.display = "block";
}
