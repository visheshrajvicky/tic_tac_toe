const displayState = document.querySelector('.game--status');

let gameActive = true;
let Player = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningSituations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = () => `Player ${Player} has won!`;
const drawMessage = () => `Draw!`;
const PlayerTurn = () => `It's ${Player}'s turn`;


displayState.innerHTML = PlayerTurn();



function cellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = Player;
        clickedCell.innerHTML = Player;
}



function playerChange() {
    Player = Player === "X" ? "O" : "X";
    displayState.innerHTML = PlayerTurn();

}


function validateResult() {
    let won = false;
    for (let i = 0; i <= 7; i++) {
        const winningSituation = winningSituations[i];
        let a = gameState[winningSituation[0]];
        let b = gameState[winningSituation[1]];
        let c = gameState[winningSituation[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            won = true;
            break
        }
    }


if (won) {
        displayState.innerHTML = winningMessage();
        gameActive = false;
        return;
    }


let draw = !gameState.includes("");
if (draw) {
        displayState.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}


function Replay() {
    gameActive = true;
    Player = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    displayState.innerHTML = PlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function onClickCell(clickedCellEvent) {    
    const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
        );

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }    
        cellPlayed(clickedCell, clickedCellIndex);
        validateResult();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onClickCell));
document.querySelector('.game--replay').addEventListener('click', Replay);