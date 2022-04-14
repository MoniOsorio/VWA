function displayTemperature(response){

   let temperatureElement= document.querySelector("#temperature");
   let cityElement=document.querySelector("#city");
   let descriptionElement= document.querySelector("#description");
   temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description; 
}
let city= "oslo";
let apiKey = "a163a00e6099e0b4d7da2e23a921eeff";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


 
  axios.get(apiUrl).then(displayTemperature);