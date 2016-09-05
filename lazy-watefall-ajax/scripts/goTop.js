/**
 * 为jQuery对象扩展一个backtop插件
 * $(document).backtop();//调用backtop插件
 * 
 * 
 */

(function($){
	$.fn.goTop = function(){
		if ($('#go-top').length > 0) {return;}
		var $goTop = $('<div id="go-top">Top</div>').css({
			'position': 'fixed',
			'width': '50px',
			'height': '50px',
			'line-height': '50px',
			'text-align': 'center',
			'border-radius': '50px',
			'color': '#fff',
			'font-family': 'Microsoft YaHei',
			'font-size': '18px',
			'right': '45px',
			'bottom': '60px',
			'background-color': '#333',
			'opacity': '0.5',
			'z-index': '9999',
			'display': 'none',
			'cursor': 'pointer'
		});
		$('body').append($goTop);
		$goTop.click(function(){
	    	$('body').stop(true,true).animate({scrollTop: 0},500)
	 	 });

		$(window).on('scroll',function(){
			var offsetY = $('body').scrollTop();
			console.log('here')
			if(offsetY > 100){
			  $goTop.show();
			}else{
			  $goTop.hide();
			}
			console.log('dd')
		});  //绑定鼠标滚动事件
	}
})(jQuery)