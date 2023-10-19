//html만드는 것을 캡슐화
export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
}
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  constructor(elementType: string) {
    const template = document.createElement("template");
    template.innerHTML = elementType;
    this.element = template.content.firstChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error("부모가 달라요");
    }
    parent.removeChild(this.element);
  }
  attach(component: Component, position?: InsertPosition) {
    component.attachTo(this.element, position);
  }
}
