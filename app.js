/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-1').textContent = '0'

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.add('active');

gamePlaying = true;
};

init();

/*
function btn(){
	//Do something on click
}
btn();

document.querySelector('.btn-roll').addEventListener('click', btn);
*/


//Roll button 
document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
			//random number
		var dice = Math.floor(Math.random()*6) +1;

		//display result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//if >1, display round score
		if (dice > 1){
			//add to round score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore
		} else {
			//next player
			nextPlayer();
		}
	}
});
	


//Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		//add current score to global score
		scores[activePlayer] += roundScore;


		//update UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//create var for a value if user decided to set a different winning final score than 100
		var input = document.querySelector('.final-score').value;

		//if user input a different winning score
		if(input){
			//check if player won the game
			if (scores[activePlayer] >= input) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;
			} else {
				nextPlayer();
		}
		//leaves input box blank hence default score of 100 to win
		} else{
			//check if player won the game
			if (scores[activePlayer] >= 100) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;
			} else {
				nextPlayer();
			}
		}
	}
	
});


//next player function for DRY purposes
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
};


//New game button
document.querySelector('.btn-new').addEventListener('click', init);







