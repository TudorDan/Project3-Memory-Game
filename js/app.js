/*
 * Create a list that holds all of your cards
 */

//create the font awesome set of cards from the set of li from index.html
let symbols = ['fa-diamond', 'fa-diamond', 'fa-anchor', 'fa-anchor',
		'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt',
		'fa-cube', 'fa-cube', 'fa-bicycle', 'fa-bicycle',
		'fa-bomb', 'fa-bomb', 'fa-leaf', 'fa-leaf'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
*  Define the variables that will be used throughout the program
*/
//add a counter for the number of moves
let moveCounter = 0;
//add a counter for the number of matched cards
let matchedCards = 0;

//declare a variable where we will add the cards
let deck = document.querySelector('.deck');

//declare the list of opened cards, starting with all of them closed
let openCards = [];

//set the number of seconds
let timeCounter = 0;

//set the interval variable for the time
let timer = 0;

//flag for first move; true = first move, false = other moves; used to start time
let firstClick = true;

//set the number of visible stars
let starCounter = 3;
let stars = document.querySelector('.stars').getElementsByTagName('li'); //list of "star" elements

//create a function to display the cards on the page
function displayCards() {//called onload body and on click restart

	//remove old set of cards if present, with hasChildNodes() method from MDN Web Docs
	while (deck.hasChildNodes())  //check if deck has a child
		deck.removeChild(deck.firstChild); //keep removing while true

	//add new shuffled cards from the provided function
 	shuffle(symbols);

 	//loop through each card from the symbols set of cards
 	for (let symbol of symbols) {
 		//create an i tag like in the html starter code
 		let text = document.createElement('i');
 		//set font awesome class and an element from the symbols set
 		text.setAttribute('class', 'fa ' + symbol);
 		//create a li tag like in the html starter code
 		let card = document.createElement('li');
 		//insert the text tag into the card tag
 		card.appendChild(text);
 		//set the class for the card tag like in the html starter code
 		card.setAttribute('class', 'card');
 		//add the card element to the deck variable
 		deck.appendChild(card);
 	}

 	//reset move counter
 	moveCounter = 0;
 	updateMoveCounter(moveCounter);

 	//reset number of matched cards
 	matchedCards = 0;

 	//reset time
 	firstClick = true;
 	timeCounter = 0;
 	if(timer) stopTime(timer);
 	writeTime(timeCounter);

 	//reset stars
 	resetStars();

 	//make sure modal is closed
	document.getElementById('modal').style.display = 'none';
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



//set up the event listener for a card
deck.addEventListener('click', function processClickOn(card) {

	//check if a card was clicked (if its class name is card)
	if(card.target.className === 'card') {
		//check if the first card was clicked
		if(firstClick) {
			//stop checking the cards
			firstClick = false;
			//start the time counter
			startTime();
		}
		//display the card's symbol (function is defined below)
		showCard(card.target);
		//add the card to a *list* of "open" cards (function is defined below)
		addCard(card.target, openCards);
		//check to see if two open cards match (function is defined below)
		processList(openCards);

	}
});

//define the showCard function from the processClickOn function
function showCard(card) {
	//display the card's symbol like in the html starter code
	card.className = 'card open show';
}

//define the addCard function from the processClickOn function
function addCard(card, openCards) {
	//since the card is opened, add it to the openCards list defined above
	openCards.push(card);
}

//define the processList function from the processClickOn function
function processList(openCards) {
	//check if the openCards list already has another card
	if(openCards.length > 1) {
		//extract first two cards from openCards list
		const card1 = openCards.pop();
		const card2 = openCards.pop();
		//check if the cards match
		if(card1.firstChild.className === card2.firstChild.className) {
			//if the cards do match, lock the cards in the open position (function is defined below)
			lockCards(card1, card2);
			//increment number of matched cards by 2
			matchedCards += 2;
		}
		//if the cards do not match, remove the cards from the list (function is defined below)
		else
			hideCards(card1, card2);

		//update and display moveCounter
		updateMoveCounter(++moveCounter);

		//update stars
		updateStars();

		//check if all cards have matched (function is defined below)
		checkEndGame();
	}
}

//define the lockCards function from the processList function
function lockCards(card1, card2) {
	setTimeout( function() {
		//display the card's class name like in the html starter code
		card1.className = 'card match';
		card2.className = 'card match';
	}, 600); //add 0.6 seconds delay for better user interaction
}

//define the hideCards function from the processList function
function hideCards(card1, card2) {
	setTimeout( function() {
		//change the card's class name back to card, so that it hides the symbol
		card1.className = 'card';
		card2.className = 'card';
	}, 600); //add 0.6 seconds delay for better user interaction
}

//define function to update the move counter
function updateMoveCounter(moves) {
	document.querySelector('.moves').innerHTML = moves;
}

//define function to check if all cards have matched
function checkEndGame() {
	//check if all cards are matched
	if(matchedCards === 16) {
		//stop timer
		stopTime();

		//write time to modal
		document.getElementById('stats_time').innerHTML = timeCounter;

		//write moves stats to modal
		document.getElementById('stats_moves').innerHTML = moveCounter;

		//write stars stats to modal
		let modalStars = document.getElementById('stats_stars');
		//create each star according to the starCounter
		for(let i = 0; i < starCounter; i++) {
			let newStar = document.createElement('li');
			newStar.className = 'fa fa-star';
			modalStars.appendChild(newStar);
		}

		//display modal
		document.getElementById('modal').style.display = 'block';
	}
}

//define restart function
let reloadDeck = document.querySelector('.fa-repeat');
reloadDeck.addEventListener('click', function() {
	displayCards();
});

/*
* Timer functions
*/
//define the time counter function, based on the link from Udacity Part2 Lesson23 Performance
function startTime() {
	timer = setInterval(updateTime, 1000);// repeat with the interval of 1 second
}
//write the number of seconds for the html page
function writeTime(timeCounter) {
	document.getElementById('time').innerHTML = timeCounter;
}
//increment the number of seconds
function updateTime() {
	writeTime(++timeCounter);
}
//stop the time counter
function stopTime() {
	clearInterval(timer);
}

/*
*  Star functions
*/
//reset the number of stars on refresh or restart game
function resetStars() {
	starCounter = 3;
	stars = document.querySelector('.stars').getElementsByTagName('li');
	//iterate through the stars
	for(let star of stars)
		//display the stars if hidden
		star.style.display = 'inline-block';
}

//hide the stars on certain numbers of moves
function updateStars() {
	if(moveCounter > 24) {
		stars[1].style.display = 'none';
		starCounter = 1;
	}
	else if(moveCounter > 16) {
		stars[2].style.display = 'none';
		starCounter = 2;
	}
}