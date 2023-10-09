import { BaseComponent } from "../../component.js";
export class VideoComponent extends BaseComponent<HTMLIFrameElement> {
  constructor(title: string, url: string) {
    super(
      '<section class="video"> <div class="video__box"><iframe class="video__iframe"></iframe></div> <h2 class="video__title"></h2></section>'
    );
    const iframe = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;
    iframe.src = this.convertEmbeddedUrl(url);
    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
  private convertEmbeddedUrl(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
