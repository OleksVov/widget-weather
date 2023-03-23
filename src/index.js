import moment from "moment/moment";

const weatherBlock = document.querySelector('#weather');

const apiWeather = '92b7ae078a5ceba812c34c84b6f882cb';
let server;

const date = moment(new Date());
const resultMonth = date.format("D MMM YYYY");
const resultDay = date.format('ddd')


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess);
} else {
    alert("Your browser not support geolocation api");
}

function onSuccess(position) {
let latitude  = position.coords.latitude;
let longitude = position.coords.longitude;
server = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude }&lon=${longitude}&units=metric&appid=${apiWeather}`;
loadWeather();

}



async function loadWeather () {
    try {
        const response = await fetch(server);
        const responseResult = await response.json();
        renderWeather(responseResult);
    } catch (error) {
        console.log(error.message);
    }

function renderWeather(data) {

const location = data.name;
const temp = Math.round(data.main.temp);
const status = data.weather[0].main;
const icon = data.weather[0].icon;


const markup = `<div class="weather-header">
<p class="weather-temp">${temp}&deg;</p>
<div class="weather-main">
  <p class="weather-status">${status}</p>
  <div class="weather-city">
  <img class="location-icon" src ="./images/carbon_location.svg" alt = "">
    ${location}
    </div>
</div>
</div>

<img class="weather-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${status}" >

<ul class="weather-date">
<li class="weather-day">${resultDay}</li>
<li class="weather-month">${resultMonth}</li>
</ul>`
weatherBlock.innerHTML = markup;
}