let canvas
let context
let gameLoop

const boardX = 300
const boardY = 300
const paddleH = 10
const paddleD = boardY - paddleH
const paddleW = 150

let paddleX = 150
let ballX = 150
let ballY = 150

let randomGame = [-4, -3, -2, 2, 3, 4]
function randomG(array) {
    return array[Math.floor(Math.random()*array.length)]
}
let ballDX = randomG(randomGame)
let ballDY = randomG(randomGame)

const gameWrapper = document.getElementById('game')
const score = document.createElement('div')
score.className = 'score'
score.textContent = '0'
gameWrapper.appendChild(score)

let countScore = 0

function updateDisplay() {
    score.textContent = countScore
}

function drawGameCanvas() {
    canvas = document.getElementById('gameBoard')

    if (canvas.getContext) {
        context = canvas.getContext('2d')
        gameLoop = setInterval(draw, 16)
        window.addEventListener('keydown', keyInput, true)
    }
}

function draw() {
    context.clearRect(0, 0, boardX, boardY)

    context.fillStyle = 'thistle'
    context.beginPath()
    context.rect(0, 0, boardX, boardY)
    context.closePath()
    context.fill()

    context.fillStyle = 'tomato'
    context.beginPath()
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()

    context.fillStyle = 'navy'
    context.beginPath()
    context.rect(paddleX, paddleD, paddleW, paddleH)
    context.closePath()
    context.fill()

    ballX += ballDX
    ballY += ballDY

    if ((ballX + ballDX) > boardX - 15 || (ballX + ballDX) < 15){
        ballDX = -ballDX
    }

    if ((ballY + ballDY) < 15) {
        ballDY = -ballDY
    } else if ((ballY + ballDY) > boardY - 15) {
        if (ballX > paddleX && ballX < paddleX + paddleW) {
            ballDY = -ballDY
            countScore++
            updateDisplay()
        } else {
            clearInterval(gameLoop)
            gameOver()
        }
    }
}

function gameOver() {
    const alertDiv = document.createElement('div')
    const reset = document.createElement('button')
    reset.textContent = 'Reset'
    alertDiv.className = 'gameOver'
    gameWrapper.appendChild(alertDiv)
    gameWrapper.appendChild(reset)
    alertDiv.textContent = 'Game Over'
    reset.onclick = function() {
        gameWrapper.removeChild(reset)
        gameWrapper.removeChild(alertDiv)
        countScore = 0
        updateDisplay()
        ballX = 150
        ballY = 150
        gameLoop = setInterval(draw, 16)
        ballDX = randomG(randomGame)
        ballDY = randomG(randomGame)
    }
}

function keyInput(e) {
    switch (e.keyCode) {
        case 37:
            paddleX -= 20
            if (paddleX < 0) {
                paddleX = 0
            }
            break;
        case 39:
            paddleX += 20
            if (paddleX > boardX - paddleW) {
                paddleX = boardX - paddleW
            }
            break;
    }
}

drawGameCanvas()