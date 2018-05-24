;
(function($){
	function fade({imgs,width,height}){
	this.imgs = imgs;
	this.width = width;
	this.height = height;
	
	this.container = null;
	this.lis = null;
	this.is = null;
	this.len = imgs.length;
	this.prev = null;
	this.next = null;
	this.timer = null;
	this.currentIndex =0;
	this.nextIndex = 1;
}

 $.extend(fade.prototype,{
	//创建Dom元素
	createDom:function(container){
		this.container = $(container);
		this.container.addClass("m_container");
		  var lis =""; is = "";
		for(var i = 0;i<this.len;i++){
			lis += `<li ${i==0?'style = "display:block"':''}>
				<a href ="${this.imgs[i].href}">
					<img src="${this.imgs[i].src}"/>
				</a>
			</li>`
		  is+=`<i ${i==0?'class="current"':''}></i>`
		}
		var prevNext = "";
		    prevNext = `<div class="prev"><</div>
		                <div class="next">></div>`
		
		var html = `<ul class="lis">${lis}</ul>
		            <span class="is">${is}</span>
		            ${prevNext}`;
		  
		  this.container.html(html);
		  // 设置css样式
		  this.container.css({
		  	width:this.width,
		  	height:this.height
		  });
		  
	      $(".lis,li,img",this.container).css({
	      	width:this.width,
		  	height:this.height
	      });
	      
	      $(".is",this.container).css({width:this.width});
	     
	     //保存属性
	     this.lis = $("li",this.container);
	     this.is = $("i",this.container);
	     this.prev = $(".prev",this.container);
	     this.next = $(".next",this.contanier);
	     
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
//		console.log(this.len);
		this.lis.eq(this.currentIndex).stop().fadeOut();
		this.lis.eq(this.nextIndex).stop().fadeIn();
		this.is.eq(this.currentIndex).removeClass("current");
		this.is.eq(this.nextIndex).addClass("current");
		
		this.currentIndex =this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex>=this.len){
			this.nextIndex = 0;
		}
	},
	// 鼠标移入小点，图片切换
	over : function(e){
		var index = $(e.target).index();
		  if(this.currentIndex == index){
		  	return;
		  }
		this.nextIndex = index;
		this.move();
	},
	// 向前翻页
	previous : function(){
		this.nextIndex = this.currentIndex-1;
		if(this.nextIndex<0){
			this.nextIndex = this.len-1;
		}
		this.move();
	},
	//向后翻页
	next1 : function(){
//		console.log(this);
		this.move();
	},
	//注册事件监听
	registerEventListener:function(){
		//鼠标移入移出
    this.container.mouseover(function(){$(".prev,.next").css({display:"block"})});
    this.container.mouseleave(function(){$(".prev,.next").css({display:"none"})});
    this.container.hover($.proxy(this.stopPlay, this), $.proxy(this.autoPlay, this));
	  //   小圆点滑过切换图片
	this.is.mouseover($.proxy(this.over, this));
	//  前后翻页
//	this.prev.on("click",$.proxy(this.previous,this));
//	this.next.on("click",$.proxy(this.next1,this));
	
	this.prev.click($.proxy(this.previous,this));
	this.next.click($.proxy(this.next1,this));
	},
	
}); 

    //$.fn 等于 jQuery.prototype，向 jQuery.prototype 中扩展添加 carousel 方法
   $.fn.fade = function(options){//this是指调用carousel方法的Dom对象，可能为一个集合，
   	  this.each(function(index,element){
   	  	 var c = new fade(options);
   	  	 c.createDom(element);
   	  	     c.autoPlay();
   	  })
   }

})(jQuery);


