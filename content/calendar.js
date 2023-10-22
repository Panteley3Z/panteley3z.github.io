import { DICTIONARY } from "../lang/dictionary.js";

export function Calendar() {
    console.log("Calendar opened")
    const calendar = document.createElement('table');
    calendar.id = "calendar";
    calendar.className = "calendar-table";
    calendar.dataset.contentType = DICTIONARY.calendar.desc;

    const header = document.createElement('thead');
    const body = document.createElement('tbody');
    header.className = "calendar-header";
    body.className = "calendar-body";
    calendar.append(header, body);

    const SEVEN = 7;

    const calendar_wds = [
        DICTIONARY.cMon.desc,
        DICTIONARY.cTue.desc,
        DICTIONARY.cWed.desc,
        DICTIONARY.cThu.desc,
        DICTIONARY.cFri.desc,
        DICTIONARY.cSat.desc,
        DICTIONARY.cSun.desc
    ];
    const PMD_CN = "prev-month-days";
    const NMD_CN = "next-month-days";

    const formatOptions = { year: 'numeric', month: 'long' };

    const headerTitleRow = document.createElement('tr');
    const monthTitle = document.createElement('th');
    monthTitle.colSpan = 5;
    monthTitle.className = "month-title";
    const prevM = document.createElement('td');
    const nextM = document.createElement('td');
    prevM.className = "prev-month";
    nextM.className = "next-month";
    prevM.innerText = "<";
    nextM.innerText = ">";
    
    headerTitleRow.append(monthTitle, prevM, nextM);

    const headerRow = document.createElement('tr');
    for (let i = 0; i < SEVEN; i++) {
        let th = document.createElement('th');
        th.className = "label";
        th.dataset.desc = calendar_wds[i];
        headerRow.appendChild(th)
    }
    header.append(headerTitleRow, headerRow);

    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth();
    let today = nowDate.getDate();

    let currentMonth = new Date(year, month);
    let selectedD = 0;

    fillMonthBody(currentMonth);

    calendar.addEventListener("click", (e) => {
        if(changeState(e)) {
            body.innerHTML = "";
            currentMonth = new Date(year, month);
            fillMonthBody(currentMonth)
        }
    })

    return calendar

    function changeState(ev) {
        const t = ev.target;
        if (t.className === NMD_CN || t.className === PMD_CN) { selectedD = parseInt(t.innerText) }
        if (t === nextM || t.className === NMD_CN) { month += 1; return true }
        if (t === prevM || t.className === PMD_CN) { month -= 1; return true }
        return false
    }

    function fillMonthBody(date) {

        let firstDateOfMonth = date;
        let lastDateOfMonth = new Date(year, month + 1, 0);
        let dayOfWeek = firstDateOfMonth.getDay();
        let days = lastDateOfMonth.getDate();

        let lastDateOfPrevMonth = new Date(year, month, 0);
        let daysInPrevMonth = lastDateOfPrevMonth.getDate();

        if (dayOfWeek === 0) { dayOfWeek = SEVEN }
        let firstDayShift = dayOfWeek - firstDateOfMonth.getDate();
        let dayCount = 1;

        let monthInfo = `${date.toLocaleDateString(document.documentElement.getAttribute("lang"), formatOptions)}`;
        monthTitle.innerText = monthInfo;

        setTimeout( ()=> {
            const moduleHeader = document.querySelector(".calendar-modal .modal-header .label");
            if (moduleHeader) { moduleHeader.innerText = monthInfo }
        }, 0)

        while (dayCount <= days) {
            let weekRow = document.createElement('tr');
            let nmd = 1;
            for (let i = 0; i < SEVEN; i++) {
                let td = document.createElement('td');
                if (firstDayShift > 0) {
                    let dc = daysInPrevMonth - firstDayShift;
                    dc++;
                    td.className = PMD_CN;
                    td.innerText = dc;
                    firstDayShift--
                } else if (dayCount <= days) {
                    if (dayCount === selectedD) {
                        td.className = "selected";
                        setTimeout( () => td.classList.remove("selected"), 2000)
                    }
                    td.innerText = dayCount;
                    if (dayCount === today && month === nowDate.getMonth()) { td.className = "today" }
                    dayCount++
                } else {
                    td.className = NMD_CN;
                    td.innerText = nmd;
                    nmd++
                }
                weekRow.appendChild(td)
            }
            body.appendChild(weekRow)
        }
    }
}