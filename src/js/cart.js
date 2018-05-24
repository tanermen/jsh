require(["config"],function(){
	
	require(["jquery","artTemplate","load","cookie"],function($,template){
		$(function(){
	//将cookie里面的数据渲染到页面上
	$.cookie.json=true;
	var products = $.cookie("products");
	    products = products || [];
	 if(products.length==0){
	 	return;
	 }
	 
	 var html = template("cartModel",{products:products});
	 
	 $(".cart_body").html(html);
	 
	//删除操作
	$(".cart").on("click",".delete",function(){
		var row = $(this).parents("tr");
		var id = row.data("id");
		var index = exsit(id,products);
		products.splice(index,1);//删除数组中的该索引值的数据
		$.cookie("products",products,{expires:7,path:"/"});//更新cookie
		row.remove();//dom结构中删除该条数据
		totalMoney();
	});
	
    // 修改数量
    $(".cart").on("click",".reduce,.add",function(){
    	 var row = $(this).parents("tr");
//  	 console.log(row);
    	 var _id = row.data("id");
//  	 console.log(_id);
//  	 console.log(typeof(_id));
    	 var index = exsit(_id,products);
//  	 console.log(index);
//  	 console.log(products);
//  	 console.log(typeof(products[index].id));
    	 if($(this).is(".add")){
    	 	products[index].amount++;
    	 }else{
    	 	    products[index].amount--;
    	 	if(products[index].amount<=1){
    	 		products[index].amount=1;
    	 	}

    	 }
       $.cookie("products",products,{expires:7,path:"/"});
       
       row.find(".amount").val(products[index].amount);
       row.find(".total").
       text("￥"+(products[index].amount*products[index].price.split("￥")[1]).toFixed(2));
        totalMoney();
    });
    
    //输入框修改数量
    $(".cart").on("blur",".amount",function(){
    	   var row = $(this).parents("tr");
    	   var _id = row.data("id");
    	   var index = exsit(_id,products);
    	   var thisAmount = $(this).val();
    	   if(!/^[1-9]\d*$/.test(thisAmount)){
    	   	$(this).val(products[index].amount);
    	   	  return;
    	   }
    	    products[index].amount = thisAmount;
    	  
    	 $.cookie("products",products,{expires:7,path:"/"});
    	 row.find(".total").
       text("￥"+(products[index].amount*products[index].price.split("￥")[1]).toFixed(2));
       totalMoney();
    });
    	
    //设置全选/勾选	
    $(".ckall").click(function(){
    	  var status = $(this).prop("checked");
    	  $(".ck_pro").prop("checked",status);
    	  totalMoney();
    });
	
	$(".ck_pro").click(function(){
		var b = $(".ck_pro:checked").length===products.length;
		$(".ckall").prop("checked",b);
		 totalMoney();
	});
	
	//封装函数，计算总金额,商品总数量
	
	function totalMoney(){
		 var money=0;
		 var amount=0;
//		 console.log($(".ck_pro:checked"));
		 $(".ck_pro:checked").each(function(index,elment){
		 	money += Number($(this).parents("tr").find(".total").text().split("￥")[1]);
		    amount +=Number($(this).parents("tr").find(".amount").val());
		 });
	   $(".totalAll").text("￥"+money .toFixed(2));
	 
	   $(".goods_amount").text(amount);
	}
	
	
	
	 // 封装函数，加入购物车时cookie中是否已经存在该商品
	function exsit(id, products){
		for(var i =0;i<products.length;i++){
			if(id==products[i].id){
				return i;
			}
		}
		return -1;
	}   
	
	//给去结算绑定点击事件，并将选中的商品的id传递订单详情页面
	   $("#s_jiesuan").click(function(){
	   	  var _idAll ="";
	   	$(".ck_pro:checked").each(function(){
//	   		console.log(this);
	   	   var row = $(this).parents("tr");
//	   	   console.log(row);
    	   var _id = row.data("id");
    	      _id = String(_id);
//  	   console.log(_id);
//  	   console.log(typeof(_id));
    	   _idAll = _idAll + "&id=" + _id;
    	   var index = exsit(_id,products);
	   	});
//	   	  console.log(_idAll);
	   	location.href = "http://localhost:8080/html/order.html?"+_idAll
	   });
			
		});
	});
});