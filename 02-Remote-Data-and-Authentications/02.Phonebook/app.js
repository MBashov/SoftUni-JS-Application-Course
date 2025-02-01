const url = 'http://localhost:3030/jsonstore/phonebook';

function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadPersons);
    document.getElementById('btnCreate').addEventListener('click', createPerson);

}

async function loadPersons() {
    const phonebookEl = document.getElementById('phonebook');
    phonebookEl.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.person}: ${person.phone}`;
        li.id = person._id;

        const deletebtn = document.createElement('button');
        deletebtn.textContent = 'Delete';
        deletebtn.addEventListener('click', deletePerson);

        li.appendChild(deletebtn);
        phonebookEl.appendChild(li);

    });
}

function deletePerson(e) {
    const id = e.target.parentNode.id;
    
    fetch(`${url}/${id}`, { method: 'Delete' });
    e.target.parentNode.remove();
}

function createPerson() {
    const personEl = document.getElementById('person');
    const phoneEl = document.getElementById('phone');

    if (personEl.value === '' || phoneEl.value === '') return;

    const person = {
        person: personEl.value,
        phone: phoneEl.value
    }

    fetch(url, {
        method: 'Post',
        body: JSON.stringify(person),
        headers: {
            'Content-Type': 'aplicaton/json'
        }
    });

    personEl.value = '';
    phoneEl.value = '';
}
attachEvents();