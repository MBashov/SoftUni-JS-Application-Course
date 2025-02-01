async function solution() {
    const main = document.getElementById('main');

    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(topic => {
        const divAccordion = htmlElementsCreation('div', '', ['class', 'accordion']);
        const divHead = htmlElementsCreation('div', '', ['class', 'head']);
        const span = htmlElementsCreation('span', topic.title);
        const button = htmlElementsCreation('button', 'More', ['class', 'button', 'id', topic._id]);
        const divExtra = htmlElementsCreation('div', '', ['class', 'extra']);
        const p = htmlElementsCreation('p');
        
        button.addEventListener('click', toggle);

        divExtra.appendChild(p);
        divHead.appendChild(span);
        divHead.appendChild(button);

        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);

        main.appendChild(divAccordion);
    }); 

    async function toggle(event) {
        
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${event.target.id}`;
        
        const accordion = event.target.parentNode.parentNode;
        const divExtra = accordion.querySelector('.extra');
        const p = accordion.querySelector('.extra p');
        
        const result = await fetch(url);
        const data = await result.json();
        
        p.textContent = data.content;

        const hiden = event.target.textContent === 'More';
        
        divExtra.style.display = hiden ? 'block' : 'none';
        event.target.textContent = hiden ? 'Less' : 'More';  
        
    }

    function htmlElementsCreation(type, content, attributes = []) {
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
}

window.addEventListener('load', solution);