let cards = [...decks.conditions, ...decks.drugs];

let current = 0;
let time = 60;
let timerInterval;

shuffle(cards);

function startGame(){

document.getElementById("menu").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

showCard();

timerInterval = setInterval(updateTimer,1000);

}

function showCard(){

document.getElementById("term").textContent = cards[current];

}

function correct(){

current++;
nextCard();

}

function pass(){

current++;
nextCard();

}

function nextCard(){

if(current >= cards.length){

shuffle(cards);
current = 0;

}

showCard();

}

function updateTimer(){

time--;

document.getElementById("timer").textContent = time;

if(time <= 0){

clearInterval(timerInterval);

alert("Time's up!");

location.reload();

}

}

function shuffle(array){

for (let i = array.length - 1; i > 0; i--) {

const j = Math.floor(Math.random() * (i + 1));

[array[i], array[j]] = [array[j], array[i]];

}

}