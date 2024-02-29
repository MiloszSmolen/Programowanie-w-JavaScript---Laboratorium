let recording = false;
let currentTrack = 1;
const recordedTracks = {
  1: [],
  2: [],
  3: [],
  4: [],
};
let startTime;
let recordedSounds = [];

const KeyToSound = {
  q: document.querySelector("#a1"),
  w: document.querySelector("#a2"),
  e: document.querySelector("#a3"),
  r: document.querySelector("#a4"),
  t: document.querySelector("#a5"),
  y: document.querySelector("#a6"),
  u: document.querySelector("#a7"),
  i: document.querySelector("#a8"),
  o: document.querySelector("#a9"),
};

function onTrackChange() {
  const checkedTracks = document.querySelectorAll(".trackCheckbox:checked");
  checkedTracks.forEach((checkedTrack) => {
    const track = parseInt(checkedTrack.getAttribute("data-track"));
    currentTrack = track;
    console.log("Current track is", currentTrack);
  });
  if (checkedTracks.length === 0) {
    currentTrack = null;
    console.log("Current track is", currentTrack);
  }
}

function startRecording() {
  // sprawdza czy mamy zaznaczony jakiś checkbox (jeśli currentTrack = null to znaczy, że nie mamy zaznaczonego)
  if (!recording && currentTrack !== null) {
    recording = true;
    startTime = Date.now();
    recordedTracks[currentTrack] = [];
    recordedSounds = [];
    console.log("Recording started on track", currentTrack);
  }
}

function stopRecording() {
  if (recording) {
    recording = false;
    console.log("Recording stopped");
  }
}

function playRecording() {
  const selectedTracks = document.querySelectorAll(".trackCheckbox:checked");
  selectedTracks.forEach((checkedTrack) => {
    // pobiera numer tracku
    const track = parseInt(checkedTrack.getAttribute("data-track"));
    // pobiera dla zaznaczonego tracku nagrane dźwięki z tablicy recordedTracks
    const soundsToPlay = recordedTracks[track];
    console.log(`Playback started for track ${track}`);
    if (soundsToPlay.length > 0) {
      soundsToPlay.forEach((event) => {
        setTimeout(() => {
          playSound(event.key);
        }, event.time);
      });
    } else {
      console.log(`No sounds recorded for track ${track}`);
    }
  });
}

function onKeyPress(event) {
  // keytosound[event.key] zwraca wartość z obiektu KeyToSound dla klucza event.key
  const sound = KeyToSound[event.key];
  if (sound) {
    playSound(sound);
    if (recording && currentTrack !== null) {
      // jeśli nagrywamy i zaznaczyliśmy jakiś track, to dźwięk się zapisuję do recordedTracks
      recordedTracks[currentTrack].push({
        key: sound,
        // startTime - czas od startu nagrywania w ms, aby dźwięk został odtworzony w odpowiednim czasie
        time: Date.now() - startTime,
      });
    }
  }
}

function playSound(sound) {
  // odtwarza dźwięk od początku
  sound.currentTime = 0;
  sound.play();
}

document.addEventListener("keypress", onKeyPress);
document.getElementById("record").addEventListener("click", startRecording);
document.getElementById("stop").addEventListener("click", stopRecording);
document.getElementById("play").addEventListener("click", playRecording);

const trackCheckboxes = document.querySelectorAll(".trackCheckbox");
trackCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", onTrackChange)
);
