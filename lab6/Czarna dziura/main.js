//TODO: Timer dla 3 dziur po kolei

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
const numberOfHoles = 3;
const holes = [];
const holeX = canvas.width - 50; //hole x wsp is 50px from right side of canvas
const holeY = canvas.height - 50; //hole y wsp is 50px from bottom of canvas
const maxDistance = 350;

//tunnel properties
const numberOfTunnels = 2;
const tunnels = [];

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

     //calculate new ball position based on device orientation
     const deltaX = gamma / 10;
     const deltaY = beta / 10;

    // update ball position
    ballX += deltaX;
    ballY += deltaY;

    // keep the ball within canvas bounds
    ballX = Math.max(ballRadius, Math.min(canvas.width - ballRadius, ballX));
    ballY = Math.max(ballRadius, Math.min(canvas.height - ballRadius, ballY));

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw holes
    drawHoles();

    //draw tunnels
    drawTunnels();

    // check if the ball is in the hole
    if(ballInHole()){
        stopTimer();
        alert("You win!");
        cancelAnimationFrame(updateBallPosition);
        document.location.reload();
        return;
    }

    // check if the ball is in the tunnel
    if(ballInTunnel()){
        console.log("You are in the tunnel!");
        //cancelAnimationFrame(updateBallPosition);
        teleportBall();
        //return;
    }


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

//function to initialize holes and place them randomly on canvas
function initializeHolesTunnels() {
    for (let i = 0; i < numberOfHoles; i++) {
        // Generate random coordinates for each hole
        const holeX = Math.floor(Math.random() * (canvas.width - 2 * holeRadius) + holeRadius);
        const holeY = Math.floor(Math.random() * (canvas.height - 2 * holeRadius) + holeRadius);
        // Push the hole position into the array
        holes.push({ x: holeX, y: holeY });
    }

    for (let i = 0; i < numberOfTunnels; i++) {
        // Generate random coordinates for each tunnel
        const tunnelX = Math.floor(Math.random() * (canvas.width - 2 * holeRadius) + holeRadius);
        const tunnelY = Math.floor(Math.random() * (canvas.height - 2 * holeRadius) + holeRadius);
        // Push the tunnel position into the array
        tunnels.push({ x: tunnelX, y: tunnelY });
    }
    console.log("tunnels", tunnels);
}

//function to check if ball is in the hole
function ballInHole(){
    for(let i = 0; i < holes.length; i++){
        const dx = ballX - holes[i].x;
        const dy = ballY - holes[i].y;
        const squaredDistance = dx * dx + dy * dy;
        if(squaredDistance < maxDistance){
            return true;
        }
    }
  
    return false;
}

//Function to draw holes on the canvas
function drawHoles() {
    for (let hole of holes) {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, holeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    }
}

//function to draw tunnels on the canvas
function drawTunnels() {
    for (let tunnel of tunnels) {
    ctx.beginPath();
    ctx.arc(tunnel.x, tunnel.y, holeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    }
}

//function to check if ball is in the tunnel
function ballInTunnel(){
    for(let i = 0; i < tunnels.length; i++){
        const dx = ballX - tunnels[i].x;
        const dy = ballY - tunnels[i].y;
        const squaredDistance = dx * dx + dy * dy;
        if(squaredDistance < maxDistance){
            return true;
        }
    }
  
    return false;
}

// Function to teleport the ball to a random place on the gameboard
function teleportBall() {
    // Set the ball position to random coordinates within the canvas bounds
    ballX = Math.floor(Math.random() * (canvas.width - 2 * ballRadius) + ballRadius);
    ballY = Math.floor(Math.random() * (canvas.height - 2 * ballRadius) + ballRadius);
}

// start the game
initializeHolesTunnels();
requestAnimationFrame(updateBallPosition);
getTime();




// Comments: 
// //function to teleport the ball to random tunnel
// function teleportBall(){
//     // Pick a random tunnel for teleportation
//     const randomTunnel = tunnels[Math.floor(Math.random() * numberOfTunnels)];
//      console.log("random tunnel", randomTunnel);
//     // Set the ball position to the chosen tunnel
//     ballX = randomTunnel.x;
//     ballY = randomTunnel.y;
// }
