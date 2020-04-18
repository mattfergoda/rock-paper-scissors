let playerWins = 0;
let computerWins = 0;
const MAX_POINTS = 5;
let gameActive = true;

function computerPlay() {
    let responses = ["rock", "paper", "scissors"];
    return responses[Math.floor(Math.random() * 3)];
}

function showResult(resultString){
    const container = document.querySelector("#results");

    const result = document.createElement('div');
    result.classList.add('result');
    result.textContent = resultString;

    container.appendChild(result);
}

function playRound(e) {
    let playerSelection = this.id;
    let computerSelection = computerPlay();
    let result;
    let resultString;
    if (gameActive) {
        if (playerSelection == computerSelection) {
            resultString = "It's a tie.";
            result = "tie";
        }
        else if (playerSelection == "rock") {
            if (computerSelection == "scissors") {
                resultString = "You win this round. Rock beats scissors.";
                result = "win";
            }
            else if (computerSelection == "paper") {
                resultString = "You lose this round. Paper covers rock.";
                result = "lose";
            }
        }
        else if (playerSelection == "paper") {
            if (computerSelection == "rock") {
                resultString = "You win this round. Paper covers rock.";
                result = "win";
            }
            else if (computerSelection == "scissors") {
                resultString = "You lose this round. Scissors cut paper.";
                result = "lose";
            }
        }
        else if (playerSelection == "scissors") {
            if (computerSelection == "paper") {
                resultString = "You win this round. Scissors cut paper.";
                result = "win";
            }
            else if (computerSelection == "rock") {
                resultString = "You lose this round. Rock beats scissors.";
                result = "lose";
            }
        }
        showResult(resultString);
        addToScoreTally(result); 
        checkWinner();
    }   
}

function addToScoreTally(result) {
    if (result == 'win') {
        playerWins++;
    }
    else if (result == 'lose') {
        computerWins++;
    }
    showScore()
}

function showScore() {
    const container = document.querySelector("#scoreboard");

    // Remove the old score.
    const oldScore = document.getElementById("score")
    oldScore.parentNode.removeChild(oldScore);

    // Create and show new score.
    let scoreString = `Score: You - ${playerWins} | Computer - ${computerWins}`;
    const score = document.createElement('div');
    score.id = 'score';
    score.textContent = scoreString;
    container.appendChild(score);
}

function checkWinner() {
    let winner;
    if (playerWins == MAX_POINTS) {
        winner = 'player';
    }
    else if (computerWins == MAX_POINTS) {
        winner = 'computer';
    }
    else {
        return;
    };
    showWinner(winner);
}

function showWinner(winner) {
    let winString;
    const winMsg = document.createElement('div');
    const container = document.querySelector("#results");
    winMsg.classList.add('win');

    if (winner == 'player') {
        winString = "Congrats, you win!"
        winMsg.classList.add('win-player');
    }
    else if (winner == 'computer') {
        winString = "Sorry, you lose!"
        winMsg.classList.add('win-computer');
    }

    winMsg.textContent = winString;
    container.appendChild(winMsg);
    gameActive = false;
}

function game(){
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', playRound);
    });
}

game();
