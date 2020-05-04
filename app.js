var context;
var shape = new Object();
var users = [];
var monsters = [];
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var intervstart_timeal;
var lives;//new
var numberOfBalls;
var numberOfMonsters;
var time;
var cherryEaten;
var pac;
var cherry;
var cherryImg;
var pacMove;
var pacmanImg = [];
var ball5;
var ball15;
var ball25;
var maxPoints;
var moveMonster;
var userConnected;
var beginPoint = new Object();
var divs = ["settings", "gameBoard", "welcome", "register", "login", "about"]
var buttonsKeyboard = {Up: 38, Down: 40, Right: 39, Left: 37};
var counterBalls5,counterBalls15,counterBalls25;
var mySound;
var myMusic;
var deathSound;
var interval;
$.validator.addMethod("checkPassword", function(value){
		return (/\d/.test(value) && /^[A-Za-z0-9\d=!\-@._*]+$/.test(value) && (/[a-z]/.test(value) || /[A-Z]/.test(value)))
	}
);

$.validator.addMethod("onlyLetters", function(value){
	return /^[A-Za-z]+$/i.test(value); 
}
);

$(document).ready(function() {
	context = canvas.getContext("2d");
	var userA = new Object();
	userA.username = "p";
	userA.password = "p";
	users.push(userA);
	for(var i = 0; i < divs.length; i++){
		document.getElementById(divs[i]).style.display="none";
	}
	document.getElementById("welcome").style.display="block";
	document.getElementById("upKey").value = "ArrowUp";
	document.getElementById("downKey").value = "ArrowDown";
	document.getElementById("rightKey").value = "ArrowRight";
	document.getElementById("leftKey").value = "ArrowLeft";

	$("#register-form").validate({
		errorPlacement: function errorPlacement(error, element) { element.after(error); },
		rules: {
			usernameR: {
				required: true
			},
			passwordR: {
				required: true,
				checkPassword: true,
				minlength: 6
			},
			firstName: {
				required: true,
				onlyLetters: true
			},
			lastName: {
				required: true,
				onlyLetters: true
			},
			email: {
				required: true,
				email: true
			},
			birthday: {
				required: true
			}
		},
		messages: {
			usernameR: {
				required: "Please enter your username"
			},
			passwordR: {
				required: "Please enter your password",
				checkPassword: "Your password must contain letters and numbers",
				minlength: "Your password must contain at least 6 characters"
			},
			firstName: {
				required: "Please enter your first name",
				onlyLetters: "name must contain only letters"
			},
			lastName: {
				required: "Please enter your last name",
				onlyLetters: "name must contain only letters"
			},
			email: {
				required: "Please enter your email",
				email: "Please enter a valid email"
			},
			birthday: {
				required: "Please enter your birthday"
			}
		}
	});
	$("#Settings-game").validate({
		errorPlacement: function errorPlacement(error, element) { element.after(error); },
		rules: {
			upKey: {
				required: true
			},
			downKey: {
				required: true
			},
			rightKey: {
				required: true
			},
			leftKey: {
				required: true
			},
			quantity: {
				required: true,
				max: 90,
				min: 50
			},
			timeGame: {
				required: true,
				min: 60
			},
			NumbersOfMonsters: {
				required: true,
				max: 4,
				min: 1
			}
		},
		messages: {
			upKey: {
				required: "Please enter a key"
			},
			downKey: {
				required: "Please enter a key"
			},
			rightKey: {
				required: "Please enter a key"
			},
			leftKey: {
				required: "Please enter a key"
			},
			quantity: {
				required: "Please enter a number", 
				max: "Please enter a number lower than 90 ",
				min: "Please enter a number greater than 50 "
			},
			timeGame: {
				required: "Please enter the time",
				min: "Please enter a number greater than 60"
			},
			NumbersOfMonsters: {
				required: "Please enter the numbers of monsters",
				max: "Please enter a number lower than 4 ",
				min: "Please enter a number greater than 1"
			}
		}
	});
	$('#register-form').submit(function (e) {
		e.preventDefault();
		if ($('#register-form').valid()){
			var newUser = new Object();
			newUser.username = document.getElementById("usernameR").value;
			newUser.password = document.getElementById("passwordR").value;
			users.push(newUser);
			userConnected = newUser.username;
			sign_up_success();
		}
	});

	$('#Settings-game').submit(function (e) {
		e.preventDefault();
		if ($('#Settings-game').valid()){
			numberOfMonsters = document.getElementById("NumbersOfMonsters").value;
			numberOfBalls = document.getElementById("quantity").value;
			time = document.getElementById("timeGame").value;
			ball5 = document.getElementById("myColor5").value; 
			ball15= document.getElementById("myColor15").value; 
			ball25= document.getElementById("myColor25").value; 
			showDiv('gameBoard');
			Start();
		}
	});
});

//LOGIN
function loginUser(){
	var username,password,user;
	username = $("#usernameL").val();
	password = $("#passwordL").val();
	var userExist = false;
	for(var i=0;i<users.length;i++){
		if(users[i].username === username){
			userExist = true;
			if(users[i].password === password){
				userConnected = username;
				showDiv("settings");
			}
			else{
				window.alert("wrong password")
				break;
			}
		}
	}
	if(!userExist){
		window.alert("wrong username")
	}
}

/*
$(document).ready(function() {
	document.getElementById('timeGame').value = getRndInteger(60,180);
	document.getElementById('quantity').value = getRndInteger(50,91);
	document.getElementById('NumbersOfMonsters').value=getRndInteger(1,5);
});
*/

function randomValues(){
	buttonsKeyboard.Up = 38;
	buttonsKeyboard.Down = 40; 
	buttonsKeyboard.Right = 39; 
	buttonsKeyboard.Left = 37;
	document.getElementById("showUp").innerHTML = "ArrowUp";
	document.getElementById("showDown").innerHTML = "ArrowDown";
	document.getElementById("showRight").innerHTML = "ArrowRight";
	document.getElementById("showLeft").innerHTML = "ArrowLeft";
	document.getElementById("upKey").value = "ArrowUp";
	document.getElementById("downKey").value = "ArrowDown";
	document.getElementById("rightKey").value = "ArrowRight";
	document.getElementById("leftKey").value = "ArrowLeft";
	document.getElementById("quantity").value = getRndInteger(50, 90);
	document.getElementById("myColor5").value = randomColor(); 
	document.getElementById("myColor15").value = randomColor(); 
	document.getElementById("myColor25").value = randomColor();
	document.getElementById("timeGame").value = getRndInteger(60, 500);
	document.getElementById("NumbersOfMonsters").value = getRndInteger(1, 4);
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function randomColor() {
	var color ="#";
	for(var i = 0; i < 6; i++){
		var num = getRndInteger(0,15);
		if(num == 10){
			color += "a";
		}
		else if(num == 11){
			color += "b";
		}
		else if(num == 12){
			color += "c";
		}
		else if(num == 13){
			color += "d";
		}
		else if(num == 14){
			color += "e";
		}
		else if(num == 15){
			color += "f";
		}
		else{
			color += num;
		}
	}
	return color;
}

function updateUpButton(event) {
	var x = event.key;
	document.getElementById("upKey").value = x;
	document.getElementById("showUp").innerHTML = x;
	buttonsKeyboard.Up = event.keyCode;
}

function updateDownButton(event) {
	var x = event.key;
	document.getElementById("downKey").value = x;
	document.getElementById("showDown").innerHTML = x;
	buttonsKeyboard.Down = event.keyCode;
}

function updateRightButton(event) {
	var x = event.key;
	document.getElementById("rightKey").value = x;
	document.getElementById("showRight").innerHTML = x;
	buttonsKeyboard.Right = event.keyCode;
}

function updateLeftButton(event) {
	var x = event.key;
	document.getElementById("leftKey").value = x;
	document.getElementById("showLeft").innerHTML = x;
	buttonsKeyboard.Left = event.keyCode;
}

function showDiv(divName){
	if(interval){
		stopTimer();
	}
	for(var i = 0; i < divs.length; i++){
		document.getElementById(divs[i]).style.display="none";
	}
	var selected = document.getElementById(divName);
	selected.style.display="block";
}

function sign_up_success(){
	window.alert("successed!");
	showDiv("settings");
}

function stopTimer(){
	window.clearInterval(interval);
} 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function Start() {
	cherryEaten = false;
	cherryImg = new Image();
	cherryImg.src = "cherry.png";
	myMusic = new sound("startSounds.mp3");
	mySound=new sound("WAKA.mp3");
	deathSound = new sound("DeathSound.mp3");
	document.getElementById("5ball").style.background = ball5;
	document.getElementById("15ball").style.background = ball15;
	document.getElementById("25ball").style.background = ball25;
	document.getElementById("numBall").innerHTML = numberOfBalls;
	document.getElementById("showTime").innerHTML = time;
	document.getElementById("showMonster").innerHTML = numberOfMonsters;
	myMusic.play();
	maxPoints = 50;
	moveMonster = 0;
	pacMove = 4;
	monsters = [];
	for(var i = 0; i < 5; i++){
		var pacman = new Image();
		pacman.src = "pac" + i + ".gif";
		pacmanImg.push(pacman);
	}
	pac = 0;
	board = new Array();
	score = 0;
	lives = 5;
	counterBalls5=0;
	counterBalls15=0;
	counterBalls25=0;
	pac_color = "yellow";
	var cnt = 250;
	var food_remain = numberOfBalls;
	var pacman_remain = 1;
	start_time = new Date();
	for (i = 0; i < 25; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 2 && j == 1)  || (i == 3 && j == 1)  || (i == 18 && j == 1) || (i == 19 && j == 1) ||
				(i == 20 && j == 1) || (i == 21 && j == 1) || (i == 9 && j == 2)  || (i == 21 && j == 2) ||
				(i == 9 && j == 3)  || (i == 14 && j == 3) || (i == 15 && j == 3) || (i == 16 && j == 3) ||
				(i == 21 && j == 3) || (i == 22 && j == 3) || (i == 9 && j == 4)  || (i == 16 && j == 4) ||
				(i == 22 && j == 4) || (i == 2 && j == 5)  || (i == 14 && j == 5) || (i == 15 && j == 5) ||
				(i == 16 && j == 5) || (i == 2 && j == 6)  || (i == 3 && j == 6)  || (i == 19 && j == 6) ||
				(i == 5 && j == 7)  || (i == 19 && j == 7) || (i == 20 && j == 7) || (i == 4 && j == 8)  ||
				(i == 5 && j == 8)  || (i == 20 && j == 8) 
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					var randomBall = Math.random();
					if(randomBall < 0.6){
						board[i][j] = 1;
						maxPoints += 5;
					}
					else if(randomBall > 0.6 && randomBall < 0.9){
						board[i][j] = 5;
						maxPoints += 15;
					}
					else{
						board[i][j] = 6;
						maxPoints += 25;
					}
				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && !((j == 0 || j == 9 || i == 0 || i == 24))) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					beginPoint.i = i;
					beginPoint.j = j;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var randomBall = Math.random();
		if(randomBall < 0.6){
			board[emptyCell[0]][emptyCell[1]] = 1;
			maxPoints += 5;
		}
		else if(randomBall > 0.6 && randomBall < 0.9){
			board[emptyCell[0]][emptyCell[1]] = 5;
			maxPoints += 15;
		}
		else{
			board[emptyCell[0]][emptyCell[1]] = 6;
			maxPoints += 25;
		}
		food_remain--;
	}
	while(pacman_remain > 0){
		var emptyCell = findRandomEmptyCell(board);
		if(!((emptyCell[1] == 0 || emptyCell[1] == 9 || emptyCell[0] == 0 || emptyCell[0] == 24))){
			shape.i = emptyCell[0];
			shape.j = emptyCell[1];
			pacman_remain--;
			board[emptyCell[0]][emptyCell[1]] = 2;
			beginPoint.i = emptyCell[0];
			beginPoint.j = emptyCell[1];
		}
	}
	for(i = 0; i <numberOfMonsters; i++){
		var mon = new Object()
		mon.i = 24 * (i % 2);
		if(i > 1){
			mon.j = 9;
		}
		else{
			mon.j = 0;
		}
		mon.img = new Image();
		mon.img.src = "monster" + (i+1) + ".png";
		monsters.push(mon);
	}
	var foundCherry = false;
	cherry = new Object();
	while(!foundCherry){
		var emptyCell = findRandomEmptyCell(board);
		if(!((emptyCell[1] == 0 || emptyCell[1] == 9 || emptyCell[0] == 0 || emptyCell[0] == 24))){
			cherry.i = emptyCell[0];
			cherry.j = emptyCell[1];
			foundCherry = true;
		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[buttonsKeyboard.Up]) {//up
		return 1;
	}
	if (keysDown[buttonsKeyboard.Down]) { //down
		return 2;
	}
	if (keysDown[buttonsKeyboard.Left]) { //left
		return 3;
	}
	if (keysDown[buttonsKeyboard.Right]) { // right
		return 4;
	}
}

function reset(){
	stopTimer();
	showDiv("settings");
}

function Draw() {
	document.getElementById("user").innerHTML = userConnected;
	pac++;
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLives.value = lives;
	lblTime.value = Math.floor(time - time_elapsed);
	for (var i = 0; i < 25; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 50 + 25;
			center.y = j * 50 + 25;
			if (board[i][j] == 2) {
				context.save();
				context.translate(shape.i * 50 + 25, shape.j * 50 + 25);
				if(pacMove == 1){
					context.rotate(- Math.PI / 2);
					context.drawImage(pacmanImg[pac % 5],-20,-20);
				}
				else if(pacMove == 2) {
					context.rotate( Math.PI / 2);
					context.drawImage(pacmanImg[pac % 5], -20, -20);
				}
				else if(pacMove == 3) {
					context.rotate( Math.PI);
					context.drawImage(pacmanImg[pac % 5], -20, -20);
				}
				else if(pacMove == 4) {
					context.drawImage(pacmanImg[pac % 5], -20, -20);
				}
				context.restore();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.fillStyle = ball5;
				context.strokeStyle = "black";
				context.font = "13px Georgia";
				context.lineWidth = 10;
				context.arc(center.x,center.y, 8, 0, 2 * Math.PI);
				context.fill();
				context.beginPath();
				context.fillStyle = "white";
				context.font = "8px Verdana";
				context.fillText("5", center.x - 2, center.y + 3);
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.fillStyle = ball15;
				context.strokeStyle = "black";
				context.font = "13px Georgia";
				context.lineWidth = 10;
				context.arc(center.x,center.y, 8, 0, 2 * Math.PI);
				context.fill();
				context.beginPath();
				context.fillStyle = "white";
				context.font = "8px Verdana";
				context.fillText("15", center.x - 5, center.y + 3);
				context.fill();
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.fillStyle = ball25;
				context.strokeStyle = "black";
				context.font = "13px Georgia";
				context.lineWidth = 10;
				context.arc(center.x,center.y, 8, 0, 2 * Math.PI);
				context.fill();
				context.beginPath();
				context.fillStyle = "white";
				context.font = "8px Verdana";
				context.fillText("25", center.x - 5, center.y + 3);
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 25, center.y - 25, 50, 50);
				context.fillStyle = "#a6eef1"; //color
				context.fill();
			}
		}
	}
	for(i = 0; i < monsters.length; i++){
		context.drawImage(monsters[i].img, monsters[i].i * 50 + 5, monsters[i].j *50 + 10);
	}
	if(!cherryEaten){
		context.drawImage(cherryImg, cherry.i * 50 + 10, cherry.j * 50 + 5);
	}
}

function checkMonsterCollision(x, y){
	for(var i = 0; i < monsters.length; i++){
		if(monsters[i].i == x && monsters[i].j == y){
			return true;
		}
	}
	return false;
}

function openAbout(){
	document.getElementById("about").style.display = "block";
}

function closeAbout(){
	document.getElementById("about").style.display = "none";
}

$(document).keydown(function(event) { 
	if (event.keyCode == 27) { 
		document.getElementById("about").style.display = "none";
	}
});

window.onclick = function(event) {
	if (event.target == document.getElementById("about")) {
		document.getElementById("about").style.display = "none";
	}
}

function getPossibleMoves(x, y){
	var moves = [];
	if(x == shape.i){
		var diff = y - shape.j;
		if(diff >= 0 && board[x][y - 1] != 4){
			moves.push({i: x, j: y - 1});
			return moves;
		}
		else if(diff <= 0 && board[x][y + 1] != 4){
			moves.push({i: x, j: y + 1});
			return moves;
		}
	}
	if(y == shape.j){
		var diff = x - shape.i;
		if(diff >= 0 && board[x - 1][y] != 4){
			moves.push({i: x - 1, j: y});
			return moves;
		}
		else if(diff <= 0 && board[x + 1][y] != 4){
			moves.push({i: x + 1, j: y});
			return moves;
		}
	}
	if(x - 1 >= 0 && board[x - 1][y] != 4 && !checkMonsterCollision(x - 1, y)){
		moves.push({i: x - 1, j: y});
	}
	if(x + 1 < 25 && board[x + 1][y] != 4 && !checkMonsterCollision(x + 1, y)){
		moves.push({i: x + 1, j: y});
	}
	if(y - 1 >= 0 && board[x][y - 1] != 4 && !checkMonsterCollision(x, y - 1)){
		moves.push({i: x, j: y - 1});
	}
	if(y + 1 < 10 && board[x][y + 1] != 4 && !checkMonsterCollision(x, y + 1)){
		moves.push({i: x, j: y + 1});
	}
	return moves;
}

function moveMonsters(){
	for(var i = 0; i < monsters.length; i++){
		var moves = getPossibleMoves(monsters[i].i, monsters[i].j);
		if(moves.length > 0){
			var random = getRndInteger(0, moves.length);
			monsters[i].i = moves[random].i;
			monsters[i].j = moves[random].j;
		}
	}
}

function moveCherry(){
	var moves = getPossibleMoves(cherry.i, cherry.j);
	if(moves.length > 0){
		var random = getRndInteger(0, moves.length);
		cherry.i = moves[random].i;
		cherry.j = moves[random].j;
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if(x){
		pacMove = x;
	}
	moveMonster++;
	if(moveMonster % 4 == 0){
		moveMonsters();
		moveCherry();
	}
	if(checkMonsterCollision(shape.i, shape.j)){
		//todo
		for(i = 0; i < monsters.length; i++){
			monsters[i].i = 24 * (i % 2);
			if(i > 1){
				monsters[i].j = 9;
			}
			else{
				monsters[i].j = 0;
			}
		}
		deathSound.play();
		lives--;
		moveMonster = 0;
		score -= 10;
		maxPoints -= 10;
		shape.i = beginPoint.i;
		shape.j = beginPoint.j;
	}
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 24 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		mySound.play();
		score += 5;
	}
	else if (board[shape.i][shape.j] == 5) {
		mySound.play();
		score += 15;
	}
	else if (board[shape.i][shape.j] == 6) {
		mySound.play();
		score += 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(Math.floor(time - time_elapsed) == 0){
		stopTimer();
		if(score < 100){
			window.alert("You are better than " + score + " points!");
		}
		else{
			window.alert("Winner!!!");
		}
	}
	if(!cherryEaten && cherry.i == shape.i && cherry.j == shape.j){
		score += 50;
		cherryEaten = true;
	}
	if(lives == 0){
		deathSound.play();
		stopTimer();
		Draw();
		window.alert("Loser!");
	}
	if (score >= maxPoints) {
		window.alert("Game completed");
		stopTimer();
		Draw();
	} 
	else {
		Draw();
	}
}

function medicine(){
	context.beginPath();
	context.fillStyle = "white";
	context.font = "13px Georgia";
	context.lineWidth = 10;
	context.arc(center.x,center.y, 15, 0, 2 * Math.PI);
	context.fill();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "8px Verdana";
	context.fillText("M", center.x - 2, center.y + 3);
	context.fill();
}
