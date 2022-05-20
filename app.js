// Variables
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");
const errorElement = document.querySelector(".error-sec");
const gifsElement = document.querySelector(".gifs-sec");

// Functions

// This function will fetch data from API and show data to the user
const fetchGifs = async () => {
  // API base url
  const baseURL = "https://api.giphy.com/v1/gifs/search?q=";
  // API access key
  const apiKey = "WML5l3NkGoCikSEc49SkUKc3vW6tPLtn";
  // Search value
  const searchValue = searchInput.value;
  // Checking if searchValue is empty
  if (searchValue === "") return;

  // Getting data from API
  const response = await fetch(
    `${baseURL}${searchValue}&api_key=${apiKey}&limit=20`
  );
  // Parsing response
  const result = await response.json();

  // Checking if data is empty
  if (result.data.length === 0) {
    // Removing previous data from gifs element
    gifsElement.innerHTML = "";
    // Removing previous data from error element
    errorElement.innerHTML = "";
    // Generating new error message
    errorElement.innerHTML = `<p class="error-message">Sorry we can't find any gif</>`;
  }
  // Else
  else {
    // Removing previous data from gifs element
    gifsElement.innerHTML = "";
    // Removing previous data from error element
    errorElement.innerHTML = "";
    // Generating new gifs data
    result.data.forEach((item) => {
      // Inserting gifs data
      gifsElement.innerHTML += `<div class="gif">
        <img src="https://i.giphy.com/media/${item.id}/giphy.webp" alt="gif">
        <button data-id="${item.id}" data-name="${item.title}" class="add-fav__btn">add favorites</button>
        </div>`;
    });
    // Selecting addFavorite button
    const addFavoriteBtn = document.querySelectorAll(".add-fav__btn");
    // Adding event listener to add favorite button
    addFavoriteBtn.forEach((element) => {
      element.addEventListener("click", addFavorite);
    });
  }
};

// This funcitoin will add your favorite to localStorage
const addFavorite = (e) => {
  // Extracting data from element attributes
  const id = e.target.getAttribute("data-id");
  const name = e.target.getAttribute("data-name");

  // Getting data from localStorage
  let storedData = localStorage.getItem("favorites");
  // Checking if storedData is not null
  if (storedData) {
    // Creating data checker for checking if data is already exist inside  localStorage
    let dataChecker = false;
    // Creating data array to store new and old data
    const dataArray = [];
    // Creating data object so we can store it into localStorage
    const newData = {
      id,
      name,
    };
    // Pushing new data into dataArray
    dataArray.push(newData);
    // Pushing old data into dataArray
    JSON.parse(storedData).forEach((item) => {
      // Checking if item id match given id
      if (item.id == id) dataChecker = true;
      else dataArray.push(item);
    });

    // If data exist than return
    if (dataChecker) return;

    // Storing favorite into localStorage
    localStorage.setItem("favorites", JSON.stringify(dataArray));
  }
  // Else
  else {
    // Creating data object so we can store it into localStorage
    const data = JSON.stringify([
      {
        id,
        name,
      },
    ]);
    // Storing favorite into localStorage
    localStorage.setItem("favorites", data);
  }
};

// Event listeners

// Adding event listener to search button
searchBtn.addEventListener("click", fetchGifs);

// Adding event listener to Enter button
window.addEventListener("keypress", (e) => {
  // Checking if correct key press
  if (e.key === "Enter") {
    fetchGifs();
  }
});
