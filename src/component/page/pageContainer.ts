import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}
interface SectionContainer extends Component, Composable {
  setOncloseListner(listner: OncloseListener): void;
  setOnDragstateListner(listner: onDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}
type OncloseListener = () => void;

type PageItemMaper = {
  new (): SectionContainer;
};
type DragState = "start" | "stop" | "enter" | "leave";
type onDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListner?: OncloseListener;
  private dragStateListener?: onDragStateListener<PageItemComponent>;
  constructor() {
    super(
      '<li draggable="true" class="page-item"> <section class="page-item__body"></section> <div class="page-item__controls"> <button class="close">&times;</button> </div> </li>'
    );
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListner && this.closeListner();
    };
    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
    this.element.classList.add("drag-start");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
    this.element.classList.remove("drag-start");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
    this.element.classList.add("drag-area");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
    this.element.classList.remove("drag-area");
  }
  onDropped() {
    this.element.classList.remove("drag-area");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOncloseListner(listner: OncloseListener) {
    this.closeListner = listner;
  }
  setOnDragstateListner(listner: onDragStateListener<PageItemComponent>) {
    this.dragStateListener = listner;
    console.log(listner);
  }
  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }
  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
export class pageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  private children = new Set<SectionContainer>();
  constructor(private pageItemMaper: PageItemMaper) {
    super("<ul class='page'></ul>");
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    //위치를 바꿔주면된다
    e.preventDefault();
    if (!this.dropTarget) return;
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      const Location = dropY < srcElement.y ? "beforebegin" : "afterend";
      this.dragTarget.removeFrom(this.element); //현재페이지에서 삭제
      this.dropTarget.attach(this.dragTarget, Location); //드랍타겟 근처에 추가해줘야함
    }
    this.dropTarget.onDropped();
  }

  addChild(section: Component) {
    // const item = new PageItemComponent(); //한가지만 만들수 있다 =>재사용 할수 있게
    const item = new this.pageItemMaper();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOncloseListner(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragstateListner((target: SectionContainer, state: DragState) => {
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
  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) =>
      section.muteChildren(state)
    );
  }
}
