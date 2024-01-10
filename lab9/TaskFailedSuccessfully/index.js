const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // how does getcontext work? - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext - it returns a drawing context on the canvas, or null if the context identifier is not supported

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', () => {
    draw();
    // Disable the start button
    startButton.disabled = true;
});
resetButton.addEventListener('click', () => {
    // Clear the balls array
    balls.length = 0;

    // Repopulate the balls array
    for (let i = 0; i < 10; i++) {
        const radius = 10;
        const x = Math.random() * (canvas.width - 2 * radius) + radius; //position of the ball ensured that the ball is within the canvas
        const y = Math.random() * (canvas.height - 2 * radius) + radius; //2* radius = diameter substract so that the ball is at least a radius away from the edge of the canvas and than add radius so that the ball is not outside the canvas
        const speedX = (Math.random() - 0.5) * 4; //first it gives number between 0 and 1, than it substracts 0.5 so that the number is between -0.5 and 0.5 and than it multiplies by 4 so that the number is between -2 and 2 
        const speedY = (Math.random() - 0.5) * 4; //it ensures that the ball is moving in a random direction
         //so it's right or down or left or up
        const ball = new Ball(x, y, radius, speedX, speedY);
        balls.push(ball);
    }
});

class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  // Create a circle path at (this.x, this.y) with radius this.radius
        ctx.fillStyle = 'blue'; // Ball color
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the walls(left and right)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
        }

        // Bounce off the walls(top and bottom)
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }
    }
}

const balls = [];

for (let i = 0; i < 3; i++) { //ale lagi przy 500 XDDDD
    const radius = 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius; // this line generates a random number between 0 and canvas.width - 2 * radius
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const speedX = (Math.random() - 0.5) * 4; 
    const speedY = (Math.random() - 0.5) * 4;

    const ball = new Ball(x, y, radius, speedX, speedY);
    balls.push(ball);
}

function draw() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //for each ball in the array
    balls.forEach(ball => {
        console.log("from foreach ball", ball);
        ball.draw();
        ball.move();
    });

    // Check the distance between each pair of balls
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            //console.log(balls.length);
            const dx = balls[i].x - balls[j].x; //point x - point x = distance between x = length of the side of the triangle dx
            const dy = balls[i].y - balls[j].y; //point y - point y = distance between y = length of the side of the triangle dy
            const distance = Math.sqrt(dx * dx + dy * dy); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
            //think of distance as a triangle dx and dy are the sides of the triangle and distance is the hypotenuse(a^2 + b^2 = c^2, so c = sqrt(a^2 + b^2)
            //https://www.youtube.com/watch?v=xbNXwRWjzSs&ab_channel=MooMooMathandScience

            // If the distance is less than 100, draw a line between the balls
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
            }

           


        }
    }
   
    //call the draw function again
    requestAnimationFrame(draw); // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
}



//Mouse attracts balls implementation
// let mouseX;
// let mouseY;

//this function is called when the mouse moves and it updates the mouseX and mouseY variables which are the position of the mouse
// canvas.addEventListener('mousemove', (event) => {
//     mouseX = event.clientX - canvas.offsetLeft; 
//     mouseY = event.clientY - canvas.offsetTop;
//    // console.log(mouseX, mouseY);
// });

// //function for calculating the distance between the center of the ball and mouse coursor
// function distanceBetweenMouseAndBall(x1, y1, x2, y2) { //the parameters are: x1 and y1 - the position of the ball, x2 and y2 - the position of the mouse
//     const dx = x1 - x2; //distance between ball and cursor x
//     const dy = y1 - y2; //distance between ball and cursor y
//     const distanceBetweenMouseAndBall = Math.sqrt(dx * dx + dy * dy); //distance between ball and cursor(pitagoras)
//     console.log("the distance between the ball and the coursor is:", distanceBetweenMouseAndBall);
//     return distanceBetweenMouseAndBall;
// }

canvas.addEventListener('click', (event) => {
    // Get the click position
    const rect = canvas.getBoundingClientRect(); // this code gets the position of the canvas on the screen
    const x = event.clientX - rect.left; // this code gets the position of the mouse coursor on the canvas
    const y = event.clientY - rect.top;
    console.log(x, y, rect);

    // Check if a ball was clicked
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const distance = Math.sqrt((ball.x - x) ** 2 + (ball.y - y) ** 2);

        // If the distance is less than the ball's radius, the ball was clicked
        if (distance < ball.radius + 2000) {
            // Remove the clicked ball
            balls.splice(i, 1);
            console.log("weszlo w if");
            // Add two new balls
            const speedX1 = (Math.random() - 0.5) * 4;
            const speedY1 = (Math.random() - 0.5) * 4;
            const ball1 = new Ball(x, y, ball.radius, speedX1, speedY1);
            console.log("ball1", ball1);
            balls.push(ball1);
            console.log(balls);
            ball1.draw();

            const speedX2 = (Math.random() - 0.5) * 4;
            const speedY2 = (Math.random() - 0.5) * 4;
            const ball2 = new Ball(x, y, ball.radius, speedX2, speedY2);
            balls.push(ball2);

            // Stop checking other balls
            break;
        }
        else{
            console.log("nie weszlo w if");
        }
    }
});

//TO DO - usuwa piłki po kliknięciu, ale nie dodaje nowych