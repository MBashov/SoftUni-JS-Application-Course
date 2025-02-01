function attachEvents() {
    const inputEl = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');

    const locationsURL = 'http://localhost:3030/jsonstore/forecaster/locations';
    submitBtn.addEventListener('click', getForecast);

    const symbols = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂  
        'Degrees': '&#176' // °
    }

    async function getForecast() {
        const result = await fetch(locationsURL);
        const data = await result.json();

        try {
            data.forEach(obj => {

                if (obj.name === inputEl.value) {
                    
                    const currentURL = `http://localhost:3030/jsonstore/forecaster/today/${obj.code}`;
                    const threeDaysURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${obj.code}`;
                    fetch(currentURL)
                        .then(res => res.json())
                        .then(data => currentForecast(data));

                    fetch(threeDaysURL) 
                        .then(response => response.json())
                        .then(data2 => threeDaysForecast(data2));
                } 
            });
        } catch (error) {
            forecastDiv.style.display = 'block';
            document.querySelector('.label').textContent = 'Error';
        }
    }
    function currentForecast(data) {
        const divForecast = createElement('div', ['class', 'forecasts',], '');

        const values = Object.values(data);

        forecastDiv.style.display = 'block';

        const spanSymbol = createElement('span', ['class', 'condition symbol'], symbols[values[0].condition]);
        const span = createElement('span', ['class', 'condition'], '');
        const spanCity = createElement('span', ['class', 'forecast-data'], values[1]);
        const spanDegrees = createElement('span', ['class', 'forecast-data'], `${values[0].low}${symbols.Degrees}/${values[0].high}${symbols.Degrees}`);
        const spanWeather = createElement('span', ['class', 'forecast-data'], `${values[0].condition}`);

        span.appendChild(spanCity);
        span.appendChild(spanDegrees);
        span.appendChild(spanWeather);

        divForecast.appendChild(spanSymbol);
        divForecast.appendChild(span);

        document.getElementById('current').appendChild(divForecast);
    }

    function threeDaysForecast(data2) {

        const divForecastInfo = createElement('div', ['class', 'forecast-info'], '');

        const [forecasts, city] = Object.values(data2);

        forecasts.forEach(forecast => {
            const span = createElement('span', ['class', 'upcoming'], '');
            const spanSymbol = createElement('span', ['class', 'condition symbol'], symbols[forecast.condition]);
            const spanDegrees = createElement('span', ['class', 'forecast-data'], `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`);
            const spanWeather = createElement('span', ['class', 'forecast-data'], `${forecast.condition}`);

            span.appendChild(spanSymbol);
            span.appendChild(spanDegrees);
            span.appendChild(spanWeather);

            divForecastInfo.appendChild(span);

        });
        document.getElementById('upcoming').appendChild(divForecastInfo);
    }

    function createElement(type, atributes = [], innerHTML) {
        const element = document.createElement(type);

        if (atributes.length > 0) {
            for (let i = 0; i < atributes.length; i += 2) {
                element.setAttribute(atributes[i], atributes[i + 1]);
            }
        }
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }
        return element
    }
}

attachEvents();