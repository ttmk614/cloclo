// JavaScript Document
$( "#logo" ).click(function(){
	window.location = "/";
});

$( "#login_f" ).click(function(){
	window.location = "/login";
});

$(function() {
		$( "#tabs" ).tabs({
		});
});

$( "#create, #search, #remind, .shelf_browse" ).live("click",function() {
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

var count = 0;
$( "#set" ).click(function(){
	if (count == 0){
		$( '.shelf_space' ).switchClass("shelf_browse", "shelf_set", 0);
	//$( this ).
		$( "#set" ).text("　＝　Done");
		count = 1;
		$( '.shelf' ).css( "background-color", "#debd8c" );
		//$( '.shelf_space' ).css( "background-color", "#f3d197" );
		//$( '.shelf_space' ).css( "border", "5px solid #debd8c" );
	}
	else {
		$( '.shelf_space' ).switchClass( "shelf_set","shelf_browse", 0);
		$( "#set" ).text("　＝　Set");
		count = 0;
		$( '.shelf' ).css( "background-color", "#D08D34" );
	}
});

$( '.shelf_set' ).live("click", function(){
	var id = $(this).attr('id');
	temp = '<span id="text"><textarea id="remark" class="des_area_small" name="description" width="400px"></textarea><br><button id="red_submit" title="'+id+' type="button" >送出資料</button></span>';
	
	var n = window.prompt("更改格子名稱為?", "");
	//alert(n);
	$.ajax({
		context: this,
		url: "/home/shelf_set",
		data: { id: id, content: n },
		success: function(data){
		 	//$(this).switchClass("lightAvailable", "lightNotAvailable", 0);
		 	location.reload();
		 	console.log("yabi");
		},
		error: function(data){
			console.log("QQ");
		}
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
	document.getElementById( 'window' ).innerHTML = '<iframe src="create.html" scrolling="no" frameborder="0" width="900px" height="100%"></iframe>';
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

$( ".shelf_browse" ).live("click",function(){
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
/*
$( ".lightAvailable" ).click(funciton(){
	$.ajax({
		context: this,
		url: "/cloths/switch",
		data: { id: $(this).attr('title'), changeTo: "lightNotAvailable" },
		success: function(data){
		 	$(this).switchClass("lightAvailable", "lightNotAvailable", 0);
		 	console.log("yabi");
		},
		error: function(data){
			console.log("QQ");
		}
	});

});

$( ".lightNotAvailable" ).click(funciton(){
	$.ajax({
		context: this,
		url: "/cloths/switch",
		data: { id: $(this).attr('title'), changeTo: "lightAvailable" },
		success: function(data){
		 	$(this).switchClass("lightNotAvailable", "lightAvailable", 0);
		 	console.log("yabi");
		},
		error: function(data){
			console.log("QQ");
		}
	});
});*/
$( ".signal" ).click(function(){
	var id = $(this).attr('title');
	if(($(this).attr('class')).search("lightAvailable") != -1)
	{
		temp = '<span id="text"><textarea id="remark" class="des_area_small" name="description" width="400px"></textarea><br><button id="red_submit" title="'+id+' type="button" >送出資料</button></span>';
		$.ajax({
			context: this,
			url: "/cloths/switch",
			data: { id: id, changeTo: "lightNotAvailable" },
			success: function(data){
			 	$(this).switchClass("lightAvailable", "lightNotAvailable", 0);
			 	console.log("yabi");
			},
			error: function(data){
				console.log("QQ");
			}
		});

		$("#text").remove();
		$( this ).parent().append(temp);

		$( "#red_submit" ).click(function(){
			$.ajax({
				context: this,
				url: "/cloths/red_mark",
				data: { id: $(this).attr('title'), content: document.getElementById('remark').value },
				success: function(data){
				 	console.log(data);
				 	$("#text").remove();
				},
				error: function(data){
					console.log("QQ");
				}
			});
		});
	}
	else
	{
		$("#text").remove();
		$.ajax({
			context: this,
			url: "/cloths/switch",
			data: { id: id, changeTo: "lightAvailable" },
			success: function(data){
			 	$(this).switchClass("lightNotAvailable", "lightAvailable", 0);
			 	console.log("yabi");
			},
			error: function(data){
				console.log("QQ");
			}
		});
	} 
	
});

$( ".remind_signal" ).click(function(){
	var id = $(this).attr('title');
	if(($(this).attr('class')).search("lightAvailable") == -1)
	{
		$.ajax({
			context: this,
			url: "/cloths/switch",
			data: { id: id, changeTo: "lightAvailable" },
			success: function(data){
			 	$(this).switchClass("lightNotAvailable", "lightAvailable", 0);
			}
		});
		$(this).parent().remove();
	} 	
});


/*
window.onload = function() {
   document.getElementById("siteLoader").style.display = "block";
   document.getElementById("container").style.display = "block";
}*/
