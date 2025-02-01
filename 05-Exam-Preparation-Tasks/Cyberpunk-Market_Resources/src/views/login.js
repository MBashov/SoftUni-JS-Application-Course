import { login } from "../data/user.js";
import { html, page, render, renderBase } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";

const loginTemplate = (onLogin) => html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input type="password" name="password" id="password" placeholder="password" />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
        </div>
    </section>`;

export function loginView() {
    render(loginTemplate(createSubmitHandler(OnLogin)));
}

async function OnLogin({ email, password }) {
    if (!email || !password) {
        // return alert('All fields are reqired!');
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

    await login(email, password);
    updateNav();
    page.redirect('/');
}