import { getAllSolutions } from "../data/crud.js";
import { html, render } from "../lib.js";
import { solutionTemplate } from "./partial/solution.js";

const solutionsTemplate = (solutions) => html`
       <h2>Solutions</h2>
        <section id="solutions">
      
        ${solutions.length ? solutions.map(solutionTemplate) : html`<h2 id="no-solution">No Solutions Added.</h2>`}

        </section>`;
       

export async function solutionsView () {

    const solutions = await getAllSolutions();
    
    render(solutionsTemplate(solutions));
}        