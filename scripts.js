const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
let score = 0;
let speed = 200;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));
}

function drawFood() {
    drawRect(food.x, food.y, 'red');
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        speed = Math.max(50, speed - 10); // Increase speed as score increases
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        score = 0;
        speed = 200;
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
        return;
    }

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, speed);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

gameLoop();