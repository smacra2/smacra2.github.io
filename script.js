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

// Tilt engine state

let tiltEnabled = false
let tiltCooldown = false
let neutralReady = true

let smoothedTilt = 0
let tiltStartTime = 0
let currentDirection = null

// Settings (tune if needed)

const DOWN_THRESHOLD = 65
const UP_THRESHOLD = -65
const NEUTRAL_ZONE = 20

const HOLD_TIME = 350
const CARD_COOLDOWN = 1500

const SMOOTHING = 0.8

async function enableTilt() {

	if (typeof DeviceOrientationEvent !== "undefined" &&
		typeof DeviceOrientationEvent.requestPermission === "function") {

		try {

			const permission = await DeviceOrientationEvent.requestPermission()

			if (permission !== "granted") {
				return
			}

		} catch (e) {
			console.log("Motion permission denied")
			return
		}

	}

	tiltEnabled = true

	window.addEventListener("deviceorientation", handleTilt)

}

function handleTilt(event) {

	if (!tiltEnabled) return
	if (tiltCooldown) return

	// Smooth noisy sensor values

	smoothedTilt = SMOOTHING * smoothedTilt + (1 - SMOOTHING) * event.beta

	const tilt = smoothedTilt
	const now = Date.now()

	// Reset to neutral zone before next tilt

	if (Math.abs(tilt) < NEUTRAL_ZONE) {

		neutralReady = true
		currentDirection = null
		return

	}

	if (!neutralReady) return

	// Detect downward tilt (correct)

	if (tilt > DOWN_THRESHOLD) {

		if (currentDirection !== "down") {

			tiltStartTime = now
			currentDirection = "down"

		}

		if (now - tiltStartTime > HOLD_TIME) {

			triggerCorrect()

		}

	}

	// Detect upward tilt (pass)

	if (tilt < UP_THRESHOLD) {

		if (currentDirection !== "up") {

			tiltStartTime = now
			currentDirection = "up"

		}

		if (now - tiltStartTime > HOLD_TIME) {

			triggerPass()

		}

	}

}

function triggerCorrect() {

	tiltCooldown = true
	neutralReady = false

	correct(document.getElementById("term").textContent = "✓")

	setTimeout(() => {
		tiltCooldown = false
	}, CARD_COOLDOWN)

}

function triggerPass() {

	tiltCooldown = true
	neutralReady = false

	pass(document.getElementById("term").textContent = "PASS")

	setTimeout(() => {
		tiltCooldown = false
	}, CARD_COOLDOWN)

}

function flash(color) {

	document.body.style.background = color

	setTimeout(() => {
		document.body.style.background = "#0f172a"
	}, 400)

}

document.addEventListener("DOMContentLoaded", () => {

	document.getElementById("startBtn").addEventListener("click", startGame)

	document.getElementById("studyBtn").addEventListener("click", studyMode)
})