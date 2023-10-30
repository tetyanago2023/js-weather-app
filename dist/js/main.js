import {
    setLocationObject,
    getHomeLocation
} from "./dataFunctions.js";
import {
    addSpinner,
    displayError
} from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();
const initApp = () => {
    // add listeners
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);
    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);

    // set up

    // load default weather
    loadWeather();
};

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = (event) => {
    if (event && event.type === "click") {
        const mapIcon = document.querySelector(".fa-map-marker-alt");
        addSpinner(mapIcon);
    }
    if (!navigator.geolocation) return geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = (errObj) => {
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    setLocationObject(currentLoc, myCoordsObj);
    console.log(currentLoc);
    updateDataAndDisplay(currentLoc);
};

const loadWeather = (event) => {
    const savedLocation = getHomeLocation();
    if (!savedLocation && !event) return getGeoWeather();
    if (!savedLocation && event.type === "click") {
        displayError(
            "No Home Location Saved.",
            "Sorry. Please save your home location first."
        );
    } else if (savedLocation && !event) {
        displayHomeLocationWeather(savedLocation);
    } else {
        const homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};

const displayHomeLocationWeather = (home) => {
    if (typeof home === "string") {
        const locationJson = JSON.parse(home);
        const myCoordObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        setLocationObject(currentLoc, myCoordObj);
        updateDataAndDisplay(currentLoc);
    }
};

const updateDataAndDisplay = async (locationObj) => {
    console.log(locationObj);
    // const weatherJson = await getWeatherFromCoords(locationObj);
    // if (weatherJson) updateDisplay(weatherJson, locationObj);
};
