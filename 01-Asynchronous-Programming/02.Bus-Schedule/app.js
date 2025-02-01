function solve() {
    const infoEl = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }
    
    async function depart() {
        // get info for next stop
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const result = await fetch(url);
        
        stop = await result.json();
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        
        // display next stop
        infoEl.textContent = `Next stop ${stop.name}`;
    }
    
    function arrive() {
        infoEl.textContent = `Arriving at ${stop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();