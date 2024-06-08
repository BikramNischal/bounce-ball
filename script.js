//get container and ball reference
const ballContainer = document.querySelector("#ball-container");
const ball = document.querySelector("#ball");
const body = document.querySelector("body");
body.style.backgroundColor = "#727273";
body.style.color = "white";

//container height and width
const containerHeight = 500;
const containerWidth = 500;

// ball height and width
const ballHeight = 40;
const ballWidth = 40;

//ball movement setup
const speed = 5; //ball speed
let y = 0; // ball position in y-axis
let dy = 1; //change in distance

//set container style
ballContainer.style.height = `${containerHeight}px`;
ballContainer.style.width = `${containerWidth}px`;
ballContainer.style.border = `1px solid #bdbebf`;
ballContainer.style.position = `relative`;
ballContainer.style.margin = `0px auto`;

//set ball style
ball.style.height = `${ballHeight}px`;
ball.style.width = `${ballWidth}px`;
ball.style.border = `1px solid #77a8f7`;
ball.style.position = `absolute`;
ball.style.borderRadius = "50%";
ball.style.left = `${containerHeight / 2 - ballWidth}px`;
ball.style.backgroundColor = "#77a8f7";


function boundryCollision(ballX = 0,ballY = 0){
    //collsion detection for y-axis 
    if(ballY >= containerHeight-ballHeight || ballY <= 0){
        dy *= -1;
    }

    
}

setInterval(() => {
	y += dy * speed;
    boundryCollision(0 , y);
	// ball.style.top = `${y}px`;
}, 100);
