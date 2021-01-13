import { Card } from "./Card.js";
import { content } from "./Content.js";
import { box } from "./Box.js";
import { Common } from "./Common.js";

const CHANGE_VIEW_BTN_CLASS = ".changeViewBtn";

class Main extends Common {
  constructor() {
    super();
    this.allCardsArr = [];
    this.changeViewBtn = this.bindToHtmlElement(CHANGE_VIEW_BTN_CLASS);
    this.init();
  }
  init() {
    if (localStorage.getItem("cardsArr")) {
      let cards = JSON.parse(localStorage.getItem("cardsArr"));
      cards.forEach((element) => {
        this.createCard(element);
      });
    }
    this.addListenersToPageElements();
  }

  addListenersToPageElements() {
    content.firstInput.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode === 13) {
        this.checkInputsValue();
      }
    });
    content.secondInput.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode === 13) {
        this.checkInputsValue();
      }
    });
    this.changeViewBtn.addEventListener("click", () => this.changeView());
    content.addBtn.addEventListener("click", () => {
      this.checkInputsValue();
    });
  }

  checkInputsValue() {
    let card = content.getContent();
    if (!card) return;
    this.createCard(card);
  }

  createCard(card) {
    let element = new Card(card);
    let currentCard = element.render();
    this.allCardsArr.push(element);
    box.addCardToBox(currentCard);
    this.addLiseteners(element, currentCard);
    localStorage.setItem("cardsArr", JSON.stringify(this.allCardsArr));
  }

  addLiseteners(cardObj, card) {
    cardObj.iCanBtn.addEventListener("click", () => {
      box.moveToCan(card);
      cardObj.iCanBtn.classList.add("hide");
      cardObj.iCantBtn.classList.remove("hide");
      box.updateCouter();
    });

    cardObj.iCantBtn.addEventListener("click", () => {
      box.addCardToBox(card);
      cardObj.iCanBtn.classList.remove("hide");
      cardObj.iCantBtn.classList.add("hide");

      box.updateCouter();
    });

    cardObj.removeBtn.addEventListener("click", () => {
      card.remove();
      localStorage.removeItem(card);
      box.updateCouter();
    });
  }

  changeView() {
    if (!box.counter && box.canCards.classList.contains("hide"))
      return alert("Nic tam jeszcze nie ma ;)");
    if (box.canCards.classList.contains("hide"))
      this.changeViewBtn.textContent = "wróć do nauki";
    if (!box.canCards.classList.contains("hide"))
      this.changeViewBtn.textContent = "pokaż które umiem";
    box.newCards.classList.toggle("hide");
    box.canCards.classList.toggle("hide");
  }
}

const main = new Main();
