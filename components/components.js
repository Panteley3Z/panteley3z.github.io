import { langMode } from "../switchers/global-switchers.js";

export function setLabel(dataDesc) {
    const s = document.createElement("span");
    s.className = "label";
    s.innerText = "label";
    if(dataDesc.startsWith("p-n")) {
        const i = dataDesc.indexOf("n");
        s.innerText = dataDesc.slice(i + 2);
    } else { s.dataset.desc = dataDesc } 
    return s
}

export function setIcon(obj) {
    const i = document.createElement("span");
    i.setAttribute("class", "icon-span material-symbols-outlined");
    i.innerText = obj.icon;
    return i
}

export function setPoster(obj) {
    const i = document.createElement("img");
    i.setAttribute("src", `../images/${obj.poster}`);
    return i
}

export function setTitle(type, data) {
    const t = document.createElement(type);
    t.setAttribute("class", "label title");
    t.dataset.desc = data;
    t.innerText = data;
    langMode.setCurrentLabel(t)
    return t
    
}

export function setDescription(obj) {
    const p = document.createElement("p");
    p.className = "description label";
    p.dataset.desc = obj.description.desc;
    p.innerText = obj.description.desc;
    langMode.setCurrentLabel(p);
    return p
}

export function setPropertyName(el, n) {
    el.dataset.propertyName = "p-n " + n;
    return n
}