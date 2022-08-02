const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prev_btn = document.getElementById('prev');
const play_btn = document.getElementById('play');
const nxt_btn = document.getElementById('next');
const currenttm = document.getElementById('current-time');
const durationtm = document.getElementById('duration');

const progress_cont = document.getElementById('progress-container');
const progress = document.getElementById('progress');


//music
const songs = [
    {
        name : 'Believer',
        display_name : 'Believer',
        artist : 'Imagine Dragons',
        song_path: 'assets/music/Believer.mp3',
    },
    {
        name : 'Breathless',
        display_name : 'Breathless',
        artist : 'Shayne Ward',
        song_path: 'assets/music/Breathless.mp3',
    },
    {
        name : 'Darkside',
        display_name : 'Darkside',
        artist : 'Alan Walker',
        song_path: 'assets/music/Darkside.mp3',
    },
    {
        name : 'Faded',
        display_name : 'Faded',
        artist : 'Alan Walker',
        song_path: 'assets/music/Faded.mp3',
    },
    {
        name : 'Midnight Memories',
        display_name : 'Midnight Memories',
        artist : 'One Direction',
        song_path: 'assets/music/Midnight Memories.mp3',
    },
    {
        name : 'Whatever It Takes',
        display_name : 'Whatever It Takes',
        artist : 'Imagine Dragons',
        song_path: 'assets/music/Whatever It Takes.mp3',
    },
]

let check = false;

function play_song(){
    check = true;
    play_btn.classList.replace('fa-play','fa-pause');
    play_btn.setAttribute('title', "pause");
    music.play();
}

function pause_song(){
    check  = false;
    play_btn.classList.replace('fa-pause','fa-play');
    play_btn.setAttribute('title', "play");
    music.pause();
}

play_btn.addEventListener('click', ()=>(check ? pause_song() : play_song()));


//update dom

function loadnewsong(song){
    progress.style.width = '0%';
    title.innerHTML = song.display_name;
    artist.textContent = song.artist;
    music.src = song.song_path;
    image.src = `assets/img/${song.name}.jpg`;
}

let current_song = 0;

function next_song(){
    current_song++;
    if(current_song > songs.length -1)
      current_song = 0;
    console.log(current_song);
    loadnewsong(songs[current_song]);
    play_song();
}

function prev_song(){
    current_song--;
    if(current_song < 0)
      current_song = songs.length - 1 ;
    console.log(current_song);
    loadnewsong(songs[current_song]);
    play_song();
}

//on load select first song
loadnewsong(songs[current_song]);

//update progress bar and time
function updateprogressbar(e){
    if(check){
        const {duration, currentTime} = e.srcElement;

        //update progresss bar width
        const progress_percent = (currentTime/duration)*100;
        progress.style.width = `${progress_percent}%`;

        //calculate the duration 
        const duration_min = Math.floor(duration/60);
        console.log(duration_min)
        let secnds = Math.floor(duration % 60);
        if(secnds < 10){
            secnds = `0${secnds}`;
        }

        //delay the duration switching as nan is coming
        if(secnds)
            durationtm.textContent = `${duration_min}:${secnds}`;

        //calculate current time
        const current_min = Math.floor(currentTime/60);
        let current_secnds = Math.floor(currentTime % 60);
        if(current_secnds < 10){
            current_secnds = `0${current_secnds}`;
        }
        currenttm.textContent = `${current_min}:${current_secnds}`;
    }
}

//set progress bar to any value when clicked

function setProgressBar(e){
    // console.log(e);
    const width = this.clientWidth;
    const xdist = e.offsetX;
    const {duration} = music;
    console.log((xdist/width) * duration)   // the timme upto which we went through te song
    music.currentTime = (xdist/width)*duration;
}


//event isteners for browwsing songs
prev_btn.addEventListener('click',prev_song);
nxt_btn.addEventListener('click',next_song);
music.addEventListener('timeupdate',updateprogressbar);
progress_cont.addEventListener('click',setProgressBar);
music.addEventListener('ended',next_song);