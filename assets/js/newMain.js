import { appendModal } from "./modal.js"

class CreateElements{
  constructor(height){
    this.height = height
    this.pieces = []
    this.towerElements = []
    
  }
  /**
   * Cria os elementos das torres
   * @returns Retorna um array de objetos com as torres
   */
  createTowers() {
    const towerNames = ["start", "buffer", "finish"];

    for (let i = 0; i < 3; i++) {
      const div = document.createElement("div");

      div.classList.add("tower");
      div.classList.add(`tower${i}`);
      div.setAttribute("name", towerNames[i]);

      this.towerElements.push(div);
    }

    return this.towerElements;
  }
  /**
   * Cria as peças
   * @returns  Retorna um array de objetos com as peças
   */
  createPieces() {
    const pieceColors = ["red", "orange", "yellow", "green", "purple", "blue"];

    for (let i = 0; i < this.height; i++) {
      const div = document.createElement("div");
      const width = 100 + i * 15;

      div.classList.add("piece");
      div.setAttribute("name", pieceColors[i]);
      div.style.backgroundColor = pieceColors[i];
      div.style.width = width + "px";

      const piece = {
        weight: i,
        name: pieceColors[i],
        element: div,
      };

      this.pieces.push(piece);
    }

    return this.pieces;
  }
  /**
   * Adiciona as torres no documento
   */
  appendTowers() {
    const target = document.querySelector("#towers");

    this.towerElements.forEach((tower) => {
      target.appendChild(tower);
    });
  }
  /**
   * Adiciona as peças no documento
   */
  appendPieces() {
    const target = this.towerElements[0];

    this.pieces.forEach((piece) => {
      target.appendChild(piece.element);
    });
  }
}
/**
 * Controla a logica do jogo, movimentos, eventos
 */
class GameLogic {
  constructor(towers, pieces) {
    /**
     * Recebe o array de objetos das torres
     */
    this.towers = towers;
    /**
     * Recebe o array de objetos das peças
     */
    this.pieces = pieces;
    /**
     * Recebe as torres origem e destino do movimento da peça
     */
    this.towersToSwap = [];
  }
  /**
   * Aiciona os Listener de Click nos elementos de torre
   */
  addListeners() {
    /**
     * Cria o evento de click chamando o metodo handleInteract
     */
    const addTowerListener = (towerElement) => {
      towerElement.addEventListener("click", (e) => {
        this.handleInteract(towerElement);
      });
    };
    // Aplica o evento em cada objeto da torre
    this.towers.forEach((tower) => {
      addTowerListener(tower);
    });
  }
  /**
   * Controlador/manipulador do movimento e selecionar peças
   */
  handleInteract(towerElement) {
    // Adiciona a torre origem no array towersToSwap
    this.towersToSwap.push(towerElement);

    if (this.towersToSwap.length > 1) {
      const currentTower = this.towersToSwap[0];
      const targetTower = this.towersToSwap[1];

      // Aplica o o movimento da peça
      const isValid = this.movePiece(currentTower, targetTower);
      // Caso o movimento seja valido incrementa o contador de movimentos
      isValid ? this.increaseMovesCounter() : undefined;
      isValid ? targetTower.firstChild.classList.add("shakePiece") : undefined;
      
      this.towersToSwap = new Array();
      this.contrastPiece();
    } else {
      this.contrastPiece();
    }

    this.doPlayerWon();
  }
  /**
   * Aplica o movimento da peça informando as torres origem e destino
   * @param {object} correntTower Objeto da torre origem
   * @param {object} targetTower Objeto da torre destino
   */
  movePiece(currentTower, targetTower) {
    const appendChildFirstIndex = (child, target) => {
      target.insertBefore(child, target.firstChild);
    };
    /**
     * Verifica se o movimento e válido
     */
    const isMovementValid = () => {
      const firstOfTargetName = firstOfTarget.attributes.name.value;
      const firstOfCurrentName = firstOfCurrent.attributes.name.value;

      const firstOfCurrentWeight = this.pieces.find(
        (e) => e.name === firstOfCurrentName
      ).weight;
      const firstOfTargetWeight = this.pieces.find(
        (e) => e.name === firstOfTargetName
      ).weight;

      if (firstOfCurrentWeight < firstOfTargetWeight) return true;

      return false;
    };

    const firstOfCurrent = currentTower?.firstChild;
    const firstOfTarget = targetTower?.firstChild;

    if (!firstOfCurrent) return false;
    else if (!firstOfTarget && firstOfCurrent) {
      targetTower.appendChild(firstOfCurrent);
      return true;
    } else if (firstOfTarget && firstOfCurrent && isMovementValid()) {
      appendChildFirstIndex(firstOfCurrent, targetTower);

      return true;
    }

    return false;
  }
  /**
   * Aplica uma leve rotacao de 3 graus para destacar a peça do topo da torre selecionada
   */
  contrastPiece() {
    this.pieces.forEach((piece) => {
      piece.element.style.transform = "";
    });
    if (this.towersToSwap.length > 0) {
      const firstOfClicked = this.towersToSwap[0].firstChild;
      firstOfClicked.style.transform = "rotate(3deg)";
    }
  }
  resetGame() {
    const target = this.towers[0];

    this.pieces.forEach((piece) => {
      target.appendChild(piece.element);
    });

    this.resetCounter();
  }

  doPlayerWon() {
    const newFinishTower = document.querySelector(".tower2");

    this.pieces.forEach( piece => {
      target.appendChild(piece.element)
    })
    
    this.resetCounter()
  }

  doPlayerWon(){
    const newFinishTower = document.querySelector(".tower2")

    if(newFinishTower.children.length === this.pieces.length){
      appendModal(true)
    }
  }

  increaseMovesCounter() {
    const target = document.querySelector("#moves");

    target.innerHTML = Number(target.innerHTML) + 1;
  }

  resetCounter() {
    const target = document.querySelector("#moves");

    target.innerHTML = 0;
  }
}

function dropDownInit() {
  const dropDown = document.querySelector("#amount");

  const amount = window.localStorage.getItem("amount") || 2;

  dropDown.value = amount;

  if (!amount) {
    window.localStorage.setItem("amount", 2);
  }

  dropDown.addEventListener("change", (e) => {
    const newAmount = e.target.value;
    window.localStorage.setItem("amount", newAmount);

    window.location.href = window.location.href;
  });

  return amount;
}

const amount = dropDownInit();

const createElements = new CreateElements(amount);

const towers = createElements.createTowers();
const pieces = createElements.createPieces();

createElements.appendTowers();
createElements.appendPieces();

// Game Logic

const gameLogic = new GameLogic(towers, pieces);
gameLogic.addListeners();

const btnReset = document.getElementById("resetButton");

btnReset.addEventListener("click", () => {
  gameLogic.resetGame();
});
