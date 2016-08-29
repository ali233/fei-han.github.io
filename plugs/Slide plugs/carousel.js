function Carousel($element,options){
	//选择ul作为this.$element
	this.$element = $element.children('.art .viewpoint');
	this.$items = this.$element.children();
	
	this.$arrow = $element.find('.arrow');
	this.$pre = $element.find('.pre');
	this.$next = $element.find('.next');
	this.$bullet = $element.find('.bullet');
	this.itemWidth = $(window).width();
	//item数量，方便dom拓展
	this.itemNum = this.$items.length;
	//设置状态锁
    this.ready = false;
    //当前显示的item
    this.nowView = 0; 

    this.init(options);
}
Carousel.prototype = {
	defaultConfig : {
		carouselInterval : 3000,
		carouselSpeed: 600,
		isShowArrow: true
	},
	init : function(options){
		this.setObj(options);
		this.cloneItem();
		this.configCSS();
		this.configUrl(1);
 		this.autoPlay();
 		this.bindEvent();
	},
	setObj: function (options) {
		this.options = $.extend({},this.defaultConfig,options);
	},
	cloneItem: function () {
			var _this = this;
			_this.$element.prepend(_this.$items.last().clone());
			_this.$element.append(_this.$items.first().clone());	
			_this.realitemNum = _this.$element.children().length;	 
		},

	configCSS: function () {
		var _this = this;
		_this.$element.find('li').css('width',_this.itemWidth);
		_this.$element.find('.bgimg').css('width',_this.itemWidth);	
		_this.$element.css({
			left: 0 - _this.itemWidth,
			width: _this.itemWidth * _this.realitemNum
		});
		if (!_this.options.isShowArrow) {
			_this.$arrow.css('display','none');
		}
	},
	configUrl: function (idx) {
		var $element = this.$element.find('li').eq(idx);
		var $bgImg = $element.find('.cover');
		$bgImg.css('background-image', 'url('+ $bgImg.attr('data-bg-img') +')');
	},

	autoPlay: function () {
		var _this = this;
		this.clock = setInterval(function () {
			_this.playNext(); 
		}, _this.options.carouselInterval) 
	},

	stopAuto: function () {
		clearInterval(this.clock);
	},
	playPre: function (idx) {
		var _this = this;
		var idx = idx || 1;
		if(!_this.ready){
			_this.ready = true;
			_this.configUrl(_this.nowView);
			_this.$element.animate({ left:'+=' + (idx * _this.itemWidth) },_this.options.carouselSpeed,'swing',function () {
				_this.nowView = (_this.itemNum + _this.nowView - idx) % _this.itemNum;
				if(_this.nowView === (_this.itemNum - 1)){
					_this.$element.css({left: 0 - _this.itemWidth * _this.itemNum});
				}
				_this.bulletActive();
				_this.ready = false;
			});
		}	
	},

	playNext: function (idx) {
		var _this = this;
		var idx = idx || 1;
		if(!_this.ready){
			_this.ready = true;
			_this.configUrl(_this.nowView + 2);
			_this.$element.animate({ left:'-=' + (idx * _this.itemWidth) },_this.options.carouselSpeed,'swing',function () {
				_this.nowView = (_this.nowView + idx) % _this.itemNum;
				if(_this.nowView === 0){
					_this.$element.css({left: 0 - _this.itemWidth});
					_this.nowView = 0;
				} 
				_this.bulletActive();
				_this.ready = false;
			});		
		}				 
	},
	bulletActive: function () {
		var _this = this;
		_this.$bullet.children().removeClass("active").eq(_this.nowView).addClass('active')      
	},

	bindEvent: function () {
		var _this = this;
		_this.$pre.on('click',function () {
			 _this.playPre();
		});
		_this.$next.on('click',function () {
			 _this.playNext();
		});		
		_this.$bullet.children().on('click',function () {
			var idx = $(this).index();
			if (idx < _this.nowView) {
				_this.playPre(_this.nowView - idx);
			}
			else if (idx > _this.nowView) {
				_this.playNext(idx - _this.nowView);
			}
		}); 
		console.log('sf')
	}
}
console.log('sf')
function carousel ($node,obj) {
	var newCarousel = new Carousel($node,obj);
	return newCarousel;
}

	// return carousel;

