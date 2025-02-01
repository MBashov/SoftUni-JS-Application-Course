import { getShowById, updateShow } from "../data/crud.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";


const template = (show, onEdit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Show</h2>
            <form @submit=${onEdit} class="edit-form">
                <input type="text" name="title" id="title" placeholder="TV Show title" .value=${show.title} />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${show.imageUrl} />
                <input type="text" name="genre" id="genre" placeholder="Genre" .value=${show.genre} />
                <input type="text" name="country" id="country" placeholder="Country" .value=${show.country} />
                <textarea id="details" name="details" placeholder="Details" rows="2" cols="10" .value=${show.details} ></textarea>
                <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>`;


export async function editView (ctx) {
    const id = ctx.params.id;
    const show = await getShowById(id)
    render(template(show, createSubmitHandler(onEdit)));

    async function onEdit({ title, 'image-url': imageUrl, genre, country, details }) {
        if (!title || !imageUrl || !genre || !country || !details) {
            return alert('All fields are required!');
        }
    
        await updateShow(id, { title, 'image-url': imageUrl, genre, country, details });
        page.redirect(/catalog/ + id)
    }
}

