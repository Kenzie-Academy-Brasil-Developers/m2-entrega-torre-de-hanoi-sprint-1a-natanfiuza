const arr = {
  start: [0, 1, 2, 3],
  buffer:new Array(),
  finish: new Array(),
  clicked: new Array()
}

function movePiece(currentArr, targetArr){
  const currentArrLastIndex = currentArr.length - 1
  const targetArrLastIndex = targetArr.length - 1
  
  const current = currentArr[currentArrLastIndex]
  const target = targetArr[targetArrLastIndex]

  const isMovementValid = () => {
    if(currentArr === targetArr) return false
    if(currentArrLastIndex === -1) return false
    if(targetArrLastIndex === -1) return true
    if(target < current) return true

    return false
  }

  if(isMovementValid()){
    const value = currentArr.pop()
    targetArr.push(value)
    console.log(value)
    
    return true
  }

  return false
}

function handleInteraction(name){  
  arr.clicked.push(name)

  if(arr.clicked.length > 1){
    const moved = movePiece(arr[arr.clicked[0]], arr[arr.clicked[1]])

    moved ? createPiece() : undefined
    
    arr.clicked = new Array()
  }
}


function createDOM() {
  const table = document.getElementById("towers");

  table.innerHTML = "";

  let tr = table.insertRow(-1); // Insere uma linha

  let td = tr.insertCell(-1); // Insere uma celula ao final e retorna seu identificador
  td.addEventListener("click", function (e) {
    handleInteraction("start")
  //   console.log("start");
  //   destakPiece("start");
  });
  td.classList.add(`pin1`);
  td.id = "pin1";

  td = tr.insertCell(-1); // Insere uma celula ao final e retorna seu identificador
  td.addEventListener("click", function (e) {
    handleInteraction("buffer")
    // console.log("buffer");
    // destakPiece("buffer");
  });
  td.classList.add(`pin2`);
  td.id = "pin2";

  td = tr.insertCell(-1); // Insere uma celula ao final e retorna seu identificador
  td.addEventListener("click", function (e) {
    handleInteraction("finish")
    // console.log("finish");
    // destakPiece("finish");
  });
  td.classList.add(`pin3`);
  td.id = "pin3";

  createPiece();
}

function createPiece() {
  const pin1 = document.getElementById("pin1");
  const pin2 = document.getElementById("pin2");
  const pin3 = document.getElementById("pin3");

  pin1.innerHTML = ""
  pin2.innerHTML = ""
  pin3.innerHTML = ""

  arr.start.forEach(function (e, i) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${i}`);
    pin1.appendChild(piece);
  });
  arr.buffer.forEach(function (e,i) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${i}`);
    pin2.appendChild(piece);
  });
  arr.finish.forEach(function (e,i) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${i}`);
    pin3.appendChild(piece);
  });
}

function destakPiece(pin) {
    //document.getElementById('piece0').classList.remove("destak")
   // document.getElementById('piece1').classList.remove("destak")
   // document.getElementById('piece2').classList.remove("destak")
   // document.getElementById('piece3').classList.remove("destak")
    switch (pin) {
        case "start":
            let piece = document.getElementById(`piece${arr.start[arr.start.length - 1]}`); 
            piece.classList.add("destak");
            break;
    
        default:
            break;
    }
}
// function init(){
//   // createDOM()

// }

// init()

// console.log(movePiece(arr.start, arr.buffer))
// console.log(arr)
createDOM();