import { getSolutionById, updateSolution } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (data, onEdit) => html`
    <section id="edit">
          <div class="form">
            <img class="border" src="/images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type" .value=${data.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL" .value=${data.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description" .value=${data.description}
                rows="2"
                cols="10"
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info" .value=${data.learnMore}
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getSolutionById(id);

    render(editTemplate(data, createSubmitHandler(onEdit)));

    async function onEdit({ type, 'image-url': imageUrl, description, 'more-info': learnMore }) {

        if (!type || !imageUrl || !description || !learnMore) {
            return alert('All fields are required!');
        }

        await updateSolution(id, { type, imageUrl, description, learnMore });
        page.redirect('/solutions/' + id);

    }
}