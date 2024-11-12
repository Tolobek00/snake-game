const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const top = document.getElementById("top");
const bottom = document.getElementById("bottom");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let food = getRandomFoodPosition();
let direction = "RIGHT";
let gameInterval;
let score = 0;

// Управление направлением змейки
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (keyPressed === 38 && direction !== "DOWN") direction = "UP";
  else if (keyPressed === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (keyPressed === 40 && direction !== "UP") direction = "DOWN";
}

// Начало игры
function startGame() {
  gameInterval = setInterval(draw, 100);
}

// Генерация случайной позиции для еды
function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
}

// Отображение игры
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем еду
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Рисуем змейку
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  // Двигаем змейку
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "DOWN") head.y += boxSize;

  // Проверка на столкновение с границами
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Your score is " + score);
    return;
  }

  snake.unshift(head);

  // Проверка на поедание еды
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }

  // Отображение счета
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

startGame();
