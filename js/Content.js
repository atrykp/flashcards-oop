import {
    Common
} from "./Common.js";



const ADD_SECTION_CLASS_NAME = '.addSection';
const INPUT_ONE_CLASS_NAME = '.firstTxt';
const INPUT_TWO_CLASS_NAME = '.secondTxt';
const ADD_BUTTON_CLASS_NAME = '.createCardBtn';



export class Content extends Common {
    constructor() {
        super(ADD_SECTION_CLASS_NAME);
        this.addSection = this.bindToHtmlElement(ADD_SECTION_CLASS_NAME);
        this.firstInput = this.bindToHtmlElement(INPUT_ONE_CLASS_NAME);
        this.secondInput = this.bindToHtmlElement(INPUT_TWO_CLASS_NAME);
        this.addBtn = this.bindToHtmlElement(ADD_BUTTON_CLASS_NAME);
    }


    getContent() {
        let correct = this.checkInputsValue(this.firstInput.value.trim(), this.secondInput.value.trim());
        if (correct) {
            let card = {
                firstPage: this.firstInput.value.trim(),
                secondPage: this.secondInput.value.trim()
            }
            this.resetInputValue();
            return card
        } else if (!correct) {
            alert('Wypełnij oba pola!')
            return
        }


    }


    checkInputsValue(first, second) {
        if (first === '' || second === '') {
            return false
        } else return true
    }


    resetInputValue() {
        this.firstInput.value = '';
        this.secondInput.value = '';
        this.firstInput.focus();
    }

}

export const content = new Content();