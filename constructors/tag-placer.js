import { objectToArray } from "./object-to-array.js";
import { tagsList } from "../content/tags-list.js";

export function tagPlacer(interval = 1000) {
    const article = document.querySelector(".main__article");
    const figure = document.querySelector(".main__figure");
    let arr = objectToArray(tagsList);

    setInterval(() => {
        const tag = document.createElement("div");
        tag.className = "tag nowrap";
        tag.style.position = "absolute";
        let randomTag = Math.floor(Math.random() * arr.length);
        let posY = Math.random() * (figure.clientHeight) + 132;
        let posX = Math.random() * (article.clientWidth - 100);
        let randomColor = Math.round(Math.random() * 360);
        tag.innerText = `${arr[randomTag]}`;
        tag.style.top = `${posY}px`;
        tag.style.left = `${posX}px`;
        tag.style.backgroundColor = `hsl(${randomColor},100%,50%)`;
        if (randomColor < 20 || randomColor > 200) { tag.style.color = "white" }
        else { tag.style.color = "black" }
        if (posY < article.clientHeight / 2) {
            if (posX < (article.clientWidth / 2) - 50) {tag.style.transform = "skew(6deg, 12deg)"}
            if (posX > article.clientWidth / 2) {tag.style.transform = "skew(-6deg, -12deg)"}
        } else {
            if (posX < (article.clientWidth / 2) - 50) {tag.style.transform = "skew(-6deg, -12deg)"}
            if (posX > article.clientWidth / 2) {tag.style.transform = "skew(6deg, 12deg)"}
        }
        article.append(tag)
    }, interval)
}