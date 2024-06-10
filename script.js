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

// get client size of container
let ballContainerSize = ballContainer.getBoundingClientRect();

// generate a object that contains random speed size position and direction for the ball
function getRandom(containerHeight, containerWidth) {
	const speed = Math.floor(Math.random() * 10);
	const diameter = Math.floor(Math.random() * 30);
	const xaxis = Math.floor(Math.random() * (containerWidth - 100));
	const yaxis = Math.floor(Math.random() * (containerHeight - 100));

	return {
		size: diameter < 20 ? 20 : diameter,
		x: xaxis < 50 ? xaxis + 50 : xaxis,
		y: yaxis < 50 ? yaxis + 50 : yaxis,
		speed: speed ? speed : 1,
		dx: Math.random() > 0.5 ? 1 : -1,
		dy: Math.random() < 0.5 ? -1 : 1,
	};
}

// generate random colors
function generateColors() {
	const colorLetters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; ++i) {
		color += colorLetters[Math.floor(Math.random() * 16)];
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

	// ball movement and boundary collision detection
	move() {
		//move the ball
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;

		//check boundary collision and move away from boundary
		//collision detection for y-axis
		if (this.y >= ballContainerSize.height - 50 ) {
			this.dy *= -1;
			this.y -= this.h/2;
		}

		if( this.y <= this.h){
			this.dy *= -1;
			this.y += this.h/2;
		}

		//collision detection for x-axis
		if (this.x >= ballContainerSize.width - 50) {
			this.dx *= -1;
			this.x -= this.w/2;
		}
		if( this.x <= this.w){
			this.dx *= -1;
			this.x += this.w/2;
		}

	}

	// rectangular collision detection between two balls
	// this collision causes some balls to overlap on collision
	// collision(otherBall) {
	// 		if (
	// 			this.x + this.w > otherBall.x &&
	// 			this.y + this.h > otherBall.y &&
	// 			otherBall.x + otherBall.w > this.x &&
	// 			otherBall.y + otherBall.h > this.y
	// 		) {
	//             const tempdx = this.dx;
	//             const tempdy = this.dy;
	//             this.dx = otherBall.dx;
	//             this.dy = otherBall.dy;

	//             otherBall.dx = tempdx;
	//             otherBall.dy = tempdy;

	// 			const tempSpeed = this.speed;
	// 			this.speed = otherBall.speed;
	// 			otherBall.speed = tempSpeed;
	// 			this.move();
	// 		}
	// }


	// circular collision detection 
	collision(otherBall) {
		const distanceDx = otherBall.x - this.x;
		const distanceDy = otherBall.y - this.y;
		const distance = Math.sqrt(distanceDx * distanceDx + distanceDy * distanceDy);
		const ballRadius = this.w/2;
		const otherBallRadius = otherBall.w/2;

		if (distance <= ballRadius + otherBallRadius) {
			const angle = Math.atan2(distanceDy, distanceDx);
			const sin = Math.sin(angle);
			const cos = Math.cos(angle);

			//Shifting the ball by 'angle' angle so that 1-D coliision formula can be applied
			const vx1 = this.dx * cos - this.dy  * sin;
			const vy1 = this.dy * cos + this.dx  * sin;
			const vx2 = otherBall.dx *  cos - otherBall.dy   * sin;
			const vy2 = otherBall.dy *  cos + otherBall.dx * sin;

			//Calculating the final velocty after collision in 1-D for the elastic collision between the balls
			const vx1Final =
				((ballRadius - otherBallRadius) * vx1 +
					2 * otherBallRadius * vx2) /
				(ballRadius + otherBallRadius);
			const vx2Final =
				((otherBallRadius - ballRadius) * vx2 + 2 * ballRadius * vx1) /
				(ballRadius + otherBallRadius);

			//Shifting the balls back to the original angle
			this.dx = vx1Final * cos + vy1 * sin;
			this.dy = vy1 * cos - vx1Final * sin;
			otherBall.dx = vx2Final * cos + vy2 * sin;
			otherBall.dy = vy2 * cos - vx2Final * sin;

			//To prevent the balls from sticking with each other after collision
			const overlap = ballRadius + otherBallRadius - distance;
			const separationX = overlap * cos;
			const separationY = overlap * sin;

			//Each ball moves by half of seperation distance hence when both balls move by half distance they are seperated by a total of 'seperationX ' and 'seperationY' distance
			this.x -= separationX / 2;
			this.y -= separationY / 2;
			otherBall.x += separationX / 2;
			otherBall.y += separationY / 2;
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
				color
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
		ball.move();
		ball.draw();
		for (let i = 0; i < balls.length; ++i) {
			if (i === balls.indexOf(ball)) continue;
			ball.collision(balls[i]);
		}
	}

	requestAnimationFrame(updateScreen);
}

updateScreen();
