import { getAllCharacters } from "../data/crud.js";
import { html, render } from "../lib.js";
import { charachterTemplate } from "./partials/charactar.js";

const catalogTemplate = (characters) => html`
<h2>Characters</h2>
        <section id="characters">
            
            ${ characters.length ? characters.map(charachterTemplate) : html `<h2>No added Heroes yet.</h2>` }
            
        </section>`;

export async function catalogView() {
    const characters = await getAllCharacters();

    render(catalogTemplate(characters));
}