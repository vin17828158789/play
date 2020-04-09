window.onload=function(){
    //获取元素对象
    var play=document.getElementById('play');//播放暂停
    var prev=document.getElementById('prev');//上一曲
    var next=document.getElementById('next');//下一曲
    var audio=document.getElementById('audio');
    var stop=document.getElementById('stop');//停止
    var lis=document.querySelectorAll('#playerList li');//音乐列表
    var Pgrees=document.getElementById('progrees');//进度条
    var preTime=document.getElementById('presentTime');//当前播放时间
    var totTime=document.getElementById('totalTime');//总时间

    //注册事件类型
    play.addEventListener('click',thePlay);//播放暂停
    prev.addEventListener('click',thePrev);//上一曲
    next.addEventListener('click',theNext);//下一曲
    stop.addEventListener('click',theStop);//停止

    var flag=true;//做判定
    var MusicSrc=['./video/1.mp3','./video/2.mp3','./video/3.mp3'];
    var num=0;
    //方法功能
    //播放和暂停
    function thePlay(){
        // alert(1)
        if(flag){
            audio.play();
            play.title='暂停';
            play.className='play2';
            thePgrees();
            thePlayTime();
        }else{
            audio.pause();
            play.title='播放';
            play.className='play1';
        }
        flag=!flag;//切换播放与暂停
    }
    //上一曲
    function thePrev(){
        prev.title='上一曲';
        num--;
        if(num<0){
            num=MusicSrc.length-1;//取到最后一首歌
        }
        audio.src=MusicSrc[num];//把定义的歌曲数组赋值到文件路径中
        flag=true;
        thePlay();
        theList();
    }
    //下一曲
    function theNext(){
        prev.title='上一曲';
        num++;
        if(num>MusicSrc.length-1){
            num=0;//取到第一首歌
        }
        audio.src=MusicSrc[num];//把定义的歌曲数组赋值到文件路径中
        flag=true;
        thePlay();
        theList();
    }
    //停止
    function theStop(){
        stop.title='停止';
        audio.currentTime=0;//获取当前时间以秒计算
        flag=false;
        thePlay();
    }
    //音乐列表
    function theList(){
        for(let i=0;i<=lis.length-1;i++){
            lis[i].className='';
        }
        lis[num].className='active';
    }
    //进度条
    // var timerid=null;
    function thePgrees(){
        // clearInterval(timerid);
        var timerid=setInterval(function(){
            var newTime=audio.currentTime;//当前播放时间
            var oldTime=audio.duration;//总时间
            curProgrees.style.width=newTime/oldTime*550+'px';//当前进度条长度
            if(newTime==oldTime){
                theNext();
            }
        },30)
    }
    //播放时间
    function thePlayTime(){
        // clearInterval(timerid);
        var timerid=setInterval(function(){
            var newTime=audio.currentTime;//当前播放时间
            var oldTime=audio.duration;//总时间
            //分钟数
            var minutes=Math.floor(newTime/60);
            if(minutes<=10){
                minutes='0'+minutes;
            }
            //秒数
            var sconeds=Math.floor(newTime%60);
            if(sconeds<=10){
                sconeds='0'+sconeds;
            }
            if(newTime==oldTime){
                theNext();
            }
            if(isNaN(oldTime)){
                oldTime=0;
            }
            //总分钟数
            var oldminutes=Math.floor(oldTime/60);
            if(oldminutes<=10){
                oldminutes='0'+oldminutes;
            }
            //总秒数
            var oldsconeds=Math.floor(oldTime%60);
            if(oldsconeds<=10){
                oldsconeds='0'+oldsconeds;
            }
            preTime.innerHTML=`${minutes}:${sconeds}`;
            totTime.innerHTML=`${oldminutes}:${oldsconeds}`;
        },30)
    }
}