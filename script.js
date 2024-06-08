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

class Ball {
	constructor(posX = 0, posY = 0, color = "#77a8f7") {
		//ball position height width and velocity
		this.x = posX;
		this.y = posY;
		this.dx = 1;
		this.dy = 1;
		this.h = 40;
		this.w = 40;

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
	move(speed) {
		this.x += this.dx * speed;
		this.y += this.dy * speed;
	}
}

function boundryCollision(ball, ballContainerSize) {
	//collsion detection for y-axis
	if (ball.y >= ballContainerSize.height - ball.h || ball.y <= 0)
		ball.dy *= -1;

	if (ball.x >= ballContainerSize.width - ball.h || ball.x <= 0)
		ball.dx *= -1;
}

const ball = new Ball(0, 0);
function updateScreen() {
	setInterval(() => {
		//get client size of container
		const ballContainerSize = ballContainer.getBoundingClientRect();
		ball.move(5);
		boundryCollision(ball, ballContainerSize);
		ball.draw();
	}, 10);
}

updateScreen();
