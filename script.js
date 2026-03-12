let cards = []
let current = 0
let score = 0
let time = 60
let timer = null
let studyIndex = 0

function startGame() {

const category = document.getElementById("category").value

cards = [...decks[category]]

if(cards.length === 0){
alert("No cards in this category")
return
}

shuffle(cards)

current = 0
score = 0
time = 60

document.getElementById("score").textContent = score
document.getElementById("timer").textContent = time

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

showCard()

timer = setInterval(updateTimer,1000)

enableTilt()

}

function showCard(){

document.getElementById("term").textContent = cards[current]

}

function correct(){

score++
current++

updateScore()
nextCard()

}

function pass(){

current++

nextCard()

}

function nextCard(){

if(current >= cards.length){

shuffle(cards)
current = 0

}

showCard()

}

function updateScore(){

document.getElementById("score").textContent = score

}

function updateTimer(){

time--

document.getElementById("timer").textContent = time

if(time <= 0){

clearInterval(timer)

alert("Final Score: " + score)

resetGame()

}

}

function resetGame(){

document.getElementById("menu").classList.remove("hidden")
document.getElementById("game").classList.add("hidden")

}

function shuffle(array){

for (let i = array.length - 1; i > 0; i--) {

const j = Math.floor(Math.random() * (i + 1))

[array[i], array[j]] = [array[j], array[i]]

}

}

function studyMode(){

const category = document.getElementById("category").value

cards = [...decks[category]]

if(cards.length === 0){
alert("No cards available")
return
}

studyIndex = 0

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

document.getElementById("score").textContent = "-"
document.getElementById("timer").textContent = "Study"

document.getElementById("term").textContent = cards[studyIndex]

document.onclick = function(){

studyIndex++

if(studyIndex >= cards.length){
studyIndex = 0
}

document.getElementById("term").textContent = cards[studyIndex]

}

}

function enableTilt(){

if(!window.DeviceOrientationEvent){
return
}

window.addEventListener("deviceorientation", function(event){

const tilt = event.beta

if(tilt > 60){
correct()
}

if(tilt < -60){
pass()
}

})

}