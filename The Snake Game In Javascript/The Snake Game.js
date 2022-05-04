// 遊戲設定

// import 宣告用於引入由另一個模塊所導出的綁定
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

// 主要 function

let lastRenderTime = 0
// const SNAKE_SPEED = 2  // 控制速度 秒數 ，數字越大跑越快 (移出去專屬控制蛇的JS檔案)
const gameBoard = document.getElementById('game-board') // 抓取 gameBoard function
let gameOver = false

function main (currentTime) {

    if (gameOver) {
        if (confirm('you lose. Press ok to restart. ')) {
            window.location = '/'
        }
        return
    }


    window.requestAnimationFrame(main)  // 通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000  // 宣告 算圖展現特效最後的秒數 = (currentTime 現在時間 - 最後Render的時間) / 秒數
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return  // ?? 影片這裡有點看不懂
    
    // console.log('Render');   // 測試 Render
    lastRenderTime = currentTime
    // console.log(secondsSinceLastRender);  // 測試 執行秒數

    update() // 更新動作
    draw() // 拖曳動作
}

window.requestAnimationFrame(main)  // 呼叫 function => function main (currentTime)


// 更新動作
function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

// 拖曳動作
function draw(){
    gameBoard.innerHTML = ''  // 移動
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

