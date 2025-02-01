import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createleView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";

updateNav();

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/catalog/:id', detailsView);
page('/edit/:id', editView);
page('/create', createleView);
page('/search', searchView);
page.start(); 

document.getElementById('logout-link').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/');
})