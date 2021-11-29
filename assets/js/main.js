const arr = {
  start: [0, 1, 2, 3],
  buffer: new Array(),
  finish: new Array()
}

// function movePiece(arrName){

// }

function createDOM(){
  const target = document.querySelector("tbody")
  const tr = document.createElement("tr")

  const templateRow = `
    <td>1</td>
    <td>2</td>
    <td>3</td>
  `

  tr.innerHTML = templateRow

  target.appendChild(tr)
}

// function init(){
//   // createDOM()

// }

// init()