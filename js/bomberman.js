var socket = io();


//socket.emit('initialize');
socket.on('players update', function(msg){
	players=msg;
	// for(var i=0;i<players.players.length;i++){    //for images
	// 	players.players[i].image=new Image();
	// 	players.players[i].image.src = "images/trumpGnome.jpg";
	// }
})

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	socket.emit('key change', keysDown);
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	socket.emit('key change', keysDown);
}, false);


// Draw everything
var render = function () {
	// if (bgReady) {
	// 	ctx.drawImage(bgImage, 0, 0);
	// }
	ctx.fillStyle="#9ea7b8";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle="#9effff";
	ctx.fillRect(100,100,canvas.width, canvas.height);
	
	// Score
	// ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	//ctx.fillText("score: " , 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	render();
	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
main();
