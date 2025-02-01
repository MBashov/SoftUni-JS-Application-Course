async function getInfo() {
    
    const stopNameEl = document.getElementById('stopName');
    const ul = document.getElementById('buses');
    console.log(ul);
    
    const busID = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busID}`;

    try {
        ul.innerHTML = '';
        const result = await fetch(url);
        const data = await result.json();
    
        stopNameEl.textContent = data.name;
        Object.entries(data.buses).forEach(bus => {
            const li = document.createElement('li');
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            
            ul.appendChild(li);
        });
    } catch (error) {
        stopNameEl.textContent = 'Error';
    }
}