import {
    Common
} from "./Common.js";

const BOX_NEW_CARDS_CLASS_NAME = '.newCards';
const BOX_CAN_CARDS_CLASS_NAME = '.canCards';
const COUNTER_SPAN_CLASS = '.counter';
export class Box extends Common {
    constructor() {
        super()
        this.newCards = this.bindToHtmlElement(BOX_NEW_CARDS_CLASS_NAME);
        this.canCards = this.bindToHtmlElement(BOX_CAN_CARDS_CLASS_NAME);
        this.counter = 0;
        this.counterSpan = this.bindToHtmlElement(COUNTER_SPAN_CLASS);
    }
    addCardToBox(card) {
        this.newCards.appendChild(card)
    }
    moveToCan(card) {
        this.canCards.appendChild(card);
    }
    updateCouter() {

        this.counter = this.canCards.childElementCount;
        this.counterSpan.innerHTML = this.canCards.childElementCount
    }

}


export const box = new Box()