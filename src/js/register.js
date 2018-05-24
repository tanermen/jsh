require(["config"],function(){
	
	require(["jquery","cookie"],function($){
		$(function(){
			$.cookie.json = true;
			var admin = $.cookie("admin");
	            admin = admin || [];
	 
	       var username,password,s_password;
			$("#username").blur(function(){
				username = $("#username").val();
				var index = exsit(username,admin);
	      var reg1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		  var reg2 =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;	
          
           //判断用户是输入手机号还是邮箱
          if(!reg1.test(username)){
          	// 用户输入手机号，判断格式
          	 if(!reg2.test(username)){
//			 	console.log("2")
			 	$("#name_info").text("格式不正确");
			 }else{
			 	  //格式正确验证用户名是否存在
			    if(index != -1){
			      	$("#name_info").text("该用户名已经存在，不可用");
			      } else{$("#name_info").text("");  
			     }
			  }
          }else{// 用户输入邮箱，判断格式
          	  if(!reg1.test(username)){
//		  		console.log("1")
		  	    //验证格式是否正确
			 	$("#name_info").text("格式不正确");
			 }else{
			 	//验证用户名是否存在
			      if(index != -1){
			      	$("#name_info").text("该用户名已经存在，不可用");
			      } else{$("#name_info").text("");    
			    }
			 }
          }	
          
          if(username==""||username==undefined){
			  	 $("#name_info").text("用户名不能为空");
			  }
          
	   });   
	   
		$("#password").focus(function(){
				 //验证用户名不能为空
				 if(username==""||username==undefined){
			  	 $("#name_info").text("用户名不能为空");
			  }
			});
			
			// 验证密码格式
	       $("#password").blur(function(){
	       	password = $("#password").val();
	       	  var reg = /^[\x21-\x7E]{6,20}$/;
	       	  if(!reg.test(password)){
	       	  	  $("#password_info").text("密码格式错误");
	       	  }else{ $("#password_info").text("");}
	       });
	         //验证确认密码
		    $("#s_password").blur(function(){
		    	s_password = $("#s_password").val();
//		    	console.log(s_password);
		    	if(password!=s_password){
		    		$("#s_password_info").text("两次输入密码不一致");
		    	}else{ $("#s_password_info").text("");}
		    });
			//复选框状态选定
			$("#ck1,#ck2").click(function(){
				var ck1_s = $("#ck1").prop("checked");
				var ck2_s = $("#ck2").prop("checked");
			    if(ck1_s&&ck2_s){
			    	var test = $("#submit").prop("disabled",false);
			    }else{
			    	var test1 = $("#submit").prop("disabled",true);
			    }
			});

	     $("#submit").click(function(){
	     	var ck1_s = $("#ck1").prop("checked");
			var ck2_s = $("#ck2").prop("checked");
			var name_info = $("#name_info").text();
//			console.log(name_info);
			var password_info = $("#password_info").text();
	     	var s_password_info = $("#s_password_info").text();
	 
	 if(ck1_s&&ck2_s&& (!name_info)&&(!password_info)&&(!s_password_info)){
	     		var _username = {};
	     		_username.username = username;
	     	    _username.password = password;
	     		 admin.push(_username);
//	     		  console.log(admin);
	     	   $.cookie("admin",admin,{expires:7,path:"/"}); 	  
	             location.href = "../index.html";
	     	}else{
	     		 $("#submit").prop("disabled",true);
	     	}
	     		return false;
	     });
	
	        //判断cookie中是否存在用户名
			  function exsit(username, admin){
		          for(var i =0;i<admin.length;i++){
		         	if(username==admin[i].username){
			      	return i;
							}
						}
						return -1;
					}   	
		});
	});
});