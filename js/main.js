import { Card } from "./Card.js";
import { content } from "./Content.js";
import { box } from "./Box.js";
import { Common } from "./Common.js";

const CHANGE_VIEW_BTN_CLASS = ".changeViewBtn";
let counter = 0;

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
  updateLocalStorage() {
    localStorage.setItem("cardsArr", JSON.stringify(this.allCardsArr));
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
    if (card.status === "can") {
      console.log("działamy");
    }

    let element = new Card(card);
    let currentCard = element.render();
    element.id = counter;
    if (!card.status) {
      element.status = "cant";
    }
    currentCard.setAttribute("data-key", counter);
    currentCard.setAttribute("data-key", counter);
    counter++;
    if (card.status === "can") {
      box.moveToCan(currentCard);
      box.updateCouter();
    } else box.addCardToBox(currentCard);

    this.addLiseteners(element, currentCard);
    this.allCardsArr.push(element);
    this.updateLocalStorage();
  }

  addLiseteners(cardObj, card) {
    cardObj.iCanBtn.addEventListener("click", () => {
      cardObj.status = "can";
      box.moveToCan(card);
      cardObj.iCanBtn.classList.add("hide");
      cardObj.iCantBtn.classList.remove("hide");
      box.updateCouter();
      this.updateLocalStorage();
    });

    cardObj.iCantBtn.addEventListener("click", () => {
      box.addCardToBox(card);
      cardObj.iCanBtn.classList.remove("hide");
      cardObj.iCantBtn.classList.add("hide");

      box.updateCouter();
    });

    cardObj.removeBtn.addEventListener("click", () => {
      let idCard = parseInt(card.dataset.key);
      const currCard = this.allCardsArr.filter(
        (element) => element.id !== idCard
      );
      this.allCardsArr = currCard;
      card.remove();
      this.updateLocalStorage();
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
