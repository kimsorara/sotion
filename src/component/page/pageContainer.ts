import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}
//di
interface SectionContainer extends Component, Composable {
  setOncloseListner(listner: OncloseListener): void;
}
type OncloseListener = () => void;

type PageItemMaper = {
  new (): SectionContainer;
};
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
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
  constructor(private pageItemMaper: PageItemMaper) {
    super("<ul class='page'></ul>");
  }
  addChild(section: Component) {
    // const item = new PageItemComponent(); //한가지만 만들수 있다 =>재사용 할수 있게
    const item = new this.pageItemMaper();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOncloseListner(() => {
      item.removeFrom(this.element);
    });
  }
}
