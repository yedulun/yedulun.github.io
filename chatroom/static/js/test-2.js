$(function(){
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

		function login(){
			username = $("#username").val();
			var pass = $("#password").val();
			conn.open({
				user : username,
				pwd : pass,
				appKey : 'niccc#chatapp'
			});
		}

		conn.init({
			onOpened : function(){
				$("#loginBox").fadeOut();
				conn.setPresence();
			},
			onTextMessage : function(message){
				console.log(message);
				var from = message.from;
				var data = message.data;
				var now = "22:22";
				var scrollBox = $(".scrollbox");
				scrollBox.append('<div class="dialog"><a href="" class="headimg"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + from + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + data + '</span></p><div class="at"><a href="javascript:void(0)><b></b><span>@Ta</span></a></div></div>"');
					
				$(".chat_content").mCustomScrollbar("scrollTo","bottom");
			}
		})	
		$("#send").on('click',function(){
			sendText();
			
		})
		var sendText = function() {
			var msg = $("#inputArea").html();
			var to = "test1";
			var now = "14:55";
			var options = {
				to : to,
				msg : msg,
				type : "chat",
				success: function(){
					$("#inputArea").html("");
					$("#inputArea").focus();
					var scrollBox = $(".scrollbox");
					scrollBox.append('<div class="dialog"><a href="" class="headimg"><img src=""></a><div class="dialog_top"><a href="" class="uname">' + username + '</a><span class="dtime">' + now + '</span></div><p><i></i><span class="dcon">' + msg + '</span></p><div class="at"><a href="javascript:void(0)><b></b><span>@Ta</span></a></div></div>"');
					
					$(".chat_content").mCustomScrollbar("scrollTo","bottom");
				}
			};
			conn.sendTextMessage(options);
			
		};
	});