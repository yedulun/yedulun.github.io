$(function(){

	//adjust some elements' height to avoid scrollbar when browser's size change
	



	//scrollbar style use
	$(".list_window").mCustomScrollbar({
		scrollInertia: 200
	});
	$(".chat_content").mCustomScrollbar({
		scrollInertia: 200
	});





	//click tabnav btn chatroom, notice, friend
	$(".tabnav a").bind("click", function(){
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		var index = $(this).index();
		$(".chat_content_window > div").css("display", "none");
		$(".chat_content_window > div").eq(index).css("display", "block");
		if (index==0) {
			tofriend ="132598658687304132";
		}
		if (index==2) {
			$(".scrollbox-friend").css("display", "block");
		}
		return false;
	})

	tofriend = "132598658687304132";
	//click #allFriend li to start chat window of friend
	$("#allFriends").on("click", "li", function(){
		var flag = false;
		$(".chat_content_window > div").css("display", "none");
		$(".chat_content_friend").css("display", "block");
		$(".scrollbox-friend").css("display", "block");
		$(".tabnav a").removeClass("on");
		$(".friend-btn").addClass("on");
		var friend = $(this).find("span").html();
		var friendToId = "scrollFriend"+friend;
		
		var listIdElement = $("#" + friendToId);
		listIdElement.siblings().css("display", "none");
		listIdElement.css("display", "block");
		$(".scrollbox-friendname").html(friend);
		tofriend = friend;
		return false;
	})


	//show or hide @Ta div when click user's img
	$(".scrollbox").on("click", ".headimg", function(){
		if($(this).siblings().filter(".at").is(":visible")){
			$(this).siblings().filter(".at").hide().removeClass("atShow");
		}else{
			$(".atShow").hide().removeClass("atShow");
		$(this).siblings().filter(".at").show().addClass("atShow");
		}
		return false;
	})

	//show or hide @Ta div when click user's name
	$(".scrollbox").on("click", ".uname", function(){
		if($(this).parent().siblings().filter(".at").is(":visible")){
			$(this).parent().siblings().filter(".at").hide().removeClass("atShow");
		}else{
			$(".atShow").hide().removeClass("atShow");
			$(this).parent().siblings().filter(".at").show().addClass("atShow");
		}
		return false;
	})

	//hide @Ta div when click document
	$(document).bind("click",function(e){
		//var target = $(e.target);
		//if(target.closest(".headimg").length == 0 && target.closest(".uname").length == 0){
			$(".atShow").hide().removeClass("atShow");
		//}
	})



	//click @Ta div 
	$(".at").bind("click",function(){
		$(".atShow").hide().removeClass("atShow");
		var inputElement = $("#inputArea").val();
		var atName = $(this).siblings().find(".uname").html();
		var atNameE = $("<span contenteditable='false'>@<label>" + atName + "</label></span>");
		$("#inputArea").append(atNameE);
	})

	//click user list, friend list, message 
	$(".titbar-li span").bind("click", function(){
		var index = $(this).parent().index();
		$(".titbar-li").removeClass("titbar-on");
		$(this).parent().addClass("titbar-on");
		$(".cont > div").css("display", "none");
		$(".cont > div").eq(index).css("display", "block");
	})


})

