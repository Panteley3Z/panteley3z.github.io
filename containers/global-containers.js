import { setLabel, setIcon, setPoster, setTitle, setDescription } from "../components/components.js";
import { langMode } from "../switchers/global-switchers.js";
import { ID_ELEMENTS as ID_is } from "../lang/id-elements.js";
import { DICTIONARY as DICT } from "../lang/dictionary.js";
import { GOOGLE_ICONS_FF as icons } from "../icons/google-icons.js";

export class CommonContainer {
    constructor({ node = "div.container", ID = "", CN = "" }) {
        this.node = node;
        this.CN = CN;
        this.ID = ID;
        this.setContainer()
    }
    getElement() {
        if (this.parentNode) { return this.parentNode }
        else { return this.container }
    }
    setContainer() {
        const nn = this.node.split(".");
        this.container = document.createElement(nn[0]);
        if (this.ID) { this.setID(this.ID) }
        if (this.CN) { this.setClassName() }
        else { this.container.className = nn[1] }
        if (this.parentNode) { this.setParentNode() }
    }
    setID(p) { this.container.id = p }
    setClassName() {
        const cL = this.CN.split(" ");
        for (let n of cL) { this.container.classList.add(n) }
    }
    setParentNode(nD) {
        const pp = nD.split(".");
        this.parentNode = document.createElement(pp[0]);
        this.parentNode.className = pp[1] || "shell";
        this.parentNode.appendChild(this.container)
    }
    addContent() { this.container.append(...arguments) }
}

export class Button extends CommonContainer {
    constructor(params = { ID: "", CN: "", text: "" }, f) {
        super({ node: "button.primary-btn", ID: params.ID, CN: params.CN });
        this.text = params.text;
        this.f = f;
        this.addContent();
        if (f) { this.setHandlers() }
        return this.getElement()
    }
    //@Override
    setClassName() {
        const cL = this.CN.split(" ");
        for (let n of cL) { n += "-btn"; this.container.classList.add(n) }
    }
    //@Override
    addContent() {
        if (this.text) {
            const tt = this.text;
            if (tt.startsWith("mso")) {
                const s = tt.indexOf("o");
                const t = tt.slice(s + 2);
                this.container.classList.add("material-symbols-outlined");
                this.container.innerText = t
            } else {
                this.container.classList.add("label");
                this.container.innerText = tt;
                this.container.dataset.desc = tt;
                langMode.setCurrentLabel(this.container)
            }
        }
    }
    setHandlers() { this.container.addEventListener("click", (e) => this.f(e)) }
}

export class Modal extends CommonContainer {
    constructor(params = { ID: "", CN: "", btn }, size = "content") {
        super({ node: "div.modal", ID: params.ID, CN: params.CN });
        this.btn = params.btn;
        this.size = size;
    }
    //@Override
    setContainer() {
        super.setContainer();
        this.setParentNode("div.modal-shade");
        const body = document.body;
        body.appendChild(this.parentNode);
        this.parentNode.role = "dialog";
        this.parentNode.style.position = "fixed";
        this.header = new Header({ CN: "modal-header" });
        //NOTE_18101756 - this is for fix canvas height 
        const fixHeader = this.header.getElement();
        fixHeader.innerText = "header";
        this.container.appendChild(fixHeader);
    }
    //@Override
    addContent() {
        let headLabel = "modal";
        for (let arg of arguments) {
            if (arg.dataset) {
                if (arg.dataset.contentType !== undefined) {
                    const ct = arg.dataset.contentType;
                    this.container.classList.add(`${ct}-modal`);
                    if (arg.dataset.propertyName !== undefined) {
                        headLabel = arg.dataset.propertyName
                    } else { headLabel = ct }
                }
            }
        }
        //NOTE_18101756
        const fixHeader = this.header.getElement();
        fixHeader.innerText = "";
        this.header.addContent(setLabel(headLabel), new Button({ CN: "close round", text: this.btn }))
        this.innerContainer = document.createElement("div");
        this.innerContainer.className = "modal-content";
        this.container.appendChild(this.innerContainer);
        this.innerContainer.append(...arguments);
        langMode.setLabels(this.container);
        this.setDimens()
    }
    setDimens() {
        const mH = this.container.querySelector(".modal-header");
        let mHHeight = mH.clientHeight;
        if (this.size === "fullscreen") {
            this.container.classList.add(this.size);
            this.parentNode.classList.add("nopadding");
            this.innerContainer.classList.add("nopadding");
            this.innerContainer.style.minHeight = `${window.innerHeight - mHHeight}px`;
        } else { this.boxOffset(this.container) }
        window.addEventListener('resize', () => {
            if (this.size === "fullscreen") {
                this.innerContainer.style.minHeight = `${window.innerHeight - mHHeight}px`;
            }
            this.boxOffset(this.container)
        });
        window.addEventListener('scroll', () => {
            if (this.parentNode.lastElementChild === this.parentNode) { this.parentNode.style.overflow = "hidden" }
        });
        this.parentNode.addEventListener('click', (e) => {
            if (e.target === this.parentNode || e.target.classList.contains("close-btn")) {
                setTimeout(() => { this.parentNode.remove() }, 200)
            }
        })
    }
    getHeight() {
        const mH = this.container.querySelector(".modal-header");
        return mH.clientHeight;
    }

    boxOffset(elem) {
        let offset = window.innerHeight / 2 - elem.clientHeight / 2;
        elem.style.marginTop = `${offset}px`;
    }
}

export class Navigation extends CommonContainer {
    constructor(params = { ID: "", CN: "" }) {
        super({ node: "nav.nav-container", ID: params.ID, CN: params.CN })
    }
}

export class Header extends CommonContainer {
    constructor(params = { ID: "", CN: "" }) {
        super({ node: "header.header", ID: params.ID, CN: params.CN })
    }
}

export class Card extends CommonContainer {
    constructor(obj, params = { ID: "", CN: "", btn: "" }) {
        super({ node: "figure.card", ID: params.ID, CN: params.CN });
        this.obj = obj;
        this.btn = params.btn;
        this.addContent(this.obj);
        return this.getElement();
    }
    //@Override
    addContent(o) {
        const fc = document.createElement("figcaption");
        fc.className = "card-description";
        if (Object.hasOwn(o, "id")) { this.setID(o.id) }
        if (Object.hasOwn(o, "icon")) { this.container.appendChild(setIcon(o)) }
        if (Object.hasOwn(o, "poster")) { this.container.appendChild(setPoster(o)) }
        this.container.append(fc);
        if (Object.hasOwn(o, "title")) { fc.appendChild(setTitle("h3", o.title.desc)) }
        if (Object.hasOwn(o, "description")) { fc.appendChild(setDescription(o)) }
        if (Object.hasOwn(o, "button") && o.button) { this.container.appendChild(new Button({ CN: "card", text: this.btn })) }
    }
}

export class CanvasContainer extends CommonContainer {
    constructor(canvas, params = {ID: "", CN: "" }) {
        super({ node: "figure.canvas-container", ID: params.ID, CN: params.CN });
        this.canvas = canvas;
        this.addContent();
    }
    //@Override
    addContent() {
        this.container.onselectstart = () => false;
        this.fc = document.createElement("figcaption");
        this.fc.className = "canvas-caption label";
        if (this.canvas.dataset.contentType !== undefined) {
            this.container.dataset.contentType = this.canvas.dataset.contentType;
            this.fc.classList.add(this.canvas.dataset.contentType + "-caption");
            this.container.dataset.propertyName = this.canvas.dataset.propertyName;
        }
        this.container.append(this.fc, this.canvas);
    }
    updateCaption(txt = "", cn = "") {
        if (cn) {
            if (this.fc.classList.contains(cn)) { this.fc.classList.remove(cn) }
            else { this.fc.classList.add(cn) }
        }
        this.fc.innerText = txt;
        this.fc.dataset.desc = txt;
        langMode.setCurrentLabel(this.fc);
        return this.fc
    }
}