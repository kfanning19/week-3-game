// Variables
var wordList = [
"knit",
 "purl", 
 "cable", 
 "needle",
 "decrease",
 "increase",
 "sweater",
 "blanket",
 "slip",
 "stitch",
 "finishing",
 "blocking",
 "frog",
 "pattern"
 ];

var chosenWord = "";
var letterInChosenWord = [];
var numBlanks = 0;
var blanksSuccesses= [];
var wrongGuess = [];

var wins= 0;
var losses = 0;
var guessLeft = 9;

// Functions

// start game
function startGame() {
	// reset variables to start values
	guessLeft = 9;
	blanksSuccesses= [];
	wrongGuess = [];
	
	// Computer chooses a word
	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

	// chosen word is broken up into separate letters
	letterInChosenWord = chosenWord.split("");

	// Determine the number of blanks to display
	numBlanks = letterInChosenWord.length;

	// Push correct number of blanks to blanksSuccesses array
	for (var i = 0; i < numBlanks; i++) {
		blanksSuccesses.push ("_");
	};

	// Display blanks and how many guesses 
	document.getElementById ("guesses-left").innerHTML = guessLeft;
	document.getElementById ("word-blanks").innerHTML = blanksSuccesses.join (" ");
	

}

// Compare letter guessed to letters in the chosen word
function checkLetters (letter) {
 
 	var letterInWord = false;

 	// State when letterinWord should be true
 	for (var i = 0; i < numBlanks; i++) {
 		if (chosenWord[i] === letter){
 			letterInWord = true;
 		}
 	}
 	// letter user chose compares to letters in chosen word across the array
 	if (letterInWord) {
 		for (var i = 0; i < numBlanks; i++) {
 			// compares all letters in the computer's word with the letter selected
 			if (chosenWord[i] === letter){
 			// if there is a match, the user's letter goes in the proper blanks
 				blanksSuccesses[i] = letter;
 			}
 		}	
 	}

 	else {
 	// User's letter isn't in word. Compare to letter to words in wrongGuess. 
 	// If it doesn't match, add to wrongGuess array
 		
	 	if (wrongGuess.indexOf(letter) == -1) {
  			guessLeft--;
 			wrongGuess.push(letter);
		 }
 		
 	}

}
// Determine what ends the game
function roundComplete () {
	document.getElementById("word-blanks").innerHTML = blanksSuccesses.join(" ");
	document.getElementById("guesses-left").innerHTML = guessLeft;
	document.getElementById ("wrong-guesses").innerHTML = wrongGuess.join(" ");

	if (letterInChosenWord.join (" ") === blanksSuccesses.join (" ")){
		wins++;
		setTimeout(function(){ alert("You Won!"); }, 3);
	
		document.getElementById("win-counter").innerHTML = wins;
		startGame();

		console.log (blanksSuccesses)
	}

	else if (guessLeft === 0){
		losses++;
		setTimeout(function(){ alert("You Lost!"); }, 3);
		document.getElementById("loss-counter").innerHTML = losses;
		startGame ();

	}

}
// Call Functions
startGame ();

// Determine which key was pressed
document.onkeyup = function(event) {

        
         var letterGuessed = event.key.toLowerCase();
         checkLetters (letterGuessed);
         roundComplete ();
        
}



