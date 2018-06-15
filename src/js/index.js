
require(["config"],function(){
	
	require(["jquery","load","fade", "seamless","cookie","fly"],function($){
		$(function(){
//			//banner轮播图
         var allCarousel;
          $.ajax({
          	type:"get",
          	url:"../mock/carousel.json",
          	dataType:"json",
          	success:function(data){
          	  allCarousel = data;
          		if(data.res_code===1){
		          	//banner轮播图
		        $("#banner_main").fade({imgs : data.res_body.banner.imgs,
		         	width: data.res_body.banner.width,
		         	height:data.res_body.banner.height
				       });
				      
		         $(".carsouel1").seamless({imgs : data.res_body.carousel1.imgs,
		         	width: data.res_body.carousel1.width,
		         	height:data.res_body.carousel1.height});
		        
          		}
          	}
          	
          });
          //商品推荐部分
           $.ajax({
          	type:"get",
          	url:"../mock/reqingtuijian.json",
          	dataType:"json",
          	success:function(data){
//        		console.log(data);
          		if(data.res_code===1){
          	       var html="";
          			   data.res_body.rqtj.block1.forEach(function(pro){
          				html+=`<div class="block">
						<div class="block_content">
						    <div id="bianma" style="display:none;">${pro.id}</div>
							<a href="html/product_detail.html"><span>${pro.span1} <span>${pro.span2}</span></span></a><br/>
							<a href="html/product_detail.html"><span>${pro.span3}</span></a><br/>
							<span class="price">${pro.span4}<span>${pro.span5}</span></span><br/>
							<img src="${pro.img}"/>
							<em>${pro.em}
							<b class="add"><a href="#"><i class="iconfont icon-cart1"></i>加入购物车</a></b>
						    </em>
					    </div>
					  </div>`
          			});

          			$(".main_top_left_detail").html(html);
          		
          	  $(".main_top_left_nav").on("mouseover","a",function(e){
          	  	  var src = $(e.target);
          	  	  $(".main_top_left_nav a").removeClass("_current");
          	  	  src.addClass("_current");
          	  });
          	    show("#rqtj",data.res_body.rqtj.block1);
          		show("#xpss",data.res_body.rqtj.block2);
          		show("#ppzq",data.res_body.rqtj.block3);
          		function show(selector,block_name){
          			$(selector).mouseover(function(){
          			    var html="";
          			   block_name.forEach(function(pro){
          				html+=`<div class="block">
						<div class="block_content">
						    <div id="bianma" style="display:none;">${pro.id}</div>
							<a href="html/product_detail.html"><span>${pro.span1} <span>${pro.span2}</span></span></a><br/>
							<a href="html/product_detail.html"><span>${pro.span3}</span></a><br/>
							<span class="price">${pro.span4}<span>${pro.span5}</span></span><br/>
							<img src="${pro.img}"/>
							<em>${pro.em}
							<b class="add"><a href="#"><i class="iconfont icon-cart1"></i>加入购物车</a></b>
						    </em>
					    </div>
					  </div>`
          			});

          			$(".main_top_left_detail").html(html);
          		});
          		
          		}
          		
          		}
          	}
          	
          });
          //楼层导航部分
      $.ajax({
      	type:"get",
      	url:"../mock/floor_product.json",
      	dataType:"json",
      	success:function(data){
      		if(data.res_code===1){
      			var html="";
      	      data.res_body.floor.forEach(function(flo){
      	       html +=`<div class="${flo.class}">
						  	<h2>${flo.h2}</h2>
						  	<div class="floor_content">
	  		<div class="floor_content_top">
				<div class="floor_content_nav">
					<a href="#">${flo.nav1}</a>
					<a href="#">${flo.nav2}</a>
					<a href="#">${flo.nav3}</a>
				</div>
				<ul class="products_nav">
					<li><a href="#">${flo.ul_nav1}</a></li>
					<li><a href="#">${flo.ul_nav2}</a></li>
					<li><a href="#">${flo.ul_nav3}</a></li>
					<li><a href="#">${flo.ul_nav4}</a></li>
					<li><a href="#">${flo.ul_nav5}</a></li>
					<li><a href="#">${flo.ul_nav6}</a></li>
					<li class="last"><a href="#">${flo.ul_nav7}</a></li>
				</ul>
	  	 </div>
	  	   <div class="floor_content_bottom">
	  	     <div class="${flo.carousel}"></div>
	  	      <div class="products">
	  	      	<div>
	  	      	<a href="#"><img src="${flo.img1}"/></a>
	  	      	<a href="#"><img src="${flo.img2}"/></a>
	  	      	</div>
	  	      	<div >
	  	      		<a href="#"><img src="${flo.img3}"/></a>
	  	      	</div>
	  	      	<div>
	  	      		<a href="#"><img src="${flo.img4}"/></a>
	  	      	   <a href="#"><img src="${flo.img5}"/></a>
	  	      	</div>
	  	          <div>
	  	      	<a href="#"><img src="${flo.img6}"/></a>
	  	      	<a href="#"><img src="${flo.img7}"/></a>
	  	      	</div>
	  	      </div>
	  	    </div>
	  	  </div>
	  </div>`
      	      });
      	   $(".floor").html(html);
//    	   console.log(allCarousel);
      	   /*用全局的变量allCarousel数据放楼层导航轮播图*/
      	    $(".lb2").seamless({imgs : allCarousel.res_body.lb2.imgs,
		         	width: allCarousel.res_body.lb2.width,
		         	height:allCarousel.res_body.lb2.height});
		         	
		    $(".lb3").seamless({imgs : allCarousel.res_body.lb3.imgs,
		         	width: allCarousel.res_body.lb3.width,
		         	height:allCarousel.res_body.lb3.height});
		         	
		   $(".lb4").seamless({imgs : allCarousel.res_body.lb4.imgs,
		         	width: allCarousel.res_body.lb4.width,
		         	height:allCarousel.res_body.lb4.height});     	
      	  $(".lb5").seamless({imgs : allCarousel.res_body.lb5.imgs,
		         	width: allCarousel.res_body.lb5.width,
		         	height:allCarousel.res_body.lb5.height});
		         	
		    		
		 $(".lb6").seamless({imgs : allCarousel.res_body.lb6.imgs,
		         	width: allCarousel.res_body.lb6.width,
		         	height:allCarousel.res_body.lb6.height});
		         	
      	   $(".lb7").seamless({imgs : allCarousel.res_body.lb7.imgs,
		         	width: allCarousel.res_body.lb7.width,
		        	height:allCarousel.res_body.lb7.height});      	
      		}
      	}
      });
 
          //楼层导航 
        var flos,_top,lis;
		window.onscroll = function(){
		       lis = $("#floor_nav li");
		       flos = $(".floor_s");
               _top = $(flos[0]).offset().top;
	  //控制导航的出现，出现条件：滚动距离>=第一个导航层在文档中的定位高度减去宽口高度的一半
	     var _scrollTop = document.documentElement.scrollTop;
			if(_scrollTop >= _top - window.innerHeight/2){
				$(".floor_nav").css({"display":"block"}); 
			}else{
				$(".floor_nav").css({"display":"none"}); 
			}
//		根据滚动距离改变相应编号导航栏的背景色	

         Array.from(flos).forEach(function(flo,index){
         	var _top = $(flo).offset().top;
         	if(_scrollTop >= _top - window.innerHeight/2){
         	   for(var i = 0;i<lis.length;i++){
         	  $("li:eq("+i+")","#floor_nav").attr({"class":""}); 
            $("li:eq("+i+") .span2","#floor_nav").hide(); 
            $("li:eq("+i+") .span1","#floor_nav").show(); 
              }
         	 $("li:eq("+index+")","#floor_nav").attr({"class":"current"});
            $("li:eq("+index+") .span2","#floor_nav").show();
            $("li:eq("+index+") .span1","#floor_nav").hide();
         	}
         });

		}
		
//		点击li滚动到对应的楼层
        $("#floor_nav").on("click","li",function(){
        	if($(this).is("li")){
        		var index = $(this).index();
        		_top = $(flos[index]).offset().top;
        	 var start = document.documentElement.scrollTop,
        		 end = _top,
        		 range = end - start,
        		 speed = 200,
        		 startTime = +new Date();
           var timer = setInterval(function(){
        			var elaped = Math.min(+new Date()-startTime,speed);
        			var result = elaped*range/speed + start;
        			document.documentElement.scrollTop = result;
        			if(elaped === speed){
        			clearInterval(timer);
        		  }
        		},1000/60)    
        	}	
          });
          
    //商品倒计时
        window.onload = setInterval(function(){
       
                    var now = new Date().getTime(),
                        deadline = new Date("2018-05-30T00:00:00").getTime(),
                        diff = deadline - now,
                        totalSeconds = Math.ceil(diff/1000),
                        seconds = ("0"+totalSeconds%60).slice(-2),
                        minutes = ("0"+Math.floor(totalSeconds/60%60)).slice(-2),
                        hours = ("0"+Math.floor(totalSeconds/3600)%24).slice(-2),
                        days = ("0"+Math.floor(totalSeconds/(24*60*60))).slice(-2);
//                      result = days  + hours +  + minutes + + seconds; 
                         $(".days").text(days);
                         $(".hours").text(hours);
                         $(".minutes").text(minutes);
                         $(".seconds").text(seconds);
                
                },1000);
                
       //加入购物车 并添加效果购物车效果
     $.cookie.json = true;//配置cookie使用，自动json文本格式转换
	var products = $.cookie("products");
	    products = products || [];
//	    console.log(products);
          //先读取cookie商品的总数量，并显示到页面上
	    var cart_amount = 0;
	    for(var i = 0; i<products.length;i++){
//	    	cart_amount =  cart_amount -1+1+(products[i].amount-1+1);
	    	cart_amount +=  products[i].amount;
	    }
//	    console.log(cart_amount);  
	   $("#cart_amount").text(cart_amount);  
      $(".main_top_left_detail").on("click",".add",function(e){
      	var product = $(this).parent().parent();
//    	console.log(product);
//		console.log(this);
        var currentPro = {
        	id:product.children("#bianma").text(),
        	img: product.children("img").attr("src"),
        	desc:product.children("span:eq(1),a:nth-child(2)").text(),
        	price:product.children(".price").text(),
        	amount:1,
        }
//	  console.log(currentPro);
    
	 var index = exsit(currentPro.id, products);
	    if(index==-1){
	    	products.push(currentPro);
	    }else{
	    	products[index].amount++;
	    }
    //	    保存cookie
	 $.cookie("products",products,{expires:7,path:"/"});           
            //抛物线特效
            var flyer = $(`<img src="${currentPro.img}">`);
                  
                flyer.css({width:200,height:200,zIndex:9999});
                flyer.fly({
                    start : {
                        top : e.clientY,
                        left : e.clientX
                    },
                    end : {
                        top : 65,
                        left : 1288,
                        width : 0,
                        height : 0
                    }
                });
         //每添加一件商品，让商品总数量做自增，再在页面上显示出来
          cart_amount++;
          $("#cart_amount").text(cart_amount);
                return false;
          });
  
   // 封装函数，加入购物车时cookie中是否已经存在该商品
	function exsit(id, products){
		for(var i =0;i<products.length;i++){
			if(id===products[i].id){
				return i;
			}
		}
		return -1;
	}   	    
   
		});
   
	});
});

