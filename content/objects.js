import { ID_ELEMENTS as ID_is } from "../lang/id-elements.js";
import { DICTIONARY as DICT } from "../lang/dictionary.js";
import { GOOGLE_ICONS_FF as icons } from "../icons/google-icons.js";
import { BubblesGame } from "./bubbles-game.js";
import { Calendar } from "./calendar.js";
import { digitalClock } from "./digital-clock.js";
import { ColorPicker } from "./color-picker.js";

const NAV_ELEMENTS = [
    {id: ID_is.NAV_PROJECTS, icon: icons.project, title: DICT.projects, href: "projects.html"},
    {id: ID_is.NAV_CONTACTS, icon: icons.contact, title: DICT.contacts, href: "index.html#main-form-section"},
    {id: ID_is.LANG_MODE_btn, icon: icons.language, title: DICT.language},
    {id: ID_is.COLOR_MODE_btn, icon: icons.dMode},
    {id: ID_is.NAV_MAIN, icon: icons.mainPage, title: DICT.mainPage, href: "index.html"}
];

const PROJECTS = [
    {id: ID_is.GAME_PR, project: BubblesGame, icon: icons.game, title: DICT.game, description: DICT.descriptionGame, button: true},
    {id: ID_is.CALENDAR_PR, project: Calendar, icon: icons.calendar, title: DICT.calendar, description: DICT.descriptionCalendar, button: true},
    {id: ID_is.CLOCK_PR, project: digitalClock, icon: icons.clock, title: DICT.clock, description: DICT.descriptionClock, button: true},
    {id: ID_is.COLOR_PICKER_PR, project: ColorPicker, icon: icons.colorPicker, title: DICT.colorPicker, description: DICT.descriptionColorPicker, button: true},
];

function getNavElements(t) {
    let elems = new Array();
    if (t === "main") { elems = NAV_ELEMENTS.slice(0, 4) }
    if (t === "proj") {
        elems.push(NAV_ELEMENTS[4]);
        elems.push(...NAV_ELEMENTS.slice(1, 4))
    }
    return elems
}

export const OBJECTS = {
    NAVS_MAIN: getNavElements("main"),
    NAVS_PROJ: getNavElements("proj"),
    PROJECTS: PROJECTS
}

export const SOURCES = {
    gmail: "mailto:panteley3dev@gmail.com?subject=Приглашение%20на%20собеседование&body=Добрый%20день!%20Меня%20зовут%20",
    gmailStr: "panteley3z",
    mailru: "mailto:p333nt@mail.ru?subject=Приглашение%20на%20собеседование&body=Добрый%20день!%20Меня%20зовут%20",
    mailruStr: "p333nt",
    phone: "tel:+79881870043",
    phoneStr: "+7(988)187-00-43",
    vk: "https://vk.com/panteley3z"
}