import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}
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
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();

// controlRecipes();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
