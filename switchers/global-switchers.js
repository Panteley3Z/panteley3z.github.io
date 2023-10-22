import { DICTIONARY } from "../lang/dictionary.js";

const docHTML = document.documentElement;

class BaseMode {
    
    //type = "typeMode";
    //states = ["s1", "s2"];
    constructor(defaultSate) {
        this.defaultSate = defaultSate
    }

    init() { !this.getMode() ? this.setMode(this.defaultSate) : this.setMode(this.getMode()) }

    getMode() {
        const data = this.getData();
        if (data) { return data[this.type] }
        else {
            let siteModes = {[this.type]: ""}
            this.pushData(siteModes);
            this.getMode()
        }
    }
    setMode(m) {
        const data = this.getData();
        if ( m !== data[this.type] ) { data[this.type] = m; this.pushData(data) }
    }
    switchMode() {
        const state = this.getMode();
        switch (state) {
            case this.states[0] : {this.setMode(this.states[1]); break;}
            case this.states[1] : {this.setMode(this.states[0]); break;}
            default : this.setMode(this.defaultSate)
        }
    }

    getData = () => JSON.parse(sessionStorage.getItem("siteModes"));
    pushData = (d) => sessionStorage.setItem("siteModes", JSON.stringify(d))
}

class ThemeMode extends BaseMode {
    
    type = "themeMode";
    states = ["dark", "light"];

    constructor(defaultSate) {
        super(defaultSate = "light")
    }

    //@Override
    setMode(m) {
        super.setMode(m);
        document.body.className = `body-${m}`;
    }
    getIcon() {return `${this.getMode()}_mode`}
}

class LangMode extends BaseMode {
    
    type = "langMode";
    states = ["en", "ru"];

    constructor(defaultSate) {
        super(defaultSate = navigator.language.slice(0,2))
    }
    
    //@Override
    setMode(m) {
        super.setMode(m);
        document.documentElement.setAttribute("lang", m);
        this.setLabels(document)
    }
    setLabels(n) {
        const labels = n.querySelectorAll(".label");
        labels.forEach(l => { this.setCurrentLabel(l) })
    }
    setCurrentLabel(e) {
        for (let band in DICTIONARY) {
            if (e.dataset.desc && (DICTIONARY[band].desc === e.dataset.desc)) {
                let temp = DICTIONARY[band];
                if (docHTML.getAttribute("lang") === "ru") {e.innerHTML = temp.RU}
                else {e.innerHTML = temp.EN}
            }
        }
    }
}

export const themeMode = new ThemeMode();
export const langMode = new LangMode();