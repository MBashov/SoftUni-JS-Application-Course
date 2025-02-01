const url = 'http://localhost:3030/users/login';
document.querySelector('main form').addEventListener('submit', logIn);

document.querySelector('#logout').style.display = 'none';
document.querySelector('#home').disabled = true;
document.querySelector('#register').disabled = true;

async function logIn(e) {
    e.preventDefault(); 

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    const obj = { email, password };

    const response = await fetch (url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Aplication/json'
        },
        body: JSON.stringify(obj)
    });

    const data = await response.json();

    if (data.message === "Login or password don't match" || !email || !password) {
        e.target.reset();
        return document.querySelector('p.notification').textContent = 'Please try again!';
    }
    
    sessionStorage.setItem('userData', JSON.stringify(data));
    e.target.reset();

    window.location = 'index.html'; 
}

