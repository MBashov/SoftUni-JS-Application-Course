import { deleteItem, getItemByID } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
 <section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src=${item.imageUrl} alt="example1" />
              <p id="details-title">${item.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">${item.price}</p>
                <p class="details-availability">
                    ${item.availability}
                </p>
                <p class="type">${item.type}</p>
                <p id="item-description">
                    ${item.description}    
                </p>
              </div>
              <div id="action-buttons">
                ${isOwner ? html`
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                ` : null};
              </div>
            </div>
          </div>
        </section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();

    const item = await getItemByID(id);

    const isOwner = userData?._id == item._ownerId;

    render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
 
        const choice = confirm(`Are you sure you want to delete ${item.item}?`);

        if (!choice) return;

        await deleteItem(id);
        page.redirect('/catalog');
    }
}

