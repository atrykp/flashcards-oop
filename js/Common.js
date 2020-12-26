export class Common {
    constructor(className) {
        this.htmlElement = this.bindToHtmlElement(className);
    }

    bindToHtmlElement(className) {
        const element = document.querySelector(`${className}`);
        if (typeof element === 'undefinde') {
            throw new Error('Nie znaleziono podanego elementu');
            return
        }
        return element
    }

}