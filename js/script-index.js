
const game1 = "dice-game";
const game2 = "hangman-game";
const animationTime = 100;

$(document).ready(function() {
    bindEvents();
    rollAnimation();
});

function bindEvents() {
    $('#dice-button').on('click', function(event) {
        handleChangeOfWindow(game1, event);
    });

    $('#hangman-button').on('click', function(event) {
        handleChangeOfWindow(game2, event);
    });
}

function handleChangeOfWindow(option, event) {
    event.preventDefault();

    switch(option) {
        case game1:
            window.location.href = `${game1}.html`;
            break;
        case game2:
            window.location.href = `${game2}.html`;
            break;
    }
}

function rollAnimation() { 
    rollDice();
    rollHangman();
  }

function rollDice() {
    let frameCounter = 0;
    function animateDice() {
        frameCounter++;
        if (frameCounter % 15 === 0) { 
            let randomFace = Math.floor(Math.random() * 6) + 1;
            $('#dice-image-index').attr('src', `images/dice/dice-0${randomFace}.png`);
        }
        requestAnimationFrame(animateDice);
    }
    requestAnimationFrame(animateDice);
}

function rollHangman() {
    let frameCounter = 0;
    let count = 0;
    function animateHangman() {
        frameCounter++;
        if (frameCounter % 15 === 0) { 
            if (count == 7) {count = 0};
            $('#hangman-image-index').attr('src', `images/hangman/hangman${count}.jpg`);
            count++;
        }
        requestAnimationFrame(animateHangman);
    }
    requestAnimationFrame(animateHangman);
}