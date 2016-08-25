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


		$('body').on('click','.login-btn',function(){
			login();
		})
		$("#password").keydown(function(event){
			if (event.keyCode == 13) {
				login();
			}
		})

		$("#emotionbtn").bind("click", function(){
			showEmotionDialog();
			return false;
		})


		function login(){
			username = $("#username").val();
			var pass = $("#password").val();
			conn.open({
				user : username,
				pwd : pass,
				appKey : 'easemob-demo#chatdemoui'
			});
		}

		conn.init({
			onOpened : function(){
				$("#loginBox").fadeOut();
				conn.setPresence();
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
								friends.append('<li><a href=""><div class="headimg"><img src=""></div><span class="friendname">' + ros.name + '</span></a></li>');
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
				console.log(message);
				var from = message.from;
				var data = message.data;
				var d = new Date();
				var h = d.getHours();
				var m = d.getMinutes();
				var now = h + ":" + m; 
				if(message.type == 'chatroom'){
					$("#scrollChatroom").append('<div class="dialog"><a href="#" class="headimg"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + data + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>')
					$(".chat_content").mCustomScrollbar("scrollTo","bottom");
					return;
				}
				var scrollBox = $("#scrollFriend" + from);
				scrollBox.append('<div class="dialog"><a href="#" class="headimg"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + data + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
				$(".chat_content").mCustomScrollbar("scrollTo","bottom");
			},
			onEmotionMessage: function(message){
				handleEmotionMessage(message);
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

					console.log(msg);
					var msgtext = Easemob.im.Utils.parseLink(Easemob.im.Utils.parseEmotions(encode(msg)));
					console.log(msgtext);

					scrollBox.append('<div class="dialog"><a href="" class="headimg" onclick="test(this); return false;"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + username + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + msgtext + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');				
					$(".chat_content").mCustomScrollbar("scrollTo","bottom");
				}
			};

			conn.sendTextMessage(options);
		};

		var handlePresence = function(e){
			if (e.type == 'subscribe') {
				console.log(e);
				/**
				var user = e.from;
				conn.subscribed({
					to: user,
					message:"[resp:true]"
				});
				**/
			}
			if (e.type == 'subscribed') {
				$("#allFriends").append('<li><a href=""><div class="headimg"><img src=""></div><span class="friendname">' + e.from + '</span></a></li>');
				$(".chat_content_friend").find(".scrollbox").eq(0).after('<div class="scrollbox" id="scrollFriend' + e.from + '"</div>');
				$(".friendnum").html(parseInt($(".friendnum").html()) + 1);
			}
			if(e.type == 'joinChatRoomSuccess'){
				conn.sendTextMessage({
				    to: "132598658687304132",//目标user
				    msg: "msg",//文本消息
				    type: "groupchat",//必填字段，无需修改
				    roomType: "chatroom"//必填字段，无需修改
				}); 
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
				$("#scrollChatroom").append('<div class="dialog"><a href="" class="headimg" onclick="test(this); return false;"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + res + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
			}else {
				$("#scrollFriend" + from).append('<div class="dialog"><a href="" class="headimg" onclick="test(this); return false;"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + res + '</span></p><div class="at"><a href="javascript:void(0)"><b></b><span>@Ta</span></a></div></div>');
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