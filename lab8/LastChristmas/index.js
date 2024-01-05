//TO DO: CHART - STH WITH libraries fix

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
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

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
            const weatherIcon = data.weather[0].icon; 
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

    console.log(`got weather for ${city}`, data);

        fetch(forecastApiUrl)
            .then(response => response.json())
            .then(data => {
                const hourlyData = data.list.map(entry => {
                    return {
                        time: entry.dt_txt,
                        temperature: entry.main.temp
                    };
                });
                console.log("fetching forecast", hourlyData);
                createChart(hourlyData);
            })
            .catch(error => console.error('Error fetching forecast:', error));
    
    })
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

    const fetchWeather = () => {
        console.log('getting weather for: ', city)

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeatherForCity(city, data);

                // Store the weather data and the current time in the local storage
                localStorage.setItem(`weather_${city}`, JSON.stringify({
                    data: data,
                    time: Date.now()
                }));
            })
            .catch(error => {
                console.error('error fetching data', error);
            });
    };

    // Try to get the weather data from the local storage
    const storedWeather = localStorage.getItem(`weather_${city}`);
    if (storedWeather) {
        const { data, time } = JSON.parse(storedWeather); //deserializing json string to js object and get data and time from object

        // If the stored data is less than 5 minutes old, use it
        if (Date.now() - time < 5 * 60 * 1000) {//data now - time the weather data was stored < 5 minutes
            displayWeatherForCity(city, data);
            return;
        }
    }

    fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => {
        const hourlyData = data.list.map(entry => {
            return {
                time: entry.dt_txt,
                temperature: entry.main.temp
            };
        });
        console.log("fetching forecast", hourlyData);
        createChart(hourlyData);
    })
    .catch(error => console.error('Error fetching forecast:', error));



    // If there's no data in the local storage or it's more than 5 minutes old, fetch the data from the API
    fetchWeather();

    // Then fetch the weather every 5 minutes
    setInterval(fetchWeather, 5 * 60 * 1000);
}


//function to display weather for city
function displayWeatherForCity(city, data) {
    const weatherList = document.getElementById('weatherList');

    // Try to get the existing weather element for the city
    let weatherElement = document.getElementById(`weather_${city}`);

    // If the weather element doesn't exist, create it
    if (!weatherElement) {
        weatherElement = document.createElement('div');
        weatherElement.id = `weather_${city}`;
        weatherList.appendChild(weatherElement);
        console.log('created weather element', city);
    }

    // Update the innerHTML of the weather element
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
    console.log('displaying weather for city', city);

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

//function to autocomplete city name
function initAutocomplete() {
    const input = document.getElementById('inputCity');
    const autocomplete = new google.maps.places.Autocomplete(input);
}

let weatherChart; 

function createChart(hourlyData) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    console.log('creating chart', hourlyData);
    const labels = hourlyData.map(entry => entry.time);
    const temperatures = hourlyData.map(entry => entry.temperature);

    // If a chart already exists, destroy it
    if (weatherChart) {
        weatherChart.destroy();
    }

    // Create a new chart and store it in the variable
    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: Math.min(...temperatures) - 5,
                    max: Math.max(...temperatures) + 5
                }
            }
        }
    });
}




