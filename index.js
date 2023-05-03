import songs from "./songs.js";

//Variables
const progressControle = document.querySelector(".progress-container");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const progress = document.querySelector(".progress");
const audio = document.querySelector("audio");
const img = document.querySelector("img");
const forwardBtn = document.querySelector(".next-icon");
const next = document.querySelector(".next-btn");
const playBtn = document.querySelector(".play-icon");
const backwardBtn = document.querySelector(".prev-icon");
const songCurrentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");

// ToDo:
//list of song
console.log(songs);
let isPlaying = false;
let durationSecond;
const randomSongs = Math.floor(Math.random() * songs.length);
let currentIndex = randomSongs;

//Events
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
audio.addEventListener("timeupdate", update);
progressControle.addEventListener("click", setProgress);
forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", previousSong);

audio.addEventListener("ended", nextSong);

next.addEventListener("click", () => {
  nextSong();
});
next.addEventListener("click", () => {
  previousSong();
});

// functions;

// fetch Json file
// async function getSongs(){
//     const response = await fetch("./songs.json");
//     const data = await response.json()
//     initialSong(data.songs)
// }

function initialSong(songs) {
  audio.setAttribute("src", songs.song);
  img.setAttribute("src", songs.image);
  songName.innerText =
    songs.title.length > 35
      ? songs.title.substring(0, 25) + "..."
      : songs.title;
  artistName.innerText = songs.artist;
}
initialSong(songs[randomSongs]);

function playSong() {
  playBtn.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
  audio.play();
}

function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
  isPlaying = false;
}

function previousSong() {
  if (currentIndex <= 0) {
    currentIndex = songs.length - 1;
    audio.setAttribute("src", songs[currentIndex].song);
    img.setAttribute("src", songs[currentIndex].image);
    songName.innerText =
      songs[currentIndex].title.length > 35
        ? songs.title.substring(0, 25) + "..."
        : songs.title;
    artistName.innerText = songs.artist;
    playSong();
  } else {
    currentIndex--;
    audio.setAttribute("src", songs[currentIndex].song);
    img.setAttribute("src", songs[currentIndex].image);
    songName.innerText =
      songs[currentIndex].title.length > 35
        ? songs[currentIndex].title.substring(0, 25) + "..."
        : songs[currentIndex].title;
    artistName.innerText = songs[currentIndex].artist;
    playSong();
  }
}
function nextSong() {
  if (currentIndex >= songs.length - 1) {
    currentIndex = 0;
    audio.setAttribute("src", songs[currentIndex].song);
    img.setAttribute("src", songs[currentIndex].image);
    songName.innerText =
      songs[currentIndex].title.length > 35
        ? songs.title.substring(0, 25) + "..."
        : songs.title;
    artistName.innerText = songs.artist;
    playSong();
  } else {
    currentIndex++;
    audio.setAttribute("src", songs[currentIndex].song);
    img.setAttribute("src", songs[currentIndex].image);
    songName.innerText =
      songs[currentIndex].title.length > 35
        ? songs[currentIndex].title.substring(0, 25) + "..."
        : songs[currentIndex].title;
    artistName.innerText = songs[currentIndex].artist;
    playSong();
  }
}

function update(e) {
  const { duration, currentTime } = e.srcElement;
  durationSecond = (duration / 60).toFixed(2);
  progress.style.width = `${(currentTime / duration) * 100}%`;
  songDuration.innerText = durationSecond;
  songCurrentTime.innerText = (currentTime / 60).toFixed(2);
}

function setProgress(e) {
  const { duration } = audio;
  const totalWith = this.clientWidth;
  const widthX = e.offsetX;
  songCurrentTime.innerText = (widthX / totalWith) * durationSecond;
  audio.currentTime = (widthX / totalWith) * duration;
}
