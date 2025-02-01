import { createShow } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";


const template = (onCreate) => html`
  <section id="create">
          <div class="form">
            <h2>Add Show</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="title" id="title" placeholder="TV Show title" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <input type="text" name="genre" id="genre" placeholder="Genre" />
                <input type="text" name="country" id="country" placeholder="Country" />
                <textarea id="details" name="details" placeholder="Details" rows="2" cols="10" ></textarea>
                <button type="submit">Add Show</button>
            </form>
          </div>
        </section>`;


export function createleView () {
    render(template(createSubmitHandler(onCreate)))
}

async function onCreate({ title, 'image-url': imageUrl, genre, country, details }) {

    if (!title || !imageUrl || !genre || !country || !details) {
        return alert('All fields are required!');
    }

    await createShow({ title, 'image-url': imageUrl, genre, country, details });
    page.redirect('/catalog')
}