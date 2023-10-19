import { BaseComponent, Component } from "../../component.js";
import { Composable } from "../pageContainer.js";
type OnCloseListner = () => void;
type OnAddListner = () => void;
export interface UrlData {
  readonly title: string;
  readonly url: string;
}
export interface TextData {
  readonly title: string;
  readonly contents: string;
}
export class InputDiaLog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListner?: OnCloseListner;
  addListner?: OnAddListner;
  constructor() {
    super(
      '<dialog class="dialog"><div class="dialog__container"><button class="dialog-close">close</button><div class="dialog-body"></div> <button class="dialog-add">add</button> </div></dialog>'
    );
    const close = this.element.querySelector(".dialog-close")! as HTMLElement;
    close.onclick = () => {
      this.closeListner && this.closeListner();
    };

    const add = this.element.querySelector(".dialog-add")! as HTMLElement;
    add.onclick = () => {
      this.addListner && this.addListner();
    };
  }
  setOncloseListner(listner: OnCloseListner) {
    this.closeListner = listner;
  }
  setOnaddListner(listner: OnAddListner) {
    this.addListner = listner;
  }
  addChild(child: Component) {
    const body = this.element.querySelector(".dialog-body")! as HTMLElement;
    child.attachTo(body);
  }
}
