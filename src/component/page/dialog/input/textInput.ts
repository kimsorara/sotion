import { BaseComponent } from "../../../component.js";
import { TextData } from "../dialog.js";
export class TextInput
  extends BaseComponent<HTMLInputElement>
  implements TextData
{
  constructor() {
    super(
      '<from ><div class="box"> <label for="title">Title</label> <input type="text" id="title" /> </div> <div class="box"> <label for="contents">Contents</label><textarea type="text" id="contents"></textarea></div ></from>'
    );
  }
  get title(): string {
    const title = this.element.querySelector("#title")! as HTMLInputElement;
    return title.value;
  }
  get contents(): string {
    const contents = this.element.querySelector(
      "#contents"
    )! as HTMLInputElement;
    return contents.value;
  }
}
