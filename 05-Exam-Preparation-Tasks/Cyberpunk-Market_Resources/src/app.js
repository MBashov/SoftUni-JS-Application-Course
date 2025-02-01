import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

updateNav();
// page(notification);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/catalog/:id', detailsView);
page('/edit/:id', editView);
page('/sell', createView);
page.start(); 

document.getElementById('logout').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/');
});



// const rootEl = document.getElementById('errorBox');
// const template = (message) => html`
//     <span class="msg">${message}</span>
// `;

// export const notification = (ctx, next) => {

//     ctx.showNotification = (message) => {
        
//         render(template(message), rootEl);
//         rootEl.style.display = 'block';

//         setTimeout(() => {
//             rootEl.style.display = 'none';
//         }, 3000);
    
//         next();
//     }
// }   