import { langMode } from "../switchers/global-switchers.js";

export function createContent({ listType = "div", elements }) {

    const list = document.createElement(listType);

    if (listType === "ul" || listType === "ol") {
        list.setAttribute("class", "list");
        for (let e of elements) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            if (Object.hasOwn(e, "id")) setID(e, li);
            if (Object.hasOwn(e, "href")) setHRef(e, a);
            if (Object.hasOwn(e, "icon")) setIcon(e, a);
            if (Object.hasOwn(e, "title")) setTitle(e, a);
            list.appendChild(li);
            li.appendChild(a)
        }
    }
    return list

    function setID(obj, elem) { elem.setAttribute("id", obj.id) }

    function setHRef(obj, elem) { elem.setAttribute("href", obj.href) }

    function setIcon(obj, elem) {
        const i = document.createElement("span");
        i.setAttribute("class", "icon-span material-symbols-outlined");
        i.innerText = obj.icon;
        elem.appendChild(i)
    }
    function setTitle(obj, elem) {
        const s = document.createElement("span");
        s.setAttribute("class", "label");
        if (!Object.hasOwn(obj, "poster")) { s.classList.add("title") }
        s.dataset.desc = obj.title.desc;
        s.innerText = obj.title.desc;
        elem.appendChild(s)
        langMode.setCurrentLabel(s)
    }
}