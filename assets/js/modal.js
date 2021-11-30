export function appendModal(win = false){
  const modalHTML = document.createElement("div")
  modalHTML.classList.add("modal--white-div")

  const theMessage = document.createElement("h2")
  theMessage.classList.add("modal--message")

  const okButton = document.createElement("button")
  okButton.classList.add("modal--button")
  okButton.innerHTML = "ok"

  const main = document.querySelector("main")

  const winImg = document.createElement("img")
  winImg.classList.add("modal--img")
  winImg.src = "assets/img/wonIcon.svg"

  const loseImg = document.createElement("img")
  loseImg.classList.add("modal--img")
  loseImg.src = "assets/img/loseIcon.svg"


  const destroyModal = () => {
    main.classList.remove("blur")
    document.body.removeChild(section)
  }

  main.classList.add("blur")

  let img = null;
  
  if(win){
    img = winImg

    okButton.classList.add("modal--button-winner")
    theMessage.innerHTML = "Parabêns voce ganhou!"
  } else{
    img = loseImg
    
    theMessage.innerHTML = "Parabêns voce perdeu!"
    okButton.classList.add("modal--button-loser")
  }


  const section = document.createElement("div")

  section.classList.add("modal--container")

  okButton.addEventListener("click", destroyModal)
  section.addEventListener("click", destroyModal)

  modalHTML.appendChild(theMessage)
  modalHTML.appendChild(img)
  modalHTML.appendChild(okButton)

  section.appendChild(modalHTML)
  document.body.appendChild(section)
}