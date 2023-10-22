import { themeMode, langMode } from "./switchers/global-switchers.js";
import { Modal, Navigation, Card } from "./containers/global-containers.js";
import { OBJECTS } from "./content/objects.js";
import { createContent } from "./constructors/content-compiler.js";
import { Logo } from "./components/logo.js";

const body = document.body;

// WINDOW_SCROLLER //
const scroller = document.getElementById("up-down-scroller");
const scrollerButton = scroller.querySelector(".scroller-button");
const docHTML = document.documentElement;

// NAVIGATION //
const navigation = new Navigation();
navigation.addContent(Logo(), createContent({ listType: "ul", elements: OBJECTS.NAVS_PROJ }));
body.appendChild(navigation.getElement());

// // PROJECTS TILES //
const projectsContainer = document.querySelector(".projects-container");
const P = OBJECTS.PROJECTS;
    P.forEach(p => {
        const card = new Card(p, {btn: "mso fullscreen"}); 
        projectsContainer.appendChild(card);
        card.addEventListener("click", (e) => {
            let screenState = "screen";
            let params = [];
            if(e.target.classList.contains("card-btn")) { screenState = "fullscreen" }
            const modal = new Modal({btn: "mso close"}, screenState);
            if (p.title.desc == "game") { params = [3, modal.getHeight()] }
            modal.addContent(p.project(...params))
        });
    })

// // COLOR TABLE
// ColorTable(elementsContainer, 3,5);

// COLOR_MODE //
const colorModeBtn = document.getElementById("color-mode-btn");
const colorModeIcon = colorModeBtn.querySelector(".icon-span");
colorModeIcon.addEventListener("click", () => {
    themeMode.switchMode();
    colorModeIcon.innerText = themeMode.getIcon();
    colorModeIcon.classList.toggle("rotate")
});

// LANG //
const langModeBtn = document.getElementById("lang-mode-btn");
const navLangIcon = langModeBtn.querySelector(".icon-span");
navLangIcon.addEventListener("click", () => {
    langMode.switchMode();
    navLangIcon.classList.toggle("rotate")
});

// SCROLL //
document.addEventListener("scroll", () => {
    if (docHTML.scrollTop > docHTML.clientHeight / 2) {
        scroller.style.opacity = "0.6";
        if (docHTML.scrollTop >= (docHTML.scrollHeight - docHTML.clientHeight - 10)) {
            scroller.style.opacity = "1"
        }
    } else { scroller.style.opacity = "0" }
})
scrollerButton.addEventListener("click", () => docHTML.scrollTo(0, 0));

// DOM_LOADED //
window.addEventListener("DOMContentLoaded", () => {
    langMode.init();
    themeMode.init();
    colorModeIcon.innerText = themeMode.getIcon()
})