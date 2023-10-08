//html만드는 것을 캡슐화
export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
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
}
