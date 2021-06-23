const music = document.querySelector("audio");
const image = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
let durationht = document.getElementById("duration");
const progress_div = document.getElementById("progress_div");
let isPlaying = false;

const songs = [
    {
        name:"mus1",
        title:"Bella Ciao",
        artist: "Professor",
    },
    {
        name:"mus2",
        title:"Game of Thrones",
        artist: "Wacky",
    },
    {
        name:"mus3",
        title:"Tum Mile",
        artist: "K.K.",
    },
]

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    image.classList.add("anime");
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    image.classList.remove("anime");
};

play.addEventListener("click",()=>{
    isPlaying ? pauseMusic() : playMusic();
})

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src= "music/" + songs.name + ".mp3";
    image.src = "images/" +songs.name + ".jpg";
};
// loadSong(songs[2]);

songIndex =0;

const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    // 2= 2+1 % 3 = 0 for making the player playing next songs and again starting from start
    loadSong(songs[songIndex])
    playMusic();
}

const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    // 2 = 2-1+3%3=2 for making the player playing prev songs and again starting from start and last
    loadSong(songs[songIndex])
    playMusic();
}

//progress bar jscode

music.addEventListener("timeupdate",(event)=>{
    
    // for progess bar running
    const {currentTime, duration} = event.srcElement;
    // calculating progess bar percentage
    let progress_time = (currentTime/duration) * 100;
    progress.style.width = `${progress_time}%`

    // calculating and displaying song duration acc to song
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;

    if(duration){
    durationht.textContent = `${tot_duration}`;
    }

    // calculating and displaying song current time while song running
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime<10){
        sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;

    if(duration){
        current_time.textContent = `${tot_currentTime}`;
    }

});

//progress bar pointer functionality
progress_div.addEventListener("click",(event) => {
    console.log(event);
    const {duration} = music;

    let move_progress =
     (event.offsetX/event.srcElement.clientWidth) * duration;

     music.currentTime = move_progress;
});

// for playing next song automatically 
music.addEventListener("ended",nextSong);

next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
 