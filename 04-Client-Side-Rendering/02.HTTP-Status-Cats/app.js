import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('allCats');

function renderCats(cats) {
    return (html`
    <ul>
    ${cats.map(cat => html` 
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${toggle} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                 </div>
            </div>
        </li> `)}
    </ul>
`);
}

function toggle(e) {
    const container = e.target.parentElement.querySelector('div');
    const isHiden = container.style.display === 'none';

    container.style.display = isHiden ? 'block' : 'none';

    e.target.textContent = isHiden ? 'Hide status code' : 'Show status code'; 
}

render(renderCats(cats), root);