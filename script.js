// javascript has 3 primary buttons;deal hit and stand
// ##the table is set up with bootstrap 
//
var theDeck=[];
var playersHand=[];
var dealersHand=[];
var topOfTheDeck=4;
var gameOver=false;
var bank=100;
var betAmount=0;

$(document).ready(function(){
//when the dealer clicks deal, deal
$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13C
		shuffleDeck(); //Shuffle the deck!
		console.log(theDeck);

		//Push onto the playersHand array, the new card. Then place it in the DOM.
		playersHand.push(theDeck[0]);
		setTimeout(function(){ 
			placeCard('player', 'one', theDeck[0]);
		}, 500);

		
		
		dealersHand.push(theDeck[1]);
		setTimeout(function(){ 
			placeCard('dealer', 'one', theDeck[1]);
		}, 1000);

		playersHand.push(theDeck[2]);
		setTimeout(function(){ 
			placeCard('player', 'two', theDeck[2]);
		}, 1500);



		dealersHand.push(theDeck[3]);
		setTimeout(function(){ 
			placeCard('dealer', 'two', theDeck[3]);
		}, 2000);

		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');

	});

$('.hit-button').click(function(){
		var playerTotal = calculateTotal(playersHand, 'player');
		if(playerTotal <= 21){
			
			var slotForNewCard = '';
			if(playersHand.length == 2){slotForNewCard = "three";}
			else if(playersHand.length == 3){slotForNewCard = "four";}
			else if(playersHand.length == 4){slotForNewCard = "five";}
			else if(playersHand.length == 5){slotForNewCard = "six";}

			setTimeout(function(){ 
				placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
				playersHand.push(theDeck[topOfTheDeck]);
				calculateTotal(playersHand, 'player');
				topOfTheDeck++;
			}, 500);		
		}
	});
$('.stand-button').click(function(){
			var slotForNewCard=''
;			//wplayer clicked on stand. playe rwait and sees what happens
			var dealerTotal=calculateTotal(dealersHand,'dealer');
// console.log(dealerTotal);
while(dealerTotal<17){
	//dealer has less than 17 hit away
	if(dealersHand.length==2){slotForNewCard="three";}
	else if(dealersHand.length==3){slotForNewCard="four";}
	else if(dealersHand.length==4){slotForNewCard="five";}
	else if(dealersHand.length==5){slotForNewCard="six";}
	placeCard('dealer',slotForNewCard,theDeck[topOfTheDeck]);
	dealersHand.push(theDeck[topOfTheDeck]);
	dealerTotal=calculateTotal(dealersHand,'dealer');
	topOfTheDeck++;

}//end while

// dealer has at least 17 Check to see who won

checkWin();
	}); //stand


//BETTING BUTTONS
//when the dealer clicks deal, deal
$('.bet').click(function(){
betAmount=Number($(this).attr("value"));
$('.bet-total-number').html(betAmount);

}); // End of doc thing


});



function checkWin(){
	alert("Game Over");
	// get player total
	//get dealer total
	var playerTotal=calculateTotal(playersHand,'player');
	var dealerTotal=calculateTotal(dealersHand,'dealer');

		if(playerTotal>21){
			
			bet('lose');

		}else if(dealerTotal>21){
				
				bet('win');

		}else
			// neither player has more than 21
			if(playerTotal>dealerTotal){
				
				bet('win');
			}else if(dealerTotal>playerTotal){
					
				bet('lose');
			}else if((playerTotal==21)&&(playersHand.length==2)){
				bet('twoCardWin');

			}else if(playerTotal==21){
						
						bet('blackjack');

			}else{
				//tie
				bet();
			}
			
		}
		$('.message').html('<button class="reset-button">Reset Game</button>');
		$('.reset-button').click(function(){
		reset();
		});

		

function placeCard(who,where,cardToPlace){
	
	var classSelector='.'+who+'-cards .card-'+where;
	$(classSelector).html('<img src="'+cardToPlace+'.png">');

// for(var j=0;j<pic.length;j++)
// 	for(var i=0;i<13;i++){
		
// 		$('classSelector').css('background-image', imageUrl);

	
}

function createDeck(){
	// Fill the with 
	// - 52 cards.
	// - 4 suits
	// 	- h, s, d, c


	
	var suits = ['h','s','d','c'];
	for(s=0; s<suits.length; s++){
		for(c=1; c<=13; c++){
	
				
				theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){

for(var i=1;i<1000;i++){
	card1=Math.floor(Math.random()*theDeck.length);
	card2=Math.floor(Math.random()*theDeck.length);
	var temp=theDeck[card1];
	theDeck[card1]=theDeck[card2];
	theDeck[card2]=temp;
};

console.log(theDeck);

};


function calculateTotal(hand, whosTurn){
	// console.log(hand);
	// console.log(whosTurn);
	var hasAce=false; //init ace as false
	var total = 0;
	var cardValue = 0;
	for(var i = 0; i<hand.length; i++){
		cardValue = Number(hand[i].slice(0,-1))
		if((cardValue==1) &&(total+11)<=21){
			cardValue=11;
			hasAce=true;
		}else if(cardValue > 10){
			cardValue = 10;
		}else if((cardValue+total>21) &&(hasAce)){
		total-=10;
		hasAce=false;
			
	}
	total += cardValue;
}
	// Update the HTML with the new total
	var elementToUpdate = '.'+whosTurn+'-total-number';
	$(elementToUpdate).text(total);
	
	return total;
}


function reset(){
	theDeck=[];
playersHand=[];
dealersHand=[];
topOfTheDeck=4;

$('.card').html('');
calculateTotal(playersHand,'player');
calculateTotal(dealersHand,'dealer');




};



function bet(outcome){

if(outcome=='lose'){
bank-=betAmount;

}else if(outcome=='win'){
	bank+=betAmount;
	


}else if(outcome=='blackjack') {
 var newBet=(betAmount*1.5);
 bank+=newBet;

}else if(outcome=='twoCardWin'){
	var newBet=(betAmount*2);
	bank+=newBet;
}else{

		bank=bank;
}
$('.bet-bank-number').html(bank);

$('.bet-total-number').html(betAmount);
betAmount=0;

$('.bet-total-number').html(betAmount);
}; //end of bet


// cardValue=Number(cardValue);
// console.log(hand[i]);
// console.log(cardValue);


 //end of calculateTotal

// Update the html with the new total




// function setKingdom(hand,whoseTurn){

		
// 		for(var i=0;i<hand.length;i++){
// 			cardKingdom=Number(hand[i].slice(0,-1));
// 			cardSuiteLetter=Number(hand[i].slice(1));
// 			if(cardKingdom==10){
// 				cardKingdom='J';

// 			}else if(cardKingdom==11){
// 				cardKingdom='Q';
// 			}else if(cardKingdom==12){
// 				cardKingdom='K';
// 		}else if(cardKingdom==1){
// 				cardKingdom='A';
// 	}
// 	var newCard=cardKingdom+cardSuiteLetter;
// 	return newCard;

// }
// }




