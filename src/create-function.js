import { Chart } from "chart.js/auto";

/**
 *
 * @param {obj} infosWeather infos from an API to get the weather
 * @returns a html object to be displayed
 * create a html object with all the infos on the weather of a city named
 */
export function createText(infosWeather) {
  let text = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = infosWeather.city.name;
  text.appendChild(h2);

  let counter = 0;
  for (let j = 0; j < 5; j++) {
    let time = "";
    const divByDate = document.createElement("div");
    divByDate.classList.add("weather");
    let date = new Date(infosWeather.list[j * 8].dt * 1000);
    const h3 = document.createElement("h3");
    h3.textContent = date.toLocaleDateString();
    const desc = document.createElement("h4");
    desc.textContent = infosWeather.list[j * 8].weather[0].description;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${
        infosWeather.list[j * 8].weather[0].icon
      }@2x.png`
    );

    divByDate.appendChild(h3);
    divByDate.appendChild(desc);
    divByDate.appendChild(img);
    while (time !== "23:00:00") {
      counter++;
      const divInfo = document.createElement("p");
      time = new Date(
        infosWeather.list[counter].dt * 1000
      ).toLocaleTimeString();
      let info = Math.round(infosWeather.list[counter].main.temp - 273.15);
      divInfo.textContent = `Temperature at ${time} : ${info} °C`;
      divByDate.appendChild(divInfo);
    }
    text.appendChild(divByDate);
  }
  return text;
}

/**
 *
 * @param {HTML} html Variable that content html code which will be display on the div
 * @param {str} key To name the id Div to stock it in LocalStorage
 * @returns A div to display
 * Create a div with everything inside to display the weather
 */
export function createDiv(divToAdd, graph, key) {
  const div = document.createElement("div");
  div.classList.add("weather-div");
  div.setAttribute("id", key);
  div.appendChild(divToAdd);
  const deleteBTn = document.createElement("img");
  deleteBTn.setAttribute("src", "./public/croix.png");
  deleteBTn.classList.add("delete-btn");
  deleteBTn.addEventListener("click", (e) => {
    const divContainer = document.querySelector(".container-weather");
    divContainer.removeChild(div);
    const divID = div.getAttribute("id");
    localStorage.removeItem(divID);
  });
  div.appendChild(deleteBTn);
  div.appendChild(graph);
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
 * @param {obj} infosWeather obj with all the Weather info from the api
 * @returns a canvas to display on the site
 */
export function createGraph(infosWeather) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 200;
  let arrayTemp = [];
  let arrayLabels = [];
  for (let i = 0; i < infosWeather.list.length; i++) {
    let date = new Date(infosWeather.list[i].dt * 1000).toLocaleString(
      "fr-FR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    arrayLabels.push(date);
    arrayTemp.push(Math.round(infosWeather.list[i].main.temp - 273.15));
  }
  new Chart(ctx, {
    type: "line",
    data: {
      labels: arrayLabels,
      datasets: [
        {
          label: "Temperatures",
          data: arrayTemp,
          borderColor: "#ffc72c",
          fill: true,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        x: { title: { display: true, text: "Hours" } },
        y: { title: { display: true, text: "Temperature (°C)" } },
      },
    },
  });
  return canvas;
}
