import { deleteDrone, getDroneById } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";


const template = (drone, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <div>
            <img id="details-img" src=${drone.imageUrl} alt="example1" />
            <p id="details-model">${drone.model} </p>
        </div>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="details-price">Price: ${drone.price} </p>
                <p class="details-condition">Condition: ${drone.condition} </p>
                <p class="details-weight">Weight: ${drone.weight} </p>
                <p class="drone-description">
                ${drone.description} 
                </p>
                <p class="phone-number">Phone: ${drone.phone} </p>
            </div>
            ${isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>
            ` : null}
        </div>
    </div>
</section>`;

let id = null
export async function detailsView(ctx) {
    id = ctx.params.id;

    const drone = await getDroneById(id);
    const userData = getUserData();
    const isOwner = userData?._id === drone._ownerId;
    
    render(template(drone, isOwner, onDelete));
}


async function onDelete () {
    const choise = confirm('Are you sure you want to delete this drone?');

    if (!choise) {
        return
    } else {
        await deleteDrone(id);
        page.redirect('/catalog');
    }
}