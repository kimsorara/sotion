import { ImageComponent } from "./component/page/item/image.js";
import { pageComponent } from "./component/page/pageContainer.js";
import { VideoComponent } from "./component/page/item/video.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { PageItemComponent } from "./component/page/pageContainer.js";
import { InputDiaLog, } from "./component/page/dialog/dialog.js";
import { UrlInput } from "./component/page/dialog/input/urlInput.js";
import { TextInput } from "./component/page/dialog/input/textInput.js";
class Main {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new pageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElenentToDialog("#new-image", UrlInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElenentToDialog("#new-video", UrlInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElenentToDialog("#new-note", TextInput, (input) => new NoteComponent(input.title, input.contents));
        this.bindElenentToDialog("#new-todo", TextInput, (input) => new TodoComponent(input.title, input.contents));
        this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
        this.page.addChild(new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
        this.page.addChild(new NoteComponent("Note Title", "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
        this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
        this.page.addChild(new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
        this.page.addChild(new NoteComponent("Note Title", "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    }
    bindElenentToDialog(selector, InputComponent, makeSection) {
        const selectBtn = document.querySelector(selector);
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
new Main(document.querySelector(".main"), document.body);
