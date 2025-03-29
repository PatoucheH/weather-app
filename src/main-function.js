import {
  createDiv,
  displayWeatherDiv,
  createText,
  findlat,
  findlon,
} from "./utils-function.js";

/**
 *
 * @param {str} key to set the item in localStorage
 * @param {str} value to set the item in localStorage
 */
function setStorage(key, value) {
  localStorage.setItem(key, value);
}

/**
 *
 * @param {str} city the city to get informations about
 * @param {str} apiKey the key for the API calls
 * Make Api calls to get all the informations we need
 */
export function fetchApi(city, apiKey) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((coord) => {
      return fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${findlat(
          coord
        )}&lon=${findlon(coord)}&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((infoWeather) => {
      displayWeatherDiv(
        createDiv(createText(infoWeather), infoWeather.city.name)
      );
      setStorage(infoWeather.city.name, infoWeather.city.name);
    })
    .catch((e) => console.error("Error : ", e));
}

/**
 *
 * @param {str} myKey keys for the API's calls
 * load all the inforamtion in the localStorage and display it on the screen
 */
export function loadPage(myKey) {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      fetchApi(value, myKey);
    }
  }
}
