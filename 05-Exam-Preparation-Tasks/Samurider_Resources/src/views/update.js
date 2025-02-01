import { getMotorcycleById, updateMotorsycle } from "../data/crud.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const template = (bike, onUpdate) => html`
     <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
          <h2>Edit Motorcycle</h2>
          <form @submit=${onUpdate} class="edit-form">
            <input type="text" name="model" id="model" placeholder="Model" .value=${bike.model} />
            <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" .value=${bike.imageUrl} />
            <input type="number" name="year" id="year" placeholder="Year" .value=${bike.year} />
            <input type="number" name="mileage" id="mileage" placeholder="mileage" .value=${bike.mileage} />
            <input type="number" name="contact" id="contact" placeholder="contact" .value=${bike.contact} />
            <textarea id="about" name="about" placeholder="about" rows="10" cols="50" .value=${bike.about} ></textarea>
            <button type="submit">Edit Motorcycle</button>
          </form>
        </div>
      </section>`;


export async function updateView(ctx) {

  const id = ctx.params.id;
  const bike = await getMotorcycleById(id);

  render(template(bike, createSubmitHandler(onUpdate)));
  
  async function onUpdate({ model, imageUrl, year, mileage, contact, about }) {

    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
      return alert('All fields are required!');
    }

    await updateMotorsycle(id, { model, imageUrl, year, mileage, contact, about });
    page.redirect('/catalog/' + id);
  }

}


