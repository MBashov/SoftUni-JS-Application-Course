import { deleteSolution, getSolutionById } from "../data/crud.js";
import { getLikesForSolution, getLikesForUser, likeSolution } from "../data/likes.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, hasUser, hasLiked, onLike, likes, isOwner, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl}   alt="example1" />
          <div>
          <p id="details-type">${data.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">${data.description}</p>
                  <p id="more-info">${data.learnMore}</p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${likes}</span></h3>

              <!--Edit and Delete are only for creator-->
              ${hasUser ? html`
                <div id="action-buttons">
                  ${isOwner ? html`
                  <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                  <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                  ` : null}
                  
                  <!--Bonus - Only for logged-in users ( not authors )-->
                  ${hasLiked || isOwner ? null : html`
                  <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}
                </div>
                ` : null}
              </div>
            </div>
        </section>`;


export async function detailsView(ctx) {
    
    const id = ctx.params.id
    const data = await getSolutionById(id);

    const userData = getUserData();

    const isOwner = userData?._id == data._ownerId;

    const hasLiked = await getLikesForUser(id, userData?._id);
    
    const likes = await getLikesForSolution(id); 
    
    render(detailsTemplate(data, userData, hasLiked, onLike, likes, isOwner, onDelete));

    async function onLike() {
      await likeSolution(id);
      page.redirect('/solutions/' + id);
    }
    
    async function onDelete() {
        
        const choice = confirm(`Are you sure you want to delete ${data.type}?`);

        if (!choice) return;
        
        await deleteSolution(id);
        
        page.redirect('/solutions');
    }
}