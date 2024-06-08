// body styling
const body = document.querySelector("body");
body.style.backgroundColor = "#727273";
body.style.color = "white";

//get ball container element
const ballContainer = document.querySelector("#ball-container");

//set container style
ballContainer.style.height = `100vh`;
ballContainer.style.width = `100%`;
ballContainer.style.border = `1px solid #bdbebf`;
ballContainer.style.position = `relative`;
ballContainer.style.margin = `0px auto`;

// get container size
let ballContainerSize = ballContainer.getBoundingClientRect();

// returns random x and y co-ordinate within container boundary
function getRandomPos(containerHeight, containerWidth) {
	return {
		x: Math.floor(Math.random() * containerWidth),
		y: Math.floor(Math.random() * containerHeight),
		speed: Math.floor(Math.random() * 10),
	};
}

class Ball {
	constructor(posX = 0, posY = 0, speed = 5,color = "#77a8f7") {
		//ball position height width and velocity
		this.x = posX;
		this.y = posY;
		this.dx = 1;
		this.dy = 1;
		this.h = 20;
		this.w = 20;
        this.speed = speed;

		//ball styling
		this.ball = document.createElement("div");
		this.ball.style.height = `${this.h}px`;
		this.ball.style.width = `${this.w}px`;
		this.ball.style.border = `1px solid ${color}`;
		this.ball.style.position = `absolute`;
		this.ball.style.borderRadius = "50%";
		this.ball.style.backgroundColor = color;
		ballContainer.appendChild(this.ball);
	}

	//draw the ball at x,y position
	draw() {
		this.ball.style.left = `${this.x}px`;
		this.ball.style.top = `${this.y}px`;
	}

	//move the ball by dx,dy
	move() {
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
	}
}

function displayBall(ball) {
	ball.move(5);
	boundaryCollision(ball);
	ball.draw();
}

function generateBalls(num) {
	const ballArr = [];
	for (let i = 0; i < num; ++i) {
		const pos = getRandomPos(
			ballContainerSize.height,
			ballContainerSize.width
		);
		ballArr.push(new Ball(pos.x, pos.y, pos.speed));
	}
	return ballArr;
}

//rebounce on boundary collision
function boundaryCollision(ball) {
	//collsion detection for y-axis
	if (ball.y >= ballContainerSize.height - ball.h || ball.y <= 0)
		ball.dy *= -1;

	if (ball.x >= ballContainerSize.width - ball.h || ball.x <= 0)
		ball.dx *= -1;
}

const balls = generateBalls(10);

function updateScreen() {
	setInterval(() => {
		//get client size of container
		ballContainerSize = ballContainer.getBoundingClientRect();
        balls.forEach(displayBall);
	}, 10);
}

// updateScreen();
