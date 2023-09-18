import { ColorCanvas } from "./canvas.js";

const gameSection = document.getElementById("game-section");

export function ballsCanvas(toNode, ballsCount) {
    const figure = document.createElement("figure");
    figure.className = "figure__balls-canvas figure-canvas figure";
    const caption = document.createElement("figcaption");
    caption.className = "figure-canvas__caption";

    const canvas = document.createElement("canvas");
    const canvasWidth = (canvas.width = 1920);
    const canvasHeight = (canvas.height = 1080);
    const ctx = canvas.getContext("2d");

    figure.append(caption, canvas);
    toNode.appendChild(figure);
    
    const winString = "you caught all the balls! 🥳";

    class Shape {
        constructor(x, y, velX, velY) {
            this.x = x;
            this.y = y;
            this.velX = velX;
            this.velY = velY;
        }
    }

    class Ball extends Shape {
        exist = true;
        constructor(x, y, velX, velY, color, radius) {
            super(x, y, velX, velY);
            this.color = color;
            this.radius = radius
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${this.color},0.6)`;
            ctx.strokeStyle = `rgb(${this.color})`;
            ctx.lineWidth = 6;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke()
        }
        update() {
            if (this.velX === 0) {this.velX = 1}
            if (this.velY === 0) {this.velY = 1}
            if ((this.x + this.radius) >= canvasWidth) this.velX = -(this.velX);
            if ((this.y + this.radius) >= canvasHeight) this.velY = -(this.velY);
            if ((this.x - this.radius) <= 0) {
                if (this.x < 0) {this.x = this.radius + 1}
                this.velX = -(this.velX)
            }
            if ((this.y - this.radius) <= 0) {
                if (this.y < 0) {this.y = this.radius + 1}
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
        constructor(x, y, velX, velY, color, radius) {
            super(...arguments);

            window.addEventListener("keydown", (e) => {
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
                this.radius += this.#border;
                this.pointToCursor(ev);
                canvas.addEventListener("mousemove", pointOnCanvas)
            });
            canvas.addEventListener("mouseup", () => {
                canvas.removeEventListener("mousemove", pointOnCanvas);
                this.radius -= this.#border
            })
        }

        pointToCursor(event) {
            const canvasRect = canvas.getBoundingClientRect();
            this.x = (canvasWidth/canvasRect.width) * (event.clientX - canvasRect.x);
            this.y = (canvasHeight/canvasRect.height) * (event.clientY - canvasRect.y);
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
            for (const ball of balls) {
                if (ball.exist && (ball.radius <= this.radius)) {
                    const dx = this.x - ball.x;
                    const dy = this.y - ball.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
          
                    if (distance < this.radius) {
                        this.#radiusIterator++;
                        this.color = ball.color;
                        ballsCount--;
                        caption.classList.add("catched");
                        setTimeout( () => {
                            if (caption.classList.contains("catched")) {caption.classList.remove("catched")}
                        }, 250)
                        this.radius = hunterBallRadius[this.#radiusIterator];
                        ball.exist = false;
                    }
                }
            }
        }
    }

    const balls = [];
    while(balls.length < ballsCount) {
        const radius = randomRange(32, 96);
        const ball = new Ball(
            randomRange(radius, canvasWidth - radius),
            randomRange(radius, canvasHeight - radius),
            randomRange(-5, 5),
            randomRange(-5, 5),
            randomRGB(), radius
        );
        balls.push(ball)
    }

    const hunterBallRadius = ballRadiuses(balls);
    const hunterBall = new HunterBall(960, 960, 64, 64, "255,255,255", hunterBallRadius[0]);

    figure.onselectstart = () => false;
    caption.onselectstart = () => false;
    loop();

    function randomRange(min, max) {return Math.round(Math.random() * (max - min)) + min}

    function randomRGB() {return `${randomRange(155, 255)},${randomRange(205, 255)},${randomRange(205, 255)}`}
    
    function ballRadiuses(arr) {
        const result = [];
        arr.forEach(elem => result.push(elem.radius))
        result.sort();
        return result
    }

    function loop() {
        const idAnimation = requestAnimationFrame(loop);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // ctx.fillStyle = "rgba(32, 36, 40, 0.5)";
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        caption.textContent = (ballsCount === 0) ? winString : ballsCount;
        if(caption.textContent === winString) {
            caption.classList.add("win");
            setTimeout( () => {
                ColorCanvas(gameSection);
                figure.remove()
            }, 3000);
            cancelAnimationFrame(idAnimation)
        }
        for (const ball of balls) {
            if (ball.exist) {
                ball.draw();
                ball.update();
                ball.collisionDetect()
            }
        }
        hunterBall.draw();
        hunterBall.update();
        hunterBall.collisionDetect();
    }
}