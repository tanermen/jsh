require(["config"],function(){
	
	require(["jquery","artTemplate","load","cookie"],function($,template){
		$(function(){
	   //将购物车页面传过来的字符串做处理，最终得到一个记录需结算的商品id的数组
			var _idAll = location.search;
			 _idAll = _idAll.slice(1);
			_idAll = _idAll.split("&").slice(1);
			
			for(var i = 0;i<_idAll.length;i++){
			  _idAll[i] =_idAll[i].split("=")[1];
			}

	//将cookie里面的数据读取出来
	$.cookie.json=true;
	var products = $.cookie("products");
	    products = products || [];
	    // 定义一个空数组，存放需结算商品的相关信息
      var order_products = [];
       // 通过_idAll中的id与cookie中products做匹配，得到该id商品的所有信息
	 for(var i = 0;i<_idAll.length;i++){
	 	  var index = exsit(_idAll[i],products);
	 	if(index!= -1){
	 		order_products.push(products[index]);
	 	}
	 }
	 
	 // 用模板引擎将order_products中的 数据渲染到页面上
	 var html = template("cartModel",{order_products:order_products});
	   $(".cart_body").html(html);
	 
	 
	 //获得金额，和数量
	     var money=0;
		 var amount=0;
	 for(var i = 0;i<order_products.length;i++){
	 	amount += Number(order_products[i].amount);
	money += Number(order_products[i].price.split("￥")[1]*order_products[i].amount);
		    
	 }
	  $(".totalAll").text("￥"+money .toFixed(2));
	   $(".goods_amount").text(amount);
	  // 封装函数，加入购物车时cookie中是否已经存在该商品
	function exsit(id, products){
		for(var i =0;i<products.length;i++){
			if(id==products[i].id){
				return i;
			}
		}
		return -1;
	}   
	
		});
	});
});