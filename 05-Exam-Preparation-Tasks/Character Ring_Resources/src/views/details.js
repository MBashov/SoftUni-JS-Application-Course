import { deleteCharacter, getCharacterById } from "../data/crud.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <div>
            <p id="details-category">${data.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${data.description}</p>
                    <p id ="more-info">${data.moreInfo}</p>
            </div>
        </div>
        <h3>Is This Useful:<span id="likes">0</span></h3>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                ${isOwner ? html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                ` : null}        

                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="javascript:void(0)" id="like-btn">Like</a>

            </div>
        </div>
    </div>
</section>`;


export async function detailsView(ctx) {
    const id = ctx.params.id;
    const data = await getCharacterById(id);
    
    const userData = getUserData();

    const isOwner = userData?._id == data._ownerId;
    render(detailsTemplate(data, isOwner, onDelete));

    async function onDelete () {
        const choise = confirm ('Are you sure?');
        
        if (!choise) return;

        await deleteCharacter(id);

        page.redirect('/catalog');
    }
}
