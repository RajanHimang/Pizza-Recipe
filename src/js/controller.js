import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }
// console.log(icons);
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.jonas.io

///////////////////////////////////////
// console.log('test');

// const renderSpinner = function (parentEl) {
//   const markup = `
//           <div class="spinner">
//               <svg>
//               <use href="${icons}#icon-loader"></use>
//             </svg>
//           </div>`;
//   parentEl.innerHTML = '';

//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    // renderSpinner(recipeContainer);
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    // const { recipe } = modal.state;

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(3));
    // Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();

const controlPagination = function (goToPage) {
  // Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination button
  paginationView.render(model.state.search);
};
// controlRecipes();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
