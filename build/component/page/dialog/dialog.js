import { BaseComponent } from "../../component.js";
export class InputDiaLog extends BaseComponent {
    constructor() {
        super('<dialog class="dialog"><div class="dialog__container"><button class="dialog-close">close</button><div class="dialog-body"></div> <button class="dialog-add">add</button> </div></dialog>');
        const close = this.element.querySelector(".dialog-close");
        close.onclick = () => {
            this.closeListner && this.closeListner();
        };
        const add = this.element.querySelector(".dialog-add");
        add.onclick = () => {
            this.addListner && this.addListner();
        };
    }
    setOncloseListner(listner) {
        this.closeListner = listner;
    }
    setOnaddListner(listner) {
        this.addListner = listner;
    }
    addChild(child) {
        const body = this.element.querySelector(".dialog-body");
        child.attachTo(body);
    }
}
