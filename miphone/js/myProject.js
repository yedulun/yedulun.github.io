addLoadEvent(leftHover);
//自动切换大图
addLoadEvent(autoChange("home-hero-right","up-left-right","hero-up-pager"));
//手动切换大图
addLoadEvent(changePicture("home-hero-right","hero-up-pager"));
addLoadEvent(nextPicture("home-hero-right","up-left-right","hero-up-pager"));
//小米明星单品左右切换
addLoadEvent(startproPage("first-pager","down-left-right"));
//搭配区
addLoadEvent(matchChange("match-body","match-nav"));
//配件区
addLoadEvent(matchChange("accessories-body","accessories-nav"))
//内容区圆点按钮
addLoadEvent(changeContent("content-book","content-pagers1"));
addLoadEvent(changeContent("content-theme","content-pagers2"));
addLoadEvent(changeContent("content-game","content-pagers3"));
addLoadEvent(changeContent("content-app","content-pagers4"));
//内容区左右按钮
addLoadEvent(nextPage("content-book","content-buttons1","content-pagers1"));
addLoadEvent(nextPage("content-theme","content-buttons2","content-pagers2"));
addLoadEvent(nextPage("content-game","content-buttons3","content-pagers3"));
addLoadEvent(nextPage("content-app","content-buttons4","content-pagers4"));

//大图左侧导航
function leftHover(){
	var homeHeroLeft=document.getElementById("home-hero-left");
	var nodeList=homeHeroLeft.childNodes;
	var liList=[];
	for(var i=0;i<nodeList.length;i++){
		if(nodeList[i].nodeName=="LI"){
			liList[liList.length]=nodeList[i];
		}
	}
	for (var j=0;j<liList.length;j++){
		liList[j].onmouseover=function(){
			this.className="lihover";
		}
		liList[j].onmouseout=function(){
			this.className="";
		}
	}
}









var opacityTimer=null;
var alpha=0;
//切换透明度
function opacityChange(elementID1,num){
	var elemId=document.getElementById(elementID1);
	var elemImg=elemId.getElementsByTagName("img");
	clearInterval(opacityTimer);
	opacityTimer=setInterval(function(){
		if(alpha==100){
			clearInterval(opacityTimer);
		}else{
			alpha+=10;
			elemImg[num].style.filter="alpha(opacity:"+alpha+")";
			elemImg[num].style.opacity=alpha/100;
		}
	},30);
}

//自动切换大图
function autoChange(elementID1,elementID2,elementID3){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	if (!document.getElementById(elementID3)) {return false;}
	var homeHeroRight=document.getElementById(elementID1);
	var leftRightButtons=document.getElementById(elementID2);
	var heroUpPager=document.getElementById(elementID3);
	var rightImages=homeHeroRight.getElementsByTagName("img");
	var leftRight=leftRightButtons.getElementsByTagName("input");
	var pagers=heroUpPager.getElementsByTagName("span");
		if(!heroUpPager.getAttribute("title")) heroUpPager.setAttribute("title",4);
		var pageNumber=parseInt(heroUpPager.getAttribute("title"));
		switch(pageNumber)
		{
			case 0:{
				rightImages[1].style.zIndex=10;
				rightImages[0].style.zIndex=0;
				heroUpPager.setAttribute("title",1);
				pagers[0].className="dot";
				pagers[1].className="dot dot-active";
				break;
			}
			case 1:{
				rightImages[2].style.zIndex=10;
				rightImages[1].style.zIndex=0;
				heroUpPager.setAttribute("title",2);
				pagers[1].className="dot";
				pagers[2].className="dot dot-active";
				break;
			}
			case 2:{
				rightImages[3].style.zIndex=10;
				rightImages[2].style.zIndex=0;
				heroUpPager.setAttribute("title",3);
				pagers[2].className="dot";
				pagers[3].className="dot dot-active";
				break;
			}
			case 3:{
				rightImages[4].style.zIndex=10;
				rightImages[3].style.zIndex=0;
				heroUpPager.setAttribute("title",4);
				pagers[3].className="dot";
				pagers[4].className="dot dot-active";
				break;
			}
			case 4:{
				rightImages[0].style.zIndex=10;
				rightImages[4].style.zIndex=0;
				heroUpPager.setAttribute("title",0);
				pagers[4].className="dot";
				pagers[0].className="dot dot-active";
				break;
			}
		}
	var repeat="autoChange('"+elementID1+"','"+elementID2+"','"+elementID3+"')";
	homeHeroRight.movement=setTimeout(repeat,4000);
}


//上方切换大图圆点按钮
function changePicture(elementID1,elementID2){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	var homeHeroRight=document.getElementById(elementID1);
	var heroUpPager=document.getElementById(elementID2);
	var rightImages=homeHeroRight.getElementsByTagName("img");
	var pagerButtons=heroUpPager.getElementsByTagName("span");
	for(var i=0;i<pagerButtons.length;i++){
		(function(i){pagerButtons[i].onclick=function(){
			for(var j=0;j<rightImages.length;j++){
				rightImages[j].style.zIndex=0;
			}
			rightImages[i].style.zIndex=10;
			for(var j=0;j<rightImages.length;j++){
				pagerButtons[j].className="dot";
			}
			pagerButtons[i].className="dot dot-active";
			heroUpPager.setAttribute("title",i);
		}})(i);
	}
}

//上方大图左右切换效果,参数分别为图片id,左右键id，圆按钮id
function nextPicture(elementID1,elementID2,elementID3){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	if (!document.getElementById(elementID3)) {return false;}
	var homeHeroRight=document.getElementById(elementID1);
	var leftRightButtons=document.getElementById(elementID2);
	var heroUpPager=document.getElementById(elementID3);
	var rightImages=homeHeroRight.getElementsByTagName("img");
	var leftRight=leftRightButtons.getElementsByTagName("input");
	var pagers=heroUpPager.getElementsByTagName("span");
	leftRight[0].onclick=function(){
		if(!heroUpPager.getAttribute("title")) heroUpPager.setAttribute("title",0);
		var pageNumber=parseInt(heroUpPager.getAttribute("title"));
		switch(pageNumber)
		{
			case 0:{
				rightImages[4].style.zIndex=10;
				rightImages[0].style.zIndex=0;
				heroUpPager.setAttribute("title",4);
				pagers[0].className="dot";
				pagers[4].className="dot dot-active";
				break;
			}
			case 1:{
				rightImages[0].style.zIndex=10;
				rightImages[1].style.zIndex=0;
				heroUpPager.setAttribute("title",0);
				pagers[1].className="dot";
				pagers[0].className="dot dot-active";
				break;
			}
			case 2:{
				rightImages[1].style.zIndex=10;
				rightImages[2].style.zIndex=0;
				heroUpPager.setAttribute("title",1);
				pagers[2].className="dot";
				pagers[1].className="dot dot-active";
				break;
			}
			case 3:{
				rightImages[2].style.zIndex=10;
				rightImages[3].style.zIndex=0;
				heroUpPager.setAttribute("title",2);
				pagers[3].className="dot";
				pagers[2].className="dot dot-active";
				break;
			}
			case 4:{
				rightImages[3].style.zIndex=10;
				rightImages[4].style.zIndex=0;
				heroUpPager.setAttribute("title",3);
				pagers[4].className="dot";
				pagers[3].className="dot dot-active";
				break;
			}
		}
		
	}
	leftRight[1].onclick=function(){
		if(!heroUpPager.getAttribute("title")) heroUpPager.setAttribute("title",0);
		var pageNumber=parseInt(heroUpPager.getAttribute("title"));
		switch(pageNumber)
		{
			case 0:{
				rightImages[1].style.zIndex=10;
				rightImages[0].style.zIndex=0;
				heroUpPager.setAttribute("title",1);
				pagers[0].className="dot";
				pagers[1].className="dot dot-active";
				break;
			}
			case 1:{
				rightImages[2].style.zIndex=10;
				rightImages[1].style.zIndex=0;
				heroUpPager.setAttribute("title",2);
				pagers[1].className="dot";
				pagers[2].className="dot dot-active";
				break;
			}
			case 2:{
				rightImages[3].style.zIndex=10;
				rightImages[2].style.zIndex=0;
				heroUpPager.setAttribute("title",3);
				pagers[2].className="dot";
				pagers[3].className="dot dot-active";
				break;
			}
			case 3:{
				rightImages[4].style.zIndex=10;
				rightImages[3].style.zIndex=0;
				heroUpPager.setAttribute("title",4);
				pagers[3].className="dot";
				pagers[4].className="dot dot-active";
				break;
			}
			case 4:{
				rightImages[0].style.zIndex=10;
				rightImages[4].style.zIndex=0;
				heroUpPager.setAttribute("title",0);
				pagers[4].className="dot";
				pagers[0].className="dot dot-active";
				break;
			}
		}
		
	}
}

//小米明星单口切换，参数分别为单品显示区域id，左右键id
function startproPage(elementID1,elementID2){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	var firstPager=document.getElementById(elementID1);
	var buttons=document.getElementById(elementID2);
	var inputs=buttons.getElementsByTagName("input");
	inputs[1].onclick=function(){
		moveMessage(elementID1,0,0,10);
		buttons.setAttribute("title","left");
	}
	inputs[0].onclick=function(){
		moveMessage(elementID1,-1240,0,10);
		buttons.setAttribute("title","right");
	}
}

//搭配区切换图片
function matchChange(elementID1,elementID2){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID1)) {return false;}
	if (!document.getElementById(elementID2)) {return false;}
	var matchBody=document.getElementById(elementID1);
	var matchNav=document.getElementById(elementID2);
	var allUlist=matchBody.getElementsByTagName("ul");
	var allLlist=matchNav.getElementsByTagName("li");
	for(var i=0;i<allLlist.length;i++){
		(function(i){allLlist[i].onmouseover=function(){
			for(var j=0;j<allLlist.length;j++){
				allUlist[j].style.display="none";
			}
			allUlist[i].style.display="block";
			for(var j=0;j<allLlist.length;j++){
				allLlist[j].className="";
			}
			allLlist[i].className="brick-list-active";
		}})(i);
	}
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


function addLoadEvent(func){
	var oldnode=window.onload;
	if (typeof window.onload!='function') {
		window.onload=func;
	}else{
		window.onload=function(){
			oldnode();
			func();
		}
	}
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
