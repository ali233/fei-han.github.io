var myAudio = $('audio')[0]
var current = 0
console.log(myAudio)

/*--设置播放/暂停、切换频道/下一曲按键--*/
$('#controlBtn').on('click',function(){
	if (myAudio.paused) {
		play()
	}else{
		pause()
	}
})
$('#changeBtn').on('click',function(){
	getChannel()
})
$('#nextBtn').on('click',function(){
	getMusic()
})
function play(){
	myAudio.play()
	$('#controlBtn').addClass('icon-pause').removeClass('icon-play')
}
function pause(){
	myAudio.pause()
	$('#controlBtn').addClass('icon-play').removeClass('icon-pause')
}
/*--获取随机频道信息--*/
function getChannel(){
	$.ajax({
		url: 'http://api.jirengu.com/fm/getChannels.php',
		dataType: 'json',
		Method: 'get',
		success: function(response){
			console.log(response)
			var channels = response.channels;
			var num = Math.floor(Math.random()*channels.length)
			var channelName = channels[num].name
			var channelId = channels[num].channel_id
			$('.songstyle').text(channelName)
			$('.songstyle').attr('title',channelName)
			$('.songstyle').attr('data-id',channelId)
			getMusic()
		}
	})
}
/*--获取歌曲信息--*/
function getMusic(num){
	$.ajax({
	url: 'http://api.jirengu.com/fm/getSong.php',
	dataType: 'json',
	Method: 'get',
	data: {
		'channel': $('.songstyle').attr('data-id')
	},
	success: function(ret) {
		console.log(ret)
		var resource = ret.song[0]
		console.log(resource)
		var url = resource.url
		var bgPic = resource.picture
		var title = resource.title
		var author = resource.artist
		$('audio').prop('src',url)
		$('.songname').text(title)
		$('.songname').attr('title',title)
		$('.singer').text(author)
		$('.singer').attr('title',author)
		$('.background').css({
			'background': 'url('+bgPic+')',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'background-size': 'cover'
		});
		 play()
	}
	});
}

/*--进度条控制--*/
setInterval(present,50)  //每50ms统计一次当前进度
$('.basebar').on('mousedown',function(e){
	var posX = e.clientX //用户点击时的坐标
	var targetLeft = $(this).offset().left //初始坐标
	var percentage = (posX - targetLeft)/$(this).width()*100  
	myAudio.currentTime = myAudio.duration*percentage/100  //当前时间百分比
})
function present(){
	var length = myAudio.currentTime/myAudio.duration*100 //进度条长度
	$('.progressbar').width(length + '%')
	if (myAudio.currentTime === myAudio.duration) {
		getMusic()
	}
}
/*--按钮绑定事件--*/
$('.icon-collect').on('click',function(){
	$(this).toggleClass('start')
})
$('.icon-tolove').on('click',function(){
	$(this).toggleClass('love')
})
$('#cycle').on('click',function(){
	$(this).toggleClass('seleted').toggleClass('colored')
	if ($(this).hasClass('seleted')) {
		$('audio').attr('loop','loop')
	}
	if ($(this).hasClass('colored')) {
		$('audio').attr('loop','no-loop')
	}
})

/*--预加载播放器--*/
$(document).ready(getChannel())