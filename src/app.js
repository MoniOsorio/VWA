function formatDate(timestamp) {
   let date= new Date(timestamp);
   let hours = date.getHours();
   let minutes = date.getMinutes();
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
   let day = days[date.getDay()];

   return `${day} ${hours}:${minutes}   `;
}

function displayForecast(response){
  let forecastElement= document.querySelector("#wforecast");
let wforecastHTML= `<div class="row">`;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
days.forEach(function(day){
 wforecastHTML= wforecastHTML+`

   <div class="col-2">
      <div class="week-day">
         ${day}
      </div>
      <img src="https://ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png" 
        alt="" width="36" />
       <div class="forecast-temp">
      <span class="forecast-temp-min">
      4°
      </span>
       <span class="forecast-temp-max">
         9° </span>
       </div>
    </div>
`;
});
   wforecastHTML = wforecastHTML+`</div>`;
  
forecastElement.innerHTML = wforecastHTML;
} 

function getForecast(coordinates){
  let apiKey = `a163a00e6099e0b4d7da2e23a921eeff`;
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  ;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){

   let temperatureElement= document.querySelector("#temperature");
   let cityElement=document.querySelector("#city");
   let descriptionElement= document.querySelector("#description");
   let humidityElement=document.querySelector("#humidity");
   let windElement= document.querySelector("#wind");
   let feelElement=document.querySelector("#feels");
   let dateElement= document.querySelector("#date");
   let iconElement= document.querySelector("#icon");
  
   celsiusTemp= response.data.main.temp;
  
 temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description; 
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML= Math.round(response.data.wind.speed);
feelElement.innerHTML= Math.round(response.data.main.feels_like);
dateElement.innerHTML= formatDate(response.data.dt * 1000);
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute(
  "alt",
  response.data.weather[0].description
);

getForecast (response.data.coord);
}

function search (city){
  let apiKey = "a163a00e6099e0b4d7da2e23a921eeff";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
} 

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
} 
function displayFTemp(event){ 
event.preventDefault();
let fahrenheitTemp = (celsiusTemp *9)/5+32;
celsius.classList.remove("active");
fahrenheit.classList.add("active");
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML= Math.round(fahrenheitTemp);
 } 

 function displayCTemp(event) {
   event.preventDefault();
   celsius.classList.add("active");
   fahrenheit.classList.remove("active");
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(celsiusTemp);
 } 
 let celsiusTemp= null;

 


  let form=document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let fahrenheit=document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", displayFTemp);
  
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayCTemp);
  search("Oslo");
 