const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800; //800;
canvas.height = 600; //600;

let snake = [{ x: 50, y: 50 }];
let direction = { x: 1, y: 0 }; // Moving right
let food = { x: 100, y: 100 };
let speed = 50; // Adjust this value
let lastTime = 0;

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({}); // Grow the snake
        placeFood(); // Place new food
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function checkCollision() {
    const head = snake[0];
    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: 50, y: 50 }];
    direction = { x: 1, y: 0 };
    placeFood();
}

function gameLoop(timestamp) {
    if (timestamp - lastTime >= speed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        checkFoodCollision();
        checkCollision();

        const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
        snake.unshift(head);
        if (snake.length > 5) snake.pop();

        lastTime = timestamp; // Update last time
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
});

placeFood(); // Initial food placement
requestAnimationFrame(gameLoop);
