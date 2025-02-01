import { html, render } from "./node_modules/lit-html/lit-html.js";

const footerEl = document.getElementById('root');
const inputEl = document.getElementById('towns');
document.getElementById('btnLoadTowns').addEventListener('click', onSumbit);

function onSumbit(e) {
    e.preventDefault();
    const townsArr = inputEl.value.split(', ');

    render(createTemplate(townsArr), footerEl);
    inputEl.value = '';
}

function createTemplate(towns) {
    return html`
          <ul>
            ${towns.map(town => html`<li>${town}</li>`)};                           
         </ul>
    `
}