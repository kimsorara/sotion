import { BaseComponent } from "../../../component.js";
import { UrlData } from "../dialog.js";
export class UrlInput
  extends BaseComponent<HTMLInputElement>
  implements UrlData
{
  constructor() {
    super(
      '<from ><div class="box"> <label for="title">Title</label> <input type="text" id="title"/> </div><div class="box"> <label for="url">URL</label> <input type="text" id="url"/></input></div></from >'
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
