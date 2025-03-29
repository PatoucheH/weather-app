import { Chart } from "chart.js";

/**
 *
 * @param {HTML} html Variable that content html code which will be display on the div
 * @param {str} key To name the id Div to stock it in LocalStorage
 * @returns A div to display
 * Create a div with everything inside to display the weather
 */
export function createDiv(html, key) {
  const div = document.createElement("div");
  div.classList.add("weather-div");
  div.setAttribute("id", key);
  div.innerHTML = html;
  const deleteBTn = document.createElement("img");
  deleteBTn.setAttribute("src", "./public/croix.png");
  deleteBTn.classList.add("delete-btn");
  deleteBTn.addEventListener("click", (e) => {
    const divContainer = document.querySelector(".container-weather");
    divContainer.removeChild(div);
    const divID = div.getAttribute("id");
    console.log(divID);
    localStorage.removeItem(divID);
  });
  div.appendChild(deleteBTn);
  return div;
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
 * @param {array} coord an array of coordinates
 * @returns the latitude of that coordinate
 */
export function findlat(coord) {
  if (coord.length === 0) throw new Error("No data for this city ! ");
  const lat = coord[0].lat;
  return lat;
}

/**
 *
 * @param {array} coord an array of coordinates
 * @returns the longitude of that coordinates
 */
export function findlon(coord) {
  if (coord.length === 0) throw new Error("No data for this city ! ");
  const lon = coord[0].lon;
  return lon;
}

/**
 *
 * @param {obj} infoWeather infos from an API to get the weather
 * @returns a html object to be displayed
 * create a html object with all the infos on the weather of a city named
 */
export function createText(infoWeather) {
  let text = `<h2>${infoWeather.city.name}</h2>`;

  for (let j = 0; j < 5; j++) {
    let avgTemp = 0;
    let min = 100;
    let max = -100;
    for (let i = 0; i < 8; i++) {
      let tempCelsiusMin = infoWeather.list[i + j * 8].main.temp_min - 273.15;

      let tempCelsiusMax = infoWeather.list[i + j * 8].main.temp_max - 273.15;
      avgTemp += infoWeather.list[i + j * 8].main.temp;
      if (tempCelsiusMin < min) min = Math.round(tempCelsiusMin);
      if (tempCelsiusMax > max) max = Math.round(tempCelsiusMax);
    }
    let date = new Date(infoWeather.list[j * 8].dt * 1000);
    const iconCode = infoWeather.list[j].weather[0].icon;
    text += `
        <div class="weather"> 
        <h3>${date.toLocaleDateString()}</h3>
        <h4>${
          infoWeather.list[j].weather[0].description
        }</h4><img id="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png">
        <p>Average temperature : ${Math.round(avgTemp / 8 - 273.15)} °</p>
        <p>Minimum temperature : ${min}</p>
        <p>Maxima temperature : ${max}</p>
        </div>`;

    avgTemp = 0;
    date = "";
  }
  return text;
}
