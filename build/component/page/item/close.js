import { pageComponent } from "../pageContainer";
export class CloseComponent extends pageComponent {
    constructor() {
        super();
    }
    close(childNode) {
        this.element.removeChild(childNode);
    }
}
