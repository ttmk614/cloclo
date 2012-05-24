// JavaScript Document
$(function() {
		$( "#tabs" ).tabs({
		});
});

$( "#create" ).click(function() {
	//$( "#shadow" ).addClass( 'darken' );
	$( "#shadow" ).css("height", $(document).height());  
});

$(  "td" ).mouseover(function() {
	$(this).addClass( 'closet_mouseover' );
});

$(  "td" ).mouseout(function() {
	$(this).removeClass( 'closet_mouseover' );
});

$( "#new_cloth" ).draggable();
$( ".shelf_space" ).droppable({
	drop: function( event, ui ) {
		$("#new_cloth").hide("slow"); //.remove()
	}
});