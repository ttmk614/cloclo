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
	console.log("list:" + list.join());

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
			console.log("complete!");
	});
console.log(list);
});


/* ******************************************************* */
$("#sendPost").click(function() {

	console.log("content:" + this.value);

	$.ajax({
		type : "GET",
		url  : "/post",
		data : { account: getCookie(''), content: this.value },
		dataType: 'text',
		success : function(newpost){
			console.log("newpost:"+ newpost );
			$(".mutton").prepend(newpost);
		},
		error : function(){
			console.log( 'something wrong happened' );
		}
	}).done(function(){
			console.log("complete!");
	});
console.log(list);
});