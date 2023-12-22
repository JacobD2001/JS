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

for (let i = 0; i < 10; i++) { //ale lagi przy 500 XDDDD
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
        ball.draw();
        ball.move();
    });

    // Check the distance between each pair of balls
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
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

