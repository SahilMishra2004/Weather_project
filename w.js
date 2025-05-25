const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "418c73979ae3c2e8d812013f8d0a6b0e";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await getweatherData(city);
            if (weatherData) {
                displayWeatherInfo(weatherData);
            } else {
                dispalyError("No data found for the specified city.");
            }
        } catch (error) {
            console.error(error);
            dispalyError("Error fetching weather data.");
        }
    } else {
        dispalyError("Please enter a city name.");
    }
});

async function getweatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const weatherId = weather[0].id;

    const emoji = getweatherEmoji(weatherId);

    card.innerHTML = `
        <h1>${name}</h1>
        <p class="weathereEmoji">${emoji}</p>
        <p class="tempDisplay">${temp}°C</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
    `;
    card.style.display = "flex";
}

function getweatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    else if (weatherId >= 300 && weatherId < 500) return "🌦️";
    else if (weatherId >= 500 && weatherId < 600) return "🌧️";
    else if (weatherId >= 600 && weatherId < 700) return "❄️";
    else if (weatherId >= 700 && weatherId < 800) return "🌫️";
    else if (weatherId === 800) return "☀️";
    else if (weatherId > 800) return "☁️";
    else return "🌈";
}

function dispalyError(message) {
    const errorElement = document.createElement("p");
    errorElement.textContent = message;
    errorElement.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorElement);
}
