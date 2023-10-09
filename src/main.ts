import { ImageComponent } from "./component/page/item/image.js";
import { pageComponent } from "./component/page/pageContainer.js";
import { VideoComponent } from "./component/page/item/video.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { Component } from "./component/component.js";
import { Composable } from "./component/page/pageContainer.js";
import { PageItemComponent } from "./component/page/pageContainer.js";
import { InputDiaLog } from "./component/page/dialog/dialog.js";
import { UrlInput } from "./component/page/dialog/input/urlInput.js";
import { TextInput } from "./component/page/dialog/input/textInput.js";
class Main {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new pageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const imgBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imgBtn.addEventListener("click", () => {
      const dialog = new InputDiaLog();
      const urlSection = new UrlInput();
      dialog.addChild(urlSection);
      dialog.attachTo(dialogRoot);
      dialog.setOncloseListner(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnaddListner(() => {
        const image = new ImageComponent(urlSection.title, urlSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });
    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDiaLog();
      const urlSection = new UrlInput();
      dialog.addChild(urlSection);
      dialog.attachTo(dialogRoot);
      dialog.setOncloseListner(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnaddListner(() => {
        const video = new VideoComponent(urlSection.title, urlSection.url);
        this.page.addChild(video);
        dialog.removeFrom(dialogRoot);
      });
    });
    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const dialog = new InputDiaLog();
      const textSection = new TextInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);
      dialog.setOncloseListner(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnaddListner(() => {
        const note = new NoteComponent(textSection.title, textSection.contents);
        this.page.addChild(note);
        dialog.removeFrom(dialogRoot);
      });
    });
    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const dialog = new InputDiaLog();
      const textSection = new TextInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);
      dialog.setOncloseListner(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnaddListner(() => {
        const todo = new TodoComponent(textSection.title, textSection.contents);
        this.page.addChild(todo);
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new Main(document.querySelector(".main")! as HTMLElement, document.body);
