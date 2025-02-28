const textDisplay = document.querySelector(".text-display");
const inputBox = document.getElementById("input-box");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

const paragraphs = [
       "The sun sets behind the mountains, painting the sky in shades of orange and pink. A gentle breeze rustles the leaves, while birds sing their evening songs.",
       "Fast and accurate typing is a valuable skill. Keep your fingers on the home row and maintain a steady rhythm. With practice, your speed will increase, and mistakes will decrease.",
       "Bright stars lit up the midnight sky. Coffee fuels the mind on sleepy mornings. A whisper in the wind carried an untold secret. Keep moving forward, no matter what.",
       "The spaceship rumbled as it left orbit. Commander Lian watched Earth shrink into the distance. A new world awaited, full of mysteries yet to be discovered.",
       "Success is built on small, consistent habits. Whether learning to type, play an instrument, or stay fit, practice is key. Stay patient, stay focused, and never give up!",
       "Jake sprinted down the street, chasing his runaway dog. The golden retriever darted between people, tail wagging wildly. Just as Jake lunged, the dog stopped, waiting to be caught."

];
// Load random paragraph
function loadText() {
    let words = paragraphs[Math.floor(Math.random() * paragraphs.length)].split("");
    textDisplay.innerHTML = words.map(letter => `<span>${letter}</span>`).join("");
}

let timeLeft = 60;
let timer;
let isTyping = false;

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// Update timer and calculate WPM
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        clearInterval(timer);
        inputBox.disabled = true;
    }
}
let correctChars = 0;
let totalChars = 0;
// Check user input with real-time text highlighting    
function checkTyping() {
    let text = textDisplay.querySelectorAll("span");
    let inputText = inputBox.value.split("");
    totalChars = inputText.length;
    correctChars = 0;

    text.forEach((letter, index) => {
        if (inputText[index] === undefined) {
            letter.style.color = "#000";
        } else if (inputText[index] === letter.innerText) {
            letter.style.color = "green";
            correctChars++;
        }

        else {
            letter.style.color = "red";
            playErrorSound();
        }
    });

    let wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60));
    let accuracy = Math.round((correctChars / totalChars) * 100);

    wpmDisplay.innerText = wpm || 0;
    accuracyDisplay.innerText = accuracy || 100;
}

// Sound effect for errors (optional)
function playErrorSound() {
    let audio = new Audio("beep-08b.mp3");
    audio.volume = 0.1;
    audio.play();
}

// Restart test
function restartTest() {
    clearInterval(timer);
    isTyping = false;
    timeLeft = 60;
    correctChars = 0;
    totalChars = 0;
    timeDisplay.innerText = 60;
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = 100;
    inputBox.value = "";
    inputBox.disabled = false;
    loadText();
}

// Dark mode toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

inputBox.addEventListener("input", () => {
    startTyping();
    checkTyping();
});

restartButton.addEventListener("click", restartTest);

// Load initial text
loadText();
