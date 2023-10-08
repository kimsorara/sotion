export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const template = document.createElement("template");
    template.innerHTML = `<section>
    <div class="image__box">
    <img class="image__preview" />
    </div>
    <p class="image__title"></p>
</section>
`;
    //template안에 사용자에게 받은 값을 직접적으로 넣는거는 보안상 좋지 않아서 동적으로 생성한다
    this.element = template.content.firstChild! as HTMLElement;
    const imageElement = this.element.querySelector(
      ".image__preview"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;
    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLTimeElement;
    titleElement.textContent = title;
  }
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
