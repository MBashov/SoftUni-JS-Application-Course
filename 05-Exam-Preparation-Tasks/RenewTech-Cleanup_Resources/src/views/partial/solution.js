import { html } from "../../lib.js";

export const solutionTemplate = (data) => html`
      <div class="solution">
            <img src=${data.imageUrl} alt="example1" />
            <div class="solution-info">
              <h3 class="type">${data.type}</h3>
              <p class="description">${data.description}</p>
              <a class="details-btn" href="/solutions/${data._id}">Learn More</a>
            </div>
          </div>`