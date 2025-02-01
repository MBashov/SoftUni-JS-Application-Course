import { html, page, render } from "../lib.js";
import { updateNav } from "../midlewares/updateNav.js";

const template = () => html`
 <section id="home-page" class="view-section">
        <div
          class="jumbotron jumbotron-fluid text-light"
          style="background-color: #343a40"
        >
          <img
            src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
            class="img-fluid"
            alt="Responsive image"
            style="width: 150%; height: 200px"
          />
          <h1 class="display-4">Movies</h1>
          <p class="lead">
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel
            anytime.
          </p>
        </div>

        <h1 class="text-center">Movies</h1>

        <section id="add-movie-button" class="user">
          <a href="#" class="btn btn-warning">Add Movie</a>
        </section>

        <section id="movie">
          <div class="mt-3">
            <div class="row d-flex d-wrap">
              <ul id="movies-list" class="card-deck d-flex justify-content-center">
                <!-- list item example -->
                <li class="card mb-4">
                  <img class="card-img-top"  src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg" alt="Card image cap" width="400"/>
                  <div class="card-body">
                    <h4 class="card-title">Movie Title</h4>
                    <a href="#">
                    </a>
                  </div>
                  <div class="card-footer">
                  <button type="button" class="btn btn-info">Details</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>`;

export function homeView() {
    console.log('home');
    
    render(template());
}