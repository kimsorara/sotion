import { BaseComponent } from "../component.js";

export class pageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    super("<ul class='page'>컴포넌트 페이지</ul>");
  }
}
