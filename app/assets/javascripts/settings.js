$( ".afriend" ).click(function() {
	if( !$(this).children("input[name=checkable]").is(':checked') ){
		$(this).children(".check").addClass("checked").removeClass("check");
		$(this).children("input[name=checkable]").attr("checked", true);

	}
	else{
		$(this).children(".checked").addClass("check").removeClass("checked");
		$(this).children("input[name=checkable]").attr("checked", false);		
	};
	
});

$("#friends").click(function() {

	var list = new Array();
	$("input[name=checkable]").each( function(){ 
		if(this.checked == true ){
			list.push(this.value);
		}
	});
	//console.log("list:" + list.join());

	$.ajax({
		type : "GET",
		url  : "/editfriend",
		data : { editfriend : list },
		dataType: 'text',
		success : function(friendlist){
			console.log("recall:"+ friendlist );
			console.log('Edit completed');
		},
		error : function(){
			console.log( 'something wrong happened' );
		}
	}).done(function(){
			//console.log("complete!");
	});
//console.log(list);
});


/* ******************************************************* */
$("#sendPost").click(function() {

	//console.log("content:" + $("#postContent").val());

	$.ajax({
		type : "GET",
		url  : "/post/new",
		data : { account: $("#sendPost").attr("class") , 
				 content: $('#postContent').val() },
		dataType: 'json',
		success : function(response){
			 console.log("response:"+ response ); 
			var output = "<div class='mutton'><div class='aPost'><img src='https://graph.facebook.com/"+ $(".aPost").first().attr("id") + "/picture' />"+ $(".aPost").first().children(".postName").text() + "<br /><a class='postContent'>"+ response['content'] +"</a><br /><a class='postTime'>"+ response['created_at'] +"</a></div></div>";
			 console.log(output); 
			$("#allPost").prepend( output );
		},
		error : function(){
			console.log( 'something wrong happened' );
		}
	}).done(function(){
			console.log("complete!");
	});
	/* Post(id: integer, name: string, content: text, created_at: datetime, updated_at: datetime, user_id: integer) */
});