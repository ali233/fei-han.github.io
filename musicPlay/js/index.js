
var musicList = [
        {
            name:"Dear friends-日本ACG.mp3",
            singer:"TRIPLANE",
            style:"日本ACG",
            url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgDear%20friends-%E6%97%A5%E6%9C%ACACG.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imglufei.jpg"
        },
        {
            name:"Hello-Adele.mp3",
            singer:"Adele",
            style:"欧美",
            url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgHello-Adele.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imgadele1.jpg"
        },
        {
            name:"Imagine-John Lennon.mp3",
            singer:"John Lennon",
            style:"欧美",
            url:"http://7xwhtd.com1.z0.glb.clouddn.com/imgImagine-John%20Lennon.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imgJohn%20Lennon.jpg"
        }
    ]

console.log(musicList)
var myAudio = $('audio')[0]
var current = 0
console.log(myAudio)

/*--设置播放/暂停、上一曲/下一曲按键--*/
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
	$('#controlBtn').removeClass('icon-pause').addClass('icon-play')
}
function prev(){
	go(current-1)
}
function next(){
	go(current+1)
}
function go(index){
	if (index > musicList.length-1) {
		index = 0
	}
	if (index < 0) {
		index = musicList.length-1
	}
	var song = musicList[index]
	current = index
	showMusic(current)
	myAudio.play()	
	$('#controlBtn').addClass('icon-pause').removeClass('icon-play')
}

function showMusic(num){
	$('audio').prop('src',musicList[num].url)
	$('.song-info .songname').text(musicList[num].name)
	$('.song-info .singer').text(musicList[num].singer)
	$('.song-info .songstyle').text(musicList[num].style)
	$('.background img').prop('src',musicList[num].pic)
	
}
//预加载播放器
window.onload= showMusic(current);

/*--进度条控制--*/
setInterval(present,50)
$('.basebar').on('mousedown',function(e){
	var posX = e.clientX
	var targetLeft = $(this).offset().left
	var percentage = (posX - targetLeft)/$(this).width()*100
	myAudio.currentTime = myAudio.duration*percentage/100
})
function present(){
	var length = myAudio.currentTime/myAudio.duration*100
	$('.progressbar').width(length + '%')
	if (myAudio.currentTime === myAudio.duration) {
		next()
	}
}
$('.icon-collect').on('click',function(){
	$(this).toggleClass('start')
})
$('.icon-tolove').on('click',function(){
	$(this).toggleClass('love')
})
$('.music-control span').on('click',function(){
	$(this).addClass('seleted').siblings('span').removeClass('seleted')
})