import { deleteShow, getShowById } from "../data/crud.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";


const template = (show, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${show.imageUrl} alt="example1" />
            <div id="details-text">
              <p id="details-title">${show.title}</p>
              <div id="info-wrapper">
                <div id="description">
                  <p id="details-description">
                   ${show.details}
                  </p>
                </div>
              </div>

              ${isOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>
              ` : null};
            </div>
          </div>
        </section>`;


export async function detailsView (ctx) {
    const id = ctx.params.id;
    const show = await getShowById(id);

    const userData = getUserData();
    const isOwner = show._ownerId === userData?._id;
    
    render(template(show, isOwner, onDelete));

    async function onDelete () {
        const choise = confirm('Are you sure you want to delete this show?');
        if (!choise) return;

        await deleteShow(id);
        page.redirect('/catalog');
    }
}

