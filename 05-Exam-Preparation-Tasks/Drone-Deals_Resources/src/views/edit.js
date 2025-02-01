import { getDroneById, updateDrone } from "../data/crud.js";
import { errorMsg } from "../data/notification.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const template = (onEdit, drone) => html`
<section id="edit">
    <div class="form form-item">
        <h2>Edit Offer</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" .value= ${drone.model} />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value= ${drone.imageUrl} />
            <input type="number" name="price" id="price" placeholder="Price" .value= ${drone.price} />
            <input type="number" name="weight" id="weight" placeholder="Weight" .value= ${drone.weight} />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value= ${drone.phone} />
            <input type="text" name="condition" id="condition" placeholder="Condition" .value= ${drone.condition} />
            <textarea name="description" id="description" placeholder="Description" .value= ${drone.description} ></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;


export async function editView(ctx) {

    const id = ctx.params.id;
    const drone = await getDroneById(id);
    
    render(template(createSubmitHandler(onEdit), drone));

    async function onEdit({ model, imageUrl, price, weight, phone, condition, description }) {
   
        if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
            // return alert('All fields are required!');
            errorMsg('All fields are required!');
            return;
        }
    
        await updateDrone(id, { model, imageUrl, price, weight, phone, condition, description });
        page.redirect('/catalog/' + id);
    }
}




