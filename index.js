const input = document.getElementById('search-input');
const button = document.getElementById('button');
let todayWeatherIcon = document.getElementById('weather-icon');
let todayWeatherLabel = document.getElementById('weather-label');
let minTemperature = document.getElementById('min-temperature');
let maxTemperature = document.getElementById('max-temperature');
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const hourlyTemperature = document.getElementById('hourlyTemperature');
const hourlyTemperatureF = document.getElementById('hourlyTemperatureF');
const todayDate = document.getElementById('date');
const tomorrowDate = document.getElementById('tomorrowDate');
const dayAfterTomorrowDate = document.getElementById('dayAfterTomorrowDate');
let cityData = [];
const tomorrow_forecast_icon = document.getElementById('tomorrow-forecast');
const tomorrow_forecast_label = document.getElementById('tomorrow-forecast-label');
const tomorrow_temperature_min_c = document.getElementById('tomorrow-temperature-min-c');
const tomorrow_temperature_min_f = document.getElementById('tomorrow-temperature-min-f');
const tomorrow_temperature_max_c = document.getElementById('tomorrow-temperature-max-c');
const tomorrow_temperature_max_f = document.getElementById('tomorrow-temperature-max-f');
const day_after_tomorrow_forecast_icon = document.getElementById('day-after-tomorrow-forecast');
const day_after_tomorrow_forecast_label = document.getElementById('day-after-tomorrow-forecast-label');
const day_after_tomorrow_temperature_min_c = document.getElementById('day-after-tomorrow-temperature-min-c');
const day_after_tomorrow_temperature_min_f = document.getElementById('day-after-tomorrow-temperature-min-f');
const day_after_tomorrow_temperature_max_c = document.getElementById('day-after-tomorrow-temperature-max-c');
const day_after_tomorrow_temperature_max_f = document.getElementById('day-after-tomorrow-temperature-max-f');
async function getCityData() {
    if (input === null || !(input instanceof HTMLInputElement)) {
        throw new Error("Input element is either not found or not an HTML input");
    }
    const cityValue = input.value;
    const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${cityValue}&count=1&language=en`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
        }
        const result = await response.json();
        cityData = result.results;
        let cityNameApi = cityData[0].name;
        let countryNameApi = cityData[0].country;
        if (cityName === null || !(cityName instanceof HTMLElement)) {
            throw new Error('City name element not found in the DOM');
        }
        if (countryName === null || !(countryName instanceof HTMLElement)) {
            throw new Error('Country name element not found in the DOM');
        }
        cityName.innerHTML = `${cityNameApi}`;
        countryName.innerHTML = `${countryNameApi}`;
    }
    catch (error) {
        console.error('Albania');
    }
    const cityLongitude = cityData[0].longitude;
    const cityLatitude = cityData[0].latitude;
    const cityWeather = `https://api.open-meteo.com/v1/forecast?latitude=${cityLongitude}&longitude=${cityLatitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=is_day,temperature_2m,weather_code&timezone=Europe%2FBerlin`;
    try {
        const responseCityWeatherApi = await fetch(cityWeather);
        if (!responseCityWeatherApi.ok) {
            throw new Error(`Failed to fetch weather data: ${responseCityWeatherApi.status}`);
        }
        const cityWeatherApi = await responseCityWeatherApi.json();
        if (hourlyTemperature === null) {
            throw new Error('Hourly temperature element not found');
        }
        if (hourlyTemperatureF === null) {
            throw new Error('Hourly temperature (Fahrenheit) element not found');
        }
        const hourlyTemperatureApi = cityWeatherApi.hourly.temperature_2m[0];
        hourlyTemperature.innerHTML = `${hourlyTemperatureApi}°C`;
        hourlyTemperatureF.innerHTML = `${hourlyTemperatureApi + 32}°F`;
        const dateAndTime = cityWeatherApi.current.time;
        if (todayDate === null || !(todayDate instanceof HTMLElement)) {
            throw new Error('Today\'s date element not found in the DOM');
        }
        if (tomorrowDate === null || !(tomorrowDate instanceof HTMLElement)) {
            throw new Error('Tomorrow\'s date element not found in the DOM');
        }
        if (dayAfterTomorrowDate === null || !(dayAfterTomorrowDate instanceof HTMLElement)) {
            throw new Error('Day after tomorrow date element not found in the DOM');
        }
        const todayDateApi = dateAndTime.split("T")[0];
        const tomorrowDateApi = cityWeatherApi.daily.time[1];
        const dateAfterTomorrowApi = cityWeatherApi.daily.time[2];
        todayDate.innerHTML = `${todayDateApi}`;
        tomorrowDate.innerHTML = `${tomorrowDateApi}`;
        dayAfterTomorrowDate.innerHTML = `${dateAfterTomorrowApi}`;
        const weatherCode = new Map([
            [0, { label: `<p>"Clear sky"</p>`, icon: `<img id="icon" src="images/sun.png" alt="Albania" >` }],
            [1, { label: `<p>"Mainly clear"</p>`, icon: `<img id="icon" src='images/sun.png' alt="Albania" >` }],
            [2, { label: `<p>"Partly cloudy"</p>`, icon: `<img id="icon" src='images/partly-cloudy.png' alt="Albania" >` }],
            [3, { label: `<p>"Overcast"</p>`, icon: `<img id="icon" src='images/fog.png' alt="Albania" >` }],
            [45, { label: `<p>"Fog"</p>`, icon: `<img id="icon" src='images/fog.png' alt="Albania" >` }],
            [48, { label: `<p>"Depositing rime fog"</p>`, icon: `<img id="icon" src='images/Depositing rime fog.png' alt="Albania" >` }],
            [51, { label: `<p>"Light drizzle"</p>`, icon: `<img id="icon" src='images/cloudy (1).png' alt="Albania" >` }],
            [53, { label: `<p>"Moderate drizzle"</p>`, icon: `<img id="icon" src= 'images/cloudy (1).png' alt="Albania" >` }],
            [55, { label: `<p>"Dense drizzle"</p>`, icon: `<img id="icon" src= 'images/rain.jpg' alt="Albania" >` }],
            [56, { label: `<p>"Light freezing drizzle"</p>`, icon: `<img id="icon" src= "images/rain.png" alt="Albania" >` }],
            [57, { label: `<p>"Drizzle"</p>`, icon: `<img id="icon" src= 'images/rain.png' alt="Albania" >` }],
            [61, { label: `<p>"Slight rain"</p>`, icon: `<img id="icon" src=  'images/rain.png' alt="Albania" >` }],
            [63, { label: `<p>"Moderate rain"</p>`, icon: `<img id="icon" src='images/rain.png' alt="Albania">` }],
            [65, { label: `<p>"Heavy rain"</p>`, icon: `<img id="icon" src='images/rain.png' alt="Albania" >` }],
            [66, { label: `<p>"Light freezing rain"</p>`, icon: `<img id="icon" src='images/rain.png' alt="Albania" >` }],
            [67, { label: `<p>"Heavy freezing rain"</p>`, icon: `<img id="icon" src='images/rain.png' alt="Albania" >` }],
            [71, { label: `<p>"Slight snowfall"</p>`, icon: `<img id="icon" src='images/snow.png' alt="Albania" >` }],
            [73, { label: `<p>"Moderate snowfall"</p>`, icon: `<img id="icon" src='images/snow.png' alt="Albania" >` }],
            [75, { label: `<p>"Heavy snowfall"</p>`, icon: `<img id="icon" src='images/snow.png' alt="Albania" >` }],
            [77, { label: `<p>"Snow grains"</p>`, icon: `<img id="icon" src='images/snow.png' alt="Albania" >` }],
            [80, { label: `<p>"Slight rain showers"</p>`, icon: `<img id="icon" src='images/rain.jpg' alt="Albania" >` }],
            [81, { label: `<p>"Moderate rain showers"</p>`, image: `<img id="icon" src='images/rain.jpg' alt="Albania" >` }],
            [82, { label: `<p>"Violent rain showers"</p>`, icon: `<img id="icon" src='images/rain.jpg' alt="Albania" >` }],
            [85, { label: `<p>"Slight snow showers"</p>`, icon: `<img id="icon" src='images/rain.jpg' alt="Albania" >` }],
            [86, { label: `<p>"Heavy snow showers"</p>`, icon: `<img id="icon" src='images/snow.png' alt="Albania" >` }],
            [95, { label: `<p>"Thunderstorm (slight or moderate)"</p>`, icon: `<img id="icon" src='images/thunder_6469244.png' alt="Albania" >` }],
            [96, { label: `<p>"Thunderstorm with slight hail"</p>`, icon: `<img id="icon" src='images/thunder_6469244.png' alt="Albania" >` }],
            [99, { label: `<p>"Thunderstorm with heavy hail"</p>`, icon: `<img id="icon" src='images/thunder_6469244.png' alt="Albania" >` }],
        ]);
        if (todayWeatherIcon === null || !(todayWeatherIcon instanceof HTMLElement)) {
            throw new Error('Today\'s weather icon element not found');
        }
        if (todayWeatherLabel === null || !(todayWeatherLabel instanceof HTMLElement)) {
            throw new Error('Today\'s weather label element not found');
        }
        let actualWeatherCode = cityWeatherApi.hourly.weather_code[0];
        const logoApi = weatherCode.get(actualWeatherCode);
        todayWeatherIcon.innerHTML = `${logoApi?.icon}`;
        todayWeatherLabel.innerHTML = `${logoApi?.label}`;
        const actualMaxT = cityWeatherApi.daily.temperature_2m_max[0];
        const actualMinT = cityWeatherApi.daily.temperature_2m_min[0];
        if (maxTemperature === null) {
            throw new Error('Maximum temperature element not found');
        }
        if (minTemperature === null) {
            throw new Error('Minimum temperature element not found');
        }
        maxTemperature.innerHTML = `Max:${actualMaxT}°C`;
        minTemperature.innerHTML = `Min:${actualMinT}°C`;
        if (tomorrow_forecast_icon === null || !(tomorrow_forecast_icon instanceof HTMLElement)) {
            throw new Error('Tomorrow forecast icon element not found');
        }
        if (tomorrow_forecast_label === null || !(tomorrow_forecast_label instanceof HTMLElement)) {
            throw new Error('Tomorrow forecast label element not found');
        }
        if (tomorrow_temperature_min_c === null || !(tomorrow_temperature_min_c instanceof HTMLElement)) {
            throw new Error('Tomorrow minimum temperature (Celsius) element not found');
        }
        if (tomorrow_temperature_max_c === null || !(tomorrow_temperature_max_c instanceof HTMLElement)) {
            throw new Error('Tomorrow maximum temperature (Celsius) element not found');
        }
        if (tomorrow_temperature_min_f === null || !(tomorrow_temperature_min_f instanceof HTMLElement)) {
            throw new Error('Tomorrow minimum temperature (Fahrenheit) element not found');
        }
        if (tomorrow_temperature_max_f === null || !(tomorrow_temperature_max_f instanceof HTMLElement)) {
            throw new Error('Tomorrow maximum temperature (Fahrenheit) element not found');
        }
        const nextDayApi = cityWeatherApi.daily.weather_code[1];
        const logoApi2 = weatherCode.get(nextDayApi);
        tomorrow_forecast_icon.innerHTML = `${logoApi2?.icon}`;
        tomorrow_forecast_label.innerHTML = `${logoApi2?.label}`;
        const nextDayMinT = cityWeatherApi.daily.temperature_2m_min[1];
        tomorrow_temperature_min_c.innerHTML = `Min:${nextDayMinT}°C`;
        tomorrow_temperature_min_f.innerHTML = `Min:${nextDayMinT + 32}°F`;
        const nextDayMaxT = cityWeatherApi.daily.temperature_2m_max[1];
        tomorrow_temperature_max_c.innerHTML = `Max:${nextDayMaxT}°C`;
        tomorrow_temperature_max_f.innerHTML = `Max:${nextDayMaxT + 32}°F`;
        if (day_after_tomorrow_forecast_icon === null || !(day_after_tomorrow_forecast_icon instanceof HTMLElement)) {
            throw new Error('Day after tomorrow forecast icon element not found');
        }
        if (day_after_tomorrow_forecast_label === null || !(day_after_tomorrow_forecast_label instanceof HTMLElement)) {
            throw new Error('Day after tomorrow forecast label element not found');
        }
        if (day_after_tomorrow_temperature_min_c === null || !(day_after_tomorrow_temperature_min_c instanceof HTMLElement)) {
            throw new Error('Day after tomorrow minimum temperature (Celsius) element not found');
        }
        if (day_after_tomorrow_temperature_min_f === null || !(day_after_tomorrow_temperature_min_f instanceof HTMLElement)) {
            throw new Error('Day after tomorrow minimum temperature (Fahrenheit) element not found');
        }
        if (day_after_tomorrow_temperature_max_c === null || !(day_after_tomorrow_temperature_max_c instanceof HTMLElement)) {
            throw new Error('Day after tomorrow maximum temperature (Celsius) element not found');
        }
        if (day_after_tomorrow_temperature_max_f === null || !(day_after_tomorrow_temperature_max_f instanceof HTMLElement)) {
            throw new Error('Day after tomorrow maximum temperature (Fahrenheit) element not found');
        }
        const dayAfterTomorrowApi = cityWeatherApi.daily.weather_code[2];
        const logoApi3 = weatherCode.get(dayAfterTomorrowApi);
        day_after_tomorrow_forecast_icon.innerHTML = `${logoApi3?.icon}`;
        day_after_tomorrow_forecast_label.innerHTML = `${logoApi3?.label}`;
        const dayAfterTomorrowMinT = cityWeatherApi.daily.temperature_2m_min[2];
        day_after_tomorrow_temperature_min_c.innerHTML = `Min:${dayAfterTomorrowMinT}°C`;
        day_after_tomorrow_temperature_min_f.innerHTML = `Min:${dayAfterTomorrowMinT + 32}°F`;
        const dayAfterTomorrowMaxT = cityWeatherApi.daily.temperature_2m_max[2];
        day_after_tomorrow_temperature_max_c.innerHTML = `Max:${dayAfterTomorrowMaxT}°C`;
        day_after_tomorrow_temperature_max_f.innerHTML = `Max:${dayAfterTomorrowMaxT + 32}°F`;
    }
    catch (error) {
        console.error("no data found");
    }
}
button?.addEventListener('click', () => {
    getCityData();
});
export {};
//const time = dateAndTime.split("T")[1];
//const temperatureCelsius = document.getElementById('temperature-celsius');
//const temperatureFahrenheit = document.getElementById('temperature-fahrenheit')
//const temperatureApi = cityWeatherApi.hourly.temperature_2m[0]
//# sourceMappingURL=index.js.map