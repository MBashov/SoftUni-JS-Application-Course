import { html, render } from "../lib.js";
import { getUserData } from "../util.js";

const template = (user) => html`
        <section id="home">
            <div id="home-wrapper">
            <p id="home-intro">
              Whether you're a seasoned artist, a collector of ink, or someone
              looking for inspiration for their first tattoo,
              <span>Tattoo Masters</span> is your community. Share your
              masterpieces, discover incredible designs, and connect with
              artists and aficionados from around the world.
            </p>
            ${user ? null : html`<a href="/register" id='join-us'>Join Us!</a>`}
            
            </div>
        </section>`;


export function homeView() {
  const user = getUserData();
  render(template(user));
}


