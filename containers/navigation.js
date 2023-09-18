import { navItemsData } from "../content/navItemsList.js";

export function Navigation(toNode) {
    const nB = document.createElement("footer");
    nB.className = "main-nav-bar";
    const img = document.createElement("img");
    img.id = "main-logo";
    const imgURL = "https://avatars.githubusercontent.com/u/96375733";
    const imgSize = 64;
    img.setAttribute("src", imgURL);
    img.width = imgSize;
    img.height = imgSize;
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    
    navItemsData.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.id = item.id;
        a.className = "label";
        a.setAttribute("href", item.src);
        li.appendChild(a);
        ul.appendChild(li)
    });
    nav.appendChild(ul);
    nB.append(img, nav)
    toNode.appendChild(nB)
}