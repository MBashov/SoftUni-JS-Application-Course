import { searchMotorcycle } from "../../data/crud.js";
import { html, render } from "../../lib.js";
import { createSubmitHandler } from "../../util.js";

const template = (onSearch, matches) => html`
        <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form @submit=${onSearch} class="search-form">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <h4 id="result-heading">Results:</h4>
        ${renderResults(matches)}
        </section>
`;

export function searchView() {

    render(template(createSubmitHandler(onSearch)));
}

async function onSearch(data) {
    const query = data.search;

    if (!query) {
        return alert('Please type a text!');
    }

    const matches = await searchMotorcycle(query);

    render(template(createSubmitHandler(onSearch), matches));
}

function renderResults(results) {

    if (!results) {
        return null;

    } else if (results.length === 0) {
        return html`
        <div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
        </div>`;
    }

    return results.map(bike => html`
    <div class="search-result">
        <div class="motorcycle">
            <img src=${bike.imageUrl} alt="example1" />
            <h3 class="model">${bike.model}</h3>
            <a class="details-btn" href=/catalog/${bike._id}>More Info</a>
        </div>
    </div>`);
}