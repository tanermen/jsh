require.config({
	baseUrl:"/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4.min",
		artTemplate : "lib/artTemplate/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		fly : "lib/jquery-plugins/jquery.fly.min",
		zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		fade: "lib/jquery-plugins/jquery.carousel_fade",
		seamless: "lib/jquery-plugins/jquery.carousel_seamless",
		load : "js/loadHeadAndFooter"
	},
	shim :{
		fly :{
			deps : ["jquery"]
		},
		
		zoom : {
			deps : ["jquery"]
		},
		fade : {
			deps : ["jquery"]
		},
		
		seamless:{
			deps:["jquery"]
		}
	}
	
});
