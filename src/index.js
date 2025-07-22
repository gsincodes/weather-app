import "./styles.css";

const cloudy = document.querySelector("#cloudy");
const clear = document.querySelector("#clear");
const sunny = document.querySelector("#sunny");
const windy = document.querySelector("#windy");
const rainy = document.querySelector("#rainy");
const stormy = document.querySelector("#stormy");
const partiallyCloudy = document.querySelector("#partially-cloudy");

const searchedLocation = document.querySelector("#location");
const searchButton = document.querySelector("#search-button");
const form = document.querySelector("form");

let todayStats = document.querySelector("#today-stats");
let tempText = document.querySelector("#temp-C");
let locationText = document.querySelector("#locationDiv");
let conditionText = document.querySelector("#condition");
let descText = document.querySelector("#description");
let feelsLikeText = document.querySelector("#feels-like");
let dateText = document.querySelector("#date");

let useLocation = 'Jamshedpur';

async function getLocationWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=GEYB8BQQVR87UD3DBMD6LH2WV&contentType=json`);
    const LocationData = await response.json();
    console.log(LocationData.currentConditions.conditions);
    displayWeatherImage(LocationData.currentConditions.conditions);

    const extractedData = dataProcessing(LocationData,LocationData.currentConditions);
    console.log(extractedData);
    displayStats(extractedData);
    console.log(LocationData);
    console.log(LocationData.resolvedAddress);
}

function dataProcessing(forecast, currentStatus){
    let myData = [currentStatus.temp, forecast.resolvedAddress, currentStatus.conditions, forecast.description, currentStatus.feelslike, forecast.days[0].datetime];
    return myData;
}

const data = getLocationWeather(useLocation);

function displayWeatherImage(condition){
    if(condition === 'Cloudy' | condition === 'Overcast'){
        cloudy.style.display = 'block';
        partiallyCloudy.style.display = 'none';
        clear.style.display = 'none';
        rainy.style.display = 'none';
    }
    else if(condition === 'Partially cloudy'){
        partiallyCloudy.style.display = 'block';
        cloudy.style.display = 'none';
        clear.style.display = 'none';
        rainy.style.display = 'none';
    }
    else if(condition === 'Clear'){
        clear.style.display = 'block';
        cloudy.style.display = 'none';
        partiallyCloudy.style.display = 'none';
        rainy.style.display = 'none';
    }
    else if(condition.match(/Rain/i)){
        rainy.style.display = 'block';
        cloudy.style.display = 'none';
        partiallyCloudy.style.display = 'none';
        clear.style.display = 'none';
    }
    else if(condition === 'sunny'){

    }
}

searchButton.addEventListener("click", e => {
    e.preventDefault();
    useLocation = searchedLocation.value;
    getLocationWeather(useLocation);
    form.reset();
})

function displayStats(dataArray){

    tempText.textContent = `${dataArray[0]}°F`;
    locationText.textContent = dataArray[1];
    conditionText.textContent = dataArray[2];
    descText.textContent = dataArray[3];
    feelsLikeText.textContent = `Feels like: ${dataArray[4]}°F`;
    dateText.textContent = `Today - ${dataArray[5]}`;


}
