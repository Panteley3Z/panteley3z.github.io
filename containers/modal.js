export class Modal {
    constructor(elem, container) {
        this.elem = elem;
        this.container = container; 
    }
    showModal() {
        const mFade = document.createElement('div');
        mFade.className = "modal_fade";
        mFade.tabIndex = "-1";
        mFade.role = "dialog";
        const mBody = document.createElement('div');
        mBody.className = "modal";
        const mHeader = document.createElement('header');
        mHeader.className = "modal_header";
        mHeader.innerText = "Modal";
        mBody.appendChild(mHeader);
        const mContent = document.createElement('div');
        mContent.className = "modal_content";
        this.container.appendChild(mFade);
        mFade.appendChild(mBody);
        mBody.appendChild(mContent);
        mContent.appendChild(this.elem);
        this.topOffset(mBody);
        window.addEventListener('resize', () => this.topOffset(mBody));
        mFade.addEventListener('click', (e) => {
            if (e.target === mFade || e.target.type === "submit") {
                mFade.classList.add("transparent");
                setTimeout( () => mFade.remove(), 1000)
            }
        })
    }
    topOffset(el) {
        let offset = `${document.documentElement.clientHeight/2 - el.clientHeight/2}px`;
        el.style.marginTop = offset
    }
}