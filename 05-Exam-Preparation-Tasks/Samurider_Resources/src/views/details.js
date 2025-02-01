import { deleteMotorcycle, getMotorcycleById } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const template = (bike, isOwner ,onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${bike.imageUrl} alt="example1" />
          <p id="details-title">${bike.model}</p>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="year">${bike.year}</p>
              <p class="mileage">${bike.mileage}</p>
              <p class="contact">${bike.contact}</p>
              <p id="motorcycle-description">${bike.about}</p>
            </div>
            ${isOwner ? html`
                <div id="action-buttons">
                    <a href="/update/${bike._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            ` : null}
            </div>
          </div>
        </div>
    </section>`;


export async function detailsView(ctx) {

  const id = ctx.params.id;
  const bike = await getMotorcycleById(id);
  
  const userData = getUserData();
  const isOwner = userData?._id == bike._ownerId;

  render(template(bike, isOwner, onDelete));

  async function onDelete() {

    const choise = confirm(`Are you sure you want to delete ${bike.model}?`);
    
    if (!choise) return;
    
    await deleteMotorcycle(id);

    page.redirect('/catalog');
  }
}
