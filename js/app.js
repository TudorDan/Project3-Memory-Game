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

//create a function to display the cards on the page
function displayCards() {
	//declare a variable where we will add the cards
	let deck = document.querySelector('.deck');

	//remove old set of cards if present
	while (deck.hasChildNodes())  //method to check if deck has a child
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
