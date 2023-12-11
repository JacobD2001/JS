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
    .then(response => {
        if (!response.ok) {
            alert('City not found');
            throw new Error(`City not found: ${city}`);
        }
        return response.json();
    })        .then(data => {
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
            <h2>${city}</h2>
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
    if (places.length >= 10 || places.includes(city)) {
        alert('You can only save up to 10 cities. Or you already saved this city.');
        return;
    }

    places.push(city);
    localStorage.setItem('places', JSON.stringify(places));
    console.log('place saved', city);
    window.location.reload(); //refresh page

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

// Get the weather for all stored cities when the app starts
window.onload = () => {
    const places = getPlaces();
    places.forEach(city => getWeatherForCity(city));
    console.log('places loaded', places);
}

//function to get weather based on city name(from local storage)
function getWeatherForCity(city) {

    const apiKey = '7776b7cf6d82e39b67011a753fbc94a9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('getting weather for: ', city)

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherForCity(city, data);
        })
        .catch(error => {
            console.error('error fetching data', error);
        });
}

//function to display weather for city
function displayWeatherForCity(city, data) {
    const weatherList = document.getElementById('weatherList');

    const weatherElement = document.createElement('div');
    weatherElement.innerHTML = `
        <h2>${city}</h2>
        <button onclick="removePlace('${city}')">Remove</button>
        <p>Temperature: ${data.main.temp} C</p>
        <p>Feels Like: ${data.main.feels_like} C</p>
        <p>Min Temperature: ${data.main.temp_min} C</p>
        <p>Max Temperature: ${data.main.temp_max} C</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
    `;

    weatherList.appendChild(weatherElement);
}

//function to remove places from local storage
function removePlace(city) {
    const places = getPlaces();
    const index = places.indexOf(city); //returns the index at which a given element can be found in array or -1 if not present
    if (index > -1) { //if city is found
        places.splice(index, 1); //removes 1 element at index
        localStorage.setItem('places', JSON.stringify(places)); //places array -> json string as setitem can only store strings(so we update our local storage)
        console.log('place removed', city);
    }
    window.location.reload(); //refresh page
}