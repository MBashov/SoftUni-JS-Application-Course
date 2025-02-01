import { register } from "../data/user.js";
import { html, page, render, renderBase } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";

const registerTemplate = (onRegister) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="register-form">
              <input type="text" name="email" id="register-email" placeholder="email" />
              <input type="password" name="password" id="register-password" placeholder="password" />
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`;

export function registerView() {
    render (registerTemplate(createSubmitHandler(OnRegister)));
}

async function OnRegister({email, password, 're-password': rePass}) {
    if (!email || !password) {
        // return alert('All fields are required!');
        const rootEl = document.getElementById('errorBox');
    
        renderBase(html`
            <span class="msg">All fields are reqired!</span>
        `, rootEl);
        rootEl.style.display = 'block';

        setTimeout(() => {
            rootEl.style.display = 'none';
        }, 3000);
        return;
    }
    if (password !== rePass) {
        // return alert('Passwords don\'t match!');
        const rootEl = document.getElementById('errorBox');
    
        renderBase(html`
            <span class="msg">Passwords don't match!</span>
        `, rootEl);
        rootEl.style.display = 'block';

        setTimeout(() => {
            rootEl.style.display = 'none';
        }, 3000);

        return;
    }

    await register(email, password);
    updateNav();
    page.redirect('/');
}   