import { BaseComponent } from "../../component.js";
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super('<section class="image"> <div class="image__box"><img class="image__preview" /></div><h2 class="page-item__title image__title"></h2></section>');
        const imageElement = this.element.querySelector(".image__preview");
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector(".image__title");
        titleElement.textContent = title;
    }
}
