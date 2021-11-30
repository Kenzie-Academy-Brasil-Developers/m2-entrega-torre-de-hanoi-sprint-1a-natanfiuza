const arr = {
  start: [0, 1, 2, 3],
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
  arr.clicked.push(name);

  if (arr.clicked.length > 1) {
    const moved = movePiece(arr[arr.clicked[0]], arr[arr.clicked[1]]);

    moved ? createPiece() : undefined;

    arr.clicked = new Array();
  } else {
    destakPiece(name);
  }
}

function createDOM() {
  const table = document.getElementById("towers");

  table.innerHTML = "";

  let tr = table.insertRow(-1); // Insere uma linha

  for (let i = 1; i < 4; i++) {
    let td = tr.insertCell(-1); // Insere uma celula ao final e retorna seu identificador

    td.classList.add(`pin${i}`);
    td.id = `pin${i}`;
    td.addEventListener("click", function (e) {
      handleInteraction(i == 1 ? "start" : i == 2 ? "buffer" : "finish");
      console.log(arr);
      createPiece();
      destakPiece();
    });
  }
  
  createPiece();
}

function createPiece() {
  let pin1 = document.getElementById("pin1");
  let pin2 = document.getElementById("pin2");
  let pin3 = document.getElementById("pin3");
  pin1.innerHTML = "";
  pin2.innerHTML = "";
  pin3.innerHTML = "";
  arr.start.forEach(function (e) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${e}`);
    pin1.appendChild(piece);
  });
  arr.buffer.forEach(function (e) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${e}`);
    pin2.appendChild(piece);
  });
  arr.finish.forEach(function (e) {
    let piece = document.createElement("div");
    piece.id = `piece_${e}`;
    piece.classList.add(`piece${e}`);
    pin3.appendChild(piece);
  });
  document.getElementById("piece_0").classList.remove("destak");
  document.getElementById("piece_1").classList.remove("destak");
  document.getElementById("piece_2").classList.remove("destak");
  document.getElementById("piece_3").classList.remove("destak");
}

function destakPiece() {
  document.getElementById("piece_0").classList.remove("destak");
  document.getElementById("piece_1").classList.remove("destak");
  document.getElementById("piece_2").classList.remove("destak");
  document.getElementById("piece_3").classList.remove("destak");

  if (arr.clicked.length > 0) {
    if (arr[arr.clicked[0]].length > 0) {
      let piece = document.getElementById(`piece_${arr[arr.clicked[0]][0]}`);
      piece.classList.add("destak");
    }
  }
}

// function init(){
//   // createDOM()

// }

// init()

// console.log(movePiece(arr.start, arr.buffer))
// console.log(arr)
createDOM();
