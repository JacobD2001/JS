document.getElementById('getWeatherBtn').addEventListener('click', () => getWeather(document.getElementById('inputCity').value));
document.getElementById('savePlaceBtn').addEventListener('click', savePlace);
//function to get weather based on city name
function getWeather() {
    const apiKey = '7776b7cf6d82e39b67011a753fbc94a9';
    const city = document.getElementById('inputCity').value;
    console.log('getting weather for: ', city)
    if (city === '') {
        alert('Please give the city name');
        console.log('no city name given');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const minTemperature = data.main.temp_min;
            const maxTemperature = data.main.temp_max;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon; // Get the icon code


            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
        <p>Temperature: ${temperature} C</p>
        <p>Feels Like: ${feelsLike} C</p>
        <p>Min Temperature: ${minTemperature} C</p>
        <p>Max Temperature: ${maxTemperature} C</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon">
    `;
        })
        .catch(error => {
            console.error('error fetching data', error);
        });
}

//function to save places in local storage
function savePlace() {
    const city = document.getElementById('inputCity').value;
    if (city === '') {
        alert('Please give the city name');
        console.log('no city name given');
        return;
    }

    const places = getPlaces();
    if (places.length >= 10) {
        alert('You can only save up to 10 cities.');
        return;
    }

    places.push(city);
    localStorage.setItem('places', JSON.stringify(places));
    console.log('place saved', city);
}

//function to get places from local storage
function getPlaces() {
    const storedPlaces = localStorage.getItem('places');
    if (storedPlaces) {
        const parsedPlaces = JSON.parse(storedPlaces);
        if (Array.isArray(parsedPlaces)) {
            return parsedPlaces;
        }
    }
    return [];
}

// Get the weather for all stored cities when the app starts(FOR Now just get the places)
window.onload = () => {
    const places = getPlaces();
    displayPlaces(places);
   // places.forEach(city => getWeather(city));
    console.log('places loaded', places);
};

 // Function to display places in the HTML
 function displayPlaces(places) {
    const placesList = document.getElementById('placesList');

    // Clear existing content in the placesList div
    placesList.innerHTML = '';

    // Create and append HTML elements for each place
    places.forEach(city => {
        const placeElement = document.createElement('div');
        placeElement.textContent = city;
        placesList.appendChild(placeElement);
    });
}