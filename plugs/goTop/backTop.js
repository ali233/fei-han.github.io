/*
  //方法1，最原始的 jquery 使用方法

	var $goTop = $('<div id="go-top">回到顶部</div>');
	$('body').append($goTop);

	$(window).on('scroll', function(e){
		var offsetTop = $('body').scrollTop();
		console.log(offsetTop);
		if(offsetTop>100){

			$goTop.show();
		}else{
			$goTop.hide();
		}
	})
	$goTop.on('click', function(){
		$(window).scrollTop(0);
	});
*/

//方法2简单的包装一下
// var goTop = {
// 	init : function() {
// 		if ($('#go-top').length > 0) {return;}
// 		var $goTop = $('<div id="go-top">回到顶部</div>');
// 		$('body').append($goTop)
// 		this.$goTop = $goTop;
// 		this.bind();
// 	},
// 	bind : function(){
// 		var self = this;
// 		$(window).on('scroll',function(){
// 			var offsetTop = $('body').scrollTop()
// 			if (offsetTop > 100) {
// 				self.$goTop.show()
// 			}else {
// 				self.$goTop.hide()
// 			}
// 		})
// 		this.$goTop.on('click',function(){
// 			$('body').scrollTop(0)
// 		});
// 	}
// }
 //方法3， 用了立即执行函数表达式，来实现封装
 var goTop = (function(){
 	var $goTop = $('<div id="go-top">回到顶部</div>');
	$('body').append($goTop);
	function init(){
		$(window).on('scroll', function(e){
			var offsetTop = $('body').scrollTop();
			console.log(offsetTop);
			if(offsetTop>100){

				$goTop.show();
			}else{
				$goTop.hide();
			}
		})
		$goTop.on('click', function(){
			$(window).scrollTop(0);
		});
	}
	return {
		init : init
	}
 })();
 //调用
 // goTop.init()