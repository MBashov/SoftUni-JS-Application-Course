const textArea = document.getElementById('messages');   
const url = 'http://localhost:3030/jsonstore/messenger';

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadMesages);
}

async function postMessage() {

    const nameEl = document.querySelector('input[name="author"]');
    const messageEl = document.querySelector('input[name="content"]');

    if (!nameEl.value || !messageEl.value) return;
   
    await request(url, { author: nameEl.value, content: messageEl.value });

    nameEl.value = '';
    messageEl.value = '';

}

async function loadMesages() {
    const res = await fetch(url);
    const data = await res.json();
    
    textArea.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');   
}

async function request (url, option) {
    if (option) {
        option = {
            method: 'Post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(option),
        }
    }
    const response = await fetch(url, option);
    return response.json();
}

attachEvents();