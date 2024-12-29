import * as modal from './modal.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    // renderSpinner(recipeContainer);
    recipeView.renderSpinner();

    await modal.loadRecipe(id);
    // const { recipe } = modal.state;

    recipeView.render(modal.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// showRecipe();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
