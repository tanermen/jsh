require(["config"],function(){
	
	require(["jquery","load","cookie","fly"],function($){
		$(function(){
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
      $("#add_cart").on("click",function(e){
      	var product = $(this).parent().parent();
//    	console.log(product);
//		console.log(this);
        var currentPro = {
        	id:"3",
        	img: "../imgs/p15.jpg",
        	desc:$(".main_top_middle").children("h6").text(),
        	price: "￥39.00",
        	amount:1
        }
	  console.log(currentPro);
    
	 var index = exsit(currentPro.id, products);
	    if(index==-1){
	    	products.push(currentPro);
	    }else{
	    	products[index].amount++;
	    }
    //	    保存cookie
	 $.cookie("products",products,{expires:7,path:"/"});           
            //抛物线特效
            var flyer = $(`<img src="${currentPro.img}"/>`),
                offset = $(".s_cart").offset();
                flyer.css({width:200,height:200,zIndex:9999});
                flyer.fly({
                    start : {
                        top : e.clientY,
                        left : e.clientX
                    },
                    end : {
                        top : offset.top,
                        left : offset.left,
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

      $("#imgs").mouseover(function(e){
      	var small_img = $(e.target).attr("src");
      	 $("#big_img").attr("src",small_img);
      });
        
		});
	});
});