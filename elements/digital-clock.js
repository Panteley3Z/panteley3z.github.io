export function DigitalClock(toNode, dotsX = 4, dotsY = 7) {

    const clockSection = document.createElement("section");
    clockSection.className = "page_block clock_block";

    const clockDH_cN = "clock_dh";

    clockSection.insertAdjacentHTML("afterbegin",
        `<div id="clock_field">
            <div class="clock_unit">
                <div class="${clockDH_cN}"></div>
                <div class="${clockDH_cN}"></div>
            </div>
            <div class="clock_separator">
                <table>
                    <tr class="sep_dot"><td></td></tr>
                    <tr><td></td></tr>
                    <tr class="sep_dot"><td></td></tr>
                </table>
            </div>
            <div class="clock_unit">
                <div class="${clockDH_cN}"></div>
                <div class="${clockDH_cN}"></div>
            </div>
        </div>`
    );

    toNode.appendChild(clockSection);
    
    const clockDH = document.querySelectorAll(`.${clockDH_cN}`);

    const DIGITS = digitsArray();

    fillClockCells()
    setInterval(() => fillClockCells(), 1000)

    function createDigit(n) {
        const digit = document.createElement("table");
        let nameDigit = `dig d_${n}`;
        digit.className = nameDigit;

        let cols = dotsX;
        let rows = dotsY;

        if (rows % 2 === 0) { rows -= 1 }
        const middleRow = (rows + 1) / 2;
        const colForOne = Math.round(cols/2) + 1;
        const cellName = "digit_cell";

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
                
                if (leftLine || rightLine || allHLines) {td.className = cellName}
                if (n === 0 && (topLine || leftLine || rightLine || bottomLine)) {td.classList.add("glow")}
                if (n === 1 && (c === colForOne || (topLine && c === colForOne - 1))) {td.classList.add("glow")}
                if (n === 2 && (allHLines || (rightLine && r < middleRow) || (leftLine && r > middleRow))) {td.classList.add("glow")}
                if (n === 3 && (allHLines || rightLine)) {td.classList.add("glow")}
                if (n === 4 && (middleLine || rightLine || (leftLine && r < middleRow))) {td.classList.add("glow")}
                if (n === 5 && (allHLines || (rightLine && r > middleRow) || (leftLine && r < middleRow))) {td.classList.add("glow")}
                if (n === 6 && (allHLines || leftLine || (rightLine && r > middleRow))) {td.classList.add("glow")}
                if (n === 7 && (topLine || rightLine)) {td.classList.add("glow")}
                if (n === 8 && td.className === cellName) {td.classList.add("glow")}
                if (n === 9 && (allHLines || rightLine || (leftLine && r < middleRow) )) {td.classList.add("glow")}
    
                tr.appendChild(td)
            }
            digit.appendChild(tr)
        }
        return digit
    }

    function digitsArray() {
        let array = [];
        for (let i = 0; i < 10; i++) {array[i] = createDigit(i)}
        return array
    }

    function getTimeString() {
        let date = new Date();
        //date.setHours(23,49)
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) hours = `0${hours}`
        if (minutes < 10) minutes = `0${minutes}`
        let time = `${hours}${minutes}`;
        return time
    }

    // //FOR_TESTS
    //let hhhh = 0;
    //let mmmm = 0;
    //function getTimeString() {let str = `${hhhh}${mmmm}${hhhh}${mmmm}`; return str}
    //setInterval( () => {getTimeString(); hhhh++; mmmm++ }, 1000)
    // //FOR_TESTS

    function fillClockCells() {
        
        let time = getTimeString();

        for (let i = 0; i < 4; i++) {
            let requiredDigit = time.charAt(i);
            let issuedDigit = DIGITS[requiredDigit];
            let cloneDigit = issuedDigit.cloneNode(true);

            if (clockDH[i].className === clockDH_cN) {
                clockDH[i].classList.add("filled");
                clockDH[i].appendChild(cloneDigit);
            } else if (clockDH[i].firstElementChild.classList[1] != cloneDigit.classList[1]) {
                clockDH[i].firstElementChild.replaceWith(cloneDigit);
                console.log("replaced");
            }
        }
    }
}