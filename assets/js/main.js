const arr = {
  start: [0, 1, 2, 3],
  buffer:new Array(),
  finish: new Array()
}

let clicked = new Array()

function movePiece(currentArr, targetArr){
  const currentArrLastIndex = currentArr.length - 1
  const targetArrLastIndex = targetArr.length - 1
  
  const current = currentArr[currentArrLastIndex]
  const target = targetArr[targetArrLastIndex]

  const isMovementValid = () => {
    if(currentArrLastIndex === -1) return false
    if(targetArrLastIndex === -1) return true
    if(target > current) return true

    return false
  }

  if(isMovementValid()){
    const value = currentArr.pop()
    targetArr.push(value)

    return true
  }

  return false
}

// function handleClick(e){
//   const name = "oi"
  
//   if(clicked.length == 2){
//     movePiece(arr[0],arr)
//     clicked = new Array()
//   }
//   else{

//   }
// }

// function createDOM(){
//   const target = document.querySelector("tbody")
//   const tr = document.createElement("tr")

//   const templateRow = `
//     <td>1</td>
//     <td>2</td>
//     <td>3</td>
//   `

//   tr.innerHTML = templateRow

//   target.appendChild(tr)
// }

// function init(){
//   // createDOM()

// }

// init()

console.log(movePiece(arr.start, arr.buffer))
console.log(arr)