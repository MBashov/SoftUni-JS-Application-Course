function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');
    fetch(url)
        .then(res => res.json())
        .then(data => solve(data));

    function solve(data) {
        Object.values(data)
            .forEach(profile => {
                const divProfile = createElement('div', '', ['class', 'profile']);

                const img = createElement('img', '', ['src', './iconProfile2.png', 'class', 'userIcon']);
                divProfile.appendChild(img);

                const labelOne = createElement('label', 'Lock');
                divProfile.appendChild(labelOne);

                const inputLock = createElement('input', '', ['type', 'radio', 'name', 'user1Locked', 'value', 'lock', 'checked', 'true']);
                divProfile.appendChild(inputLock);
                                                    
                const labelTwo = createElement('label', 'Unlock');
                divProfile.appendChild(labelTwo);

                const inputUnlock = createElement('input', '', ['type', 'radio', 'name', 'user1Locked', 'value', 'unlock']);
                divProfile.appendChild(inputUnlock);

                const breakTag = createElement('br');
                divProfile.appendChild(breakTag);

                const lineHr = createElement('hr');
                divProfile.appendChild(lineHr);

                const labelThree = createElement('label', 'Username');
                divProfile.appendChild(labelThree);

                const inputUserName = createElement('input', '', ['name', 'user1Username', 'value', profile.username, 'disabled', 'true', 'readonly', 'true']);
                divProfile.appendChild(inputUserName);

                const divHide = createElement('div', '', ['class', 'user1Username']);
                divHide.style.display = 'none';
                const horizontaLine = createElement('hr');
                divHide.appendChild(horizontaLine);

                const labelEmail = createElement('label', 'Email:');
                divHide.appendChild(labelEmail);

                const inputEmail = createElement('input', '', ['type', 'email', 'name', 'user1Email', 'value', profile.email, 'disabled', 'true', 'readonly', 'true']);
                divHide.appendChild(inputEmail);

                const labelAge = createElement('label', 'Age:');
                divHide.appendChild(labelAge);

                const inputAge = createElement('input', '', ['type', 'number', 'name', 'user1Age', 'value', profile.age, 'disabled', 'true', 'readonly', 'true']);
                divHide.appendChild(inputAge);

                divProfile.appendChild(divHide);

                const button = createElement('button', 'Show more');
                divProfile.appendChild(button);
                button.addEventListener('click', toggle);

                main.appendChild(divProfile);
            });

    }

    function createElement(type, content, atributes = []) {
        const element = document.createElement(type);
        if (content) {
            element.textContent = content
        };
        for (let i = 0; i < atributes.length; i += 2) {
            element.setAttribute(atributes[i], atributes[i + 1]);
        }
        return element;
    }

    function toggle(e) {
        const profile = e.target.parentElement;
        let isActive = profile.querySelector('input[value="unlock"]').checked;
        
        if (isActive) {
            const hidenDiv = profile.querySelector('div');

            if (e.target.textContent === 'Show more') {
                e.target.textContent = 'Hide it';
                hidenDiv.style.display = 'block';
            } else {
                e.target.textContent = 'Show more';
                hidenDiv.style.display = 'none';
            }
            
        }
    
    }
}