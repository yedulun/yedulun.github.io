$(document).ready(function(){
//购物车下拉效果

	$("#topbar-cart").hover(
		function(){
			$("#topbar-cart a").css({"color":"#ff6700","background":"#fff"});
			$("#topbar-cart div").slideDown(200);
		},
		function(){
			setTimeout(function(){$("#topbar-cart div").slideUp(200,function(){
				$("#topbar-cart a").css({"color":"#B0B0B0","background":"#424242"})
			})},200);
		}
	)

//最上方导航栏

//点击搜索栏效果
	$("#header-search").find(".search-text").bind("focus",function(){
		var search=$("#header-search");
		search.find(".search-hot-words").fadeOut();
		search.find(".keyword-list").show();
	})
	.bind("blur",function(){
		var search=$("#header-search");
		search.find(".keyword-list").hide();
		if (!search.find(".search-text").val()) {
			search.find(".search-hot-words").fadeIn();
		}
	})
$("#header-search").find(".search-text").val("");

//大图区左侧导航栏
	$("#home-hero-left>li").bind("mouseover",function(){
		$(this).addClass("lihover");
	})
	.bind("mouseout",function(){
		$(this).removeClass("lihover");
	})

var oldTime=0;
var interval;

//自动切换大图
	var timer=setInterval(function(){
		var dots=$("#hero-up-pager").find("span");
		var current;
		for(var i=0;i<dots.length;i++){
			if(dots.eq(i).attr("class")=="dot dot-active")
			current=i;
		}
		if (current==dots.length-1) {
			dots.eq(dots.length-1).removeClass("dot-active")
			dots.eq(0).addClass("dot-active");
			checkClass();
		}else{
			dots.eq(current).removeClass("dot-active");
			dots.eq(current+1).addClass("dot-active");
			checkClass();
		}
	},5000);

//大图圆点切换按钮
	$("#hero-up-pager>li").bind("click",function(){
		clearInterval(timer);
		var newDate=new Date();
		var newTime=newDate.getTime();
		interval=newTime-oldTime;
		if(interval<500){}else{
			var oldDate=new Date();
			oldTime=oldDate.getTime();
			if($(this).children("span").attr("class")=="dot"){
				$(this).parent().find("span").removeClass("dot-active");
				$(this).children("span").addClass("dot-active");
				checkClass();
			}
		}
	})
//大图右按钮
	$("#up-left-right .right-btn").bind("click",function(){
		clearInterval(timer);
		var preNum=$("#hero-up-pager li:last").index();
		var prePresent;
		for(var i=0;i<=preNum;i++){
			if($("#hero-up-pager span").eq(i).attr("class")!="dot"){
				prePresent=i;
			}
		}
		if($("#home-hero-right img").eq(prePresent).css("opacity")!=1){}else{
			if(prePresent==preNum) {
				for(var i=0;i<=preNum;i++){
					if (i!=0) {
						$("#hero-up-pager span").eq(i).removeClass("dot-active");
					}
				}
				$("#hero-up-pager span").eq(0).addClass("dot-active");
				checkClass();
			}else{
				prePresent++;
				for(var i=0;i<=preNum;i++){
					if (i!=prePresent) {
						$("#hero-up-pager span").eq(i).removeClass("dot-active");
					}
				}
				$("#hero-up-pager span").eq(prePresent).addClass("dot-active");
				checkClass();
			}
		}
	})
//大图左按钮
	$("#up-left-right .left-btn").bind("click",function(){
		clearInterval(timer);
		var preNum=$("#hero-up-pager li:last").index();
		var prePresent;
		for(var i=0;i<=preNum;i++){
			if($("#hero-up-pager span").eq(i).attr("class")!="dot"){
				prePresent=i;
			}
		}
		if($("#home-hero-right img").eq(prePresent).css("opacity")!=1){}else{
			if(prePresent==0) {
				for(var i=0;i<=preNum;i++){
					if (i!=preNum) {
						$("#hero-up-pager span").eq(i).removeClass("dot-active");
					}
				}
				$("#hero-up-pager span").eq(preNum).addClass("dot-active");
				checkClass();
			}else{
				prePresent--;
				for(var i=0;i<=preNum;i++){
					if (i!=prePresent) {
						$("#hero-up-pager span").eq(i).removeClass("dot-active");
					}
				}
				$("#hero-up-pager span").eq(prePresent).addClass("dot-active");
				checkClass();
			}
		}
		
	})

//明星单品自动切换
	var startTimer=setInterval(startChange,8000);
	
	function startChange(){
		var activeNum=$("#down-left-right").children("[class$=btn-active]").index();
		$("#down-left-right").children("input").eq(activeNum).removeClass("btn-active");
		$("#down-left-right").children("input").eq(!activeNum).addClass("btn-active");
		if (activeNum==0) {
			moveMessage("first-pager",-1240,0,10);
		}else{
			moveMessage("first-pager",0,0,10);
		}
	}
//明星单品区切换按钮
	$("#down-left-right input").eq(0).bind("click",function(){
		clearInterval(startTimer);
		startTimer=setInterval(startChange,8000);
		moveMessage("first-pager",-1240,0,10);
		$("#down-left-right").find("input").eq(0).removeClass("btn-active");
		$("#down-left-right").find("input").eq(1).addClass("btn-active");
	});
	$("#down-left-right input").eq(1).bind("click",function(){
		clearInterval(startTimer);
		startTimer=setInterval(startChange,8000);
		moveMessage("first-pager",0,0,10);
		$("#down-left-right").find("input").eq(1).removeClass("btn-active");
		$("#down-left-right").find("input").eq(0).addClass("btn-active");
	})


//搭配区切换展示列表
	$("#match-nav").find("li").bind("mouseover",function(){
		var current=$(this);
		var previous=$("#match-nav").find(".brick-list-active");
		var previousNum=previous.index();
		var currentNum=current.index();
		if(current.attr("class")!="brick-list-active"){
			previous.removeClass("brick-list-active");
			current.addClass("brick-list-active");
			var lists=$("#match-body").find("ul");
			lists.eq(previousNum).css("display","none");
			lists.eq(currentNum).css("display","block");
		}
	})

//.brick-item 鼠标上移效果
	$("#match-body, #accessories-body").find(".brick-item").hover(function(){
		$(this).children("div").stop().animate({"top":"222px",filter:"alpha(opacity=100)",opacity:"1"},200)
	},function(){
		$(this).children("div").stop().animate({"top":"300px",filter:"alpha(opacity=0)",opacity:"0"},200)
	})

//配件区切换展示列表
	$("#accessories-nav").find("li").bind("mouseover",function(){
		var current=$(this);
		var previous=$("#accessories-nav").find(".brick-list-active");
		var previousNum=previous.index();
		var currentNum=current.index();
		if(current.attr("class")!="brick-list-active"){
			previous.removeClass("brick-list-active");
			current.addClass("brick-list-active");
			var lists=$("#accessories-body").find("ul");
			lists.eq(previousNum).css("display","none");
			lists.eq(currentNum).css("display","block");
		}
	})

//内容区圆点按钮
	changeContent("content-book","content-pagers1");
	changeContent("content-theme","content-pagers2");
	changeContent("content-game","content-pagers3");
	changeContent("content-app","content-pagers4");
//内容区左右按钮
	nextPage("content-book","content-buttons1","content-pagers1");
	nextPage("content-theme","content-buttons2","content-pagers2");
	nextPage("content-game","content-buttons3","content-pagers3");
	nextPage("content-app","content-buttons4","content-pagers4");



})


//startpro自动切换函数


//根据class切换大图函数
	function checkClass(){
		var number=$("#hero-up-pager li:last").index();
		var present;
		for(var i=0;i<=number;i++){
			if($("#hero-up-pager span").eq(i).attr("class")!="dot"){
				present=i;
			}
		}
		$("#home-hero-right img").eq(present).css("opacity","0");
		$("#home-hero-right img").eq(present).css("z-index","11");
		$("#home-hero-right img").eq(present).fadeTo(500,1,function(){
			for(var j=0;j<=number;j++){
				if(j!=present){
					$("#home-hero-right img").eq(j).css("z-index","0");
				}
			}
			$("#home-hero-right img").eq(present).css("z-index","10");
		})
	}

//移动元素到目标区域函数
function moveMessage(elementID,final_x,final_y,interval){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID)) {return false;}
	var elem=document.getElementById(elementID);
	if (elem.movement) {clearTimeout(elem.movement);}
	if (!elem.style.left) {
		elem.style.left="0px";
	}
	if (!elem.style.top) {
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	if (xpos==final_x&&ypos==final_y) {return true;}
	if (xpos<final_x) {
		dist=Math.ceil((final_x-xpos)/10); 
		xpos+=dist;
	}
	if (xpos>final_x) {
		dist=Math.ceil((xpos-final_x)/10); 
		xpos-=dist;
	}
	if (ypos<final_y) {
		dist=Math.ceil((final_y-ypos)/10); 
		ypos+=dist;
	}
	if (ypos>final_y) {
		dist=Math.ceil((ypos-final_y)/10); 
		ypos-=dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveMessage('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}

//内容区左右按钮,参数分别为图片id,左右键id，圆按钮id
function nextPage(elementID1,elementID2,elementID3){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	if (!document.getElementById(elementID3)) {return false;}
	var elem=document.getElementById(elementID1);
	var nextPage=document.getElementById(elementID2);
	var contentPagers=document.getElementById(elementID3);
	var links=contentPagers.getElementsByTagName("li");
	var inputs=nextPage.getElementsByTagName("input");
	inputs[0].onclick=function(){
		if(!contentPagers.getAttribute("title")) contentPagers.setAttribute("title","1");
		var pageNumber=parseInt(contentPagers.getAttribute("title"));
		if(pageNumber==1){

		}else{
			switch(pageNumber)
			{
				case 2:{
					moveMessage(elementID1,0,0,8);
					contentPagers.setAttribute("title","1");
					links[0].className="pager pager-active";
					links[1].className="pager";
					break;}
				case 3:{
					moveMessage(elementID1,-296,0,8);
					contentPagers.setAttribute("title","2");
					links[1].className="pager pager-active";
					links[2].className="pager";
					break;
				}
				case 4:{
					moveMessage(elementID1,-592,0,8);
					contentPagers.setAttribute("title","3");
					links[2].className="pager pager-active";
					links[3].className="pager";
					break;
				}
			}
		}
	}
	inputs[1].onclick=function(){
		if(!contentPagers.getAttribute("title")) contentPagers.setAttribute("title","1");
		var pageNumber=parseInt(contentPagers.getAttribute("title"));
		if(pageNumber==4){
			
		}else{
			switch(pageNumber)
			{	
				case 1:{
					moveMessage(elementID1,-296,0,8);
					contentPagers.setAttribute("title","2");
					links[0].className="pager";
					links[1].className="pager pager-active";
					 break;
				}
				case 2:{
					moveMessage(elementID1,-592,0,8);
					contentPagers.setAttribute("title","3");
					links[1].className="pager";
					links[2].className="pager pager-active";
					 break;
				}
				case 3:{
					moveMessage(elementID1,-888,0,8);
					contentPagers.setAttribute("title","4");
					links[2].className="pager";
					links[3].className="pager pager-active";
					break;
				}
			}
		}
	}
}


//内容区圆点按钮
function changeContent(elementID1,elementID2){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	//var contentBook=document.getElementById("content-book");
	var contentPagers=document.getElementById(elementID2);
	var links=contentPagers.getElementsByTagName("li");
	links[0].onclick=function(){
		moveMessage(elementID1,0,0,8);
		links[0].className="pager pager-active";
		links[1].className="pager";
		links[2].className="pager";
		links[3].className="pager";
		contentPagers.setAttribute("title","1");

	}
	links[1].onclick=function(){
		moveMessage(elementID1,-296,0,8);
		links[0].className="pager";
		links[1].className="pager pager-active";
		links[2].className="pager";
		links[3].className="pager";
		contentPagers.setAttribute("title","2");
	}
	links[2].onclick=function(){
		moveMessage(elementID1,-592,0,8);
		links[0].className="pager";
		links[1].className="pager";
		links[2].className="pager pager-active";
		links[3].className="pager";
		contentPagers.setAttribute("title","3");
	}
	links[3].onclick=function(){
		moveMessage(elementID1,-888,0,8);
		links[0].className="pager";
		links[1].className="pager";
		links[2].className="pager";
		links[3].className="pager pager-active";
		contentPagers.setAttribute("title","4");
	}
}


