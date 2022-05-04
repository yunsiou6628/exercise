// 食物設定

import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

// let food = { x:10, y:1 } 
let food = getRandomFoodPosition()
const EXPANSION_RATE = 5 // 設定被吃掉，不是被忽略過去


export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        // food = { x:20, y:10 }
        food = getRandomFoodPosition()
    }
}


export function draw(gameBoard){
        const foodElement = document.createElement('div')  // document.createElement() 可以依指定的標籤名稱建立 HTML 新的元素，或是在未定義標籤名稱下建立一個 HTMLUnknownElement
        foodElement.style.gridRowStart = food.y    // rows 行/開始位置 = segment 分割 y 軸/用於繪製和動畫 SVG 路徑筆劃的 JavaScript 庫
        foodElement.style.gridColumnStart = food.x    //columns 列/開始位置 = segment 分割 x 軸
        foodElement.classList.add('food') // 使用 classList 屬性是取得元素 Class，可以透過 element.className (en-US) 來得到空格分隔的 Class 清單字串
        gameBoard.appendChild(foodElement) // 在建立新的 div 元素 document.createElement('div')後，這時候我們在瀏覽器上還看不到它，直到透過 appendChild()、insertBefore() 或 replaceChild() 等方法將新元素加入至指定的位置之後才會顯示
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition  = randomGridPosition()   // 增加 grid.js 設定
    }
    return newFoodPosition
}