enum GameMode{
    VsComputer, TwoPlayers
}
enum Value{
    X = "img/x.png",
    O = "img/o.png", 
}

const modeSelectionSection = document.getElementById('gameMode')!
const gameFieldSection = document.getElementById('gameField')!
const endGameSection = document.getElementById('gameOver')!

const computerModeBtn = document.getElementById('computerModeBtn')!
const twoPlayersModeBtn = document.getElementById('twoPlayersModeBtn')!
const newGameBtn = document.getElementById('newGameBtn')!

const winnerText = document.getElementById('endGameText')!

let mode: GameMode
let player: Value = Value.X
let endGame: boolean = false
let cells: HTMLElement[] = [];

computerModeBtn.addEventListener("click", ()=>{
    mode = GameMode.VsComputer
    startGame();
})
twoPlayersModeBtn.addEventListener("click", ()=>{
    mode = GameMode.TwoPlayers
    startGame();
})

newGameBtn.addEventListener('click', () => {
    gameFieldSection.innerHTML=""
    gameFieldSection.hidden=true
    endGameSection.hidden=true
    modeSelectionSection.hidden=false
})

function startGame(){
    modeSelectionSection.hidden = true;
    gameFieldSection.hidden = false
    player = Value.X
    endGame = false
    cells = []
    fieldGeneration();
}

function fieldGeneration(){
    let counter = 0
    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.count = String(counter);
            cell.addEventListener("click", () => cellClick(cell))
            gameFieldSection.appendChild(cell);
            cells.push(cell);
            counter+=1;
        }
        
    }
    console.log(cells)
}

function cellClick(cell:HTMLElement){
    if (!endGame && cell.innerHTML==""){
        const move = document.createElement('img')
        move.src = player;
        cell.appendChild(move);
        cell.dataset.val = (player === Value.X) ? "x" : "o"
        winCheck() 
        player = (player === Value.X) ? Value.O : Value.X
        if (mode === GameMode.VsComputer && !endGame && player===Value.O) {
            computerMove();
        }
    }
    console.log(cells)

}

function winCheck(){
    const winComdinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ]
    for (let combination of winComdinations){
        const [x, y, z] = combination;
        if (cells[x].innerHTML!="" && cells[x].dataset.val===cells[y].dataset.val && cells[x].dataset.val===cells[z].dataset.val){
            endGame = true;
            endOfGame(cells[x].dataset.val);
            return
        }
    }

    if (cells.every(cell => cell.innerHTML !== "")){
        endGame = true;
        winnerText.textContent = 'Ничья!'
        endGameSection.hidden = false
    }

}
function computerMove(){
    let emptyCells = cells.map((cell, index) => cell.innerHTML === "" ? index : -1).filter(index => index !== -1);
    let randomIndex = Math.floor(Math.random()* emptyCells.length);
    cellClick(cells[emptyCells[randomIndex]]);
}

function endOfGame(winner){
    winnerText.textContent = `${winner} - победитель!`
    endGameSection.hidden = false
}