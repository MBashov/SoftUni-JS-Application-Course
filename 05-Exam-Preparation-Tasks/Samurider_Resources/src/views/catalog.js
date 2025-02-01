import { getAllMotorsycles } from "../data/crud.js";
import { html, render } from "../lib.js";
import { motorcycleTemplate } from "./partial/motorcycle.js";

const template = (data) => html`
     <h2>Available Motorcycles</h2>
      <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->

        ${data.length ? data.map(motorcycleTemplate) : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}

      </section>`;


export async function catalogView() {

    const motorcycles = await getAllMotorsycles();

    render(template(motorcycles));
}

