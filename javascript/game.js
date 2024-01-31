let lastRenderTime = 0;
let snakeSpeed = 3;
let inputDir = { x: 0, y: 0 };
const game = document.querySelector("#game")
const scoreUpdate = document.querySelector(".score-update");

let food = { x: 3, y: 3 };
let snakeArr = [{ x: 5, y: 5 }];
let score=0;


function main(currentTime) {


    window.requestAnimationFrame(main)
    if ((currentTime - lastRenderTime) / 1000 < 1 / snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;

    console.log("run");
    play();

}






//game logic



window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {

    
    // Start the game

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});


//checking for collission
function isCollide(snake) {
    //hitting into snake
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
        
    }

    //hitting wall
    if (snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true;
       
    }
    return false;

}



const play = () => {
    //snake collide
        if (isCollide(snakeArr)) {
            inputDir = { x: 0, y: 0 };
            score=0;
            scoreUpdate.innerHTML = `Score : ${score}`;
            alert("Game Over. Press any key to play again!");
            snakeArr = [{ x: 13, y: 15 }];
           
    
        }
    //eating food
        if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
            score +=1;
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
            console.log(snakeArr);
            
           
            scoreUpdate.innerHTML = `Score : ${score}`;
            
            
            let a = 2;
            let b = 16;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
            console.log(food);
        }
    
        //move snake
    
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    
    
        //display snake
        game.innerHTML = "";
        snakeArr.forEach((e, index) => {
            let snakeElement = document.createElement("div");
    
            snakeElement.style.gridColumnStart = e.x;
            snakeElement.style.gridRowStart = e.y;
            //snakeElement.classList.add('snake');
            if (index === 0) {
                snakeElement.classList.add('snake-head');
            }
            else {
                snakeElement.classList.add('snake');
            }
    
            game.appendChild(snakeElement);
        });
    
        //display food
    
        let foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add('food');
        game.appendChild(foodElement);
    
    };


