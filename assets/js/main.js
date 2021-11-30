const arr = {
  reset: [0, 1, 2, 3],
  start: new Array(),
  buffer: new Array(),
  finish: new Array(),
  clicked: new Array(),
};

function movePiece(currentArr, targetArr) {
  const currentArrLastIndex = currentArr.length - 1;
  const targetArrLastIndex = targetArr.length - 1;

  const current = currentArr[0] || -1;
  const target = targetArr[0] || -1;

  const isMovementValid = () => {
    if (currentArr === targetArr) return false;
    if (currentArrLastIndex === -1) return false;
    if (targetArrLastIndex === -1) return true;
    if (target > current) return true;

    return false;
  };

  if (isMovementValid()) {
    const value = currentArr.shift();
    targetArr.unshift(value);

    return true;
  }

  return false;
}

function handleInteraction(name) {
  const increaseMoves = () => {
    const moveSpan = document.querySelector("#moves")
    
    moveSpan.innerHTML = Number(moveSpan.innerHTML) + 1
  }
  
  arr.clicked.push(name);

  if (arr.clicked.length > 1) {
    const moved = movePiece(arr[arr.clicked[0]], arr[arr.clicked[1]]);

    moved ? createPiece() : undefined;
    moved ? increaseMoves() : undefined;

    arr.clicked = new Array();
  } else {
    destakPiece(name);
  }

  checkIfWon()
}

function createDOM() {
  const section = document.getElementById("towers")
  
  for (let i = 1; i < 4; i++) {
    const td = tr.insertCell(-1); // Insere uma celula ao final e retorna seu identificador

    td.classList.add(`pin${i}`);
    td.id = `pin${i}`;
    td.addEventListener("click", function (e) {
      handleInteraction(i == 1 ? "start" : i == 2 ? "buffer" : "finish");
      createPiece();
      destakPiece();
    });

    section.appendChild(td)
  }
  
  createPiece();
}

function resetDestak(){
  document.getElementById("piece_0").classList.remove("destak");
  document.getElementById("piece_1").classList.remove("destak");
  document.getElementById("piece_2").classList.remove("destak");
  document.getElementById("piece_3").classList.remove("destak");
}


function resetGame(){
  const resetMoves = () =>{
    const moveSpan = document.querySelector("#moves")
    moveSpan.innerHTML = 0
  }

  const table = document.getElementById("towers")
  const tbody = document.getElementsByTagName("tbody")[0].innerHTML = ""
  tbody ? table.removeChild(tbody) : undefined

  resetMoves()

}

function createPiece() {
  const pin1 = document.getElementById("pin1");
  const pin2 = document.getElementById("pin2");
  const pin3 = document.getElementById("pin3");
  
  pin1.innerHTML = "";
  pin2.innerHTML = "";
  pin3.innerHTML = "";

  const create = (index, element) => {
    const piece = document.createElement("div");
    piece.id = `piece_${index}`;
    piece.classList.add(`piece${index}`);
    element.appendChild(piece);
  }
  
  arr.start.forEach( (e) => {
    create(e, pin1)
  });
  arr.buffer.forEach( (e) => {
    create(e, pin2)
  });
  arr.finish.forEach( (e) => {
    create(e,pin3)
  });
 
  resetDestak()
}

function destakPiece() {
  resetDestak()

  if (arr.clicked.length > 0) {
    if (arr[arr.clicked[0]].length > 0) {
      const piece = document.getElementById(`piece_${arr[arr.clicked[0]][0]}`);
      piece.classList.add("destak");
    }
  }
}

function checkIfWon(){
  if(arr.finish.length === arr.reset.length){
    alert("You win!")
  }
}


function init(){
  arr.start = [...arr.reset]

  resetGame()
  createDOM();
}

init()

