import { BaseComponent } from "../../component.js";
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super('<section class="note"> <h2 class="page-item__title note__title"></h2> <p class="note__body"></p> </section>');
        const noteBody = this.element.querySelector(".note__body");
        noteBody.textContent = body;
        const titleElement = this.element.querySelector(".note__title");
        titleElement.textContent = title;
    }
}
