import { getAllDrones } from "../data/crud.js";
import { html, render } from "../lib.js";

const template = (drones) => html`
      <h3 class="heading">Marketplace</h3>
      <section id="dashboard">
        
       ${drones.length ? drones.map(droneTemplate) : html`<h3 class="no-drones">No Drones Available</h3>`}
     
      `;


export async function catalogView() {

    const drones = await getAllDrones();
    
    render(template(drones));
}


const droneTemplate = (drone) => html`
    <div class="drone">
        <img src=${drone.imageUrl} alt="example1" />
        <h3 class="model">${drone.model}</h3>
        <div class="drone-info">
            <p class="price">Price: ${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}</p>
        </div>
        <a class="details-btn" href="/catalog/${drone._id}">Details</a>
        </div>
    </section>`