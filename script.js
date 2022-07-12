var red = "#FF220C";
var yellow ="#FFBA08"
var accentRed = "#69140E";
var borderPurple ="#261447";
var bgWhite = "#FBFEF9";

var formSubmitHandler = function (event) {
    event.preventDefault();

    var ingredient = ingredientInputEl.value.trim();

    if (ingredient) {
        getRecipeRepos(ingredient);

        repoContainerEl.textContent = '';
        recipeInputEl.value = '';
    } else {
        alert('Please enter at least one ingredient! Dig to the back of your pantry!');
        console.log(ingredient);
    }
};

var getRecipeRepos = function (ingredient) {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=94c55930&app_key=%201c3476c6fc8d3b7ee88d9f887c63fd85'

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent
    }
}