function Slides($element,options){
	this.options = options;
	this.$element = $element;
	this.clock = null;
}

Slides.prototype.init = function(){
	this.preparetHtml();
	this.bindEvents();
	if (this.options.auto) {
		this.autoPlay()
	}  
}

Slides.prototype.preparetHtml = function(){
	var $art = this.$element,
	options = this.options,
	curIdx = this.curId = 0,
	isAnimate = this.isAnimate = false,
	$items = this.$items = $art.children().wrapAll('<div class=slider-main></div>'),
    $sliderMain = this.$sliderMain  = $art.children().wrapAll('<div class=viewPoint></div>'),
    $viewPoint = this.$viewPoint = $sliderMain.parent(),
    $prev = this.$prev = $('<a class="prev arrow" href=#><</a>'),  
    $next = this.$next  = $('<a class="next arrow" href=#>></a>'),
    $bullet = this.$bullet = $('<ul class=bullet></ul>');
	$items.each(function(index){
	  $bullet.append($('<li></li>'));
	})
	$viewPoint.append($prev).append($next).append($bullet)
	$('li:first').addClass('active');
	  
	var itemsWidth = this.itemsWidth = options.width,
	    itemsHeight = this.itemsHeight = options.height,
	    itemsCount = this.itemsCount = $sliderMain.children().size();
	    $viewPoint.css({
	      position: 'relative',
	      width: itemsWidth,
	      height: itemsHeight,
	      overflow: 'hidden'
	    });
	    
	    $sliderMain.css({
	    position: 'absolute',
	    left: '0'
	  });

	$sliderMain.prepend($items.last().clone());
	$sliderMain.append($items.first().clone());
	var itemsRealCount = this.itemsRealCount = $sliderMain.children().length;

	$sliderMain.css({
	    left: 0 - itemsWidth,
	    width: itemsRealCount*itemsWidth
	});
}

Slides.prototype.bindEvents = function(){
	//绑定事件
	var self = this,
		curIdx = this.curIdx;
	this.$art.on('mouseover',function(e){	
	    self.stopPlay();
	}).on('mouseleave',function(e){
	    self.autoPlay();
	})
	this.$prev.on('click',function(e){
	    e.preventDefault()
	    self.playPrev();
	})
	this.$next.on('click',function(e){
	    e.preventDefault()
	    self.playNext();
	})
	this.$bullet.find('li').on('click',function(){
	    var idx = $(this).index();
	    if (idx>curIdx) {
	        self.playNext(idx-curIdx);
	    }else if(idx<curIdx){
	        self.playPrev(curIdx-idx);
	    }
	});
}

Slides.prototype.next = function(idx){
	var idx = idx || 1,
	isAnimate = this.isAnimate,
	sliderMain = this.sliderMain,
	curIdx = this.curIdx,
	itemsWidth = this.itemsWidth,
	itemsCount = this.itemsCount,
	self = this;

    if (!isAnimate) {
        isAnimate = true;
        $sliderMain.stop(true,true).animate({left: '-='+(itemsWidth*idx)},function(){
            curIdx = (curIdx + idx)%itemsCount;
            if (curIdx ===0 ) { //检测是否移动到了队尾克隆元素上
                $sliderMain.css({left: 0-itemsWidth});  //复位，把当前位置切换到初始位置
            }
            isAnimate = false;
            self.setBullet()
        });
    }
}

Slides.prototype.prev = function(idx){
	var idx = idx || 1,
	isAnimate = this.isAnimate,
	sliderMain = this.sliderMain,
	curIdx = this.curIdx,
	itemsWidth = this.itemsWidth,
	itemsCount = this.itemsCount,
	self = this;
    if (!isAnimate) {
        isAnimate = true;
        $sliderMain.stop(true,true).animate({left: '+='+(itemsWidth*idx)},function(){
            curIdx = (itemsCount+curIdx-idx)%itemsCount;
            if (curIdx === (itemsCount-1)) { //检测是否移动到了队首克隆元素上
                $sliderMain.css({left: 0-itemsWidth*itemsCount}); //复位，把当前位置切换到初始位置;
            }
            isAnimate = false;
            self.setBullet();
        });
    }
}

Slides.prototype.autoPlay = function(){
	var self = this;
    this.clock = setInterval(function(){
    	self.playNext()
    },2000);
}
Slides.prototype.stopPlay = function(){
    clearInterval(clock)
}
Slides.prototype.setBullet = function(){
    this.$bullet.find('li').removeClass('active')
                  .eq(curIdx).addClass('active')

}

$.fn.slides=function(options){
	this.each(function(){
		var element = this
		var slides = new Slides($(element),options)
	})
}


