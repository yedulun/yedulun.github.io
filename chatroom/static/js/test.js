var encode = function ( str ) {
	if ( !str || str.length === 0 ) return "";
	var s = '';
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/<(?=[^o][^)])/g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	//s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
};

$(function(){
		bothRoster = [];
		var conn = null;
		conn = new Easemob.im.Connection();


		$(".header-login").bind("click",function(){
			$("#loginBox").fadeIn();
			$("#username").focus();
			return false;
		})
		$(".header-register").bind("click", function(){
			$("#registerBox").fadeIn();
			$("#username2").focus();
			return false;
		})

		$('body').on('click','.login-btn',function(){
			login();
		})
		$("body").on('click', '.register-btn', function(){
			register();
		})
		$("#password").keydown(function(event){
			if (event.keyCode == 13) {
				login();
			}
		})
		$("#password2").keydown(function(event){
			if (event.keyCode == 13) {
				register();
			}
		})

		$("#emotionbtn").bind("click", function(){
			showEmotionDialog();
			return false;
		})

		//$("#picturebtn").bind("click", inputFile);

		//$("#fileInput").on("change", sendPicture);


		function inputFile(){
			$("#fileInput").val("").click();
		}


		function login(){
			username = $("#username").val();
			var pass = $("#password").val();
			if (username == "" || pass == "") {
				$(".login-notice").html("用户名或密码不能为空").removeClass("green").addClass("red").show();
				return;
			}
			conn.open({
				user : username,
				pwd : pass,
				appKey : 'easemob-demo#chatdemoui'
			});
		}

		function register(){
			usernameReg = $("#username2").val();
			passwordReg = $("#password2").val();
			if (usernameReg == "" || passwordReg == "") {
				$(".reg-notice").html("用户名或密码不能为空").removeClass("green").addClass("red").show();
				return;
			}
			var options = {
			    username : usernameReg,
			    password : passwordReg,
			    appKey : 'easemob-demo#chatdemoui',
			    success : function(result) {
			            $(".reg-notice").html("注册成功").removeClass("red").addClass("green").show();
			            setTimeout('$("#registerBox").fadeOut(); $(".reg-notice").hide(); $("#username2").val(""); $("#password2").val("");', 1000);

			    },
			    error : function(e) {
			    	console.log(e);
			        $(".reg-notice").html("用户名已被占用").removeClass("green").addClass("red").show();
			    }
			};
			Easemob.im.Helper.registerUser(options);
		}

		conn.init({
			onOpened : function(){
				
				$("#loginBox").fadeOut();
				$(".login-notice").html("");
				conn.setPresence();
				$(".login").hide();
				$(".register").hide();
				$(".login_item").html(username).show();
				conn.getRoster({
					success: function(roster){
						//console.log(roster);
						var friends = $("#allFriends");
						var friendswindow = $(".chat_content_friend");
						var friendnum = 0;
						for(var i in roster){
							var ros = roster[i];
							if(ros.subscription =='both' || ros.subscription=='to'){
								bothRoster.push(ros);
								friends.append('<li><a href="javascript:void(0);"><div class="headimg"><img src="img/user.png"></div><span class="friendname">' + ros.name + '</span></a></li>');
								friendswindow.find(".scrollbox").eq(0).after('<div class="scrollbox" id="scrollFriend' + ros.name + '"</div>');
								friendnum++;
							}
						}
						$(".friendnum").html(friendnum);
						//console.log(bothRoster);
					}
				});

				conn.joinChatRoom({
				    roomId: "132598658687304132"//聊天室Id
				});

			},
			onClosed: function(){
				conn.clear();
				conn.onClosed();
			},
			onTextMessage : function(message){
				var from = message.from;
				var data = message.data;
				var d = new Date();
				var h = d.getHours();
				var m = d.getMinutes();
				var now = h + ":" + m; 
				if(message.type == 'chatroom'){
					$("#scrollChatroom").append('<div class="dialog"><a href="javascript:void(0);" class="headimg"><img src="img/user.png"></a><div class="dialog_top"><a href="javascript:void(0);" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + data + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>')
					$(".chat_content").mCustomScrollbar("scrollTo","bottom");
					return;
				}
				var scrollBox = $("#scrollFriend" + from);
				scrollBox.append('<div class="dialog"><a href="javascript:void(0);" class="headimg"><img src="img/user.png"></a><div class="dialog_top"><a href="javascript:void(0);" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + data + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
				$(".chat_content").mCustomScrollbar("scrollTo","bottom");
			},
			onEmotionMessage: function(message){
				handleEmotionMessage(message);
			},
			onPictureMessage: function(message){
				//handlePictureMessage(message);
			},
			onPresence: function(message){
				console.log(message);
				handlePresence(message);
			}
		})	


		//click addfriendbtn to send add friend message
		$(".addfriendbtn").bind("click", function(){
			addfriend();
		})

		//click send btn to send message
		$("#send").on('click',function(){
			sendText();
		})

		$("#inputArea").keydown(function(event){
			if(event.keyCode == 13){
				sendText();
				return false;
			}
			
		})



		var addfriend = function(){
			var user = $(".addfriendname").val();
			//检查是否已是好友
			if (bothRoster) {
				for (var i = 0; i < bothRoster.length; i++) {  
	            if (bothRoster[i].name == user) {  
	                alert("已是好友");  
	                return;  
	            }  
	        }  
			}
			//发送添加好友请求
			conn.subscribe({
				to : user,
				message : "加个好友呗"
			});
			$(".addfriendname").val("");
			alert("请求已发送");
		}



		var sendText = function() {
			var msg = $("#inputArea").html();
			$("#inputArea").html("");
			$("#inputArea").focus();
			var to = tofriend;
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var now = h + ":" + m; 

			var scrollBox = $("#scrollFriend" + to);
			var chatType = "chat";
			var roomType = "";
			if($(".chatroom-btn").hasClass("on")){
				chatType = "groupchat";
				roomType = "chatroom";
				scrollBox = $("#scrollChatroom");
			}

			var options = {
				to : to,
				msg : msg,
				type : chatType,
				roomType : roomType,
				success: function(){
					
					//var scrollBox = $("#scrollFriend" + to);

					//console.log(msg);
					var msgtext = Easemob.im.Utils.parseLink(Easemob.im.Utils.parseEmotions(encode(msg)));
					//console.log(msgtext);

					scrollBox.append('<div class="dialog mine"><a href="javascript:void(0);" class="headimg"><img src="img/user.png"></a><div class="dialog_top"><span class="dtime">' + now + '</span><a href="javascript:void(0);" class="uname">' + username + '</a></div><p><i></i><span class="dcon">' + msgtext + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');				
					$(".chat_content").mCustomScrollbar("scrollTo","bottom");
				}
			};

			conn.sendTextMessage(options);
		};

		





		var handlePresence = function(e){
			if (e.type == 'subscribe') {
				 if (e.status) {  
		            if (e.status.indexOf('resp:true') > -1) {  
		                conn.subscribed({
				            to : e.from,
				            message : "[resp:true]"//同意后发送反加对方为好友的消息，反加消息标识[resp:true]
				        });
		                 
		                return;  
		            }  
		        }  
				$(".allMessages").append('<li><a href="javascript:void(0);"><p class="req_name">' + e.from + '</p><span class="req_item">请求加你为好友</span><button class="req_accept">同意</button><button class="req_reject">拒绝</button><span class="res_accept">已接受</span><span class="res_reject">已拒绝</span></a></li>')
				
			}
			if (e.type == 'subscribed') {
				$(".allMessages").append('<li><a href="javascript:void(0);"><p class="req_name">' + e.from + '</p><span class="req_item">你与' + e.from +'已经是好友了</span>')
				$("#allFriends").append('<li><a href="javascript:void(0);"><div class="headimg"><img src="img/user.png"></div><span class="friendname">' + e.from + '</span></a></li>');
				$(".chat_content_friend").find(".scrollbox").eq(0).after('<div class="scrollbox" id="scrollFriend' + e.from + '"</div>');
				$(".friendnum").html(parseInt($(".friendnum").html()) + 1);
			}
			//对方拒绝加你为好友
			if (e.type == 'unsubscribed') {
				$(".allMessages").append('<li><a href="javascript:void(0);"><p class="req_name">' + e.from + '</p><span class="req_item">删除 或 拒绝加你为好友</span>');
			}
			if(e.type == 'joinChatRoomSuccess'){
				
			}
		}

		var handleEmotionMessage = function(message){
			var from = message.from;
			var data = message.data;
			var res = "";
			for (var i = 0; i < data.length; i++){
				if (data[i].type == "txt"){
					res += data[i].data;
				}else if(data[i].type == "emotion"){
					res += '<img src="'+data[i].data+'">'
				}
			}
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var now = h + ":" + m; 

			if(message.type == 'chatroom'){
				$("#scrollChatroom").append('<div class="dialog"><a href="javascript:void(0);" class="headimg"><img src="img/user.png"></a><div class="dialog_top"><a href="javascript:void(0);" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + res + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
			}else {
				$("#scrollFriend" + from).append('<div class="dialog"><a href="javascript:void(0);" class="headimg"><img src="img/user.png"></a><div class="dialog_top"><a href="javascript:void(0);" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + res + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
			}
			$(".chat_content").mCustomScrollbar("scrollTo","bottom");
		}

		var emotionFlag = false;
		var showEmotionDialog = function(){
			if (emotionFlag) {
				if ($(".face-box").is(":visible")) {
					$(".face-box").hide();
				}else{
					$(".face-box").show();
				}
				return;
			}
			emotionFlag = true;
			var sjson = Easemob.im.EMOTIONS,
				data = sjson.map,
				path = sjson.path;

			for ( var key in data) {
				var emotions = $('<img>').attr({
					"id" : key,
					"src" : path + data[key],
					"style" : "cursor:pointer;"
				}).click(function() {
					selectEmotionImg(this);
				});
				$('<li>').append(emotions).appendTo($('#emotionUL'));
			}
			$('.face-box').css({
				"display" : "block"
			});
		}


		var selectEmotionImg = function(selImg) {
			var txt = $("#inputArea").html() + selImg.id;
			$("#inputArea").html(txt);
			$(".face-box").hide();
			po_Last_Div("inputArea");
		};


		var handlePictureMessage = function(message){
			var filename = message.filename;
			var from = message.from;
			var ext = message.ext;
			var mestype = message.type;
			var options = message;
			options.onFileDownloadComplete = function(response, xhr){
				var objectURL = window.URL.createObjectURL(response);
				img = document.createElement("img");
				img.onload = function(e) {
					img.onload = null;
					window.URL.revokeObjectURL(img.src);
				};
				img.onerror = function() {
					img.onerror = null;
					if (typeof FileReader == 'undefined') {
						img.alter = "当前浏览器不支持blob方式";
						return;
					}
					img.onerror = function() {
						img.alter = "当前浏览器不支持blob方式";
					};
					var reader = new FileReader();
					reader.onload = function(event) {
						img.src = this.result;
					};
					reader.readAsDataURL(response);
				}
				img.src = objectURL;
				console.log(img);
				$("body").append(img);
			};
			options.onFileDownloadError = function(){
				alert("error");
			}
			Easemob.im.Helper.download(options);
		}



		//将可编辑div光标移至最后
		function po_Last_Div(id) {
			var obj = document.getElementById(id);
            if (window.getSelection) {//ie11 10 9 ff safari
            	
                obj.focus(); //解决ff不获取焦点无法定位问题
                var range = window.getSelection();//创建range
                range.selectAllChildren(obj);//range 选择obj下所有子内容
                range.collapseToEnd();//光标移至最后
            }
            else if (document.selection) {//ie10 9 8 7 6 5
                var range = document.selection.createRange();//创建选择对象
                //var range = document.body.createTextRange();
                range.moveToElementText(obj);//range定位到obj
                range.collapse(false);//光标移至最后
                range.select();
            }
        }

       	$(".allMessages").on("click", ".req_accept", function(){
			var messageFrom = $(this).parent().find(".req_name").html();
			
	        $(this).parent().find("button").hide();
	        $(this).parent().find(".res_accept").show();
	        conn.subscribe({
	            to : messageFrom,
	            message : "[resp:true]"//同意后发送反加对方为好友的消息，反加消息标识[resp:true]
	        });
	        conn.subscribed({
	            to : messageFrom,
	            message : "[resp:true]"//同意后发送反加对方为好友的消息，反加消息标识[resp:true]
	        });
		})


       	$(".allMessages").on("click", ".req_reject", function(){
       		var messageFrom = $(this).parent().find(".req_name").html();
       		$(this).parent().find("button").hide();
	        $(this).parent().find(".res_reject").show();
       		conn.unsubscribed({
		        to : messageFrom
		    });
       	})

});

Easemob.im.EMOTIONS = {
    path: 'static/img/faces/'
    , map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:-o]': 'ee_4.png',
        '[:p]': 'ee_5.png',
        '[(H)]': 'ee_6.png',
        '[:@]': 'ee_7.png',
        '[:s]': 'ee_8.png',
        '[:$]': 'ee_9.png',
        '[:(]': 'ee_10.png',
        '[:\'(]': 'ee_11.png',
        '[:|]': 'ee_12.png',
        '[(a)]': 'ee_13.png',
        '[8o|]': 'ee_14.png',
        '[8-|]': 'ee_15.png',
        '[+o(]': 'ee_16.png',
        '[<o)]': 'ee_17.png',
        '[|-)]': 'ee_18.png',
        '[*-)]': 'ee_19.png',
        '[:-#]': 'ee_20.png',
        '[:-*]': 'ee_21.png',
        '[^o)]': 'ee_22.png',
        '[8-)]': 'ee_23.png',
        '[(|)]': 'ee_24.png',
        '[(u)]': 'ee_25.png',
        '[(S)]': 'ee_26.png',
        '[(*)]': 'ee_27.png',
        '[(#)]': 'ee_28.png',
        '[(R)]': 'ee_29.png',
        '[({)]': 'ee_30.png',
        '[(})]': 'ee_31.png',
        '[(k)]': 'ee_32.png',
        '[(F)]': 'ee_33.png',
        '[(W)]': 'ee_34.png',
        '[(D)]': 'ee_35.png'
    }
};