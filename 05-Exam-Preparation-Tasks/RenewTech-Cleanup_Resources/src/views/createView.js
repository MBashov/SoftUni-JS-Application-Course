import { createSolution } from "../data/crud.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createViewTemplate = (onCreate) => html`
<section id="create">
          <div class="form">
            <img class="border" src="/images/border.png" alt="" />
            <h2>Add Solution</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Add Solution</button>
            </form>
          </div>
        </section>`;

export function createView() {
    render(createViewTemplate(createSubmitHandler(onCreate)));
}

async function onCreate({type, 'image-url': imageUrl, description, 'more-info': learnMore}) {

    if (!type || !imageUrl || !description || !learnMore) {
        return alert('All fields are required!');
    }
    
    await createSolution({type, imageUrl, description, learnMore});
    page.redirect('/solutions');
      
}

