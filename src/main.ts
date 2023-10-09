import { ImageComponent } from "./component/page/item/image.js";
import { pageComponent } from "./component/page/pageContainer.js";
import { VideoComponent } from "./component/page/item/video.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { Component } from "./component/component.js";
import { Composable } from "./component/page/pageContainer.js";
class Main {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new pageComponent();
    this.page.attachTo(appRoot);
    const image = new ImageComponent(
      "image Title",
      "https://mblogthumb-phinf.pstatic.net/MjAxODEwMTlfMTgx/MDAxNTM5OTI4MjAwNDEx.k7oG-Q0tA6bdI1smaMzsK4t08NREjRrq3OthZKoIz8Qg.BeZxWi7HekwTWipOckbNWpvnesXuHjpldNGA7QppprUg.JPEG.retspe/eb13.jpg?type=w800"
    );
    this.page.addChild(image);
    const video = new VideoComponent(
      "video apple",
      "https://www.youtube.com/watch?v=ZibkMbbDT5c&t=7s"
    );
    this.page.addChild(video);
    const note = new NoteComponent("note title", "note item");
    this.page.addChild(note);
    const todo = new TodoComponent("todo title", "todo item");
    this.page.addChild(todo);
  }
}
new Main(document.querySelector(".main")! as HTMLElement);
