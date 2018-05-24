;
(function($){
	function seamless({imgs,width,height}){
	this.imgs = imgs; 
	this.height = height;
    this.width = width;
    this.len = imgs.length;
    this.lastLen = this.len + 2;

	// ul的样式
	this.lisWidth = width*(this.len + 2);
	this.lisLeft = -width;
	
	this.container = null;
	this.lis = null;
	this.is = null;
	this.timer = null;
	this.currentIndex =1;
	this.nextIndex = 2;
}

$.extend(seamless.prototype,{
	//创建Dom元素
	createDom:function(container){
		this.container = $(container);
		this.container.addClass("seam_container");
		  var lis ="",
		      is = "";
		  //添加最后一张图片和小圆点样式
		  lis = `<li>
				<a href ="${this.imgs[this.len-1].href}">
					<img src="${this.imgs[this.len-1].src}"/>
				</a>
			</li>`;
		      
		for(var i = 0;i<this.len;i++){
			
			lis += `<li ${i==0?'style = "display:block"':''}>
				<a href ="${this.imgs[i].href}">
					<img src="${this.imgs[i].src}"/>
				</a>
			</li>`
		  is+=`<i ${i==0?'class="current"':''}><em></em></i>`
		}
		//循环结束后，添加第一张图片和小圆点样式
		 lis += `<li>
				<a href ="${this.imgs[0].href}">
					<img src="${this.imgs[0].src}"/>
				</a>
			</li>`;
		
		var html = `<ul class="lis">${lis}</ul>
		            <span class="is">${is}</span>`;
		  
		  this.container.html(html);
		  // 设置css样式
		  this.container.css({
		  	width:this.width,
		  	height:this.height,
		  	left: this.left
		  });
		  
		  $(".lis",this.container).css({
		  	 width:this.lisWidth,
		  	 height:this.height,
		  	 left:this.lisLeft
		  });
		  
	      $("li,img",this.container).css({
	      	width:this.width,
		  	height:this.height
	      });
	      
	      $(".is",this.container).css({width:this.width});
	     
	     //保存属性
	     this.lis = $(".lis",this.container);
	     this.is = $("i",this.container);
	     this.registerEventListener();
	},   
	
	//自动轮播
	autoPlay : function(){
	   this.timer = setInterval($.proxy(this.move, this),1000);
	},
	
	// 停止自动轮播
	stopPlay : function(){
		clearInterval(this.timer);
	},
	
	move : function(){
		var  _left = -1*this.width*this.nextIndex;
//		
         var that = this;
		this.lis.animate({'left':_left},400,function(){

			if(that.currentIndex===that.lastLen-1){
				that.currentIndex = 1;
				that.nextIndex = 2;
				that.lis.css({left: -1*that.width});
			}else if(that.currentIndex == 0){
				that.currentIndex = that.lastLen -2;
				that.nextIndex = that.lastLen-1;
				that.lis.css({left:-1*(that.lastLen-2)*that.width});

			}
		});
		
		  var circleIndex = this.nextIndex - 1;
		  
			if (circleIndex < 0)
				circleIndex = this.lastLen - 3;
			else if (circleIndex >= this.lastLen - 2)
				circleIndex = 0;
			for (var i = 0; i < this.lastLen - 2; i++) {
			$(".is i:eq("+i+")",this.container).removeClass("current");
//				$("this.is.eq("+i+")").removeClass("current");
			}
			
			$(".is i:eq("+circleIndex+")",this.container).addClass("current");
			
//			circles[circleIndex].className = "current";

		this.currentIndex =this.nextIndex;
	     this.nextIndex++;
	},
	
//	// 鼠标移入小点，图片切换
	over : function(e){
		var index = $(e.target).index();
//		  if(this.currentIndex == index){
//		  	return;
//		  }
		this.nextIndex = index+1;
		this.move();
	},
//	// 向前翻页
//	previous : function(){
//		this.nextIndex = this.currentIndex - 1;
//		this.move();
//	},
//	//向后翻页
//	next1 : function(){
//		console.log(this);
//		this.move();
//	},
//	//注册事件监听
	registerEventListener:function(){
//		//鼠标移入移出
    this.container.hover($.proxy(this.stopPlay, this), $.proxy(this.autoPlay, this));
//	  //   小圆点滑过切换图片
	this.is.mouseover($.proxy(this.over,this));
	//  前后翻页
//	this.prev.on("click",$.proxy(this.previous,this));
//	this.next.on("click",$.proxy(this.next1,this));
	
//	this.prev.click($.proxy(this.previous,this));
//	this.next.click($.proxy(this.next1,this));
	}
//	
   });
//
//  //$.fn 等于 jQuery.prototype，向 jQuery.prototype 中扩展添加 carousel 方法
   $.fn.seamless = function(options){//this是指调用carousel方法的Dom对象，可能为一个集合，
   	  this.each(function(index,element){
   	  	 var c = new seamless(options);
   	  	 c.createDom(element);
   	  	     c.autoPlay();
        });
   	   }
 	 

//
 })(jQuery);