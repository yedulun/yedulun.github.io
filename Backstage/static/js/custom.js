$(document).ready(function() {
	
	
	
	
	// Adds title attributes and classnames to list items	 
	$("ul li a:contains('Dashboard')").addClass("dashboard").attr('title', 'Dashboard');
	$("ul li a:contains('Pages')").addClass("pages").attr('title', 'Pages');
	$("ul li a:contains('Media')").addClass("media").attr('title', 'Media');
	$("ul li a:contains('History')").addClass("history").attr('title', 'History');
	$("ul li a:contains('Messages')").addClass("messages").attr('title', 'Messages');
	$("ul li a:contains('Settings')").addClass("settings").attr('title', 'Settings');
	
	
	$("nav").height($(document).height());
	
	// Add class to last list item of submenu	
	$("ul.submenu li:last-child").addClass("last");
	
	
	// Append Plus icon on thumbnail hover
	$(".gallery a").hover(function(){
		$(this).append("<span style='display:none'>&oplus;</span>").find("span").fadeIn(500);
	}, function(){
		$(this).find("span").fadeOut(500);
	});
	
	//  Tmeline load
	i=200;
	$(".tl-post").each(function(){
		$(this).delay(i).animate({"opacity" : 1});
		i=i+200;
	});
	
	// Table sorter
	//$("#myTable").tablesorter();
	$("tr:not(.table-head):odd").addClass("odd");
	
	// Equal height divs - www.broken-links.com
	var highestCol = Math.max($('.widget-container > .widget').height(),$('.widget-container > .widget').height());
	$('.widget-container > .widget').height(highestCol);
		
	// Setttings dropdown menu	
	$("header span").hover(function(){
		$(this).find("ul").stop("true", "true").slideDown(500);
	}, function(){
		$(this).find("ul").stop("true", "true").slideUp(500);
	});
	
	// Notification/inbox dropdown menu
	$(".dropdown:has(ul)").hover(function(){
		$(this).find("ul").stop("true", "true").slideDown(500);
	}, function(){
		$(this).find("ul").stop("true", "true").slideUp(500);
	});	
	
	// Hide alert
	$(".close").click(function(){
		$(this).parent().parent().fadeOut(500);
		$(".content").delay(300).animate({"marginTop" : 0});
	});
	
	// Navigation accordion menu
	$(window).bind("load resize", function(){
		if ($("nav").width() > 100) {
			$("nav ul li:has(ul)").hover(function(){
				$(this).find("ul.submenu").stop("true", "true").slideDown(500);
			}, function(){
				$(this).find("ul.submenu").stop("true", "true").delay(100).slideUp(500);
			});
		} else {
			$("nav ul li ul").empty();
		}
	});
	
	// Mobile navigation
	
	$(".ico-font").toggle(function(){
		$("nav").animate({"left" : 0}, 20);
		$("section.content").animate({ marginLeft: 215, marginRight: -215}, 20);
		$("section.alert").animate({ marginLeft: 215}, 20);
	}, function(){
		$("nav").animate({"left" : "-215px"});
		$("section.content").animate({ marginLeft: 0, marginRight: 0}, 400);
		$("section.alert").animate({ marginLeft: 0, marginRight: 0}, 400);
		return false;
	});
	
	// iPhone style checkbox
	/*$('header aside span input[type=checkbox]').checkbox();*/
	
	$('.settings-dd li input').each(function(){
	    $(this).next('span').andSelf().wrapAll('<div class="checkbox-wrap"/>');
	});
	
	// Clear input fields on focus
	$('input').each(function() {
		var default_value = this.value;
		$(this).focus(function(){
		   if(this.value == default_value) {
		           this.value = '';
		   }
		});
		$(this).blur(function(){
		   if(this.value == '') {
		           this.value = default_value;
		   }
		});
	});
	
    /*$('.post').wysiwyg({
		controls: {
			html: { visible: true },
			h1: { visible: false },
			h2: { visible: false },
			h3: { visible: false },
			code: { visible: false},
			createLink: { visible: false},
			unLink: { visible: true},
			insertImage: { visible: false},
			insertTable: { visible: false},
			insertHorizontalRule: { visible: false},
			subscript: { visible: true},
			superscript: { visible: true},
			insertOrderedList: { visible: false},
			insertUnorderedList: { visible: false},
			indent: { visible: true},
			outdent: { visible: true},
			undo: {visible: true},
			redo: {visible: true},
			justifyRight: {visible: true},
			justifyLeft: {visible: true},
			justifyFull: {visible: true},
			justifyCenter: {visible: true},
		}, css : "css/wysiwyg.css"
	});*/
	
	// WYSIWYG Editor
	/*$(window).bind("load resize", function(){
	if ( $(window).width() < 1024) {
		$('#quick_post').wysiwyg({
			controls: {
				html: { visible: true },
				h1: { visible: false },
				h2: { visible: false },
				h3: { visible: false },
				code: { visible: false},
				createLink: { visible: false},
				unLink: { visible: false},
				insertImage: { visible: false},
				insertTable: { visible: false},
				insertHorizontalRule: { visible: false},
				subscript: { visible: false},
				superscript: { visible: false},
				insertOrderedList: { visible: false},
				insertUnorderedList: { visible: false},
				indent: { visible: false},
				outdent: { visible: false},
				undo: {visible: false},
				redo: {visible: false},
				justifyRight: {visible: false},
				justifyLeft: {visible: false},
				justifyFull: {visible: false},
				justifyCenter: {visible: false},
			}, css : "css/wysiwyg.css"
		});
	} else {
		$('#quick_post').wysiwyg({
			controls: {
				html: { visible: true },
				h1: { visible: false },
				h2: { visible: false },
				h3: { visible: false },
				code: { visible: false},
				createLink: { visible: false},
				unLink: { visible: false},
				insertImage: { visible: false},
				insertTable: { visible: false},
				insertHorizontalRule: { visible: false},
				subscript: { visible: false},
				superscript: { visible: false},
				insertOrderedList: { visible: false},
				insertUnorderedList: { visible: false},
				indent: { visible: false},
				outdent: { visible: false}
			}, css : "css/wysiwyg.css"
		});
	}
	});*/
	
	// Sticky sidebar
	
	$(window).bind("load resize", function(){
	if ( $(window).width() > 768) {
	    var aboveHeight = $('.testing').outerHeight();
	
	    $(window).scroll(function(){
			if ($(window).scrollTop() > aboveHeight){
	            $('nav').addClass('fixed').css('top','0').next()
	
	            } else {
	
	            $('nav').removeClass('fixed').css('top','0')
	        }
	    });
	 }
	 });


	// Nicb add
//脳垄脢脥碌么脕脣碌脷37脨脨$("myTable").tablesorter(); 脤铆录脫脧脗脙忙脪禄脨脨


	// Nicb add
	//忙鲁篓茅鈥∨犆ε解�懊ぢ衡�犆�?37猫隆?$("myTable").tablesorter(); 忙路禄氓艩聽盲赂鈥姑┞澛⒚ぢ�?猫隆?
	$("#myTable.pmTableTermination").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 2:{sorter: false}, 5:{sorter: false}, 9:{sorter: false}, 10:{sorter: false}}});

	$("#myTable.pmTableComplain").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 2:{sorter: false}, 3:{sorter: false}, 4:{sorter: false}, 6:{sorter: false}, 7:{sorter: false}}});

	$("#myTable.pmTableNotify").tablesorter({headers:{0:{sorter: false}, 7:{sorter: false}, 8:{sorter: false}}});

	$("#myTable.pmTableCheckAll").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 3:{sorter: false}, 8:{sorter: false}}});

	/*$("#myTable.pmTable").tablesorter({headers:{0:{sorter: false}}});*/




	$("#myTable.pmTablePutAway").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 3:{sorter: false}, 9:{sorter: false}}});


	$("#myTable.pmTableNotPutAway").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 3:{sorter: false}, 9:{sorter: false}}});

	$("#myTable.pmTableSoldOut").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 3:{sorter: false}, 9:{sorter: false}}});

	$("#myTable.pmTableRepertory").tablesorter({headers:{0:{sorter: false}, 1:{sorter: false}, 3:{sorter: false}, 9:{sorter: false}}});




	/**editable table tr hover
	$(".editable").find("tbody").find("tr").hover(function(){
		$(this).find(".edit").addClass("editShow");
	},function(){
		$(this).find(".edit").removeClass("editShow");
	})


	//click editable icon edit input
	$(".edit").bind("click",function(){
		var val = $(this).prev().html();
		$(this).prev().html("<input type='text' class='editInput' id='n' value=" + val + " />");
		$(this).prev().find("input").focus();
		$("#n").bind("blur",function(){
			var newVal = $("#n").val();
			$("#n").parent().html(newVal);
		})

	})
**/
	//editable table tr hover
	$(".editable").find("tbody").find("tr").hover(function(){
		$(this).find(".edit").addClass("editShow");
	},function(){
		$(this).find(".edit").removeClass("editShow");
	})


	//click editable icon show change item
	$(".edit").bind("click",function(){
		$(".editList").removeClass("listShow");
		$(this).next().addClass("listShow");
	})

	//click other place hide change item
	$(document).bind("click",function(e){
		var target = $(e.target);
		if(target.closest(".editList").length == 0 && target.closest(".edit").length == 0)
			$(".editList").removeClass("listShow");
	})	

	//click change item change name
	$(".edit").next().find(".changeName").bind("click",function(){
		var newObj =  $(this).parent().parent().prev().prev();
		var val = newObj.html();
		newObj.html("<input type='text' class='editInput' id='n' value=" + val + " >");
		newObj.find("input").focus();
		$(".listShow").removeClass("listShow");
		$("#n").bind("blur",function(){
			var newVal = $("#n").val();
			$("#n").parent().html(newVal);
		})
	})
	
	

	//select all checkbox
	$(".selectAll").bind("click",function(){
		$("#myTable input[type=checkbox]").prop("checked",$(this).prop("checked"));
	});


	//4 pages of businessManage day/month/year/all select button
	$(".checkInput").find("li").bind("click",function(){
		$(this).parent().find("li").removeClass("active");
		$(this).addClass("active");
	})



	//busin_messageComplain delete button
	$(".pmTableComplain").find(".red").bind("click",function(){
		$(this).parent().parent().remove();
		return false;
	})


    	
});
