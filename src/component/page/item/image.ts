import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLImageElement> {
  constructor(title: string, url: string) {
    super(
      '<section class="image"> <div class="image__box"><img class="image__preview" /></div><h2 class="image__title"></h2></section>'
    );
    const imageElement = this.element.querySelector(
      ".image__preview"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;
    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLTitleElement;
    titleElement.textContent = title;
  }
}
