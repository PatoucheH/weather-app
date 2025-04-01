import { findlat, findlon } from "./utils-function.js";
import { createDiv, createText, createGraph } from "./create-function.js";
import { setStorage } from "./main-function.js";
import { myPictureKey } from "./main.js";

/**
 *
 * @param {str} city the city to get informations about
 * @param {str} apiKey the key for the API calls
 * Make Api calls to get all the informations we need
 */
export function fetchDisplayWeather(city, apiKey) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((coord) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${findlat(
          coord
        )}&lon=${findlon(coord)}&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((infosWeather) => {
      displayWeatherDiv(
        createDiv(
          createText(infosWeather),
          createGraph(infosWeather),
          infosWeather.city.name
        )
      );
      fetchPicture(infosWeather.city.name, myPictureKey)
        .then((image) => {
          const cityDiv = document.querySelector(`#${infosWeather.city.name}`);
          const firstElem = cityDiv.querySelector(".container-day");
          const firstDiv = firstElem.querySelector(".weather");
          firstDiv.style.background = "none";
          const divImg = document.createElement("div");
          divImg.style.backgroundImage = `url(${image})`;
          divImg.style.position = "absolute";
          divImg.style.top = "0";
          divImg.style.left = "0";
          divImg.style.width = "100%";
          divImg.style.height = "100%";
          divImg.style.backgroundSize = "cover";
          divImg.style.backgroundPosition = "center";
          divImg.style.filter = "opacity(0.3)";
          divImg.style.zIndex = "-1";
          firstDiv.appendChild(divImg);
        })
        .catch((e) => console.error(e));
      setStorage(infosWeather.city.name, infosWeather.city.name);
    })
    .catch((e) => console.error("Error : ", e));
}

/**
 *
 * @param {div} div A div to display
 * display a div receive in parameter on the site
 */
export function displayWeatherDiv(div) {
  const divContainer = document.querySelector(".container-weather");
  divContainer.appendChild(div);
}

/**
 *
 * @param {str} city the city to get informations about
 * @param {str} apiKey the key for the api calls
 * @returns an url for the photos to display
 */
export function fetchPicture(city, apiKey) {
  return fetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}&orientation=landscape`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results[0].urls.small;
    })
    .catch((e) => console.error(`Error : ${e}`));
}
