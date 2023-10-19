import { BaseComponent } from "../../component";
export class DiaLog extends BaseComponent {
    constructor() {
        super('<dialog class="dialog"> <button class="dialog-add">add</button> <button class="dialog-close">close</button> </dialog>');
    }
    open() {
        this.element.onclick = () => {
            const dialog = document.querySelector(".dialog");
            dialog === null || dialog === void 0 ? void 0 : dialog.setAttribute("open", "true");
        };
    }
}
