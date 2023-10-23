import { GOOGLE_ICONS_FF } from "../icons/google-icons.js";
import { DICTIONARY } from "../lang/dictionary.js";
import { Button } from "../containers/global-containers.js";

export function ColorPicker(tiles = 5) {
    console.log("ColorPicker opened")
    const container = document.createElement('div');
    container.className = "color-picker";
    container.dataset.contentType = DICTIONARY.colorPicker.desc;
    const colors = document.createElement('div');
    colors.className = "colors";

    for (let i = 1; i <= tiles; i++) {
        const color = document.createElement("div");
        color.className = "color unlocked";
        colors.appendChild(color);
        const p = document.createElement("div");
        p.className = "color--pals";
        color.appendChild(p);
        const locker = document.createElement("button");
        locker.className = "btn-locker material-symbols-outlined";
        locker.innerText = GOOGLE_ICONS_FF.unlock;
        p.appendChild(locker);
        locker.addEventListener("click", () => {
            color.classList.toggle("unlocked");
            color.classList.contains("unlocked") ? locker.innerText = GOOGLE_ICONS_FF.unlock : locker.innerText = GOOGLE_ICONS_FF.lock;
        });
        for (let i = 1; i <= 3; i++) {
            const span = document.createElement("span");
            span.className = `color--pal pal-${i}`;
            span.innerText = "--";
            p.appendChild(span)
        }
    }
    const bottomControl = document.createElement("div");
    bottomControl.className = "color-picker__control";

    const refreshButton = new Button({ CN: "refresh", text: "mso refresh" });
    const infoButton = new Button({ CN: "round info", text: "mso info_i" });

    const results = document.createElement("p");
    results.className = "colors-results hidden";

    bottomControl.append(results, refreshButton, infoButton);
    container.append(colors, bottomControl);

    colors.addEventListener("wheel", (e) => {
        const h = document.querySelector(".fullscreen .modal-header");
        if (h && (e.wheelDeltaX < 1)) {
            if (e.wheelDeltaY < -4) {
                h.style.opacity = "0";
                h.style.transition = "0.5s";
                colors.style.marginTop = `-${h.clientHeight}px`;
                colors.style.height = "100vh";
            } else if (e.wheelDeltaY > 4) {
                colors.style.marginTop = "0px";
                h.style.opacity = "1"
            }
        }
    });
    refreshButton.addEventListener("click", changeColors);
    infoButton.addEventListener("click", showColorsInfo);
    
    return container;

    function changeColors() {
        let colorTiles = container.querySelectorAll(".color");
        results.innerHTML = "";
        if (colorTiles) {
            let locks = 0;
            for (let cT of colorTiles) {
                let colorPals = cT.querySelectorAll(".color--pal");
                let lockBtn = cT.querySelector(".btn-locker");
                if (cT.classList.contains("unlocked")) {
                    if (refreshButton.classList.contains("dont")) {
                        refreshButton.classList.remove("dont")
                    }
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);
                    let color = `rgb(${r}, ${g}, ${b})`;
                    // HSL PAL
                    // let color = `hsl(${h}, ${s}%, ${l}%)`;
                    cT.style.background = color;
                    lockBtn.style.color = color;
                    addColorValue(color);
                    colorPals[0].innerText = r;
                    colorPals[1].innerText = g;
                    colorPals[2].innerText = b
                } else {
                    addColorValue(cT.style.background);
                    locks++
                }
            }
            if (locks === colorTiles.length) {
                refreshButton.classList.add("dont");
                setTimeout( () => { refreshButton.classList.remove("dont") }, 500)
            }
            
        }
    }

    function addColorValue(v) {
        const i = document.createElement("span");
        const s = document.createElement("span");
        i.className = "icon-of-color";
        i.style.background = v;
        results.append(i,s);
        s.innerText += v
    }

    function showColorsInfo() {
        results.classList.toggle("hidden");
        this.classList.toggle("rotate");
        if (this.innerText !== "expand_more") { this.innerText = "expand_more" }
        else { this.innerText = "info_i" }
    }
}