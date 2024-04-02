const playButton = document.getElementById('playButton');
const sideA = document.getElementById('sideA');
const sideB = document.getElementById('sideB');
const playhead = document.getElementById('playhead');
const currentTime = document.getElementById('currentTime');

let audioA = new Audio('sidea.mp3');
let audioB = new Audio('sideb.mp3');
let currentAudio = audioA; // Default to side A
let isPlaying = false;
let timer; // Declare timer variable outside of updateTimeline function

sideA.style.textDecoration = 'underline'; // Underline "SIDE A"

sideA.addEventListener('click', () => {
    if (!isPlaying) {
        if (currentAudio === audioA) {
            return;
        } else {
            currentAudio = audioA;
            sideA.style.textDecoration = 'underline';
            sideB.style.textDecoration = '';
            currentAudio.currentTime = 0; // Reset playhead position
            currentTime.textContent = '00:00';
        }
    } else {
        if (currentAudio === audioA) {
            return;
        } else {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = audioA;
            sideA.style.textDecoration = 'underline';
            sideB.style.textDecoration = '';
            currentAudio.currentTime = 0; // Reset playhead position
            currentTime.textContent = '00:00';
            currentAudio.play(); // Start playing audioA
        }
    }
});

sideB.addEventListener('click', () => {
    if (!isPlaying) {
        if (currentAudio === audioB) {
            return;
        } else {
            currentAudio = audioB;
            sideB.style.textDecoration = 'underline';
            sideA.style.textDecoration = '';
            currentAudio.currentTime = 0; // Reset playhead position
            currentTime.textContent = '00:00';
        }
    } else {
        if (currentAudio === audioB) {
            return;
        } else {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = audioB;
            sideB.style.textDecoration = 'underline';
            sideA.style.textDecoration = '';
            currentAudio.currentTime = 0; // Reset playhead position
            currentTime.textContent = '00:00';
            currentAudio.play(); // Start playing audioB
        }
    }
});

// Function to toggle play/pause and update timeline
function togglePlay() {
    if (isPlaying) {
        currentAudio.pause();
        playButton.textContent = 'PLAY';
    } else {
        currentAudio.play();
        playButton.textContent = 'PAUSE';
        updateTimeline();
    }
    isPlaying = !isPlaying;
    if (!isPlaying) {
        clearInterval(timer);
    }
}

function updateTimeline() {
    const duration = currentAudio.duration;
    const timelineWidth = document.querySelector('.timeline').offsetWidth;

    const timer = setInterval(() => {
        const position = currentAudio.currentTime;
        const percent = (position / duration) * 100;
        playhead.style.left = percent + '%';
        
        if (isPlaying) {
            currentTime.textContent = formatTime(position);

            if (duration) {
                currentTime.textContent;
            }
        } 

        if (position >= duration) {
            clearInterval(timer);
            playButton.textContent = 'PLAY';
            isPlaying = false;
        }
    }, 100);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return padZero(minutes) + ':' + padZero(remainingSeconds);
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

playButton.addEventListener('click', togglePlay);
