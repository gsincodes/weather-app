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
let humidityText = document.querySelector("#humidity");
let windspeedText = document.querySelector("#windspeed");
let cloudcoverText = document.querySelector("#cloudcover");
let sunriseText = document.querySelector("#sunrise");
let sunsetText = document.querySelector("#sunset");

let content = document.querySelector("#content");

const loadingData = document.querySelector("#loading-data");
let forecastBody = document.querySelector("#forecast-body");

let useLocation = 'Jamshedpur';

async function getLocationWeather(location) {

    loadingData.style.display = 'block';
    todayStats.style.display = 'none';
    forecast.style.display = 'none';
    content.classList.add = 'blur';

    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=GEYB8BQQVR87UD3DBMD6LH2WV&contentType=json`);
        const LocationData = await response.json();

        displayWeatherImage(LocationData.currentConditions.conditions);
        const extractedData = dataProcessing(LocationData,LocationData.currentConditions);
        
        displayStats(extractedData);
        forecastWeatherDisplay(forecastWeather(LocationData.days));
    }
    finally{
        loadingData.style.display = 'none';
        todayStats.style.display = 'block';
        content.classList.remove('blur');
        forecast.style.display = 'block';
    }
}

function dataProcessing(forecast, currentStatus){
    let myData = [forecast.days[0].datetime, currentStatus.temp, forecast.resolvedAddress, currentStatus.conditions, forecast.description, currentStatus.feelslike, currentStatus.humidity, currentStatus.windspeed, currentStatus.cloudcover, currentStatus.sunrise, currentStatus.sunset];
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

    dateText.textContent = `Today, ${dataArray[0]}`;
    tempText.textContent = `${((dataArray[1]-32)/1.8).toFixed(1)}°C`;
    locationText.textContent = dataArray[2];
    conditionText.textContent = dataArray[3];
    descText.textContent = dataArray[4];
    feelsLikeText.textContent = `Feels like: ${((dataArray[5]-32)/1.8).toFixed(1)}°C`;
    humidityText.textContent = `Humidity: ${dataArray[6]}%`;
    windspeedText.textContent = `Windspeed: ${dataArray[7]} mph`;
    cloudcoverText.textContent = `Cloudcover: ${dataArray[8]}%`;
    sunriseText.textContent = `Sunrise Time: ${dataArray[9]}`;
    sunsetText.textContent = `Sunset Time: ${dataArray[10]}`;
}

function forecastWeather(forecastArray){
    let forecastArrayData = [];
    for(let i in forecastArray){
        if(i==6){
            console.log(`this data is from forecastWeather ${forecastArrayData}`);
            return forecastArrayData;
        }
        forecastArrayData.push([forecastArray[i].datetime, forecastArray[i].temp, forecastArray[i].tempmin, forecastArray[i].tempmax, forecastArray[i].humidity]);
    }
    return forecastArrayData;
}



function forecastWeatherDisplay(myForecastData){
    forecastBody.textContent = "";
    for(let i  in myForecastData){
        if(i==0){
            continue;
        }
        const forecastBodyStat = document.createElement("div");
        forecastBodyStat.id = `day-${i}`;
        forecastBodyStat.className = "daily-stat";
        const forecastDateText = document.createElement("div");
        forecastDateText.className = 'forecast-date-text';
        forecastDateText.textContent = `${myForecastData[i][0]}`
        forecastBodyStat.innerHTML = `
                                        Temp-${((myForecastData[i][1] - 32)/1.8).toFixed(1)}°C, &ensp;
                                        Min - ${((myForecastData[i][2] - 32)/1.8).toFixed(1)}°C, &ensp;
                                        Max - ${((myForecastData[i][3] - 32)/1.8).toFixed(1)}°C, &ensp;
                                        Humidity - ${myForecastData[i][4]}%.`;
        forecastBody.appendChild(forecastDateText);
        forecastBody.appendChild(forecastBodyStat);
        console.log("forecast data");
    }
}