import { BaseComponent } from "../../../component.js";
export class UrlInput extends BaseComponent {
    constructor() {
        super('<from ><div class="box"> <label for="title">Title</label> <input type="text" id="title"/> </div><div class="box"> <label for="url">URL</label> <input type="text" id="url"/></input></div></from >');
    }
    get title() {
        const title = this.element.querySelector("#title");
        return title.value;
    }
    get url() {
        const url = this.element.querySelector("#url");
        return url.value;
    }
}
