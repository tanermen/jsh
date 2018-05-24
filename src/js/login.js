require(["config"],function(){
	
	require(["jquery","cookie"],function($){
		$(function(){
			
			$.cookie.json = true;
			var admin = $.cookie("admin");
	            admin = admin || [];
	            
//	         $("#username").blur(function(){
//	         	var username = $("#username").val();
//	         	
//	         });
	         
	         $("#login").click(function(){
	         	var username = $("#username").val();
	         	var password = $("#password").val();
	         	var index1 = exsit_username(username,admin);
	         	var index2 = exsit_password(password,admin);
	         	console.log(username);
	         	console.log(password);
	         	console.log(index1,index2);
	         	if(index1 == -1 ||index2 == -1){
	         		console.log(1);
	         		$("#info").text("用户名或者密码不正确");
	         		$("#login").attr("disabled",true);
	         	   }

               $("#login").attr("disabled",false);
	         	if(index1 != -1 &&index2 != -1){
	                location.href = "../index.html?uesrname=" + username;
	         		}
	         	  return false;
	         });
	         
	         //判断cookie中是否存在用户名
			  function exsit_username(user, admin){
		          for(var i =0;i<admin.length;i++){
		         	if(user==admin[i].username){
			      	return i;
							}
						}
						return -1;
					}  
			   //判断cookie中密码是否正确		
	          function exsit_password(password, admin){
		          for(var i =0;i<admin.length;i++){
		         	if(password==admin[i].password){
			      	return i;
							}
						}
						return -1;
					}   	
	 	});
	});
});