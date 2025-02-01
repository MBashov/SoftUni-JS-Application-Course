const logoutURL = 'http://localhost:3030/users/logout';
const catchesURL = 'http://localhost:3030/data/catches';

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', logout);

document.querySelector('button.load').addEventListener('click', loadllCatches);
document.querySelector('button.add').addEventListener('click', createCatch);

let userData = JSON.parse(sessionStorage.getItem('userData'));

const user = document.getElementById('user');
const guest = document.getElementById('guest');
updateNav();

async function logout() {

    await fetch(logoutURL, {
        method: 'GET',
        headers: {
            'X-Authorization': userData.accessToken,
        }
    });

    sessionStorage.clear();
    window.location = 'index.html';

    userData = null;
    updateNav();
}

function updateNav() {
    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
        document.querySelector('button.add').disabled = false;
        document.querySelector('p.email span').textContent = userData.email;
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
        document.querySelector('button.add').disabled = true;
    }
}

function loadllCatches() {
    fetch(catchesURL)
        .then(response => response.json())
        .then(data => {
            const divCatches = document.getElementById('catches');
            divCatches.replaceChildren();

            data.forEach(el => {
                let isNotOwner = true;
                
                if (userData) {
                    isNotOwner = el._ownerId !== userData._id;
                } 

                const divCatch = createElement('div', '', ['class', 'catch']);

                const lAngler = createElement('label', 'Angler');
                const iAngler = createElement('input', '', ['type', 'text', 'class', 'angler', 'value', el.angler]);

                const lWeight = createElement('label', 'Weight');
                const iWeight = createElement('input', '', ['type', 'text', 'class', 'weight', 'value', el.weight]);

                const lSpecies = createElement('label', 'Species');
                const iSpecies = createElement('input', '', ['type', 'text', 'class', 'species', 'value', el.species]);

                const lLocation = createElement('label', 'Location');
                const iLocation = createElement('input', '', ['type', 'text', 'class', 'location', 'value', el.location]);

                const lBait = createElement('label', 'Bait');
                const iBait = createElement('input', '', ['type', 'text', 'class', 'bait', 'value', el.bait]);

                const lCapTime = createElement('label', 'Capture Time');
                const iCapTime = createElement('input', '', ['type', 'number', 'class', 'captureTime', 'value', el.captureTime]);

                const updateBtn = createElement('button', 'Update', ['class', 'update', 'data-id', el._id]);
                updateBtn.disabled = isNotOwner;
                updateBtn.addEventListener('click', updateCatch);

                const deleteBtn = createElement('button', 'Delete', ['class', 'delete', 'data-id', el._id]);
                deleteBtn.disabled = isNotOwner;
                deleteBtn.addEventListener('click', deleteCatch);

                divCatch.append(lAngler, iAngler, lWeight, iWeight, lSpecies, iSpecies, lLocation, iLocation, lBait, iBait, lCapTime, iCapTime, updateBtn, deleteBtn);

                divCatches.appendChild(divCatch);
            });

            divCatches.style.display = 'block';
        })
        .catch(err => alert(err.message));
}

function createCatch(e) {
    e.preventDefault();

    const formEl = e.target.parentNode.parentNode;
    const formData = new FormData(formEl);
    const { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData);

    if (!angler || !bait || !captureTime || !location || !species || !weight) {
        return alert('All fields must be completed!');
    }

    fetch(catchesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'Aplication/json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify({
            angler, weight, species, location, bait, captureTime
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

        })
        .catch(err => alert(err.message));

    formEl.reset();
}

function updateCatch(e) {
    const id = e.target.getAttribute('data-id');

    const inputs = Array.from(e.target.parentNode.querySelectorAll('input'));
    const [angler, weight, species, location, bait, captureTime] = inputs;

    if (!angler.value || !bait.value || !captureTime.value || !location.value || !species.value || !weight.value) {
        return alert('All fields must be completed!');
    }

    fetch(`${catchesURL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Aplication/json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify({
            angler: angler.value, weight: weight.value, species: species.value, location: location.value, bait: bait.value, captureTime: captureTime.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

        })
        .catch(err => alert(err.message));

}

function deleteCatch(e) {
    const id = e.target.getAttribute('data-id');

    fetch(`${catchesURL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'Application/json',
            'X-Authorization': userData.accessToken
        }
    })
    loadllCatches();
}

function createElement(type, content, attributes = []) {
    const element = document.createElement(type);
    if (content) {
        element.textContent = content;
    }
    if (attributes.length > 0) {
        for (let i = 0; i < attributes.length; i += 2) {
            element.setAttribute(attributes[i], attributes[i + 1]);
        }
    }
    return element;
}