import { getTattooByID, updateTatto } from "../data/crud.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const template = (tattoData, onUpdate) => html`
<section id="edit">
        <div class="form">
          <h2>Edit tattoo</h2>
          <form @submit=${onUpdate} class="edit-form">
            <input type="text" name="type" id="type" placeholder="Tattoo Type" .value=${tattoData.type} />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${tattoData.imageUrl} />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10" .value=${tattoData.description} > </textarea>
            <select id="user-type" name="user-type" .value=${tattoData.userType} >
              <option value="" disabled selected>Select your role</option>
              <option value="Tattoo Artist">Tattoo Artist</option>
              <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
              <option value="First Time in Tattoo">
                First Time in Tattoo
              </option>
              <option value="Tattoo Collector">Tattoo Collector</option>
            </select>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>`;


export async function updatewView (ctx) {

    const id = ctx.params.id;

    const tattooData = await getTattooByID(id);
    
    render(template(tattooData, createSubmitHandler(onUpdate)));
    
    async function onUpdate({type, 'image-url': imageUrl, description, 'user-type': userType}) {
    
        if (!type || !imageUrl || !description ||!userType) {
            return alert('All fields are required!')
        }
        await updateTatto(id, {type, imageUrl, description, userType});
        page.redirect('/catalog/' + id);
    }
}




