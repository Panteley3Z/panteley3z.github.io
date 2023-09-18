import { ballsCanvas } from "./balls-canvas.js";

const gameSection = document.getElementById("game-section");

export function ColorCanvas(toNode) {

    const figure = document.createElement("figure");
    figure.className = "figure__color-canvas figure-canvas figure";
    const caption = document.createElement("figcaption");
    caption.className = "figure-canvas__caption";
    caption.textContent = "small game";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.setAttribute('width', 1920);
    canvas.setAttribute('height', 1080);
    
    figure.append(caption, canvas);
    toNode.appendChild(figure);

    drawText("BALLS", 800)
    draw(10, 400);

    // LOAD GAME
    const ID_TEL = setTimeout( () => {
        canvas.addEventListener("click", () => {
            caption.classList.add("loading");
            caption.textContent = "loading";
            draw(13, 200);
            setTimeout( () => {
                figure.remove();
                ballsCanvas(gameSection, 10);
            }, 3000)
        });
        clearTimeout(ID_TEL);
    }, 4000)

    function drawText(str, delay) {
        let begin = 360;
        let letterSpace = 250;
        let count = 0;

        let idIntDrawText = setInterval( () => {
            if (count === str.length) {clearInterval(idIntDrawText)}
            ctx.font = "24rem monospace";
            ctx.lineWidth = 12;
            ctx.strokeStyle = "rgba(255,255,255,0.75)";
            ctx.strokeText(str.charAt(count), begin, 640);
            begin += letterSpace;
            count++
        }, delay)
    }

    function draw(balls, delay) {
        const random = (min, max) => Math.floor(min + Math.random() * max);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ballsCount = balls;
        let idIntervalDraw = setInterval( () => {

            if (ballsCount <= 1) {clearInterval(idIntervalDraw)}
            let x = random(1, canvas.width);
            let y = random(1, canvas.height);
            let r = random(32, 128);

            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.lineWidth = 6;
            ctx.strokeStyle = "rgba(225,255,255,0.4)";
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.beginPath();
            ctx.arc(x - (r/3), y - (r/4), r/3, 0, 2 * Math.PI);
            ctx.fill();
            ballsCount--
        }, delay)
    }
}