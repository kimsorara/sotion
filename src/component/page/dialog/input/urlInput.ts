import { BaseComponent } from "../../../component.js";

export class UrlInput extends BaseComponent<HTMLInputElement> {
  constructor() {
    super(
      '<from ><div class="box"> <label for="title">title</label> <input type="text" id="title" /> </div> <div class="box"> <label for="url">contents</label> <input type="text" id="url"/></input></div></from >'
    );
  }
  get title() {
    const title = this.element.querySelector("#title")! as HTMLInputElement;
    return title.value;
  }
  get url() {
    const url = this.element.querySelector("#url")! as HTMLInputElement;
    return url.value;
  }
}
