import { fetchApi, loadPage } from "./main-function.js";

const myBtn = document.getElementById("my-btn");
const input = document.getElementById("city");
const myKey = import.meta.env.VITE_API_KEY;

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
  fetchApi(input.value, myKey);
});

/**
 * load localStorage information to display it when we laod the page
 */
window.addEventListener("load", (e) => {
  loadPage(myKey);
});
