// const { log } = require("console");

//weather
const apiKey = "8cf7a720a4c2dc42e5de681e0b0349d0"; 
const lat = 40.7128; 
const lon = -74.0060; 

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

axios.get(weatherUrl)
    .then((response) => {

        return{
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            city: response.data.name
        }
        
    })
    .then((data) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        })
    })
    .catch((error) => {
        console.log("Error fetching weather:", error);
    });