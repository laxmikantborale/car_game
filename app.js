const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

console.log(score);

startScreen.addEventListener("click", start);

let player = { speed: 5, score: 0};

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

// Adding event listeners

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// =======================================================================

// making functional arrow keys of keyboard

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key)
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key)
    // console.log(keys);
}
// ========================================================================

// function for ending the game if cars get collide

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

// =============================================================================

// function for moving lines inside the road

function moveLines(){
    let lines = document.querySelectorAll(".lines");

    lines.forEach(function(item) {

        if(item.y >= 600){       // ==> for moving the lines contineously
            item.y -= 650
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    } )
}

// function for moving the cars 

function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = "Game Over. <br> Your Final Score is " +  player.score + ". <br> Press Here To Restart The Game."
}

function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");

    enemy.forEach(function(item) {

        if(isCollide(car, item)){            // callig the function created for end the game if cars get collide.// here inner function is accessing parameter of outer function bcz of lexical scoping
            // console.log("Boom hit")
             endGame();                  // calling the function to end the game     
        }

        if(item.y >= 700){                    // ==> for moving  cars contineously  // utube value 650 & -300 
            item.y = -200;
            item.style.left = Math.floor(Math.random() * 300) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    } )
}
// ===========================================================================

// gameplay function 

function gamePlay() {
    // console.log("Hey I am clicked.");
    let car = document.querySelector(".car");

    let road = gameArea.getBoundingClientRect();  // gives measurement of road
    // console.log(road);

    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 100)) { player.y -= player.speed }      // moving the car left, right, up and down by- 
        if (keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed }  // increasing and decreasing the their pixels in all-
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }                   // directions with the help of arrow keys.
        if (keys.ArrowRight && player.x < (road.width - 57)) { player.x += player.speed }

        car.style.top = player.y + "px"; // cancat pixels
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let ps = player.score - 1;
        score.innerHTML = "Score: " + ps; 
    }

}

function start() {

    // gameArea.classList.remove("hide"); // removing and adding class names 
    startScreen.classList.add("hide");
    gameArea.innerHTML = "";


    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    // Using for loop to get multiple lines inside road

    for (x = 0; x < 6; x++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (x*105);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    // ============================================================================



    let car = document.createElement("div");
    car.setAttribute("class", "car");
    // car.innerText = "Hey I am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position" + car.offsetTop) // getting position of car in all direction with offset property
    // console.log("left position" + car.offsetLeft)

    for (x = 0; x < 3; x++) {                          // copied code which is used to create lines and creating cars
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = ((x+1) * 300) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = "yellow";
        enemyCar.style.left = Math.floor(Math.random() * 300) + "px";  // getting enemy cars at random place
        gameArea.appendChild(enemyCar);
    }
}