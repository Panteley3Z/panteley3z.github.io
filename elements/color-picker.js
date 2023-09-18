export function colorPicker(toNode) {

    const box = document.createElement('div');
    box.className = "box-item flex-column";

    const colorsContainer = document.createElement('p');
    colorsContainer.className = "color-picker";

    for (let i = 1; i <= 3; i++) {
        const colorTile = document.createElement("div");
        colorTile.className = `color-tile unlocked`;
        const button = document.createElement("button");
        button.className = "btn-color-locker";
        button.innerText = "🔓";
        const p =  document.createElement("p");
        p.className = "color-tile--pals";
        for (let i = 1; i <= 3; i++) {
            const span = document.createElement("span");
            span.className = `color-tile--pal pal-${i}`;
            span.innerText = "--";
            p.appendChild(span)
        }
        colorTile.append(button, p);
        colorsContainer.appendChild(colorTile);
    }
    const changeButton = document.createElement("button");
    changeButton.className = "color-changer";
    changeButton.innerText = "⟲";

    const allColors = document.createElement("p");
    allColors.className = "colors-result";

    box.append(colorsContainer, changeButton, allColors);
    toNode.appendChild(box);

    colorsContainer.addEventListener("click", (e) => {
        if (e.target.className === "btn-color-locker") {
            e.target.parentNode.classList.toggle("unlocked");
            e.target.parentNode.classList.contains("unlocked") ? e.target.innerText = "🔓" : e.target.innerText = "🔒";
        }
    });
    changeButton.addEventListener("click", changeColors);

    function changeColors() {
        let colorTiles = document.querySelectorAll(".color-tile");
        allColors.innerText = "";
        if (colorTiles) {
            for (let cT of colorTiles) {
                let colorPals = cT.querySelectorAll(".color-tile--pal");
                if (cT.classList.contains("unlocked")) {
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);
                    let color = `rgb(${r}, ${g}, ${b})`;
                    // HSL PAL
                    // let color = `hsl(${h}, ${s}%, ${l}%)`;
                    cT.style.background = color;
                    colorPals[0].innerText = r + ",";
                    colorPals[1].innerText = g + ",";
                    colorPals[2].innerText = b
                } else {
                    const colorPalsOfTile = cT.querySelector(".color-tile--pals");
                    const span = document.createElement("span");
                    allColors.appendChild(span);
                    span.innerText += `rgb(${colorPalsOfTile.innerText})`;
                }
            }
        }
    }
}