import { setPropertyName } from "../components/components.js";
import { CanvasContainer } from "../containers/global-containers.js";

export function BubblesGame(bubblesCount = 14, fixHeight = 0) {
    console.log("BubblesGame opened")

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth * 2;
    canvas.height = (window.innerHeight * 2) - (fixHeight * 2);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const gameName = "bubbles-game";
    canvas.className = gameName + " game-canvas canvas";
    canvas.dataset.contentType = "game";
    setPropertyName(canvas, "Bubble Game");

    const CC = new CanvasContainer(canvas);

    const ctx = canvas.getContext("2d");

    const maxRadius = Math.floor(Math.sqrt(canvasWidth * canvasHeight) / 15);
    const speed = 8;

    drawPoster("BubbleS", 200);

    class Shape {
        constructor(x, y, velX, velY) {
            this.x = x;
            this.y = y;
            this.velX = velX;
            this.velY = velY;
        }
    }

    class Ball extends Shape {
        #border = 2;
        exist = true;
        constructor(x, y, velX, velY, color, radius) {
            super(x, y, velX, velY);
            this.color = color;
            this.radius = radius
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${this.color},0.75)`;
            ctx.strokeStyle = `rgb(${this.color})`;
            ctx.lineWidth = this.#border;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.beginPath();
            ctx.arc(this.x - (this.radius / 3), this.y - (this.radius / 4), this.radius / 3, 0, 2 * Math.PI);
            ctx.fill();
        }
        update() {
            if (this.velX === 0) { this.velX = 1 }
            if (this.velY === 0) { this.velY = 1 }
            if ((this.x + this.radius) >= canvasWidth) this.velX = -(this.velX);
            if ((this.y + this.radius) >= canvasHeight) this.velY = -(this.velY);
            if ((this.x - this.radius) <= 0) {
                if (this.x < 0) { this.x = this.radius + 1 }
                this.velX = -(this.velX)
            }
            if ((this.y - this.radius) <= 0) {
                if (this.y < 0) { this.y = this.radius + 1 }
                this.velY = -(this.velY);
            }
            this.x += this.velX;
            this.y += this.velY;
        }
        collisionDetect() {
            for (let ball of balls) {
                if ((this !== ball) && ball.exist) {
                    const dx = this.x - ball.x;
                    const dy = this.y - ball.y;
                    const sumOfRadiuses = this.radius + ball.radius;
                    const distance = Math.hypot(dx, dy);

                    if (distance <= sumOfRadiuses) {
                        let diff = Math.ceil(sumOfRadiuses - distance);
                        this.x < ball.x ? this.x -= diff : ball.x -= diff;
                        let ballVelX = ball.velX;
                        let ballVelY = ball.velY;
                        let thisVelX = this.velX;
                        let thisVelY = this.velY;
                        this.velX = ballVelX;
                        this.velY = ballVelY;
                        ball.velX = thisVelX;
                        ball.velY = thisVelY
                    }
                }
            }
        }
    }

    class HunterBall extends Ball {
        #border = 8;
        #radiusIterator = 0;
        pressed = false;
        constructor(x, y, velX, velY, color, radius) {
            super(...arguments);

            window.addEventListener("keydown", (e) => {
                this.pressed = true;
                switch (e.key) {
                    case "a":
                        this.x -= this.velX;
                        break;
                    case "d":
                        this.x += this.velX;
                        break;
                    case "w":
                        this.y -= this.velY;
                        break;
                    case "s":
                        this.y += this.velY;
                        break;
                }
            });
            const pointOnCanvas = (e) => this.pointToCursor(e);

            canvas.addEventListener("mousedown", (ev) => {
                this.pressed = true;
                this.pointToCursor(ev);
                canvas.addEventListener("mousemove", pointOnCanvas)
            });
            canvas.addEventListener("mouseup", () => {
                canvas.removeEventListener("mousemove", pointOnCanvas);
            })
        }

        pointToCursor(event) {
            const canvasRect = canvas.getBoundingClientRect();
            this.x = (canvasWidth / canvasRect.width) * (event.clientX - canvasRect.x);
            this.y = (canvasHeight / canvasRect.height) * (event.clientY - canvasRect.y);
        }

        // @Override
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgb(${this.color})`;
            ctx.lineWidth = this.#border;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke()
        }
        // @Override
        update() {
            if ((this.x + this.radius) >= canvasWidth) this.x = canvasWidth - this.radius - this.#border;
            if ((this.y + this.radius) >= canvasHeight) this.y = canvasHeight - this.radius - this.#border;
            if ((this.x - this.radius) <= 0) this.x = this.radius + this.#border;
            if ((this.y - this.radius) <= 0) this.y = this.radius + this.#border;
        }
        // @Override
        collisionDetect() {
            if (this.pressed) {
                for (const ball of balls) {
                    if (ball.exist && (ball.radius <= this.radius)) {
                        const dx = this.x - ball.x;
                        const dy = this.y - ball.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < this.radius) {
                            this.#radiusIterator++;
                            this.color = ball.color;
                            bubblesCount--;
                            CC.updateCaption("catched", "catched");
                            setTimeout(() => {
                                CC.updateCaption("", "catched");
                                CC.updateCaption(bubblesCount);
                            }, 500)
                            this.radius = hunterBallRadius[this.#radiusIterator];
                            ball.exist = false;
                        }
                    }
                }
            }
        }
    }

    const balls = [];
    while (balls.length < bubblesCount) {
        const currentRadius = randomRange(40, maxRadius);
        const ball = new Ball(
            randomRange(currentRadius, canvasWidth - currentRadius),
            randomRange(currentRadius, canvasHeight - currentRadius),
            randomRange(0 - speed, speed),
            randomRange(0 - speed, speed),
            randomRGB(), currentRadius
        );
        balls.push(ball)
    }

    // INIT HUNTER_BALL //
    const hunterBallRadius = ballRadiuses(balls);
    const hunterBall = new HunterBall(canvasWidth / 2, canvasHeight - hunterBallRadius[0], 64, 64, "255,255,255", hunterBallRadius[0]);

    // R_E_T_U_R_N //
    return CC.getElement(); //
    // R_E_T_U_R_N //

    function randomRange(min, max) { return Math.round(Math.random() * (max - min) + min) }

    function randomRGB() { return `${randomRange(55, 255)},${randomRange(55, 255)},${randomRange(55, 255)}` }

    function ballRadiuses(arr) {
        const result = [];
        arr.forEach(elem => result.push(elem.radius));
        result.sort( (a, b) => a - b);
        return result
    }

    function drawPoster(str, delay) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const center = canvasHeight / 2;
        const letterSize = Math.round(canvasWidth / (str.length + 2));
        let begin = letterSize;
        let count = 0;
        let bC = str.length * 2;


        let idIntervalDraw = setInterval(() => {
            if (bC <= 1) {
                clearInterval(idIntervalDraw);
                const b = CC.updateCaption("start", "start");
                b.addEventListener("click", loadGame)
            }
            ctx.font = `bold ${letterSize}px monospace`;

            let r = randomRange(55, 255);
            let g = randomRange(55, 255);
            let b = randomRange(55, 255);

            let x = randomRange(maxRadius, canvasWidth - maxRadius);
            let y = randomRange(maxRadius, canvasHeight - maxRadius);
            let rd = randomRange(40, maxRadius);

            if (count < str.length) {
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillText(str.charAt(count), begin, center);
                begin += letterSize;
                count++
            }

            ctx.beginPath();
            ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(225,255,255,0.5)";
            ctx.arc(x, y, rd, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.beginPath();
            ctx.arc(x - (rd / 3), y - (rd / 4), rd / 3, 0, 2 * Math.PI);
            ctx.fill();
            bC--
        }, delay)
    }

    function loadGame() {
        this.removeEventListener("click", loadGame);
        CC.updateCaption("", "start");
        CC.updateCaption("", "loading");
        setTimeout(() => {
            CC.updateCaption("", "loading");
            CC.updateCaption(bubblesCount, "ongame");
            loop()
        }, 2000)
    }

    function loop() {
        const idAnimation = requestAnimationFrame(loop);

        const isCanvas = document.querySelector(`.${gameName}`);
        if (!isCanvas) { cancelAnimationFrame(idAnimation) }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // ctx.fillStyle = "rgba(32, 36, 40, 0.5)";
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        if (bubblesCount === 0) {
            cancelAnimationFrame(idAnimation);
            setTimeout(() => {
                CC.updateCaption("", "ongame");
                CC.updateCaption("gameWin", "win")
            }, 1000)
        } else {
            for (const ball of balls) {
                if (ball.exist) {
                    ball.draw();
                    ball.update();
                    ball.collisionDetect()
                }
            }
            hunterBall.draw();
            hunterBall.update();
            hunterBall.collisionDetect()
        }
    }
}