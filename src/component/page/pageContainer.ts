import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OncloseListener = () => void;
class PateItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListner?: OncloseListener;
  constructor() {
    super(
      '<li class="page-item"> <section class="page-item__body"></section> <div class="page-item__controls"><button class="close">❌</button></div> </li>'
    );
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListner && this.closeListner();
    };
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOncloseListner(listner: OncloseListener) {
    this.closeListner = listner;
  }
}
export class pageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super("<ul class='page'></ul>");
  }
  addChild(section: Component) {
    const item = new PateItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOncloseListner(() => {
      item.removeFrom(this.element);
    });
  }
}
