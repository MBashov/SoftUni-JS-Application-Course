import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const selectEl = document.getElementById('menu');
const inputEL = document.getElementById('itemText');
document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function getItems() {
    const res = await fetch(url);
    const data = await res.json();

    const option = Object.values(data).map(item => optionTemp(item));
    update(option);
}
getItems()

function optionTemp(item) {
    return html `
    <option value=${item._id}>${item.text}</option> 
    `
}

function update(data) {
    render(data, selectEl)
}

function addItem(e) {
    e.preventDefault()
    
    const text = inputEL.value;
    if(!text) return;

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",        
        },
        body: JSON.stringify({
            text: text
        })
    })
    
    inputEL.value = '';
    getItems();
}
addItem()