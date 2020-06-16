// game variables
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener (need to use parent, especially b/c the class is added after page is loaded | using mousedown b/c click doesn't allow enough time for btn to appear)
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//listener for guess
guessBtn.addEventListener('click', function () {
    // notice when it is consoled, it is a string, needs to be a number for comparison so need to use parseInt
    // console.log(guessInput.value)
    let guess = parseInt(guessInput.value);

    //validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }
    // check if winning //#endregion
    if (guess === winningNumber) {

        gameOver(true, `${winningNumber} is correct! You win!`)
        // //disable input
        // guessInput.disabled = true;
        // //change border to show win
        // guessInput.style.borderColor = 'green';
        // // set message
        // setMessage(`${winningNumber} is correct! You win!`, 'green');
    } else {
        // want to subtract guesses shorthand way to subtract 1
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(false, `Game over. The correct number was ${winningNumber}`);
            // //game over - lost
            // guessInput.disabled = true;
            // guessInput.style.borderColor = 'red';
            // setMessage(`Game over. The correct number was ${winningNumber}`, 'red');
        } else {
            //guess again
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is incorrect | Guesses left: ${guessesLeft}`);
        }
    }
});

// game over = use this function to optimize
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    //play again
    guessBtn.value = "Play Again?";
    guessBtn.className += 'play-again';

}

// set winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//set message function, by setting 2nd param as color, you can use this function to call msg multiple times and change the color
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}