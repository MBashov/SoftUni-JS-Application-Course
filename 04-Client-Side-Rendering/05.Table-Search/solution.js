import { render, html } from "./node_modules/lit-html/lit-html.js";

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const rootEl = document.querySelector('tbody')
   const res = await fetch(url);
   const data = await res.json();

   const td = Object.values(data).map(p => renderTable(p))
   render(td, rootEl);
    
}
solve()

function onClick(e) {
   e.preventDefault();
  
   const inputEl = document.getElementById('searchField');
   const text = inputEl.value.toLowerCase();

   if(!text) return;

   const rows = [...document.querySelectorAll('tbody tr')];
  
   for (const row of rows) {
      for (const td of row.children) {
         if (td.textContent.toLowerCase().includes(text)) {
            row.classList.add('select');
            // row.className = 'select'; // и така може
            break;
         } else {
            row.classList.remove('select');
            // row.className = '';      // и така може
         }
         
      }
   }
   inputEl.value = '';
}

function renderTable(data) {
   return html `
      <tr>
          <td>${data.firstName}${data.lastName}</td>
          <td>${data.email}</td>
          <td>${data.course}</td>
      </tr>
      `
}

