import { getAllTattoos } from "../data/crud.js";
import { html, render } from "../lib.js";
import { itemTemplate } from "./partial/item.js";

const template = (items) => html`
        <h2>Collection</h2>
        <section id="tattoos">
          
        ${items.length ? items.map(itemTemplate) : html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>`}

        </section>`;


export async function catalogView() {
    const items = await getAllTattoos();   
    render(template(items));
}


