
define(["jquery"],function($){
	
	 $(function(){
	 	$(".header").load("/html/include/header.html",function(){
	 		$(".er_nav").mouseover(function(){
	 			$(".b_nav").css({display:"block"});
	 		});
	 	   $(".er_nav").mouseleave(function(){
	 			$(".b_nav").css({display:"none"});
	 		});
	 
	    //将登录改成具体的用户名名称
	    var username = location.search;
            var arr = username.split("=");
            if(arr[1]){
            	$("#login").text("您好 "+arr[1]).attr("href","#");
            }else{
            	$("#login").text("登录");
            }
         
      $(".txt").on("keyup", function(){
				let _search = $(this).val(),
					url = `https://suggest.taobao.com/sug?code=utf-8&q=${_search}&callback=?`;
				$.getJSON(url, function(data){
//					console.log(data);
					var html = "";
					data.result.forEach(function(curr){
						html += `<div>${curr[0]}</div>`;
					});
					$("#seacher_detail").html(html);
//					console.log($("#seacher_detail"));
				});
			});
			// 收货地址二级菜单绑定点击事件
          $(".b_nav").on("click","a",function(e){
          	   var src = $(e.target);
          	   $(".b_nav a").removeClass("current");
          	   src.addClass("current");
          	   $("#address").text(src.text());
          	   $(".b_nav").css({"display":"none"});
          });
          
           //全部商品分类二级菜单绑定鼠标滑过事件，让二级菜单出现并做修改
           $("#header_product").on("mouseover","li",function(){
           	  $(".allNav_son").css({display:"block"});
           	   var index = $(this).index();
           	  $.ajax({
           	  	type:"get",
           	  	url:"../mock/allNav_son.json",
           	  	dataType:"json",
           	  	success: function(data){
           	  		if(data.res_code===1){
           	  		switch(index){
           	  			case 0:show1(0,data.res_body.allNav_son);
           	  			break;
           	  			case 1:show1(1,data.res_body.allNav_son);
           	  			break;
           	  			case 2:show1(2,data.res_body.allNav_son);
           	  			break;
           	  			case 3:show1(3,data.res_body.allNav_son);
           	  			break;
           	  			case 4:show1(4,data.res_body.allNav_son);
           	  			break;
           	  			case 5:show1(5,data.res_body.allNav_son);
           	  			break;
           	  			case 6:show1(6,data.res_body.allNav_son);
           	  			break;
           	  			case 7:show1(7,data.res_body.allNav_son);
           	  			break;
           	  			case 8:show1(8,data.res_body.allNav_son);
           	  			break;
           	  			case 9:show1(9,data.res_body.allNav_son);
           	  			break;
           	  		}

           	  			
           	  	function show1(index,a){
           	  		let html = "";
           	  		$(a[index]).each(function(index,pro){
           	  	  	    html = ` <h6>${pro.h6}</h6>
							     <ul>${pro.ul}</ul>
							     <img src="${pro.img}"/>
							     <div class="clk"><a href="#"></a></div>
	     						`
           	  	       });
           	  	          
           	  				$(".allNav_son").html(html); 
           	  			}
        
           	  		}
           	  	}
           	  	
           	  }); 
           });
           //全部商品分类二级菜单绑定鼠标滑过事件,隐藏二级菜单
            $("#header_product").mouseleave(function(){
            	 $(".allNav_son").css({display:"none"});
            });

	 	});
	 });
	 	$(".footer").load("/html/include/footer.html");
 });