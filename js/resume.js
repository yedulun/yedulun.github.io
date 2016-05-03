$(document).ready(function(){

	//------------------------------------------------------------------二维码效果------------------------------------------------------------------
	$("#site-top").find("li").bind("mouseover",function(){
		$(this).find("img").css("display","block");
		$(this).find(".triangle").css("display","block");
	})
	$("#site-top").find("li").bind("mouseout",function(){
		$(this).find("img").css("display","none");
		$(this).find(".triangle").css("display","none");
	})


	//------------------------------------------------------------------点击主页动画------------------------------------------------------------------
	$("#main-menu .site-main-home").bind("click",function(){
		$("#menu-container .content").slideUp("slow");
		$("#menu-container .content-home").slideDown("slow");
		$("#menu-container .logo-holder").animate({marginLeft:"45%"},"slow");
		$("#menu-container .logo-holder").animate({marginTop:"110px"},"slow");
		return false;
	})

	//------------------------------------------------------------------点击资料动画------------------------------------------------------------------
	$("#main-menu .site-main-user").bind("click",function(){
		$("#menu-container .content").slideUp("slow");
		$("#menu-container .content-user").slideDown("slow");
		$("#menu-container .logo-holder").animate({marginTop:"0px"},"slow");
		$("#menu-container .logo-holder").animate({marginLeft:"0px"},"slow");
		return false;
	})

	//------------------------------------------------------------------点击相册动画------------------------------------------------------------------
	$("#main-menu .site-main-camera").bind("click",function(){
		$("#menu-container .content").slideUp("slow");
		$("#menu-container .content-camera").slideDown("slow");
		$("#menu-container .logo-holder").animate({marginTop:"0px"},"slow");
		$("#menu-container .logo-holder").animate({marginLeft:"0px"},"slow");
		return false;
	})

	//------------------------------------------------------------------点击联系动画------------------------------------------------------------------
	$("#main-menu .site-main-envelope").bind("click",function(){
		$("#menu-container .content").slideUp("slow");
		$("#menu-container .content-envelope").slideDown("slow");
		$("#menu-container .logo-holder").animate({marginTop:"0px"},"slow");
		$("#menu-container .logo-holder").animate({marginLeft:"0px"},"slow");
		return false;
	})

	//------------------------------------------------------------------点击相册相片------------------------------------------------------------------
	var currentPicture;
	$(".photo-list").find("li").bind("click",function(){
		if($(this).parent().attr("class")=="clearfix photo-list list-2"){
			currentPicture=$(this).index()+6;
		}else{
			currentPicture=$(this).index();
		}
		$("#album-mark").find("img").eq(currentPicture).css("display","block");
		$("#album-mark").fadeIn("normal");
		$("#album-mark").find(".current-number").text(currentPicture+1);
	})

	//------------------------------------------------------------------关闭相册相片------------------------------------------------------------------
	$("#album-mark .close-btn").bind("click",function(){
		$("#album-mark").fadeOut("normal");
		var leng=12;
		for(var i=0; i<leng; i++){
			$("#album-mark").find("img").eq(i).css("z-index","31");
			$("#album-mark").find("img").eq(i).css("display","none");
		}
	})

	//------------------------------------------------------------------切换相册相片------------------------------------------------------------------
	$("#album-mark .fa-angle-right").bind("click",function(){
		if (currentPicture==11) {
			currentPicture=0;
		}else{
			currentPicture++;
		}
		$("#album-mark").find(".current-number").text(currentPicture+1);
		$("#album-mark").find("img").eq(currentPicture).css("opacity","0");
		$("#album-mark").find("img").eq(currentPicture).css("z-index","32");
		$("#album-mark").find("img").eq(currentPicture).fadeTo(300,1,function(){
			for(var i=0; i<=11; i++){
				if (i!=currentPicture) {
					$("#album-mark").find("img").eq(i).css("z-index","31");
					$("#album-mark").find("img").eq(i).css("display","none");
				}
			}
			$("#album-mark").find("img").eq(currentPicture).css("z-index","31");
		});
	})

	$("#album-mark .fa-angle-left").bind("click",function(){
		if (currentPicture==0) {
			currentPicture=11;
		}else{
			currentPicture--;
		}
		$("#album-mark").find(".current-number").text(currentPicture+1);
		$("#album-mark").find("img").eq(currentPicture).css("opacity","0");
		$("#album-mark").find("img").eq(currentPicture).css("z-index","32");
		$("#album-mark").find("img").eq(currentPicture).fadeTo(300,1,function(){
			for(var i=0; i<=11; i++){
				if (i!=currentPicture) {
					$("#album-mark").find("img").eq(i).css("z-index","31");
					$("#album-mark").find("img").eq(i).css("display","none");
				}
			}
			$("#album-mark").find("img").eq(currentPicture).css("z-index","31");
		});
	})

	//------------------------------------------------------------------切换相册页------------------------------------------------------------------
	$("#album-list .page").find("li").bind("click",function(){
		var pageNumber=$(this).index();
		var pageLength=$("#album-list .page").find("li").length;
		for(var i=0; i<pageLength; i++){
			$("#album-list").find("ul").eq(i).css("display","none");
			$("#album-list .page").find("li").eq(i).removeClass("page-active");
		}
		$("#album-list").find("ul").eq(pageNumber).css("display","block");
		$("#album-list .page").find("li").eq(pageNumber).addClass("page-active");
	})



})