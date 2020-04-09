//所有网页都能加载
window.onload=function(){
   
    //1，获取元素对象
    //2，注册事件
    //3，注册事件功能

    //获取对应的元素对象
    var play=document.getElementById('play');//播放按钮
    var audio=document.getElementById('audio');//获取audio对象
    var prev=document.getElementById('prev');//上一曲按钮
    var next=document.getElementById('next');//下一曲按钮
    var active=document.getElementsByTagName('li');//音乐列表
    var stop=document.getElementById('stop');//暂停按钮
    var proGrees=document.getElementById('progrees');//进度条
    var newTime=document.getElementById('presentTime');//当前时间
    var oldTime=document.getElementById('totalTime');//总时间

    //注册事件
    play.addEventListener('click',theplay);
    prev.addEventListener('click',thePrev);
    next.addEventListener('click',theNext);
    stop.addEventListener('click',theStop);


    var flag=true;//全局变量，用于判定
    let num=0;//歌曲索引值
    //获取歌曲
    var musicSrc=['./video/1.mp3','./video/2.mp3','./video/3.mp3'];

    //注册功能
    //暂停/播放
    function theplay(){
        // alert(111);
        if(flag){
            audio.play();//播放
            play.title='暂停';//悬停提示文字
            play.className='play2';//切换暂停/播放的图标
            theProgrees();
            theNewTime();
        }else{
            audio.pause();//暂停
            play.title='播放';
            play.className='play1';
        }
        flag=!flag;//实现播放/暂停切换
    }

    //上一曲
    function thePrev(){
        // alert(111);
        prev.title='上一曲';
        num--;
        if(num < 0){
            num=musicSrc.length-1;//歌曲最大索引值
        }
        audio.src=musicSrc[num];//歌曲索引值赋值给歌曲文件路径数组
        flag=true;//切换播放
        theplay();
        theActive();
    }

    //下一曲
    function theNext(){
        // alert(111);
        next.title='下一曲';
        num++;
        if(num > musicSrc.length-1){
            num=0;
        }
        audio.src=musicSrc[num];
        flag=true;//切换播放
        theplay();
        theActive();
    }

    //音乐列表
    function theActive(){
        for(let i=0;i <= active.length-1;i++){
            active[i].className='';//取消所有的样式
        }
        active[num].className='active';//给样式
    }

    //停止
    function theStop(){
        audio.currentTime=0;//获取当前时间以秒计算
        flag=false;
        theplay();
    }
    //进度条
    function theProgrees(){
        var lenTime=setInterval(function(){
            var presentTime=audio.currentTime;//获取歌曲当前时间
            var totalTime=audio.duration;//获取歌曲总时间
            //计算当前进度条的长度
            curProgrees.style.width=presentTime/totalTime*550+'px';

            //进入下一曲
            if(presentTime==totalTime){
                theNext();
            }
        },30)
    }
    //当前时间显示设置
    function theNewTime(){
        var timerid=setInterval(function(){
            var presentTime=audio.currentTime;//获取歌曲当前时间
            var totalTime=audio.duration;//获取歌曲总时间
            //当前时间的分钟数
            var Minutes=Math.floor(presentTime/60);
            //当数值小于10时显示00
            if(Minutes<=10){
                Minutes='0'+Minutes;
            }
            //当前时间的秒数
            var Seconds=Math.floor(presentTime%60);
            if(Seconds<=10){
                Seconds='0'+Seconds;
            }
            //进入下一曲
            if(newTime==oldTime){
                theNext();
            }
            //当显示NaN时清成0
            if(isNaN(totalTime)){
                totalTime=0;
            }
            //总时间的分钟数
            var oldMinutes=Math.floor(totalTime/60);
            if(oldMinutes<=10){
                oldMinutes='0'+oldMinutes;
            }
            //总时间的秒数
            var oldSeconds=Math.floor(totalTime%60);
            if(oldSeconds<=10){
                oldSeconds='0'+oldSeconds;
            }
            //组合字符串
            newTime.innerHTML=`${Minutes}:${Seconds}`;
            oldTime.innerHTML=`${oldMinutes}:${oldSeconds}`;
        },30)
    }
}