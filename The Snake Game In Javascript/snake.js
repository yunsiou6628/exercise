// 專屬控制蛇的JS檔案

import { getInputDirection } from "./input.js"
// 輸出 ， 用 export 可以指派函式、物件或變數，透過 import 宣告給外部檔案引用
export const SNAKE_SPEED = 5
const snakeBody = [ { x:11, y:11 }
    // 測試註解掉，留置中的位置就好
    // { x:10, y:11 },
    // { x:11, y:11 },
    // { x:12, y:11 },
    // { x:13, y:11 },
    // { x:14, y:11 }
]

let newSegments = 0

// 輸出 ， 更新的物件顯示
export function update(){
    // console.log('update Snake')  // 測試
    addSegments()

    const inputDirection = getInputDirection()

    // 設定 snakeBody 中的陣列，每次更新蛇的身體
    for (let i = snakeBody.length -2; i >= 0; i--) {  
        snakeBody[i+1]={ ...snakeBody[i] }
    }

    // 移動增加設定，將移動設定開一個新的 input.js 檔案 ，將測試 x.y 改成輸入 inputDirection.x 和 inputDirection.y
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

// 輸出 ， 顯示蛇
export function draw(gameBoard){
    // console.log('draw Snake')  // 測試
    snakeBody.forEach(segment => {  // forEach() 將陣列內的每個元素，傳入並執行給定的函式一次

        const snakeElement = document.createElement('div')  // document.createElement() 可以依指定的標籤名稱建立 HTML 新的元素，或是在未定義標籤名稱下建立一個 HTMLUnknownElement
        snakeElement.style.gridRowStart = segment.y    // rows 行/開始位置 = segment 分割 y 軸/用於繪製和動畫 SVG 路徑筆劃的 JavaScript 庫
        snakeElement.style.gridColumnStart = segment.x    //columns 列/開始位置 = segment 分割 x 軸
        snakeElement.classList.add('snake') // 使用 classList 屬性是取得元素 Class，可以透過 element.className (en-US) 來得到空格分隔的 Class 清單字串
        gameBoard.appendChild(snakeElement) // 在建立新的 div 元素 document.createElement('div')後，這時候我們在瀏覽器上還看不到它，直到透過 appendChild()、insertBefore() 或 replaceChild() 等方法將新元素加入至指定的位置之後才會顯示
    })
}



// 設定蛇吃掉食物 -----------------------------------------------------

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}