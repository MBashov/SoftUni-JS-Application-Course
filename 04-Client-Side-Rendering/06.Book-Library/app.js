import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/collections/books/';
const root = document.getElementById('table')
const rootAdd = document.getElementById('add-book');

const renderTable = () => {
    return html`<button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           
        </tbody>   
    </table>`;
}
render(renderTable(), root);

const renderBooks = (book) => {

    return html`
        <tr id=${book[0]}>
            <td>${book[1].title}</td>
            <td>${book[1].author}</td>
            <td>
                <button @click=${editBook}>Edit</button>
                <button @click=${deleteBook}>Delete</button>
            </td>
        </tr>`
}
const renderAddBookForm = () => {
    return html`
        <form id="add-form">
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input @click=${addBook} type="submit" value="Submit">
        </form>`;
}
render(renderAddBookForm(), rootAdd);

const renderEditBookForm = (book, id) => {
    return html`
        <form id="edit-form">
            <input type="hidden" name="id" value=${id}>
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." value=${book.title}>
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." value=${book.author}>
            <input @click=${updateBook} type="submit" value="Save">
        </form>`    
}


async function loadBooks() {

    const res = await fetch(url);
    const books = await res.json();
    
    const td = Object.entries(books).map(book => renderBooks(book));
    const tbody = document.querySelector('tbody');
    render(td, tbody);
   
}

async function editBook(e) {  
    const id = e.target.parentElement.parentElement.id;
    const res = await fetch(url + id);
    const book = await res.json();
    render(renderEditBookForm(book, id), rootAdd)   
}

async function updateBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement);
    const title = formData.get('title');
    const author = formData.get('author');
    const id = formData.get('id');
    
    await fetch(url + id, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title, author})
    });
    
    e.target.parentElement.reset();
    loadBooks();   
    render(renderAddBookForm(), rootAdd);
}

async function addBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) return;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({ title, author })
    })
    e.target.parentElement.reset();
    loadBooks();
}

async function deleteBook(e) {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.id;

    await fetch(url + id, {method: "DELETE"});
    loadBooks();
}