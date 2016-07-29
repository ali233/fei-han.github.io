 $(function(){
 	var musicList = [
        {
            name:"Dear friends-日本ACG.mp3",
            singer:"TRIPLANE",
            style:"日本ACG",
            hurl:"http://7xwhtd.com1.z0.glb.clouddn.com/imgDear%20friends-%E6%97%A5%E6%9C%ACACG.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imglufei.jpg"
        },
        {
            name:"Hello-Adele.mp3",
            singer:"Adele",
            style:"欧美",
            hurl:"http://7xwhtd.com1.z0.glb.clouddn.com/imgHello-Adele.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imgadele1.jpg"
        },
        {
            name:"Imagine-John Lennon.mp3",
            singer:"John Lennon",
            style:"欧美",
            hurl:"http://7xwhtd.com1.z0.glb.clouddn.com/imgImagine-John%20Lennon.mp3",
            pic:"http://7xwhtd.com1.z0.glb.clouddn.com/imgJohn%20Lennon.jpg"
        }
    ];
    var myAudio = $('audio').get(0);
    var currentIndex = 0
    var currentTime = 0
    var allTime = 0
    $('.btn1').on('click',function(){
    	if (myAudio.paused) {
    		myAudio.play()
            $('.btn1').removeClass('icon-play').addClass('icon-pause')
    	}else{
    		myAudio.pause()
            $('.btn1').removeClass('icon-pause').addClass('icon-play')
    	}
    })
    /*获取当前歌曲的总播放时间与实际播放时间*/
    function getTime(){
    	currentTime = myAudio.currentTime
    	allTime = myAudio.duration
    	var remainTime = allTime - currentTime
    	/*对实际播放时间的秒数做一个判断，当秒数小于10，前面加个0*/
    	var textTime = parseInt(remainTime%60)>9?parseInt(parseInt(remainTime%60)):'0'+parseInt(parseInt(remainTime%60));
    	var remainTimeText = parseInt(remainTime/60) + ':' +textTime;
    	$('.time').text(remainTimeText)
    	if (currentTime === allTime) {
    		next()
    	}
    	/*进度条*/
    	var progress = currentTime/allTime
    	var barWidth = progress * $('.whole-time').width()
    	$('.spent-time').width(barWidth)
    }
    /*鼠标在进度条上调节音乐进度*/
    $('.whole-time').on('mousedown',function(e){
    	var posX = e.clientX
    	var targetLeft = $(this).offset().left
        console.log(targetLeft)
    	var timeBarText = (posX - targetLeft)/$('.whole-time').width()*allTime
    	$('audio').prop('onplay',myAudio.currentTime = timeBarText)
    })
    /*歌曲地址、背景墙、歌曲信息*/
    function playMusic(num){
    	$('audio').prop('src',musicList[num].hurl)
    	$('.background img').attr('src',musicList[num].pic)
    	$('.song-info .songname').text(musicList[num].name)
    	$('.song-info .singer').text(musicList[num].singer)
    	$('.song-info .songstyle').text(musicList[num].style)
    }
    /*到第几首歌*/
    function go(index){
    	if (index < 0) {
    		index = musicList.length - 1
    	}
    	if(index > musicList.length - 1){
    		index = 0
    	}
    	currentIndex = index
    	playMusic(currentIndex)
    	myAudio.play()
    	$('.play-control .icon-play').removeClass('icon-play').addClass('icon-pause')
    }
    function next(){
    	go(currentIndex + 1)
    }
    function prev(){
    	go(currentIndex - 1)
    }
    /*事件绑定*/
    $('.icon-prevsong').on('click',function(){
    	prev()
    })
    $('.icon-nextSong').on('click',function(){
    	next()
    })
    $('.icon-collect').on('click',function(){
    	$(this).toggleClass('start')
    })
    $('.icon-tolove').on('click',function(){
    	$(this).toggleClass('love')
    })
    $('.music-control span').on('click',function(){
    	$(this).addClass('seleted').siblings('span').removeClass('seleted')
    })
    window.onload= playMusic(currentIndex);
    setInterval(getTime,500);
 })
 