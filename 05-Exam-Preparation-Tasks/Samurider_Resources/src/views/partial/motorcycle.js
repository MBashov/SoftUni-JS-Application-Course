import { html } from "../../lib.js";

export const motorcycleTemplate = (motorcycle) => html`
<div class="motorcycle">
    <img src=${motorcycle.imageUrl} alt="example1" />
    <h3 class="model">${motorcycle.model}</h3>
    <p class="year">${motorcycle.year}</p>
    <p class="mileage">${motorcycle.mileage}</p>
    <p class="contact">${motorcycle.contact}</p>
    <a class="details-btn" href="/catalog/${motorcycle._id}">More Info</a>
</div>`