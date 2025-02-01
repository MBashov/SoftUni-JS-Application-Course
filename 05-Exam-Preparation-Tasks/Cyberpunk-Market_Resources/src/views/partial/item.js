import { html } from "../../lib.js";

export const itemtemplate = (item) => html`
 <div class="item">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="model">${item.item}</h3>
            <div class="item-info">
              <p class="price">${item.price}</p>
              <p class="availability">
              ${item.availability}
              </p>
              <p class="type">${item.type}</p>
            </div>
            <a class="details-btn" href="/catalog/${item._id}">Uncover More</a>
          </div>`