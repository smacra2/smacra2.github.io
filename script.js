let cards=[]
let current=0
let score=0
let time=60
let timer

function startGame(){

const category=document.getElementById("category").value

cards=[...decks[category]]

shuffle(cards)

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

showCard()

timer=setInterval(updateTimer,1000)

enableTilt()

}

function showCard(){

document.getElementById("term").textContent=cards[current]

}

function correct(){

score++
current++

updateScore()

next()

}

function pass(){

current++

next()

}

function next(){

if(current>=cards.length){

shuffle(cards)
current=0

}

showCard()

}

function updateScore(){

document.getElementById("score").textContent=score

}

function updateTimer(){

time--

document.getElementById("timer").textContent=time

if(time<=0){

clearInterval(timer)

alert("Final Score: "+score)

location.reload()

}

}

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1))

[array[i],array[j]]=[array[j],array[i]]

}

}

function studyMode(){

const category=document.getElementById("category").value

cards=[...decks[category]]

let index=0

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

document.getElementById("term").textContent=cards[index]

document.onclick=function(){

index++

if(index>=cards.length) index=0

document.getElementById("term").textContent=cards[index]

}

}