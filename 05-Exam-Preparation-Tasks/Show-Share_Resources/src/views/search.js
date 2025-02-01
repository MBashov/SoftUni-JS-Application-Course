import { searchshow } from "../data/crud.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";


const template = (onSearch, results) => html`
<section id="search">

<div class="form">
    <h2>Search</h2>
    <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
<div class="search-result">
    
    ${results?.map(showResults(results))}
   
</div>
</section>`;


export function searchView() {
    render(template(createSubmitHandler(onSearch)));
}

async function onSearch(search) {
    const query =  search.search;
    if(!query) {
        return alert('Please type a show title!');
    }
    const results = await searchshow(query);
    render(template(createSubmitHandler(onSearch), results));
}

const showTemplate = (show) => html`
<div class="show">
    <img src=${show.imageUrl} alt="example1" />
    <div class="show-info">
        <h3 class="title">${show.title}</h3>
        <p class="genre">Genre: ${show.genre}</p>
        <p class="country-of-origin">Country of Origin: ${show.country}</p>
        <a class="details-btn" href="/catalog/${show._id}">Details</a>
    </div>
</div>`;

async function showResults(results) {
    if (!results) {
        return null;
    } else if (results.length === 0) {
        return html`<p class="no-result">There is no TV show with this title</p>`;
    } else {
        return results.map(showTemplate)
    }

}