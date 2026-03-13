let cards = []
let current = 0
let score = 0
let time = 60
let timer = null
let studyIndex = 0

function startGame() {

	console.log("Start clicked")

	const category = document.getElementById("category").value
	cards = [...decks[category]]

	shuffle(cards)

	current = 0
	score = 0
	time = 60

	document.getElementById("score").textContent = score
	document.getElementById("timer").textContent = time

	document.getElementById("menu").classList.add("hidden")
	document.getElementById("game").classList.remove("hidden")

	showCard()

	timer = setInterval(updateTimer, 1000)

	enableTilt()

}

function showCard() {
	document.getElementById("term").textContent = cards[current]
}

function correct() {
	flash("green")
	score++
	current++
	updateScore()
	nextCard()
}

function pass() {
	flash("red")
	current++
	nextCard()
}

function nextCard() {

	if (current >= cards.length) {
		shuffle(cards)
		current = 0
	}

	showCard()
}

function updateScore() {
	document.getElementById("score").textContent = score
}

function updateTimer() {

	time--
	document.getElementById("timer").textContent = time

	if (time <= 0) {
		clearInterval(timer)
		alert("Final Score: " + score)
		location.reload()
	}

}

function shuffle(array) {

	for (let i = array.length - 1; i > 0; i--) {

		const j = Math.floor(Math.random() * (i + 1))

		const temp = array[i]
		array[i] = array[j]
		array[j] = temp

	}
}


function studyMode() {

	const category = document.getElementById("category").value
	cards = [...decks[category]]
	studyIndex = 0

	document.getElementById("menu").classList.add("hidden")
	document.getElementById("game").classList.remove("hidden")

	document.getElementById("term").textContent = cards[studyIndex]
	document.getElementById("score").textContent = "-"
	document.getElementById("timer").textContent = "Study"

	document.onclick = function() {

		studyIndex++

		if (studyIndex >= cards.length) {
			studyIndex = 0
		}

		document.getElementById("term").textContent = cards[studyIndex]

	}

}

let tiltCooldown = false
let tiltStartTime = 0
let lastTiltDirection = null

function enableTilt() {

	if (!window.DeviceOrientationEvent) {
		return
	}

	window.addEventListener("deviceorientation", handleTilt)

}

function handleTilt(event) {

	const tilt = event.beta
	const now = Date.now()

	const DOWN_THRESHOLD = 65
	const UP_THRESHOLD = -65
	const HOLD_TIME = 350
	const CARD_DELAY = 1500

	if (tiltCooldown) {
		return
	}

	if (tilt > DOWN_THRESHOLD) {

		if (lastTiltDirection !== "down") {
			tiltStartTime = now
			lastTiltDirection = "down"
		}

		if (now - tiltStartTime > HOLD_TIME) {
			triggerCorrect()
		}

	} else if (tilt < UP_THRESHOLD) {

		if (lastTiltDirection !== "up") {
			tiltStartTime = now
			lastTiltDirection = "up"
		}

		if (now - tiltStartTime > HOLD_TIME) {
			triggerPass()
		}

	} else {

		lastTiltDirection = null

	}

}

function triggerCorrect() {

	tiltCooldown = true

	correct(document.getElementById("term").textContent = "✓")

	setTimeout(() => {
		tiltCooldown = false
	}, 1500)

}

function triggerPass() {

	tiltCooldown = true

	pass(document.getElementById("term").textContent = "PASS")

	setTimeout(() => {
		tiltCooldown = false
	}, 1500)

}

function flash(color) {

	document.body.style.background = color

	setTimeout(() => {
		document.body.style.background = "#0f172a"
	}, 200)

}

document.addEventListener("DOMContentLoaded", () => {

	document.getElementById("startBtn").addEventListener("click", startGame)

	document.getElementById("studyBtn").addEventListener("click", studyMode)
})