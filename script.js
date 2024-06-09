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
ballContainer.style.padding = "20px";

// get container size
let ballContainerSize = ballContainer.getBoundingClientRect();

// returns random x and y co-ordinate within container boundary
function getRandom(containerHeight, containerWidth) {
	const speed = Math.floor(Math.random() * 10);
	const diameter = Math.floor(Math.random() * 30);
	const xaxis = Math.floor(Math.random() * (containerWidth - 100));
	const yaxis = Math.floor(Math.random() * (containerHeight- 100));

	return {
		size: diameter < 20 ? 20 : diameter,
		x: xaxis < 50 ? xaxis + 50 : xaxis ,
		y: yaxis < 50 ? yaxis + 50 : yaxis,
		speed: speed ? speed : 1,
		dx: Math.random() > 0.5 ? 1 : -1,
		dy: Math.random() < 0.5 ? -1 : 1,
	};
}

function generateColors(){ 
	const colorLetters = "0123456789ABCDEF";
	let color = "#";
	for(let i = 0; i < 6; ++i){
		color += colorLetters[Math.floor(Math.random()*16)];
	}
	return color;
}
class Ball {
	constructor(
		posX = 0,
		posY = 0,
		size = 10,
		speed = 5,
		dx = 1,
		dy = 1,
		color = "#77a8f7"
	) {
		this.x = posX;
		this.y = posY;
		this.dx = dx;
		this.dy = dy;
		this.h = size;
		this.w = size;
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
		//collision detection for y-axis
		if (this.y >= (ballContainerSize.height - 60) || this.y <= this.h)
			this.dy *= -1;

		//collision detection for x-axis
		if (this.x >= (ballContainerSize.width - 60) || this.x <= this.w )
			this.dx *= -1;

		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
	}

	updateDirection() {
		this.dx *= -1;
		this.dy *= -1;
	}

	collision(otherBall) {
			if (
				this.x + this.w > otherBall.x &&
				this.y + this.h > otherBall.y &&
				otherBall.x + otherBall.w > this.x &&
				otherBall.y + otherBall.h > this.y
			) {
                const tempdx = this.dx;
                const tempdy = this.dy;
                this.dx = otherBall.dx;
                this.dy = otherBall.dy;

                otherBall.dx = tempdx;
                otherBall.dy = tempdy;

				const tempSpeed = this.speed;
				this.speed = otherBall.speed;
				otherBall.speed = tempSpeed;
				this.move();
			}
	}
}

function generateBalls(num) {
	const ballArr = [];
	for (let i = 0; i < num; ++i) {
		const color = generateColors();
		const ballProp = getRandom(
			ballContainerSize.height,
			ballContainerSize.width
		);

		ballArr.push(
			new Ball(
				ballProp.x,
				ballProp.y,
				ballProp.size,
				ballProp.speed,
				ballProp.dx,
				ballProp.dy,
				color,
			)
		);
	}
	return ballArr;
}

const balls = generateBalls(500);

function updateScreen() {
    ballContainerSize = ballContainer.getBoundingClientRect();


    //for ball collision
	for (const ball of balls) {
		// ball.move();
		ball.draw();
		for (let j = balls.indexOf(ball) + 1; j < balls.length; ++j) {
			ball.collision(balls[j]);
		}
	}

	requestAnimationFrame(updateScreen);
}

updateScreen();