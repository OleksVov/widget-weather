import moment from "moment/moment";

const weatherBlock = document.querySelector('#weather');
const locationBtn = document.querySelector('.weather_city');
const weatherTemp = document.querySelector('.weather_temp');
const weatherStatus = document.querySelector('.weather_status');
const weatherIcon = document.querySelector('.weather_icon');
const currentDate = document.querySelector('.weather_date');

const apiKey = '92b7ae078a5ceba812c34c84b6f882cb';

let latitude  = 40.71;
let longitude = -74.00;

// locationBtn.addEventListener('click', () => {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(onSuccess);
//     } else {
//         alert("Your browser not support geolocation api");
//     }
// })
// function onSuccess(position) {
//     let latitude  = position.coords.latitude;
//     let longitude = position.coords.longitude;
    
  
// }



async function loadWeather () {
    const server = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude }&lon=${longitude}&units=metric&appid=${apiKey}`;
    const response = await fetch(server);
    const responseResult = await response.json();
    
    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
    }

function getWeather(data) {
console.log(data);
const location = data.name;
const temp = Math.round(data.main.temp);
const status = data.weather[0].main;
const icon = data.weather[0].icon;

locationBtn.textContent = `${location}`;
weatherTemp.textContent = `${temp}`;
weatherStatus.textContent = `${status}`;
weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

if (weatherBlock){
    loadWeather ()
}

// const date = new Date().toDateString();
// currentDate.textContent = `${date}`;
const date = moment(new Date());
const resultDate = date.format("D MMM YYYY");
currentDate.textContent = `${resultDate}`;