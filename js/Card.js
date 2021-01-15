export class Card {
  constructor({ firstPage, secondPage, status = "cant" }) {
    this.firstPage = firstPage;
    this.secondPage = secondPage;
    this.status = status;
    this.init();
  }
  init() {
    this.createMainElements();
    this.createButtons();
    this.addTxtToButtons();
    this.addCalasses();
    this.addEventsListeners();
  }
  createMainElements() {
    this.card = document.createElement("div");
    this.txtInCard = document.createElement("div");
    this.buttonsArea = document.createElement("div");
  }
  createButtons() {
    this.iCanBtn = document.createElement("button");
    this.switchSideBtn = document.createElement("button");
    this.removeBtn = document.createElement("button");
    this.iCantBtn = document.createElement("button");
  }
  addTxtToButtons() {
    this.iCanBtn.textContent = "i can";
    this.switchSideBtn.textContent = "turn over";
    this.removeBtn.textContent = "delete";
    this.iCantBtn.textContent = "i can't";
  }
  addCalasses() {
    this.buttonsArea.classList.add("cardBtns");
    this.card.classList.add("card");
    this.txtInCard.classList.add("txtInCard");
    if (this.status === "can") {
      this.iCanBtn.classList.add("hide");
    } else {
      this.iCantBtn.classList.add("hide");
    }
  }
  addEventsListeners() {
    this.switchSideBtn.addEventListener("click", () =>
      this.changeTxtContet(this.firstPage, this.secondPage)
    );
  }

  render() {
    let card = this.card;
    card.appendChild(this.txtInCard);
    card.appendChild(this.buttonsArea);
    this.buttonsArea.appendChild(this.iCanBtn);
    this.buttonsArea.appendChild(this.switchSideBtn);
    this.buttonsArea.appendChild(this.removeBtn);
    this.buttonsArea.appendChild(this.iCantBtn);
    this.txtInCard.textContent = this.firstPage;
    return card;
  }

  changeTxtContet(first, second) {
    if (this.txtInCard.textContent === first) {
      this.txtInCard.textContent = second;
    } else if (this.txtInCard.textContent === second) {
      this.txtInCard.textContent = first;
    }
  }
}
