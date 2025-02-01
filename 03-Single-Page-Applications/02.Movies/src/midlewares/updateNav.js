import { html, page, renderBase } from "../lib.js";
import { getUserData } from "../util.js";

const template = (userData) => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto">
                ${userData ? html`
                <li class="nav-item user">
                    <a class="nav-link" id="welcome-msg">Welcome,${userData.email}</a>
                    </li>
                    <li class="nav-item user">
                        <a class="nav-link" href="javascript:void(0)">Logout</a>
                        </li>
        ` : html`
        <li class="nav-item guest">
            <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item guest">
            <a class="nav-link" href="/register">Register</a>
        </li>
        `}
    </ul>
    </nav>`;

export function updateNav() {

    const userData = getUserData(); 
    renderBase(template(userData), document.getElementById('container'));
    
}