import { html, renderBase } from "../lib.js";

export function errorMsg(msg) {
    const rootEl = document.getElementById('errorBox');

    renderBase(html`<span class="msg">${msg}</span>`, rootEl);
    rootEl.style.display = 'block';

    setTimeout(() => {
        rootEl.style.display = 'none';
    }, 3000);
}


