import { getAllItems } from "../data/crud.js";
import { html, render } from "../lib.js";
import { itemtemplate } from "./partial/item.js";

const catalogTemplate = (items) => html`
  <h3 class="heading">Market</h3>
        <section id="dashboard">
          
         ${items.length ? items.map(itemtemplate) : html`<h3 class="empty">No Items Yet</h3>`}
         
        </section>`


export async function catalogView() {
    const items = await getAllItems();
    render(catalogTemplate(items));
}


