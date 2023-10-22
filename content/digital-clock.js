class DigitalClock {

    DIGITS = [];
    digContName = "digit-container";
    time = this.getTimeString();

    constructor(dotsX = 4, dotsY = 7) {
        this.dotsX = dotsX;
        this.dotsY = dotsY;
        this.clockField = document.createElement('div');
        this.clockField.className = "clock-field";
        this.clockField.dataset.contentType = "no-header";
        this.createField();
        this.digitContainers = this.clockField.querySelectorAll(`.${this.digContName}`);
        this.digitsArray();
        this.setDigits();
        return this.getField()
    }

    getX() { return this.dotsX }
    getY() { return this.dotsY }
    getField() { setInterval(() => this.updateTime(), 500); return this.clockField }

    createField() {
        console.log("DigitalClock opened");
        for (let i = 0; i < 2; i++) {
            const clockUnit = document.createElement('div');
            clockUnit.className = "clock-unit";
            for (let j = 0; j < 2; j++) {
                const dc = document.createElement('div');
                dc.className = this.digContName;
                clockUnit.appendChild(dc)
            }
            this.clockField.appendChild(clockUnit);
            if (i === 1) continue;
            const clockSeparator = document.createElement("div");
            clockSeparator.className = "clock-separator";
            const table = document.createElement("table");
            clockSeparator.appendChild(table);
            for (let k = 0; k < 3; k++) {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                if (k === 0 || k === 2) { td.className = "sep-dot" }
                tr.appendChild(td);
                table.appendChild(tr)
            }
            this.clockField.appendChild(clockSeparator)
        }
    }

    createDigit(n) {
        const digit = document.createElement("table");
        let nameDigit = `digit-${n}`;
        digit.className = nameDigit;

        let cols = this.getX();
        let rows = this.getY();

        if (rows % 2 === 0) { rows -= 1 }
        const middleRow = (rows + 1) / 2;
        const colForOne = Math.round(cols / 2) + 1;
        const cellName = "digit-cell";

        for (let r = 1; r <= rows; r++) {
            const tr = document.createElement('tr');
            let topLine = r === 1;
            let middleLine = r === middleRow;
            let bottomLine = r === rows;
            let allHLines = topLine || middleLine || bottomLine;

            for (let c = 1; c <= cols; c++) {
                const td = document.createElement('td');
                let leftLine = c === 1;
                let rightLine = c === cols;
                const GLOW = "glow";

                if (leftLine || rightLine || allHLines) { td.className = cellName; }
                if (n === 0 && (topLine || leftLine || rightLine || bottomLine)) { td.classList.add(GLOW) }
                if (n === 1 && (c === colForOne || (topLine && c === colForOne - 1))) { td.classList.add(GLOW) }
                if (n === 2 && (allHLines || (rightLine && r < middleRow) || (leftLine && r > middleRow))) { td.classList.add(GLOW) }
                if (n === 3 && (allHLines || rightLine)) { td.classList.add(GLOW) }
                if (n === 4 && (middleLine || rightLine || (leftLine && r < middleRow))) { td.classList.add(GLOW) }
                if (n === 5 && (allHLines || (rightLine && r > middleRow) || (leftLine && r < middleRow))) { td.classList.add(GLOW) }
                if (n === 6 && (allHLines || leftLine || (rightLine && r > middleRow))) { td.classList.add(GLOW) }
                if (n === 7 && (topLine || rightLine)) { td.classList.add(GLOW) }
                if (n === 8 && td.className === cellName) { td.classList.add(GLOW) }
                if (n === 9 && (allHLines || rightLine || (leftLine && r < middleRow))) { td.classList.add(GLOW) }

                tr.appendChild(td)
            }
            digit.appendChild(tr)
        }
        return digit
    }

    digitsArray() { for (let i = 0; i < 10; i++) { this.DIGITS.push(this.createDigit(i)) } }

    getTimeString() {
        let date = new Date();
        //date.setHours(22,21)
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        let time = `${hours}${minutes}`;
        return time
    }
    setDigits() {
        for (let i = 0; i < 4; i++) {
            const requiredDigit = this.time.charAt(i);
            const issuedDigit = this.DIGITS[requiredDigit];
            const cloneDigit = issuedDigit.cloneNode(true);
            this.digitContainers[i].appendChild(cloneDigit)
        }
    }
    updateTime() {
        let currentTime = this.getTimeString();
        if (currentTime !== this.time) {
            for (let i = 0; i < 4; i++) {
                let p = this.time.charAt(i);
                let c = currentTime.charAt(i);
                if (c !== p) {
                    const d = this.DIGITS[c];
                    const cloneDigit = d.cloneNode(true);
                    this.digitContainers[i].firstElementChild.replaceWith(cloneDigit)
                }
            }
            this.time = currentTime
        }
    }
}

export function digitalClock(x, y) { return new DigitalClock(x, y) }