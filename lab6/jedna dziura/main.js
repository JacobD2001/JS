const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const gameBoard = document.getElementById('gameBoard');

let ballAlpha = 0;
let ballBeta = 90;
let ballGamma = 0;

// Function to update the ball's position based on device orientation
function updateBallPosition() {
    const alphaRad = ballAlpha * (Math.PI / 180);
    const betaRad = ballBeta * (Math.PI / 180);

    const newX = Math.min(Math.max(0, gameBoard.clientWidth - ball.clientWidth), (gameBoard.clientWidth - ball.clientWidth) * Math.tan(alphaRad));
    const newY = Math.min(Math.max(0, gameBoard.clientHeight - ball.clientHeight), (gameBoard.clientHeight - ball.clientHeight) * Math.tan(betaRad));

    ball.style.left = newX + 'px';
    ball.style.top = newY + 'px';

    console.log(`Ball Position: (${newX}, ${newY})`);
    console.log("hole position", hole.getBoundingClientRect());

    checkWin();
}

// Function to check if the ball is inside the hole
function checkWin() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    if (
        ballRect.left >= holeRect.left &&
        ballRect.right <= holeRect.right &&
        ballRect.top >= holeRect.top &&
        ballRect.bottom <= holeRect.bottom
    ) {
        console.log('You won!');
        alert('You won!');
    }
}

// Function to handle device orientation changes
function handleOrientation(event) {
    ballAlpha = event.alpha;
    ballBeta = event.beta;
    ballGamma = event.gamma;

    console.log(`Device Orientation: alpha=${ballAlpha}, beta=${ballBeta}, gamma=${ballGamma}`);

    updateBallPosition();
}

// Add event listener for device orientation changes
window.addEventListener('deviceorientation', handleOrientation);

// Center the ball on the game board initially
ball.style.left = (gameBoard.clientWidth - ball.clientWidth) / 2 + 'px';
ball.style.top = (gameBoard.clientHeight - ball.clientHeight) / 2 + 'px';
