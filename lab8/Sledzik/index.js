document.getElementById("button").addEventListener("click", GetWeather);
//document.getElementById("inputCity").addEventListener

function GetWeather() {
const apiKey = 'https://api.openweathermap.org/data/3.0/onecall?appid={a20aae86e9485e5be4ddad135579ffff}';
const city = document.getElementById("inputCity").value;

if(city === '') {
    alert('Please enter the city');
    return;
}

fetch(apiUrl)
.then(Response => Response.json())
.then(data => {
    // Przetwórz dane o pogodzie
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;

    // Wyświetl informacje o pogodzie
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${weatherDescription}</p>
    `;
})
.catch(error => {
    console.error('Błąd pobierania danych o pogodzie:', error);
});


}