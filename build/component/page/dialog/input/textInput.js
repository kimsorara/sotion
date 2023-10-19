import { BaseComponent } from "../../../component.js";
export class TextInput extends BaseComponent {
    constructor() {
        super('<from ><div class="box"> <label for="title">Title</label> <input type="text" id="title" /> </div> <div class="box"> <label for="contents">Contents</label><textarea type="text" id="contents"></textarea></div ></from>');
    }
    get title() {
        const title = this.element.querySelector("#title");
        return title.value;
    }
    get contents() {
        const contents = this.element.querySelector("#contents");
        return contents.value;
    }
}
