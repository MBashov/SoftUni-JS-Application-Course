import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { solutionsView } from "./views/solutions.js";

updateNav();
page('/', homeView);
page('/login', loginView);
page('/solutions', solutionsView);
page('/solutions/:id', detailsView);
page('/edit/:id', editView);
page('/register', registerView);
page('/create', createView);
page.start(); 

document.getElementById('logoutlink').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/');
})