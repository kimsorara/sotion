import { BaseComponent } from "../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super('<li draggable="true" class="page-item"> <section class="page-item__body"></section> <div class="page-item__controls"> <button class="close">&times;</button> </div> </li>');
        const closeBtn = this.element.querySelector(".close");
        closeBtn.onclick = () => {
            this.closeListner && this.closeListner();
        };
        this.element.addEventListener("dragstart", (e) => {
            this.onDragStart(e);
        });
        this.element.addEventListener("dragend", (e) => {
            this.onDragEnd(e);
        });
        this.element.addEventListener("dragenter", (e) => {
            this.onDragEnter(e);
        });
        this.element.addEventListener("dragleave", (e) => {
            this.onDragLeave(e);
        });
    }
    onDragStart(_) {
        this.notifyDragObservers("start");
        this.element.classList.add("drag-start");
    }
    onDragEnd(_) {
        this.notifyDragObservers("stop");
        this.element.classList.remove("drag-start");
    }
    onDragEnter(_) {
        this.notifyDragObservers("enter");
        this.element.classList.add("drag-area");
    }
    onDragLeave(_) {
        this.notifyDragObservers("leave");
        this.element.classList.remove("drag-area");
    }
    onDropped() {
        this.element.classList.remove("drag-area");
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container);
    }
    setOncloseListner(listner) {
        this.closeListner = listner;
    }
    setOnDragstateListner(listner) {
        this.dragStateListener = listner;
        console.log(listner);
    }
    muteChildren(state) {
        if (state === "mute") {
            this.element.classList.add("mute-children");
        }
        else {
            this.element.classList.remove("mute-children");
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
}
export class pageComponent extends BaseComponent {
    constructor(pageItemMaper) {
        super("<ul class='page'></ul>");
        this.pageItemMaper = pageItemMaper;
        this.children = new Set();
        this.element.addEventListener("dragover", (e) => {
            this.onDragOver(e);
        });
        this.element.addEventListener("drop", (e) => {
            this.onDrop(e);
        });
    }
    onDragOver(e) {
        e.preventDefault();
    }
    onDrop(e) {
        e.preventDefault();
        if (!this.dropTarget)
            return;
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = e.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            const Location = dropY < srcElement.y ? "beforebegin" : "afterend";
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, Location);
        }
        this.dropTarget.onDropped();
    }
    addChild(section) {
        const item = new this.pageItemMaper();
        item.addChild(section);
        item.attachTo(this.element, "beforeend");
        item.setOncloseListner(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragstateListner((target, state) => {
            switch (state) {
                case "start":
                    this.dragTarget = target;
                    this.updateSections("mute");
                    break;
                case "stop":
                    this.dragTarget = undefined;
                    this.updateSections("unmute");
                    break;
                case "enter":
                    this.dropTarget = target;
                    break;
                case "leave":
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`구현되지 않은 state: ${state}`);
            }
        });
    }
    updateSections(state) {
        this.children.forEach((section) => section.muteChildren(state));
    }
}
