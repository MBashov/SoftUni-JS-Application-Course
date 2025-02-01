const url = 'http://localhost:3030/jsonstore/collections/students';
document.getElementById('submit').addEventListener('click', addStudent);

const firstNameEl = document.querySelector('input[name="firstName"]');
const lastNameEl = document.querySelector('input[name="lastName"]');
const facultyNumberEl = document.querySelector('input[name="facultyNumber"]');
const gradeEl = document.querySelector('input[name="grade"]');


async function getStudents() {
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(student => {
        const { firstName, lastName, facultyNumber, grade, _id } = student;

        const tableEl = document.querySelector('#results tbody');

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = Number(grade);

        tableEl.appendChild(tr);
    });
}

async function addStudent(e) {
    e.preventDefault();

    if (isNaN(gradeEl.value)) {
        alert('Grade must be a number!');
    }

    if (firstNameEl.value !== '' && lastNameEl.value !== '' && facultyNumberEl.value !== '' && gradeEl.value !== '') {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                firstName: firstNameEl.value,
                lastName: lastNameEl.value,
                facultyNumber: facultyNumberEl.value,
                grade: gradeEl.value
            })
        });
        const student = await response.json();

        const tableEl = document.querySelector('#results tbody');

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = student.firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = student.lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = student.facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = student.grade;

        tableEl.appendChild(tr);
    }

    firstNameEl.value = '';
    lastNameEl.value = '';
    facultyNumberEl.value = '';
    gradeEl.value = '';

}
getStudents();