console.log("Welcome to mySpotify");

let songIndex=0;
let audioElement = new Audio('songs/tum pukarlo.m4a');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')

let songs=[
    {songName:'tum pukarlo', filePath:'songs/tum pukarlo.m4a',coverPath:'covers/cover1.jpg'}
]

masterPlay.addEventListener('click' ,()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity=1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity=0;
    }
})
//audioElement.play()
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=parseInt(audioElement.duration*myProgressBar.value/100);

})

