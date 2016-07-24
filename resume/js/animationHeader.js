/*------navShow------*/
$.goNavShow = function(node){
	var $node = $(node)
	$(window).on('scroll',function(e){
		e.preventDefault();
		var offsetY = $(this).scrollTop();
		if (offsetY>=200) {
			$node.addClass('visible');
		}else{
			$node.removeClass('visible')
		}
	})
}
