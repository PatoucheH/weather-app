import "./style.scss"
import { loadPage } from "./main-function.js";
import { fetchDisplayWeather } from "./fetch-display-function.js";

const myBtn = document.getElementById("my-btn");
const input = document.getElementById("city");
const myWeatherKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
export const myPictureKey = import.meta.env.VITE_UNSPLASH_API_KEY;

/**
 * EventListener when we clicked on enter on the input we simulated a click on submit button
 */
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    myBtn.click();
  }
});

/**
 * EventListener when we clicked on the button we make the calls to the APi and display the wheather of the city entry in the input
 */
myBtn.addEventListener("click", (e) => {
  fetchDisplayWeather(input.value, myWeatherKey);
});

/**
 * load localStorage information to display it when we laod the page
 */
window.addEventListener("load", (e) => {
  loadPage(myWeatherKey);
});
