var validLetters = [
	'a','b','c','d','e','f','g','h','i','j','k',
	'l','m','n','o','p','q','r','s','t','u','v',
	'w','x','y','z'
	];

function acceptLetter(userInput){
	if (validLetters.indexOf(userInput) != -1){
		return true;
	}
}


var game = {
	wins: 0, 
	loses: 0,
	guesses: 0,
	usedLetters: [],
	gameLetter: "",

	winCounter : function() {
		document.getElementById("win-counter").innerHTML = 
			"<p>Wins: </p> " +
			"<p class='counter'>" + this.wins + "</p>";
	},

	loseCounter : function() {
		document.getElementById("lose-counter").innerHTML = 
			"<p>loses: </p> " +
			"<p class='counter'>" + this.loses + "</p>";
	},
	guessCounter : function() {
		document.querySelector("#guess-counter").innerHTML = 
			"<p>Guesses remaining: </p>" + 
			"<p class='counter'>" + this.guesses + "</p>";
	},
	usedKeysCounter : function() {
		document.getElementById("letters-used").innerHTML = 
			"<p>Letters you have used: <p> " +
			"<p class='counter'>" + this.lettersUsed.join(", ") + "</p>";
	},

	start : function() {
		this.guesses = 9;
		this.lettersUsed = [];

		this.gameLetter = validLetters[ Math.floor(Math.random() * validLetters.length)];

		this.winCounter();
		this.loseCounter();
		this.guessCounter();
		this.usedKeysCounter();

	},

	input : function(letter) {
		if(acceptLetter(letter) && this.usedLetters.indexOf(letter) === -1 ) {
			if(letter === this.gameLetter) {
				var audiowin = new Audio("assets/audio/win.mp3");
				audiowin.play()
				this.wins++;
				this.start();
				alert("you guessed the letter right it was " + letter);
			} else {
				this.guesses--;
				this.lettersUsed.push(letter);
			}

		}
		if(this.guesses <= 0){
			var audiolose = new Audio("assets/audio/losee.mp3");
			audiolose.play();
			this.loses++;
			this.start();
		}
		this.winCounter();
		this.loseCounter();
		this.guessCounter();
		this.usedKeysCounter();
	},



}
document.onLoad = game.start();

document.onkeyup = function(event){
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	game.input(userInput);
}