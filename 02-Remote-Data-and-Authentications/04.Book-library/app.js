function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const tableEl = document.getElementsByTagName('tbody')[0];

    const labelEl = document.querySelector('form label')
    const titleEL = document.querySelector('input[name="title"]');
    const authorEl = document.querySelector('input[name="author"]');
    const submitBtn = document.querySelector('form button');
    submitBtn.addEventListener('submit', updateBookColections);
    console.log(submitBtn);
    

    document.getElementById('loadBooks').addEventListener('click', async () => {
        tableEl.innerHTML = '';

        const res = await fetch(baseUrl);
        const data = await res.json();

        Object.entries(data).forEach(entry => {
            const id = entry[0];

            const { author, title } = entry[1];

            const tr = document.createElement('tr');
            tr.setAttribute('id', id);
            const titleCell = tr.insertCell(0);
            titleCell.textContent = title;

            const authorCell = tr.insertCell(1);
            authorCell.textContent = author;

            const editBtn = tr.insertCell(2);
            editBtn.textContent = 'Edit';
            tr.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            tr.appendChild(deleteBtn);

            tableEl.appendChild(tr);

            editBtn.addEventListener('click', editBook);
            deleteBtn.addEventListener('click', deleteBook);
        });

    });

    function editBook(e) {
        labelEl.textContent = 'Edit FORM';
        submitBtn.textContent = 'Save';

        // const saveBtn = document.querySelector('click', updateBookColections);
        // saveBtn.addEventListener('click', updateBookColections)

    }

    function updateBookColections(e) {
        e.preventDefault(); 

        const id = e.target.parentNode.id;

        if (!authorEl.value || !tableEl.value) return;
        fetch(`${baseUrl}/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'apliation/json'
            },
            body: JSON.stringify({
                'author': authorEl.value,
                'title': titleEL.value
            })
        });

    }

    function deleteBook(e) {
        const id = e.target.parentNode.id;
        e.target.parentNode.remove();

        fetch(`${baseUrl}/${id}`, { method: "DELETE", })
    }
}
solve()