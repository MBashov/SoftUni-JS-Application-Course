import { deleteTatto, getTattooByID } from "../data/crud.js";
import { getAllLikes, hasLiked, postLike } from "../data/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const template = (tattooData, hasUser, isOwner, totalLikes, onLike, hasLiked, onDelete) => html`
      <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${tattooData.imageUrl} alt="example1" />
        <div>
            <div id="info-wrapper">
              <p id="details-type">${tattooData.type}</p>
              <div id="details-description">
                <p id="user-type">${tattooData.userType}</p>
                <p id="description">
                  ${tattooData.description}
                </p>
              </div>
                <h3>Like tattoo:<span id="like">${totalLikes}</span></h3> 
              ${hasUser ? html`
                <div id="action-buttons">
                  ${isOwner ? html`
                  <a href="/update/${tattooData._id}" id="edit-btn">Edit</a>
                  <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
                : null}

                  ${isOwner || hasLiked ? null : html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}
                ` : null}
                </div>
            </div>
          </div>
        </div>
      </section>`;


let id = null;

export async function detailsView(ctx) {

  id = ctx.params.id;
  const userData = getUserData();

  const [tatto, totalLikes] = await Promise.all([
      getTattooByID(id),
      getAllLikes(id)
  ]);

  const isOwner = userData?._id == tatto._ownerId;

  const hasLike = await hasLiked(id, userData?._id);

  render(template(tatto, userData, isOwner, totalLikes, onLike, hasLike, onDelete));

}

async function onLike() {

  await postLike(id);
 
  page.redirect('/catalog/' + id);
}


function onDelete() {
  const choise = confirm('Are you sure you want to delete this?');

  if (!choise) return;

  deleteTatto(id);
  page.redirect('/catalog');
}


