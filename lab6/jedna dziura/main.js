//get HTML elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//set canvas size
canvas.width = 800;
canvas.height = 600;

//ball properties
const ballRadius = 20; 
let ballX = canvas.width / 2; //ball x wsp is in the middle of canvas CENTER
let ballY = canvas.height / 2; //ball y wsp is in the middle of canvas CENTER

//hole properties
const holeRadius = 40;
const holeX = canvas.width - 50; //hole x wsp is 50px from right side of canvas
const holeY = canvas.height - 50; //hole y wsp is 50px from bottom of canvas

//device orientation properties
let beta = 0;
let gamma = 0;

//timer variables
let startTime;
let elapsedTime = 0; 
const startTimeBtn = document.getElementById('startTimeBtn').addEventListener('click', startTimer);
const clearTimeRecordsBtn = document.getElementById('clearTimeRecordsBtn').addEventListener('click', resetTime);


// function to update the ball position based on device properties
function updateBallPosition(){

    // calculate new ball position based on device orientation
    const deltaX = beta / 10;
    const deltaY = gamma / 10;

    // update ball position
    ballX += deltaX;
    ballY += deltaY;

    // keep the ball within canvas bounds
    ballX = Math.max(ballRadius, Math.min(canvas.width - ballRadius, ballX));
    ballY = Math.max(ballRadius, Math.min(canvas.height - ballRadius, ballY));

    // check if the ball is in the hole
    if(ballX > holeX - holeRadius && ballX < holeX + holeRadius && ballY > holeY - holeRadius && ballY < holeY + holeRadius){
        stopTimer();
        alert("You win!");
        cancelAnimationFrame(updateBallPosition);
        document.location.reload();
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the hole
    ctx.beginPath();
    ctx.arc(holeX, holeY, holeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Request the next animation frame
    requestAnimationFrame(updateBallPosition);
};

// function to handle device orientation change(update device orientation properties)
window.addEventListener('deviceorientation', (event) =>{
    beta = event.beta;
    gamma = event.gamma;
});

// function to handle time counting when user clicks on a start button
function startTimer(){
    startTime = Date.now();
    // Set up an interval to update the elapsed time every 10 milliseconds
    setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById('time').innerHTML = (elapsedTime / 1000).toFixed(2);
    }, 10);
}

// Function to stop the timer and store the elapsed time in local storage
function stopTimer() {
    clearInterval();
    const timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];
    timeRecords.push(elapsedTime);
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
}


// Function to get time from local storage and display it on the screen
function getTime() {
    // Retrieve time records from local storage
    const timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];

    // Sort the time records in ascending order
    timeRecords.sort((a, b) => a - b); //returns negative value if a < b, 0 if a == b, positive value if a > b

    // Display the time records in the 'timeRecords' element
    const timeRecordsElement = document.getElementById('timeRecords');
    timeRecordsElement.innerHTML = 'Time Records:<br>';

    // Loop through the sorted time records and display them with corresponding indices
    timeRecords.forEach((record, index) => {
        const formattedTime = (record / 1000).toFixed(2);
        timeRecordsElement.innerHTML += `${index + 1}. ${formattedTime} <br>`;
    });
}


//function to reset local storage
function resetTime(){
    localStorage.clear();
    getTime();
}

// start the game
requestAnimationFrame(updateBallPosition);
getTime();