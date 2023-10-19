export class BaseComponent {
    constructor(elementType) {
        const template = document.createElement("template");
        template.innerHTML = elementType;
        this.element = template.content.firstChild;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        if (parent !== this.element.parentElement) {
            throw new Error("부모가 달라요");
        }
        parent.removeChild(this.element);
    }
    attach(component, position) {
        component.attachTo(this.element, position);
    }
}
