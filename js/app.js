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

//add a counter for the number of moves
let moveCounter = 0;
//add a counter for the number of matched cards
let matchedCards = 0;

//declare a variable where we will add the cards
let deck = document.querySelector('.deck');

//create a function to display the cards on the page
function displayCards() {

	//remove old set of cards if present
	while (deck.hasChildNodes())  //method to check if deck has a child
		deck.removeChild(deck.firstChild); //keep removing while true

	//add new shuffled cards from the provided function
 	shuffle(symbols);

 	//loop through each card from the symbols set of cards
 	for (let symbol of symbols) { //called onload body and on click restart
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

 	//reset number of matched cards
 	matchedCards = 0;
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

//declare the list of opened cards, starting with all of them closed
let openCards = [];

//set up the event listener for a card
deck.addEventListener('click', function processClickOn(card) {
	//check if a card was clicked (if its class name is card)
	if(card.target.className === 'card') {
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
		const card1 = openCards.splice(0, 1);
		const card2 = openCards.splice(0, 1);
		//if the cards do match, lock the cards in the open position (function is defined below)
		if(card1.firstChild.className === card2.firstChild.className) {
			lockCards(card1, card2);
			//increment number of matched cards by 2
			matchedCards += 2;
		}
		//if the cards do not match, remove the cards from the list (function is defined below)
		else
			hideCards(card1, card2);

		//update and display moveCounter
		updateMoveCounter(++moveCounter);

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