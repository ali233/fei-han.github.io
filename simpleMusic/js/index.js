var songs = [
	{
		name:"Fade",
	    singer:"Alan Walker",
	    album:"Fade",
	    url:"http://7xwhtd.com1.z0.glb.clouddn.com/Alan%20Walker%20-%20Fade.mp3",
	    picture:"http://7xwhtd.com1.z0.glb.clouddn.com/Alan.jpg"
	},
	{
	    name:"Dear friends",
	    singer:"TRIPLANE",
	    album:"ONE PIECE MEMORIAL BEST",
	    url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgDear%20friends-%E6%97%A5%E6%9C%ACACG.mp3",
	    picture:"http://7xwhtd.com1.z0.glb.clouddn.com/imglufei.jpg"
	},
	{
	    name:"Hello",
	    singer:"Adele",
	    album:"25",
	    url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgHello-Adele.mp3",
	    picture:"http://7xwhtd.com1.z0.glb.clouddn.com/imgadele1.jpg"
	},
	{
	    name:"Imagine",
	    singer:"John Lennon",
	    album:"Imagine ",
	    url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgImagine-John%20Lennon.mp3",
	    picture:"http://7xwhtd.com1.z0.glb.clouddn.com/imgJohn%20Lennon.jpg"
	}
	
]
console.log(songs)
var myAudio = $('audio')[0]
var currentIndex = 0
console.log(myAudio)

/*--设置播放/暂停、切换频道/下一曲按键--*/
$('#controlBtn').on('click',function(){
	if (myAudio.paused) {
		play()
	}else{
		pause()
	}
})
$('#prevBtn').on('click',function(){
	prev()
})
$('#nextBtn').on('click',function(){
	next()
})
function play(){
	myAudio.play()
	$('#controlBtn').addClass('icon-pause').removeClass('icon-play')
}
function pause(){
	myAudio.pause()
	$('#controlBtn').addClass('icon-play').removeClass('icon-pause')
}
function prev(){
	go(currentIndex - 1)
}
function next(){
	go(currentIndex + 1)
}
function go(index){
	if (index > songs.length-1) {
		index = 0
	}
	if (index < 0) {
		index = songs.length - 1
	}
	var song = songs[index]
	myAudio.src = song.url
	currentIndex = index
	playList(currentIndex)
	myAudio.play()
	$('#controlBtn').addClass('icon-pause').removeClass('icon-play')
}
/*--获取歌曲信息--*/
function playList(num){
	var url = songs[num].url
	var bgPic = songs[num].picture
	var title = songs[num].name
	var author = songs[num].singer
	var album = songs[num].album
	$('audio').prop('src',url)
	$('.songname').text(title)
	$('.songname').attr('title',title)
	$('.singer').text(author)
	$('.singer').attr('title',author)
	$('.album').text(album)
	$('.background').css({
		'background-image': 'url('+bgPic+')',
		'background-repeat': 'no-repeat',
		'background-position': 'center',
		'background-size': 'cover'
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
		next()
	}
}
/*--按钮绑定事件--*/
$('.icon-collect').on('click',function(){
	$(this).toggleClass('start')
})
$('.icon-tolove').on('click',function(){
	$(this).toggleClass('love')
})
/*--单曲循环--*/
$('#cycle').on('click',function(){
	$(this).addClass('selected').siblings('.selected').removeClass('selected')
	if ($(this).hasClass('selected')) {
		$('audio').attr('loop','loop')
	}
	if ($(this).hasClass('colored')) {
		$('audio').attr('loop','no-loop')
	}
})
$('#step').on('click',function(){
	$(this).addClass('selected').siblings('.selected').removeClass('selected')
})
/*--预加载播放器--*/
window.onload = playList(currentIndex)
