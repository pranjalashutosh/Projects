console.log("Welcome to mySpotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.m4a');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
const songItems = document.querySelectorAll('.songItem');
const timeStampSpan = document.querySelectorAll('.timeStamp');

let songs = [
    { songName: 'Babul', filePath: 'songs/1.m4a', coverPath: 'cover/1.jpg' },
    { songName: 'Tu hai aasman!', filePath: 'songs/2.m4a', coverPath: 'cover/2.jpg' },
    { songName: 'Tum Pukarlo', filePath: 'songs/3.m4a', coverPath: 'cover/3.jpg' }
]

function formatTime(timeInSeconds) { //For formatting the output returned by audioEle.duration for better visual.
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
timeStampSpan.forEach((span, i) => {

/* We should ensure that we are attempting to access the duration property 
   only after the audio file has been loaded. We can achieve this by listening 
   for the loadedmetadata event, which is fired when the duration of the audio file is known.*/   

   let audioEle=new Audio(songs[i].filePath);
    audioElement.addEventListener('loadedmetadata', () => {
                span.innerText = formatTime(audioEle.duration);
    })
});

//For retreiveing the cover image and songName as per the songs collection.
songItems.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//For making play/pause button functional.
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//For the Progress bar functionality
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = parseInt(audioElement.duration * myProgressBar.value / 100);
})


const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay()
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.m4a`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex - 1].songName;
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
})


const changeIcon = (songIndex) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        masterSongName.innerText = songs[songIndex - 1].songName;

        if (element.id == songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
}

document.getElementById('next').addEventListener('click', () => {

    if (songIndex >= 3) {
        songIndex = 1;
        changeIcon(songIndex)
    }
    else {
        songIndex = songIndex + 1;
        changeIcon(songIndex)
    }
    audioElement.src = `songs/${songIndex}.m4a`;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 3;
        changeIcon(songIndex)
    }
    else {
        songIndex = songIndex - 1;
        changeIcon(songIndex)
    }
    audioElement.src = `songs/${songIndex}.m4a`;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

