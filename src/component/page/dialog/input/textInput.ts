import { BaseComponent } from "../../../component.js";

export class TextInput extends BaseComponent<HTMLInputElement> {
  constructor() {
    super(
      '<from ><div class="box"> <label for="title">title</label> <input type="text" id="title" /> </div> <div class="box"> <label for="contents">contents</label><textarea type="text" id="contents"></textarea></div ></from>'
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
