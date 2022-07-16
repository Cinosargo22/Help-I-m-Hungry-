// debugger

// var red = "#FF220C";
// var yellow ="#FFBA08"
// var accentRed = "#69140E";
// var borderPurple ="#261447";
// var bgWhite = "#FBFEF9";

var ingredientInputEl = document.querySelector(".ingredient-input");
var ingredientSearchButton = document.querySelector(".ingredient-button");
requestUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=94c55930&app_key=%201c3476c6fc8d3b7ee88d9f887c63fd85";

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

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
    //change to modal
    alert(
      "Please enter at least one ingredient! Dig to the back of your pantry!"
    );
    console.log(ingredient);
  }
};

var getRecipe = function (ingredient) {
  var apiUrl =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    ingredient +
    "&app_id=94c55930&app_key=%201c3476c6fc8d3b7ee88d9f887c63fd85";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showRecipe(data);

      // img.setAttribute("src", imgPath)
      // document.body.appendChild(img)
    })
    .catch(function (error) {
      alert("Unable to connect to Edamam.");
      // console.log(error);
    });
};

function showRecipe(data) {
  console.log(data.hits[0]);
  $(".rep_card").empty();

  for (var i = 0; i < 5; i++) {
    console.log(hits.hits[i].recipe.url);
    let template = `<div class="card cell medium-4" style="width: 300px;">
                <div class=""><a href="${[i].recipe.url}" target="_blank">${
      recipe.label
    }</a></div>
                <img src="${[i].recipe.image}" alt="${
      [i].recipe.label
    }" SameSite="Lax">
             
            </div>`;
    $(".rep_card").append(template);
  }
}

ingredientSearchButton.addEventListener("click", formSubmitHandler);

function sendApiRequest(ingredient) {
  var giphyApiUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=C3ZPqXLVWSHKBdEwxjhZDGcmnfeuQ8LE&q=" +
    ingredient +
    "&limit=25&offset=0&rating=g&lang=en";

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
      document.body.appendChild(img);
    });
}

// function insertRecipe (data) {
//     $(".rep_card").empty();
//     let recipes = data.hits;
//     for (var i = 0; i < 5; i++) {
//         let recipe = recipes[i].recipe;
//         let template =
//             `<div class="card cell medium-4" style="width: 300px;">
//                 <div class="card-divider"><a href="${recipe.url}" target="_blank">${recipe.label}</a></div>
//                 <img src="${recipe.image}" alt="${recipe.label}" SameSite="Lax">
//                 <p>Calories: ${Math.round(recipe.calories)}</p>
//                 <p>Serves: ${recipe.yield}</p>
//             </div>`;
//     $( ".rep_card").append(template);
//     }
// }

// insertRecipe();
