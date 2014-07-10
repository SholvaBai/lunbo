(function($) { 
	$.fn.lunbo = function(options) { 
		// 全局变量
		var direction='n'; //移动方向
		var _this = this; //当前对象
		var defaults = { //默认配置
			type: 'jianyin',
			speed: 3000
		};  
		var config = $.extend(defaults, options);  //配置
		// 局部变量
		var allImg = _this.children('#lunimg').children('img');
		var activeImg = _this.children('#lunimg').children('img.active');
		var all = allImg.length;

		allImg.css('opacity',0);
		activeImg.css('opacity',1);
		var interval = window.setInterval(function(){play(direction)}, config.speed);
		
		_this.children('.last').click(function(){
			if(allImg.is(":animated")){ return false;} 
			var direction="l";play(direction);
		});	

		_this.children('.next').click(function(){
			if(allImg.is(":animated")){ return false;} 
			play(direction);
		});	
		
		_this.hover(function() {
			window.clearInterval(interval);
		}, function() {
			interval = window.setInterval(function(){ play(direction);}, config.speed);
		}

		);

		function play(direction) {

			var allImg = _this.children('#lunimg').children('img');
			var activeImg = _this.children('#lunimg').children('img.active');
			var z = activeImg.index();

			(direction=="l")?  (z==0)?n=(all-1):n=z-1 : (z==(all-1))?n = 0:n = z+1;
			switch (config.type){
				case 'jianyin': 
					activeImg.removeClass('active').animate({opacity:0,'z-index':1},1000);
					allImg.eq(n).addClass('active').animate({opacity:1,'z-index':100},1000);
				break;
				case 'gundanjianyin': 
					activeImg.removeClass('active').animate({left:'1000px','z-index':1},1000,function(){
						$(this).css({'left':'0px','opacity':0});
					})
					allImg.eq(n).addClass('active').animate({opacity:1,'z-index':100},1000);
				break;
				case 'rightgun': 
					if (direction=='l') {
						activeImg.removeClass('active').animate({opacity:0,'z-index':1},1000);
						allImg.eq(n).addClass('active').css({'right':'1000px','opacity':1}).animate({right:'0px','z-index':100},1000);
					}else{
						activeImg.removeClass('active').animate({right:'1000px','z-index':1,opacity:0},1000,function(){
							$(this).css({'right':'0px'});
						})
						allImg.eq(n).addClass('active').animate({opacity:1,'z-index':100},1000);
					}	
				break;
				case 'kuaixiao':
					if (direction=='l') {
						console.log('l');
					}else{
						var aw = _this.width(); ah = _this.height();
						var src = activeImg.attr('src');
						if ($('.nbd').length!=0) {
							$('.nbd').remove();
						}
						var nsty = 'width:'+aw+'px; height:'+ah+'px; position:absolute;top:0px;z-index:101';
						var nbd = '<div class="nbd" style="'+nsty+'"></div>';
						_this.append(nbd);
						var w = aw/100; var h = ah;
						var pr = 0;
						for (var i = 0; i < 100; i++) {
							var sty = 'width:'+w+'px;height:'+h+'px;overflow:hidden;top:0px;left:'+i*w+'px;float:left;';
							var imsty = 'position:relative;top:0px;right:'+pr+'px;';
							var bd = '<div class="bd'+i+'" style="'+sty+'"><img style="'+imsty+'" src="'+src+'"/></div>';
							$('.nbd').append(bd);
							pr += w;
						}
						activeImg.removeClass('active').animate({opacity:0,'z-index':1},1000);
						allImg.eq(n).addClass('active').animate({opacity:1,'z-index':100},1000);
						var i = 0;
						fadeout(i);
					}
				break;
			}
		}

		function fadeout(i){
			if (i==100) {
				return false;
			}else{
				_this.children('.nbd').children('.bd'+i).animate({opacity:0},1,function(){
					i++;
					fadeout(i);
				})
			}
		}	
	};    
})(jQuery);  