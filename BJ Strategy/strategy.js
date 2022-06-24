const HIGH_CARDS = ['t', 'j', 'k', 'q'];
const HIGH_CARD_VALUE = 10;
const LOW_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9'];
const ACE = 'a';
const ACE_VALUE = 11;
const HIT = "HIT.";
const STAND = "STAND.";
const DOUBLE_OR_HIT = "DOUBLE. If DOUBLE is not available, then HIT.";
const SPLIT = "SPLIT.";
const DOUBLE_OR_STAND = "DOUBLE. If DOUBLE is not available, then STAND.";
const SURRENDER_OR_HIT = "SURRENDER. If SURRENDER is not available, then HIT.";
const SURRENDER_OR_STAND = "SURRENDER. If SURRENDER is not available, then STAND.";
const SURRENDER_OR_SPLIT = "SURRENDER. If SURRENDER is not available, then SPLIT.";
const SPLIT_AND_DOUBLE_OR_HIT = "SPLIT and then DOUBLE.  If DOUBLE is not available, then HIT.";

var players_hand = "", dealers_card = "";
document.getElementById("get-strat").onclick = function() {getData(players_hand, dealers_card)};

// Player class to hold hand and hand_value.
class Player{

  constructor(hand,hand_value){
    this.hand = hand;
    this.hand_value = hand_value;
  }

  getPlayerHandValue(){
    return this.hand_value
  }
  calculatePlayerHandValue(hand){
    let hand_value = 0;
    for (let i = 0; i < hand.length; i++) {
      if(HIGH_CARDS.includes(hand[i]))
        hand_value += HIGH_CARD_VALUE;
      else if(LOW_CARDS.includes(hand[i]))
        hand_value += parseInt(hand[i]);
      else if(ACE.includes(hand[i]))
        hand_value += ACE_VALUE;
    }
    this.hand_value = hand_value
  }
}

// Dealer class to hold card and card_value.
class Dealer{
  constructor(card,card_value){
    this.card = card;
    this.card_value = card;
  }

  getDealerCardValue(){
    return this.card_value
  }

  calculateDealerCardValue(card){
    let card_value = 0;
    if(HIGH_CARDS.includes(card))
      card_value += HIGH_CARD_VALUE;
    else if(LOW_CARDS.includes(card))
      card_value += parseInt(card);
    else if(ACE.includes(card))
      card_value += ACE_VALUE;

    this.card_value = card_value
  }
}

// Does all main calls/work to make computations.
function getData(players_hand, dealers_card){


  // Getting player and dealer hand values.
  players_hand = document.getElementById("players-cards").value;
  dealers_card = document.getElementById("dealers-card").value;

  // Converting to lowercase.
  players_hand = players_hand.toLowerCase();
  dealers_card = dealers_card.toLowerCase();

  // Converting to array.
  players_hand = players_hand.split('');

  // Making a player to hold the hand and the hand_value.
  const player = new Player(players_hand, 0);
  player.calculatePlayerHandValue(player.hand);
  player.hand_value = player.getPlayerHandValue();

  // Making a dealer to hold the card and the card_value.
  const dealer = new Dealer(dealers_card, 0);
  dealer.calculateDealerCardValue(dealer.card);
  dealer.card_value = dealer.getDealerCardValue();

  getStrategy(player,dealer);

  //document.getElementById("strategy").innerHTML = "player" + dealer.card_value;
}

// Calls pairRules, hardTotals, or softTotals in order to obtain a strategy.
function getStrategy(player, dealer){
  let c1 = player.hand[0];
  let c2 = player.hand[1];
  let phv = player.hand_value;
  let dcv = dealer.card_value;

  // Calls pairRules if card 1 in the players hand is = to card 2.
  if (c1 == c2)
    pairRules(c1, dcv);

  // Calls hardTotals if the hand is not a pair and neither is an ace.
  else if (c1 != c2 && (c1 != ACE && c2 != ACE))
    hardTotals(phv, dcv);

  // Calls sofTotals if the hand is not a pair and one card is an ace.
  else if (c1 != c2 && (c1 == ACE || c2 == ACE))
    softTotals(phv,dcv);
}

// When hand is a pair do suggested action.
function pairRules(c1, dcv){

  // Pairs of 2's and 3's.
  if (c1 == 2 || c1 == 3){
    if (dcv == 2 || dcv == 3)
      document.getElementById("strategy").innerHTML = SPLIT_AND_DOUBLE_OR_HIT;
    else if (dcv >= 4 && dcv <= 7)
      document.getElementById("strategy").innerHTML = SPLIT;
    else if (dcv >= 8 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Pair of 4's.
  else if (c1 == 4){
    if ((dcv >= 2 && dcv <= 4) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv == 5 || dcv == 6)
      document.getElementById("strategy").innerHTML = SPLIT_AND_DOUBLE_OR_HIT;
  }

  // Pair of 5's.
  else if (c1 == 5){
    if (dcv >= 2 && dcv <= 9)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
    else if (dcv == HIGH_CARD_VALUE || dcv == ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Pair of 6's.
  else if (c1 == 6){
    if (dcv == 2)
      document.getElementById("strategy").innerHTML = SPLIT_AND_DOUBLE_OR_HIT;
    else if (dcv >= 3 && dcv <= 6)
      document.getElementById("strategy").innerHTML = SPLIT;
    else if (dcv >=7 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Pair of 7's.
  else if (c1 == 7){
    if (dcv >= 2 && dcv <=7)
      document.getElementById("strategy").innerHTML = SPLIT;
    else if (dcv >=8 && dcv <= ACE_VALUE)
        document.getElementById("strategy").innerHTML = HIT;
  }

  // Pair of 8's.
  else if (c1 == 8){
    if (dcv >= 2 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = SPLIT;
  }

  // Pair of 9's.
  else if (c1 == 9){
    if ((dcv >= 2 && dcv <= 6) || (dcv >= 8 && dcv <= 9))
      document.getElementById("strategy").innerHTML = SPLIT;
    else if ((dcv == 7) || (dcv >= HIGH_CARD_VALUE && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = STAND;
  }

  // Pairs of HIGH_CARDS.
  else if (HIGH_CARDS.includes(c1)){
    if (dcv >= 2 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = STAND;
  }

  // Pairs of ACE's.
  else if (ACE.includes(c1)){
    if (dcv >= 2 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = SPLIT;
  }

}

// When hand doesn't involve an ace and isn't a pair do selected action.
function hardTotals(phv, dcv){

  // Hand total of 8 and below phv.
  if (phv <= 8){
    if (dcv >= 2 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Hand total of 9.
  else if (phv == 9){
    if ((dcv == 2) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 3 && dcv <= 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
  }

  // Hand total of 10.
  else if (phv == HIGH_CARD_VALUE){
    if (dcv >= 2 && dcv <= 9)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
    else if (dcv >= HIGH_CARD_VALUE && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Hand total of 11.
  else if (phv == ACE_VALUE){
    if (dcv >= 2 && dcv <= HIGH_CARD_VALUE)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
    else if (dcv == ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Hand total of 12.
  else if (phv == 12){
    if ((dcv >= 2 && dcv <= 3) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 4 && dcv <= 6)
      document.getElementById("strategy").innerHTML = STAND;
  }

  // Hand total of 13 and 14.
  else if (phv == 13 || phv == 14){
    if (dcv >= 2 && dcv <= 6)
      document.getElementById("strategy").innerHTML = STAND;
    else if (dcv >= 7 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // Hand total of 15.
  else if (phv == 15){
    if (dcv >= 2 && dcv <= 6)
      document.getElementById("strategy").innerHTML = STAND;
    else if ((dcv == ACE_VALUE) || (dcv >= 7 && dcv <= 9))
      document.getElementById("strategy").innerHTML = HIT;
      else if (dcv == HIGH_CARD_VALUE)
        document.getElementById("strategy").innerHTML = SURRENDER_OR_HIT;
  }

  // Hand total of 16.
  else if (phv == 16){
    if (dcv >= 2 && dcv <= 6)
      document.getElementById("strategy").innerHTML = STAND;
    else if (dcv >= 7 && dcv <= 8)
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 9 && dcv <= HIGH_CARD_VALUE)
      document.getElementById("strategy").innerHTML = SURRENDER_OR_HIT;
  }
  // Hand total of 17 - 21. *Change if want to say blackjack*
  else if (phv >= 17 && phv <= 21){
    if (dcv >= 2 && dcv <= ACE_VALUE){
      document.getElementById("strategy").innerHTML = STAND;
    }
  }

}

// When hand is not a pair and holds an ace and another card.
function softTotals(phv,dcv){

  // 13 (a2) and 14 (a3).
  if (phv == 13 || phv == 14){
    if ((dcv >= 2 && dcv <= 4) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 5 && dcv <= 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
  }

  // 15 (a4) and 16 (a5).
  else if (phv == 15 || phv == 16){
    if ((dcv >= 2 && dcv <= 3) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 4 && dcv <= 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
  }

  // 17 (a6).
  else if (phv == 17){
    if ((dcv == 2) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = HIT;
    else if (dcv >= 3 && dcv <= 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_HIT;
  }

  // 18 (a7).
  else if (phv == 18){
    if ((dcv == 2) || (dcv >= 7 && dcv <= 8))
      document.getElementById("strategy").innerHTML = STAND;
    else if (dcv >= 3 && dcv <= 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_STAND;
    else if (dcv >= 9 && dcv <= ACE_VALUE)
      document.getElementById("strategy").innerHTML = HIT;
  }

  // 19 (a8).
  else if (phv == 19){
    if ((dcv >= 2 && dcv <= 5) || (dcv >= 7 && dcv <= ACE_VALUE))
      document.getElementById("strategy").innerHTML = STAND;
    else if (dcv == 6)
      document.getElementById("strategy").innerHTML = DOUBLE_OR_STAND;
  }

  // 20 (a9). *Change for 20+*
  else if (phv == 20){
    if (dcv >= 2 && dcv <= ACE_VALUE){
      document.getElementById("strategy").innerHTML = STAND;
    }
  }

}
