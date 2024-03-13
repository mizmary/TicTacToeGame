var GameMode;
(function (GameMode) {
    GameMode[GameMode["VsComputer"] = 0] = "VsComputer";
    GameMode[GameMode["TwoPlayers"] = 1] = "TwoPlayers";
})(GameMode || (GameMode = {}));
var Value;
(function (Value) {
    Value["X"] = "img/x.png";
    Value["O"] = "img/o.png";
})(Value || (Value = {}));
var modeSelectionSection = document.getElementById('gameMode');
var gameFieldSection = document.getElementById('gameField');
var endGameSection = document.getElementById('gameOver');
var computerModeBtn = document.getElementById('computerModeBtn');
var twoPlayersModeBtn = document.getElementById('twoPlayersModeBtn');
var newGameBtn = document.getElementById('newGameBtn');
var winnerText = document.getElementById('endGameText');
var mode;
var player = Value.X;
var endGame = false;
var cells = [];
computerModeBtn.addEventListener("click", function () {
    mode = GameMode.VsComputer;
    startGame();
});
twoPlayersModeBtn.addEventListener("click", function () {
    mode = GameMode.TwoPlayers;
    startGame();
});
newGameBtn.addEventListener('click', function () {
    gameFieldSection.innerHTML = "";
    gameFieldSection.hidden = true;
    endGameSection.hidden = true;
    modeSelectionSection.hidden = false;
});
function startGame() {
    modeSelectionSection.hidden = true;
    gameFieldSection.hidden = false;
    player = Value.X;
    endGame = false;
    cells = [];
    fieldGeneration();
}
function fieldGeneration() {
    var counter = 0;
    for (var i = 0; i < 3; i++) {
        var _loop_1 = function (j) {
            var cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.count = String(counter);
            cell.addEventListener("click", function () { return cellClick(cell); });
            gameFieldSection.appendChild(cell);
            cells.push(cell);
            counter += 1;
        };
        for (var j = 0; j < 3; j++) {
            _loop_1(j);
        }
    }
    console.log(cells);
}
function cellClick(cell) {
    if (!endGame && cell.innerHTML == "") {
        var move = document.createElement('img');
        move.src = player;
        cell.appendChild(move);
        cell.dataset.val = (player === Value.X) ? "x" : "o";
        winCheck();
        player = (player === Value.X) ? Value.O : Value.X;
        if (mode === GameMode.VsComputer && !endGame && player === Value.O) {
            computerMove();
        }
    }
    console.log(cells);
}
function winCheck() {
    var winComdinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (var _i = 0, winComdinations_1 = winComdinations; _i < winComdinations_1.length; _i++) {
        var combination = winComdinations_1[_i];
        var x = combination[0], y = combination[1], z = combination[2];
        if (cells[x].innerHTML != "" && cells[x].dataset.val === cells[y].dataset.val && cells[x].dataset.val === cells[z].dataset.val) {
            endGame = true;
            endOfGame(cells[x].dataset.val);
            return;
        }
    }
    if (cells.every(function (cell) { return cell.innerHTML !== ""; })) {
        endGame = true;
        winnerText.textContent = 'Ничья!';
        endGameSection.hidden = false;
    }
}
function computerMove() {
    var emptyCells = cells.map(function (cell, index) { return cell.innerHTML === "" ? index : -1; }).filter(function (index) { return index !== -1; });
    var randomIndex = Math.floor(Math.random() * emptyCells.length);
    cellClick(cells[emptyCells[randomIndex]]);
}
function endOfGame(winner) {
    winnerText.textContent = "".concat(winner, " - \u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C!");
    endGameSection.hidden = false;
}
