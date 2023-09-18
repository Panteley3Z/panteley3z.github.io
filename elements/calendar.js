export function Calendar(toNode) {

    const box = document.createElement('div');
    box.className = "box-item";

    const calendar = document.createElement('table');
    calendar.className = "calendar-table";

    const header = document.createElement('thead');
    const body = document.createElement('tbody');
    header.id = "calendar-header";
    header.className = "calendar-header";
    body.className = "calendar-body";

    const SEVEN = 7;
    
    const formatOptions = { year: 'numeric', month: 'long' };

    const prevM = document.createElement('td');
    const nextM = document.createElement('td');
    prevM.className = "prev-month";
    prevM.innerText = "<"
    nextM.className = "next-month";
    nextM.innerText = ">"
  
    const headerTitleRow = document.createElement('tr');
    const monthTitle = document.createElement('th');
    monthTitle.colSpan = 5;
    monthTitle.className = "month-title";
    headerTitleRow.append(prevM, monthTitle, nextM);

    const headerRow = document.createElement('tr');
    headerRow.className = "label";
    for (let i = 0; i < SEVEN; i++) {
        let th = document.createElement('th');
        headerRow.appendChild(th)
    }
    header.append(headerTitleRow, headerRow);
    calendar.append(header, body);

    box.appendChild(calendar);
    toNode.appendChild(box);

    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth();
    let today = nowDate.getDate();

    let currentMonth = new Date(year, month);

    fillMonthBody(currentMonth);

    header.addEventListener("click", (e) => {
        changeState(e);
        body.innerHTML = "";
        fillMonthBody(currentMonth)
    })

    function changeState(e) {
        switch (e.target) {
            case nextM: month += 1; break;
            case prevM: month -= 1; break;
        }
        currentMonth = new Date(year, month)
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

        while (dayCount <= days) {
            let weekRow = document.createElement('tr');
            let nmd = 1;
            for (let i = 0; i < SEVEN; i++) {
                let td = document.createElement('td');
                if (firstDayShift > 0) {
                    let dc = daysInPrevMonth - firstDayShift;
                    dc++;
                    td.className = "prev_month_days";
                    td.innerText = dc;
                    firstDayShift--;
                } else if (dayCount <= days) {
                    td.innerText = dayCount;
                    if (dayCount === today && month === nowDate.getMonth()) {
                        td.className = "today";
                        td.style.fontWeight = "bold"
                    }
                    dayCount++;
                } else {
                    td.className = "next_month_days";
                    td.innerText = nmd;
                    nmd++
                }
                weekRow.appendChild(td);
            }
            body.appendChild(weekRow);
        }
    }
}