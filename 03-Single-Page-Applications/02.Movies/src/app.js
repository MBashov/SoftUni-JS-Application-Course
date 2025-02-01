import { page } from "./lib.js";
import { updateNav } from "./midlewares/updateNav.js";
import { homeView } from "./views/home.js";


page(updateNav);
page('/login', homeView);

page.start(); 