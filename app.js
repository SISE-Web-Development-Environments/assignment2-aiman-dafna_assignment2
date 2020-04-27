var context;
var shape = new Object();
var users = [];
var monsters = [];
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lives;//new
var numberOfBalls;
var numberOfMonsters;
var time;
var ball5;
var ball15;
var ball25;
var maxPoints;
var moveMonster;
var divs = ["settings", "gameBoard", "welcome", "register", "login", "about"]
var buttonsKeyboard = {Up: 38, Down: 40, Right: 39, Left: 37};
var counterBalls5,counterBalls15,counterBalls25;
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

/*
function new_register(usernameR,passwordR,firstName,lastName,email,birthday){
	var newUser=new Object();
	newUser.username = document.getElementById("usernameR").value;
	newUser.password = document.getElementById("passwordR").value;
	users.push(newUser);
}
*/

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
	buttonsKeyboard.Up = event.keyCode;
}

function updateDownButton(event) {
	var x = event.key;
	document.getElementById("downKey").value = x;
	buttonsKeyboard.Down = event.keyCode;
}

function updateRightButton(event) {
	var x = event.key;
	document.getElementById("rightKey").value = x;
	buttonsKeyboard.Right = event.keyCode;
}

function updateLeftButton(event) {
	var x = event.key;
	document.getElementById("leftKey").value = x;
	buttonsKeyboard.Left = event.keyCode;
}

function showDiv(divName){
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
   window.clearInterval( intervalTimer );
} 

function Start() {
	maxPoints = 0;
	moveMonster = 0;
	board = new Array();
	score = 0;
	lives=1;//new
	counterBalls5=0;//new
	counterBalls15=0;//new
	counterBalls25=0;//new
	pac_color = "yellow";
	var cnt = 250;
	var food_remain = numberOfBalls;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 25; i++) {
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
				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && !((j == 4) && (i == 10 || i == 11 || i == 12 || i == 13))) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
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
		if(!((j == 4) && (i == 10 || i == 11 || i == 12 || i == 13))){
			shape.i = i;
			shape.j = j;
			pacman_remain--;
			board[i][j] = 2;
		}
	}
	for(i = 0; i <numberOfMonsters; i++){
		var mon = new Object()
		mon.i = (i + 10) * 50 + 5;
		mon.j = 210;
		mon.img = new Image();
		mon.img.src = "monster" + (i+1) + ".png";
		monsters.push(mon);
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
	window.clearInterval(interval);
	showDiv("settings");
}

function Draw() {
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
				context.beginPath();
				context.arc(center.x, center.y, 25, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
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
		context.drawImage(monsters[i].img, monsters[i].i, monsters[i].j);
	}
}

function moveMonsters(){
	for(var i = 0; i < monsters.length; i++){
		monsters[i].i -= 50;
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	moveMonster++;
	if(moveMonster % 8 == 0){
		moveMonsters();
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
		score += 5;
	}
	else if (board[shape.i][shape.j] == 5) {
		score += 15;
	}
	else if (board[shape.i][shape.j] == 6) {
		score += 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(Math.floor(time - time_elapsed) == 0){
		window.clearInterval(interval);
		if(score < 100){
			window.alert("You are better than " + score + " points!");
		}
		else{
			window.alert("Winner!!!");
		}
	}
	if (score >= maxPoints) {
		window.alert("Game completed");
		window.clearInterval(interval);
		Draw();
	} 
	else {
		Draw();
	}
}
