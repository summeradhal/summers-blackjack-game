// javascript has 3 primary buttons;deal hit and stand
// ##the table is set up with bootstrap 
//
var theDeck=[];
//when the dealer clicks deal, deal
$(document).ready(function(){
	$('.deal-button').click(function(){
		createDeck();
		placeCard('player','one',theDeck[0]);
		placeCard('player','two',theDeck[1]);
		placeCard('dealer','one',theDeck[2]);
		placeCard('dealer','two',theDeck[3]);


	});

$('.hit-button').click(function(){
	placeCard('player','three',theDeck[4])
			

	});
$('.stand-button').click(function(){
			

	});});


function placeCard(who,where,cardToPlace){
	var classSelector='.'+who+'-cards .card-'+where;
	$(classSelector).html('9D');
}

function createDeck(){
	// Fill the deck with 52 cards. 4 suits:h,S,d,c. 
	var suits=['h','s','d','c'];
	for(s=0;s<suits.length;s++){
		for(c=1;c<=13;c++){
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
}

console.log(theDeck);

}


