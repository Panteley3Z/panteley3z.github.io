import { DigitalClock } from "./elements/digital-clock.js";
import { Calendar } from "./elements/calendar.js";
import { ColorTable } from "./elements/color-table.js";
import { ColorCanvas } from "./elements/canvas.js";
import { ballsCanvas } from "./elements/balls-canvas.js";
import { TITLES } from "./lang/language-pack.js";
import { Navigation } from "./containers/navigation.js";
import { tagPlacer } from "./constructors/tag-placer.js";
import { colorScheme, setTheme } from "./switchers/color-mode.js";
import { colorPicker } from "./elements/color-picker.js";

// ELEMENTS //

const main = document.getElementById("main");
const elementsContainer = document.getElementById("elements-container");
const gameSection = document.getElementById("game-section");
const clockSection = document.getElementById("clock-section");

// WINDOW_SCROLLER //
const scroller = document.getElementById("up-down-scroller");
const scrollerButton = scroller.querySelector(".scroller__btn");
const docHTML = document.documentElement;

// LANGUAGE_CHANGER //
const langChanger = document.getElementById("language-changer");
const langButton = langChanger.querySelector(".language-changer__btn");

// NAVIGATION
Navigation(document.body);
// CANVAS //
ColorCanvas(gameSection);
//ballsCanvas(main,16);
// COLOR TABLE
ColorTable(elementsContainer, 3,5);
// CALENDAR //
Calendar(elementsContainer);
// COLOR CHOICER //
colorPicker(elementsContainer);
// DIGITAL_CLOCK //
DigitalClock(clockSection, 6, 9);

const elementsWithID = document.querySelectorAll("[id]");
setLabels();

// TAGGING //
tagPlacer(60000);

// COLOR_MODE_SWITCHER //
const logo = document.getElementById("main-logo");
logo.addEventListener("click", () => {
    colorScheme.getTMode() === "light" ? setTheme("dark") : setTheme("light");
});

// LANG //
langButton.addEventListener("click", () => {switchLang(); setLabels()});
function switchLang() {
    let lang = docHTML.getAttribute("lang");
    switch(lang) {
        case "ru": docHTML.setAttribute("lang", "en"); break;
        case "en": docHTML.setAttribute("lang", "ru"); break;
        default: docHTML.setAttribute("lang", "ru")
    }
}
function setLabels() {
    elementsWithID.forEach( elem => {
        const matchedTitle = TITLES.find( title => title.id === elem.id);
        if (matchedTitle) {
            let labelText = "";
            if (docHTML.getAttribute("lang") === "ru") {
                labelText = matchedTitle.text.ru
            } else {labelText = matchedTitle.text.eng}
            document.getElementById("calendar-header").click();
            elem.querySelector(".label").innerHTML = labelText
        }
    })
}

// SCROLL //
document.addEventListener("scroll", () => {
    if (docHTML.scrollTop > docHTML.clientHeight / 2) {
        scroller.style.opacity = "0.6";
        if (docHTML.scrollTop >= (docHTML.scrollHeight - docHTML.clientHeight - 10)) {
            scroller.style.opacity = "1"
        }
    } else {scroller.style.opacity = "0"}
})
scrollerButton.addEventListener("click", () => docHTML.scrollTo(0,0));