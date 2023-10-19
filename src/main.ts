import { ImageComponent } from "./component/page/item/image.js";
import { pageComponent } from "./component/page/pageContainer.js";
import { VideoComponent } from "./component/page/item/video.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { Component } from "./component/component.js";
import { Composable } from "./component/page/pageContainer.js";
import { PageItemComponent } from "./component/page/pageContainer.js";
import {
  InputDiaLog,
  TextData,
  UrlData,
} from "./component/page/dialog/dialog.js";
import { UrlInput } from "./component/page/dialog/input/urlInput.js";
import { TextInput } from "./component/page/dialog/input/textInput.js";
type InputComponentConstructor<T = (UrlData | TextData) & Component> = {
  new (): T;
};
class Main {
  private readonly page: Component & Composable;
  //dialogRoot는 클래스 안에 있어 접근할려는  private사용
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new pageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    this.bindElenentToDialog<UrlInput>(
      "#new-image",
      UrlInput,
      (input: UrlInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElenentToDialog<UrlInput>(
      "#new-video",
      UrlInput,
      (input: UrlInput) => new VideoComponent(input.title, input.url)
    );
    this.bindElenentToDialog<TextInput>(
      "#new-note",
      TextInput,
      (input: TextInput) => new NoteComponent(input.title, input.contents)
    );
    this.bindElenentToDialog<TextInput>(
      "#new-todo",
      TextInput,
      (input: TextInput) => new TodoComponent(input.title, input.contents)
    );
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
  }
  private bindElenentToDialog<T extends (UrlData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const selectBtn = document.querySelector(selector)! as HTMLButtonElement;
    selectBtn.addEventListener("click", () => {
      const inputSection = new InputComponent();
      const dialog = new InputDiaLog();
      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot);
      dialog.setOncloseListner(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnaddListner(() => {
        const make = makeSection(inputSection);
        this.page.addChild(make);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new Main(document.querySelector(".main")! as HTMLElement, document.body);
