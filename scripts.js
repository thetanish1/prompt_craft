document.getElementById('ticTacToeBtn').addEventListener('click', launchTicTacToe);
document.getElementById('snakeBtn').addEventListener('click', launchSnakeGame);
document.getElementById('ageCalculatorBtn').addEventListener('click', openAgeCalculator);

function goBack() {
    const mainMenuHTML = `
        <div class="container">
            <h1>Game Launcher</h1>
            <button id="ticTacToeBtn">Launch Tic Tac Toe</button>
            <button id="snakeBtn">Launch Snake Game</button>
            <button id="ageCalculatorBtn">Open Age Calculator</button>
        </div>
    `;
    document.body.innerHTML = mainMenuHTML;
    
    document.getElementById('ticTacToeBtn').addEventListener('click', launchTicTacToe);
    document.getElementById('snakeBtn').addEventListener('click', launchSnakeGame);
    document.getElementById('ageCalculatorBtn').addEventListener('click', openAgeCalculator);
}

function launchTicTacToe() {
    const ticTacToeHTML = `
        <div id="ticTacToe" style="text-align: center;">
            <h2>Tic Tac Toe</h2>
            <div id="board" style="display: inline-block;">
                <div class="row">
                    <div class="cell" onclick="makeMove(0)"></div>
                    <div class="cell" onclick="makeMove(1)"></div>
                    <div class="cell" onclick="makeMove(2)"></div>
                </div>
                <div class="row">
                    <div class="cell" onclick="makeMove(3)"></div>
                    <div class="cell" onclick="makeMove(4)"></div>
                    <div class="cell" onclick="makeMove(5)"></div>
                </div>
                <div class="row">
                    <div class="cell" onclick="makeMove(6)"></div>
                    <div class="cell" onclick="makeMove(7)"></div>
                    <div class="cell" onclick="makeMove(8)"></div>
                </div>
            </div>
            <button onclick="resetGame()">Reset Game</button>
            <button onclick="goBack()">Back</button>
        </div>
    `;
    document.body.innerHTML = ticTacToeHTML + `<style>
        .row { display: flex; }
        .cell { width: 60px; height: 60px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; }
    </style>`;
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    window.makeMove = function(index) {
        if (board[index] === '') {
            board[index] = currentPlayer;
            document.querySelectorAll('.cell')[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkWinner();
        }
    };

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                alert(`Player ${board[a]} wins!`);
                resetGame();
            }
        }
        if (!board.includes('')) alert("It's a draw!");
    }

    window.resetGame = function() {
        board = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
    };
}

function launchSnakeGame() {
    const snakeGameHTML = `
        <div id="snakeGame" style="text-align: center;">
            <h2>Snake Game</h2>
            <canvas id="snakeCanvas" width="400" height="400" style="border: 1px solid #000;"></canvas>
            <button onclick="startSnakeGame()">Start Game</button>
            <button onclick="goBack()">Back</button>
        </div>
    `;
    document.body.innerHTML = snakeGameHTML;

    let canvas = document.getElementById("snakeCanvas");
    let ctx = canvas.getContext("2d");
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 };
    let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    let gameInterval;

    window.startSnakeGame = function() {
        clearInterval(gameInterval);
        gameInterval = setInterval(updateSnake, 100);
        document.addEventListener("keydown", changeDirection);
    };

    function changeDirection(event) {
        switch(event.key) {
            case 'ArrowUp': direction = { x: 0, y: -1 }; break;
            case 'ArrowDown': direction = { x: 0, y: 1 }; break;
            case 'ArrowLeft': direction = { x: -1, y: 0 }; break;
            case 'ArrowRight': direction = { x: 1, y: 0 }; break;
        }
    }

    function updateSnake() {
        let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) {
            clearInterval(gameInterval);
            alert("Game Over");
        }

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach(segment => {
            ctx.fillStyle = "green";
            ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
        });
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
    }
}

function openAgeCalculator() {
    const ageCalculatorHTML = `
        <div id="ageCalculator" style="text-align: center;">
            <h2>Age Calculator</h2>
            <input type="date" id="dob" />
            <button onclick="calculateAge()">Calculate Age</button>
            <button onclick="goBack()">Back</button>
            <p id="ageOutput"></p>
        </div>
    `;
    document.body.innerHTML = ageCalculatorHTML;

    window.calculateAge = function() {
        const dob = new Date(document.getElementById('dob').value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        document.getElementById('ageOutput').textContent = `Your age is ${age} years.`;
    };
}
