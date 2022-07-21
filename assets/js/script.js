// debugger

// var red = "#FF220C";
// var yellow ="#FFBA08"
// var accentRed = "#69140E";
// var borderPurple ="#261447";
// var bgWhite = "#FBFEF9";

var giphyPrint = document.getElementById("giphy");

var ingredientInputEl = document.querySelector(".ingredient-input");
var ingredientSearchButton = document.querySelector(".ingredient-button");

var searchEl = document.getElementById("input");
var historyEl = document.getElementById("history");

let recipeHistory = JSON.parse(localStorage.getItem(`key`)) || [];

console.log("Recipe History: " + recipeHistory);

var formSubmitHandler = function (event) {
  console.log(event);
  event.preventDefault();

  var ingredient = ingredientInputEl.value.trim();
  console.log(ingredient);


  

  if (ingredient) {
    console.log("if(ingredient)");
    getRecipe(ingredient);
    sendApiRequest(ingredient);
  } else {
    openModal(
      "Please enter at least one ingredient! Dig to the back of your pantry!"
    );
    console.log(ingredient);
  }
};

var getRecipe = function (ingredient) {
  var apiUrl =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    ingredient +
    "&limit=5&app_id=94c55930&app_key=%201c3476c6fc8d3b7ee88d9f887c63fd85";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showRecipe(data);
    });

  //     .catch(function (error) {
  //     alert("Unable to connect to Edamam.");
  //     // console.log(error);
  //   });
};

function showRecipe(data) {
  $(".section").empty();
  console.log(data);
  $(".card-content").empty();

  for (var i = 0; i < 5; i++) {
    console.log(data.hits[i].recipe.url);

    // change styling of template to the card format that we want
    let template = `<div style="background-image: url(./) class="content is-block  is-info  is-medium is-relative  " style="width: 1080px; height 1080px;">
                    <button style="background-color: darkslateblue;" class ="fav-icon" is-primary">❤️</button>
                <div class="is-block has-text-centered" ><a style="background-image: url(./assets/images/Logos_Help!IMHungry/white_logo_dark_background.jpg); color: white; href="${data.hits[i].recipe.url}" target="_blank">${data.hits[i].recipe.label}</a></div>
                <img class="is-centered is-block m-2 p-2" src="${data.hits[i].recipe.image}" alt="${data.hits[i].recipe.label}" SameSite="Lax">
                
                        </div>`;
    $(".section").append(template);
  }
}

ingredientSearchButton.addEventListener("click", formSubmitHandler, function (){
  var searchTerm = ingredient.value 
  renderSearchHistory();
  localStorage.setItem(recipeHistory, JSON.stringify(recipeHistory))
});

function sendApiRequest(ingredient) {
  var giphyApiUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=C3ZPqXLVWSHKBdEwxjhZDGcmnfeuQ8LE&q=" +
    ingredient +
    "&limit=10&offset=0&rating=g&lang=en";

  fetch(giphyApiUrl)
    .then(function (data) {
      return data.json();
      console.log(data.json());
    })
    .then(function (data) {
      console.log(data);
      console.log(data.data[0].images.fixed_height.url);
      var imgPath = data.data[0].images.fixed_height.url;

      var img = document.createElement("img");
      img.setAttribute("src", imgPath);
      giphyPrint.append(img);
    });
}


function renderSearchHistory (){
  historyEl.innerHTML = "";
  for (var i=0; i<10; i++){
    searchEl.addEventListener("click", function (){
      getRecipe(searchEL.value);
    })
    historyEl.append(searchEl);
  }
  console.log(renderSearchHistory);
}

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
