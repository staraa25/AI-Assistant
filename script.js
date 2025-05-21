// Select DOM elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Text-to-speech function
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

// Wish user based on time
function wishMe() {
  let day = new Date();
  let hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

// Auto wish on page load
window.addEventListener("load", () => {
  wishMe();
});

// Initialize Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Speech Recognition result handler
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript);
};

// Start recognition on button click
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

// Handle voice commands
function takeCommand(message) {
  message = message.toLowerCase(); // Normalize input

  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hi ana")) {
    speak("Hello sir, what can I help you");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant created by Mr. Anish sir");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(`The time is ${time}`);
  } else {
    let finalText = `This is what I found on the internet regarding ${message}`;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}
