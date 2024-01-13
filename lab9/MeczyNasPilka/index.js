const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // how does getcontext work? - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext - it returns a drawing context on the canvas, or null if the context identifier is not supported

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const addBallButton = document.getElementById('addBallButton');

//const ballRadius = 10;

canvas.width = 1000;
canvas.height = 500;

let balls = [];

// Start the animation when the start button is clicked
startButton.addEventListener('click', () => {
    createBalls();
    draw();

    let isStartBtnDisabled = startButton.disabled = true;
});

// Reset the animation when the reset button is clicked
resetButton.addEventListener('click', () => {
    balls.length = 0;
    createBalls();
});


// Ball class
class Ball {
    constructor(x, y, radius, speedX, speedY, energy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.energy = energy;
    }

    updateSize() {
        this.radius = this.energy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  // Create a circle path at (this.x, this.y) with radius this.radius
        ctx.fillStyle = `rgba(158, 28, 100, ${this.energy / 100})`;
        //ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    move() {
        const speedFactor = 20 / this.energy; // The larger the ball, the slower it moves
        const newX = this.x + this.speedX * speedFactor;
        const newY = this.y + this.speedY * speedFactor;

        //bounce off the walls
        if (newX + this.radius > canvas.width || newX - this.radius < 0) {
            this.speedX = -this.speedX;
        }

        //bounce off the walls
        if (newY + this.radius > canvas.height || newY - this.radius < 0) {
            this.speedY = -this.speedY;
        }

        this.x += this.speedX * speedFactor;
        this.y += this.speedY * speedFactor;
    }
}

// Create balls
function createBalls() {
    for (let i = 0; i < 8; i++) {
        const radius = Math.random() * 20 + 10;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        const speedX = (Math.random() - 0.5) * 4;
        const speedY = (Math.random() - 0.5) * 4;
        const energy = radius;
        const ball = new Ball(x, y, radius, speedX, speedY, energy);
        console.log(ball.energy);
        balls.push(ball);
    }
}

// Draw the balls
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.draw();
        ball.move();
        console.log("szybka kula", ball.speedX, ball.speedY);
    });

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Calculate the energy transfer rate
                const transferRate = 0.01;

                // Transfer energy smoothly from smaller to larger ball
                if (balls[j].energy < balls[i].energy) {
                    const transferAmount = balls[j].energy * transferRate;

                    balls[j].energy -= transferAmount;
                    balls[i].energy += transferAmount;
                } else {
                    const transferAmount = balls[i].energy * transferRate;

                    balls[i].energy -= transferAmount;
                    balls[j].energy += transferAmount;
                }

                balls[i].updateSize();
                balls[j].updateSize();

                if (balls[i].energy < 5) {
                    balls.splice(i, 1);
                    i--;
                    console.log("spliced the ball at index ", i, "remaining balls: ", balls.length);
                    break;
                }
                console.log(balls[i].energy);
                console.log(balls[j].energy);

                if (balls[j].energy < 5) {
                    balls.splice(j, 1);
                    j--;
                    console.log("spliced the ball at index ", j, "remaining balls: ", balls.length);
                    break;
                }

                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}
