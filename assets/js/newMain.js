class CreateElements{
  constructor(height){
    this.height = height
    this.pieces = []
    this.towerElements = []
    
  }

  createTowers(){
    const towerNames = [
      "start",
      "buffer",
      "finish"
    ]

    for(let i = 0; i < 3; i++){
      const div = document.createElement("div")
      
      div.classList.add("tower")
      div.classList.add(`tower${i}`)
      div.setAttribute("name", towerNames[i])
      
      this.towerElements.push(div)
    }

    return this.towerElements
  }

  createPieces(){
    const pieceColors = [
      "red",
      "orange",
      "yellow",
      "green",
      "purple",
      "blue",
    ]

    for(let i = 0; i < this.height; i++){
      const div = document.createElement("div")
      const width = 100 + (i * 15);

      div.classList.add("piece")
      div.setAttribute("name", pieceColors[i])
      div.style.backgroundColor = pieceColors[i]
      div.style.width = width + "px"

      const piece = {
        weight: i,
        name:pieceColors[i],
        element: div
      }

      this.pieces.push(piece)
    }

    return this.pieces
  }

  appendTowers(){
    const target = document.querySelector("#towers")

    this.towerElements.forEach( tower => {
      target.appendChild(tower)
    })
  }
  
  appendPieces(){
    const target = this.towerElements[0]

    this.pieces.forEach( piece => {
      target.appendChild(piece.element)
    })
  }
}

class GameLogic{
  constructor(towers, pieces){
    this.towers = towers
    this.pieces = pieces
    this.towersToSwap = []
  }

  addListeners(){
    const addTowerListener = (towerElement) => {
      towerElement.addEventListener("click", (e) => {
        this.handleInteract(towerElement)
      })
    }

    this.towers.forEach(tower => {
      addTowerListener(tower)
    })
  }

  handleInteract(towerElement){
    this.towersToSwap.push(towerElement)

    if(this.towersToSwap.length > 1){
      const currentTower = this.towersToSwap[0]
      const targetTower = this.towersToSwap[1]
      
      const isValid = this.movePiece(currentTower, targetTower)

      isValid ? this.increaseMovesCounter() : undefined
      
      this.towersToSwap = new Array()
    } 
  
    this.doPlayerWon()
  }

  movePiece(currentTower, targetTower){
    const appendChildFirstIndex = (child, target) => {
      target.insertBefore(child, target.firstChild);
    }

    const isMovementValid = () => {
      const firstOfTargetName = firstOfTarget.attributes.name.value
      const firstOfCurrentName = firstOfCurrent.attributes.name.value
      
      const firstOfCurrentWeight = this.pieces.find(e => e.name === firstOfCurrentName).weight
      const firstOfTargetWeight = this.pieces.find(e => e.name === firstOfTargetName).weight

      if(firstOfCurrentWeight < firstOfTargetWeight) return true

      return false
    }

    const firstOfCurrent = currentTower?.firstChild
    const firstOfTarget = targetTower?.firstChild
    
    if(!firstOfCurrent) return false

    else if(!firstOfTarget && firstOfCurrent){  
      targetTower.appendChild(firstOfCurrent)
      return true
    }

    else if(firstOfTarget && firstOfCurrent && isMovementValid()){
      appendChildFirstIndex(firstOfCurrent, targetTower)
    
      return true
    }

    return false
  }

  resetGame(){
    const target = this.towers[0]

    this.pieces.forEach( piece => {
      target.appendChild(piece.element)
    })
    
    this.resetCounter()
  }

  doPlayerWon(){
    const newFinishTower = document.querySelector(".tower2")

    if(newFinishTower.children.length === this.pieces.length){
      alert("You won!")
    }
  }

  increaseMovesCounter(){
    const target = document.querySelector("#moves")
  
    target.innerHTML = Number(target.innerHTML) + 1
  }
  
  resetCounter(){
    const target = document.querySelector("#moves")
  
    target.innerHTML = 0
  }
}

function dropDownInit(){
  const dropDown = document.querySelector("#amount")
  
  const amount = window.localStorage.getItem("amount") || 2

  dropDown.value = amount 
    
  if(!amount){
    window.localStorage.setItem("amount", 2)
  }

  dropDown.addEventListener("change", e => {
    const newAmount = e.target.value
    window.localStorage.setItem("amount", newAmount)

    window.location.href = window.location.href
  })
  
  return amount
}

const amount = dropDownInit()

const createElements = new CreateElements(amount);

const towers = createElements.createTowers()
const pieces = createElements.createPieces()

createElements.appendTowers()
createElements.appendPieces()

// Game Logic

const gameLogic = new GameLogic(towers, pieces)
gameLogic.addListeners()