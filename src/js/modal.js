import { async } from 'regenerator-runtime';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    // 'https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297'
    // console.log(res);
    const data = await res.json();
    // console.log(res, data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
    };

    // console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
