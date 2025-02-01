import { createDrone } from "../data/crud.js";
import { errorMsg } from "../data/notification.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const template = (onCreate) => html`
    <section id="create">
        <div class="form form-item">
          <h2>Add Drone Offer</h2>
          <form @submit=${onCreate} class="create-form">
                <input type="text" name="model" id="model" placeholder="Drone Model" />
                <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
                <input type="number" name="price" id="price" placeholder="Price" />
                <input type="number" name="weight" id="weight" placeholder="Weight" />
                <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
                <input type="text" name="condition" id="condition" placeholder="Condition" />
                <textarea name="description" id="description" placeholder="Description"></textarea>
                <button type="submit">Add</button>
          </form>

        </div>
    </section>`;


export function createView () {
    render(template(createSubmitHandler(onCreate))); 
}

async function onCreate({model, imageUrl, price, weight, phone, condition, description }) {
   
    if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
        // return alert('All fields are required!');
        errorMsg('All fields are required!');
        return;
    }

    await createDrone({ model, imageUrl, price, weight, phone, condition, description });
    page.redirect('/catalog');
        
}
