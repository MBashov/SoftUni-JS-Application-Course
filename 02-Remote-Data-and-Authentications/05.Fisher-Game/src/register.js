document.querySelector('#logout').style.display = 'none';
const formEl = document.querySelector('main form');
formEl.addEventListener('submit', register);

async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const url = 'http://localhost:3030/users/register';
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if (!email || !password || password !== repass) {
        return alert('Error!')
    }

    const obj = { email, password };
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(obj)
    });

    const data = await response.json();

    sessionStorage.setItem('userData', JSON.stringify(data));
    e.target.reset();

    window.location = 'index.html'; 
    
}
