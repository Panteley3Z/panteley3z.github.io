import { themeMode, langMode } from "./switchers/global-switchers.js";
import { Modal, Navigation, Button, Card } from "./containers/global-containers.js";
import { Logo } from "./components/logo.js";
import { OBJECTS, SOURCES } from "./content/objects.js";
import { createContent } from "./constructors/content-compiler.js";
import { DICTIONARY } from "./lang/dictionary.js";

let autoScroll = true;
let trigger = true;

// ELEMENTS //
const body = document.body;
const mainArticle = document.querySelector(".main-article");

// WINDOW_SCROLLER //
const scroller = document.getElementById("up-down-scroller");
const scrollerButton = scroller.querySelector(".scroller-button");
const docHTML = document.documentElement;

// NAVIGATION
const navigation = new Navigation();
navigation.addContent(Logo(), createContent({ listType: "ul", elements: OBJECTS.NAVS_MAIN }));
body.appendChild(navigation.getElement());

const showMoreBtn = mainArticle.querySelector(".primary-btn");

const introSection = document.querySelector(".intro-section");
const introFigure = document.querySelector(".main-figure");
const introFigcaption = introFigure.querySelector("figcaption");
const introAvatar = introFigure.querySelector(".main-figure img");

const introBlock = introSection.querySelector(".intro-block");
const messages = introBlock.querySelectorAll(".intro-portion");

const introProjects = introSection.querySelector(".intro-projects");

const introFeedback = introSection.querySelector(".intro-feedback");
const introFeedBtn = introFeedback.querySelector(".feedback-btn");
const feedbackText = introFeedback.querySelector(".textarea");

const mainFormSection = mainArticle.querySelector(".form-section");

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

// CONTACT SECTION //
const contGmail = document.getElementById("my-gmail");
const contMail = document.getElementById("my-mail");
const contVK = document.getElementById("my-vk");
const contPhone = document.getElementById("my-phone");
contGmail.setAttribute("href", SOURCES.gmail);
contGmail.textContent = SOURCES.gmailStr;
contMail.setAttribute("href", SOURCES.mailru);
contMail.textContent = SOURCES.mailruStr;
contVK.setAttribute("href", SOURCES.vk);
contPhone.setAttribute("href", SOURCES.phone);
contPhone.textContent = SOURCES.phoneStr;

// // TAGGING //
// tagPlacer(mainArticle);
// window.addEventListener('resize', () => tagPlacer(mainArticle));

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

window.addEventListener("DOMContentLoaded", () => {

    langMode.init();
    themeMode.init();
    colorModeIcon.innerText = themeMode.getIcon();

    const navContacts = document.querySelector("#nav-contacts a");
    navContacts.addEventListener("click", () => {
        introFigure.classList.remove("hidden");
        mainFormSection.classList.remove("hide");
    })

    mainFormSection.style.paddingTop = `${introFigure.clientHeight}px`;

    showMoreBtn.onclick = () => {
        showMoreBtn.remove();
        introSection.classList.remove("hide");
        introFigure.classList.remove("hidden");
        mainFormSection.classList.add("hide");
        introBlock.style.paddingTop = `${introFigure.clientHeight}px`;
        simulatedPrintText(messages, showContinue);
        articleScroll();
    }
    // showMoreBtn.click()

    mainArticle.addEventListener("scroll", () => {
        if (mainArticle.scrollTop < mainArticle.clientHeight / 2) {
            introFigure.classList.add("hidden")
        } else {
            introFigure.classList.remove("hidden");
            let diff = parseInt(100 - ((mainArticle.scrollTop - mainArticle.clientHeight) / 3));
            if (diff >= 50 && diff <= 100) {
                introAvatar.style.width = `${diff}px`;
                introFigcaption.style.lineHeight = introAvatar.style.width;
                // introFigcaption.style.marginLeft = introAvatar.style.width;
            }
            
        }
        if (trigger && (introProjects.clientHeight > 1)) {
            if (introProjects.getBoundingClientRect().bottom < mainArticle.clientHeight + 16) {
                trigger = false;
                introFeedback.classList.remove("hide");
            }
        }
    });

    introFeedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        introProjects.appendChild(createMessage(feedbackText.value, "", "feedback"));
        introFeedback.remove();
        setTimeout(() => {
            introProjects.appendChild(createMessage("", DICTIONARY.introThanksFeed.desc));
            mainFormSection.classList.remove("hide");
            setTimeout(() => {
                const summaryText = DICTIONARY.introSummary.desc;
                introProjects.appendChild(createMessage("", summaryText));
                scrollCinC(introProjects, mainArticle)
                setTimeout(() => {
                    introProjects.appendChild(createMessage("", DICTIONARY.introWillWait.desc));
                    scrollCinC(introProjects, mainArticle)
                }, 3000)
            }, 1000);
        }, 500)
    })
})

function simulatedPrintText(elements, f, index = 0, slow = 60) {
    if (index === elements.length) { if (f) f(); return }
    const e = elements[index];
    const iH = e.innerHTML;
    const tC = e.textContent;
    e.innerHTML = "";
    if (e.classList.contains("hidden")) { e.classList.remove("hidden") }
    if (tC.length > 0) { e.textContent += tC.charAt(0) }
    let iC = 1;
    if (tC.length > 50 && slow > 50) { slow /= 2 }
    let printIntervalID = setInterval(() => {
        if (iC === tC.length) {
            e.innerHTML = iH;
            clearInterval(printIntervalID);
            setTimeout(() => simulatedPrintText(elements, f, ++index), 1000);
        } else {
            e.textContent += tC.charAt(iC);
            iC++
        }
    }, slow)
}

function scrollCinC(iN, oN, slow = 10) {
    let dif = iN.getBoundingClientRect().bottom - oN.clientHeight;
    if (dif > 0) {
        let c = 0;
        const scrollIntID = setInterval(() => {
            if (c >= dif) { console.log("stop-scroll"); clearInterval(scrollIntID) }
            else { oN.scrollTop += 1; c++ }
        }, slow)
    }
}

function articleScroll() {
    const scrollIntID = setInterval(() => {
        let dif = introBlock.getBoundingClientRect().bottom - mainArticle.clientHeight;
        if (!autoScroll) { console.log("stop-autoscroll"); clearInterval(scrollIntID) }
        if (dif > 0) { mainArticle.scrollTop += dif }
    }, 400)
}

function showContinue() {
    autoScroll = false;
    introBlock.appendChild(new Button({ CN: "primary continue", text: "continue" }, nextToProjects))
}

function showProjects() {
    const P = OBJECTS.PROJECTS;
    P.forEach(p => {
        const card = new Card(p, { CN: "intro-portion card", btn: "mso fullscreen" });
        introProjects.appendChild(card);
        card.addEventListener("click", (e) => {
            let screenState = "screen";
            let params = [];
            if (e.target.classList.contains("card-btn")) { screenState = "fullscreen" }
            const modal = new Modal({ btn: "mso close" }, screenState);
            if (p.title.desc == "game") { params = [3, modal.getHeight()] }
            modal.addContent(p.project(...params))
        });
    })
}

function createMessage(text = "", desc = "", type = "intro") {
    const p = document.createElement("p");
    p.className = `${type}-portion label`;
    p.innerHTML = text;
    if (desc) { p.dataset.desc = desc }
    langMode.setCurrentLabel(p);
    if (p.textContent.length > 3 && p.textContent.length < 6) { p.classList.add("chat-icon") }
    return p
}

function nextToProjects(e) {
    const txt = e.target.innerText.toLowerCase();
    e.target.remove();
    introBlock.appendChild(createMessage(txt, "", "feedback"));
    setTimeout(() => {
        introBlock.appendChild(createMessage("ok!"));
        setTimeout( () => {
            introBlock.appendChild(createMessage("", DICTIONARY.introDescForProjects.desc));
            scrollCinC(introBlock, mainArticle);
            showProjects();
        }, 500)
        scrollCinC(introBlock, mainArticle)
    }, 500)
}