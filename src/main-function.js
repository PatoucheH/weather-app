import { fetchDisplayWeather } from "./fetch-display-function.js";

/**
 * @param {str} key to set the item in localStorage
 * @param {str} value to set the item in localStorage
 */
export function setStorage(key, value) {
  localStorage.setItem(key, value);
}

/**
 *
 * @param {str} myWeatherKey keys for the API's calls
 * load all the inforamtion in the localStorage and display it on the screen
 */
export function loadPage(myWeatherKey) {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      fetchDisplayWeather(value, myWeatherKey);
  }
}
}
