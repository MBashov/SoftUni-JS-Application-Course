import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { clearUserData, updateNav } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { searchView } from "./views/partial/search.js";
import { registerView } from "./views/register.js";
import { updateView } from "./views/update.js";


updateNav();

page('/', homeView);
page('/catalog', catalogView);
page('/search', searchView);
page('/register', registerView);
page('/login', loginView);
page('/create', createView);
page('/catalog/:id', detailsView);
page('/update/:id', updateView);
page.start(); 

document.getElementById('logout-link').addEventListener('click', () => {
    logout();
    page.redirect('/');
    updateNav();
});