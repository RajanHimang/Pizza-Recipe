import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

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

// controlRecipes();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
