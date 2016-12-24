var socket = io();
var x=0;
var y=0;

//socket.emit('initialize');
socket.on('players update', function(msg){
	players=msg;
	// for(var i=0;i<players.players.length;i++){    //for images
	// 	players.players[i].image=new Image();
	// 	players.players[i].image.src = "images/trumpGnome.jpg";
	// }
})
//bias due to images not lining up perfectly
var xbias=15;
var ybias = 18;
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 320;
document.body.appendChild(canvas);
//count for movement
var count=0;
var up = false;
var down = false;
var right = false;
var left = false;
var prevx = 0;
var prevy = 0;
// Background image
// var bgReady = false;
// var bgImage = new Image();
// bgImage.onload = function () {
// 	bgReady = true;
// };
// bgImage.src = "images/background.png";
//Images in Environment
var bgtop = new Image();
bgtop.src = "images/bgtop.png";
var bgbot = new Image();
bgbot.src = "images/bgbot.png";
var bgright = new Image();
bgright.src = "images/bgright.png";
var bgleft = new Image();
bgleft.src = "images/bgleft.png";
var bgtop_right = new Image();
bgtop_right.src = "images/bgtop_right.png";
var bgbot_right = new Image();
bgbot_right.src = "images/bgbot_right.png";
var bgtop_left = new Image();
bgtop_left.src = "images/bgtop_left.png";
var bgbot_left = new Image();
bgbot_left.src = "images/bgbot_left.png";
var ground1 = new Image();
ground1.src = "images/ground1.png";
var hole1 = new Image();
hole1.src = "images/hole1.png";
//Images for Character snake for now
var snake_up1 = new Image();
snake_up1.src = "images/char/snake/snake_up1.png";
var snake_up2 = new Image();
snake_up2.src = "images/char/snake/snake_up2.png";
var snake_up3 = new Image();
snake_up3.src = "images/char/snake/snake_up3.png";
var snake_right1 = new Image();
snake_right1.src = "images/char/snake/snake_right1.png";
var snake_right2 = new Image();
snake_right2.src = "images/char/snake/snake_right2.png";
var snake_right3 = new Image();
snake_right3.src = "images/char/snake/snake_right3.png";
var snake_left1 = new Image();
snake_left1.src = "images/char/snake/snake_left1.png";
var snake_left2 = new Image();
snake_left2.src = "images/char/snake/snake_left2.png";
var snake_left3 = new Image();
snake_left3.src = "images/char/snake/snake_left3.png";
var snake_down1 = new Image();
snake_down1.src = "images/char/snake/snake_down1.png";
var snake_down2 = new Image();
snake_down2.src = "images/char/snake/snake_down2.png";
var snake_down3 = new Image();
snake_down3.src = "images/char/snake/snake_down3.png";

var prevImage = snake_down3;
// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
	console.log(e.keyCode);
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
	ctx.fillStyle="#00000";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	for(i=0;i < canvas.width/32 ; i++){
		for(j=0;j < canvas.height/32; j++){
			ctx.drawImage(ground1, i*32, j*32);
			if(i>1 && (i-1)%2 && i<(canvas.width/32)-1 && j>1 && (j-1)%2 && j<(canvas.height/32)-1){
				ctx.drawImage(hole1, i*32-xbias, j*32-ybias);
			}
		}
	}
	for (i = 1; i < canvas.width/32; i++) { 
    ctx.drawImage(bgtop, i*32, 0);
    ctx.drawImage(bgbot, i*32, canvas.height-32);
	}
	for (i = 1; i < canvas.height/32; i++) { 
    ctx.drawImage(bgright, canvas.width-32, i*32);
    ctx.drawImage(bgleft, 0, i*32);
	}
	ctx.drawImage(bgtop_left, 0, 0);
	ctx.drawImage(bgtop_right, canvas.width-32, 0);
	ctx.drawImage(bgbot_left, 0, canvas.height-32);
	ctx.drawImage(bgbot_right, canvas.width-32, canvas.height-32);
	//makes snake move
	//count = (count+1)%3
	if (count % 3 == 0){
		if(up){
			ctx.drawImage(snake_up1, x, y);
		} else if(left){
			ctx.drawImage(snake_left1, x, y);
		} else if(right){
			ctx.drawImage(snake_right1, x, y);
		} else if(down){
			ctx.drawImage(snake_down1, x, y);
		}
	}else if (count%3 == 1){
		if(up){
			ctx.drawImage(snake_up2, x, y);
		} else if(left){
			ctx.drawImage(snake_left2, x, y);
		} else if(right){
			ctx.drawImage(snake_right2, x, y);
		} else if(down){
			ctx.drawImage(snake_down2, x, y);
		}
	}else if (count%3 == 2){
		if(up){
			ctx.drawImage(snake_up3, x, y);
			prevImage=snake_up3;
		} else if(left){
			ctx.drawImage(snake_left3, x, y);
			prevImage=snake_left3;
		} else if(right){
			ctx.drawImage(snake_right3, x, y);
			prevImage=snake_right3;
		} else if(down){
			ctx.drawImage(snake_down3, x, y);
			prevImage=snake_down3;
		}
	}
	
	//key movement buttons
	if( '87' in keysDown){//w
		y=y-1;
		up = true;
	}
	else{
		up = false;
	}
	if( '65' in keysDown){//a
		x=x-1;
		left = true;
	}
	else {
		left = false;
	}
	if( '83' in keysDown){//s
		y=y+1;
		down = true;
	}
	else {
		down = false;
	}
	if( '68' in keysDown){//d
		x=x+1;
		right = true;
	}else{
		right = false;
	}
	if(prevx == x && prevy == y){
		ctx.drawImage(prevImage,x,y);
	}
	prevx = x;
	prevy = y;

	
	//ctx.fillRect(x,y,32,32);

	// Score
	// ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	//ctx.fillText("score: " , 32, 32);
};
var tick=0;
var tock=3;
// The main game loop
var main = function () {
	tick+=1;
	if (tick%tock==0){
		count = count+1;
	}
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
