//Name: Martin Alonso Diaz Carvallo
//Version 2.5
//Date: 11 Nov 2024

class Game {

  constructor() {
    this.player = new Player();
    this.computer = new Player();
    this.totalRounds = 3;
    this.countRound = 0;

    this.animationFrame = null;
    this.animationTime = 10; //modular
    this.frameCounter = 0;
    this.totalFrames = 200;

    this.countRepetition = 0;
    this.totalRepetition = 30; 
  }

  roll() {
    this.countRound++
    this.frameCounter = 0;

    if (this.countRound <= this.totalRounds) {
      
      $('#roll-button').prop('disabled', true);

      let diceP = this.player.rollDice();
      let diceC = this.computer.rollDice();

      this.rollAnimation(diceP, diceC);
    }
  }

  rollAnimation(playerDices, compuerDices) { 
    this.frameCounter++;

    if (this.frameCounter % this.animationTime === 0) {
    let randomFace = [0, 1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
      $('#player-dice1').attr('src', `images/dice/dice-0${randomFace[0]}.png`);
      $('#computer-dice1').attr('src', `images/dice/dice-0${randomFace[1]}.png`);
      $('#player-dice2').attr('src', `images/dice/dice-0${randomFace[2]}.png`);
      $('#computer-dice2').attr('src', `images/dice/dice-0${randomFace[3]}.png`);
    }

    if(this.frameCounter < this.totalFrames){
      this.animationFrame = requestAnimationFrame(()=>
        this.rollAnimation(playerDices, compuerDices));
    }
    else (cancelAnimationFrame(this.animationFrame),
    this.setFinalDice(playerDices, compuerDices))
  }

  setFinalDice(playerDice, computerDice) {
    $('#player-dice1').attr('src', `images/dice/dice-0${playerDice[0]}.png`);
    $('#computer-dice1').attr('src', `images/dice/dice-0${computerDice[0]}.png`);
    $('#player-dice2').attr('src', `images/dice/dice-0${playerDice[1]}.png`);
    $('#computer-dice2').attr('src', `images/dice/dice-0${computerDice[1]}.png`);

    this.updateScore();
    $('#roll-button').prop('disabled', false);

    if (this.countRound == this.totalRounds) {
      this.displayResults()
    }
  }

  updateScore() {
    $("#player-round-score").text(this.player.roundScore);
    $("#computer-round-score").text(this.computer.roundScore);
    if(this.countRound<this.totalRounds-1){
      $("#count-rounds").text(this.countRound + 1 +"º")}
    else ($("#count-rounds").text("Last"));
    $("#player-total").text(this.player.totalScore);
    $("#computer-total").text(this.computer.totalScore);
  }

  displayResults() {
    let resultMessage;
    if (this.player.totalScore > this.computer.totalScore) {
      resultMessage = 'Player Wins!';
    } 
    else if (this.player.totalScore < this.computer.totalScore) {
      resultMessage = 'Computer Wins!';
    } 
    else {
      resultMessage = "Tie";
    }

    $("#result-message-text").text(resultMessage);
    $("#result-message").fadeIn(2000, "swing");
    
    $('#roll-button').prop('disabled', true);
    $('#reset01').prop('disabled', true);
    $('#back01').prop('disabled', true);
  }

  resetGame() {
    cancelAnimationFrame(this.animationFrame)
    $('#result-message').hide()
    $('#roll-button').prop('disabled', false);
    $('#reset01').prop('disabled', false);
    $('#back01').prop('disabled', false);

    this.player.reset();
    this.computer.reset();
    this.countRound = 0;

    this.animationFrame = null;
    this.animationTime = 10; //modular
    this.frameCounter = 0;
    this.totalFrames = 200;

    this.countRepetition = 0;
    this.totalRepetition = 30; 

    this.updateScore();
  }
}

class Player {
  constructor() {
    this.totalScore = 0;
    this.roundScore = 0;
  }
}
Player.prototype.rollDice = function() {
  //return [Math.round(Math.random()*6 + 0.5), Math.round(Math.random()*6 + 0.5)]; //first try
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  if (dice1 === 1 || dice2 === 1) {
    this.roundScore = 0; 
  } else if (dice1 === dice2) {
    this.roundScore = (dice1 + dice2) * 2; 
  } else {
    this.roundScore = dice1 + dice2;
  }

  this.totalScore += this.roundScore;
  return [dice1,dice2];
};
Player.prototype.reset = function() {
  this.totalScore = 0;
  this.roundScore = 0;
}


const diceGame = new Game;

$(document).ready(function() {
  bindEvents();
});

function bindEvents() {
  $('#roll-button').on("click", diceGame.roll.bind(diceGame))
  $('.reset-button').on("click",diceGame.resetGame.bind(diceGame));
  $('.back-botton').on("click",goBack);
}

function goBack() {
  console.log("HI")
  window.location.href = `index.html`;
}
