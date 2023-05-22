import {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  RESET_DETAIL,
  GET_RECIPES_BY_QUERY,
  FILTER_SEARCHBAR,
  FILTER_BY_DIETS,
  GET_ALL_DIETS,
  FILTER_BY_ORIGIN,
  FILTER_BY_HEALTHSCORE,
  FILTER_BY_NAME,
  DELETE_FILTERS,
} from "./actionsTypes";

const initialState = {
  recipes: [],
  allRecipes: [],
  detailRecipe: {},
  allDiets: [],
  created: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: action.payload, allRecipes: action.payload };

    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: action.payload,
      };

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        detailRecipe: action.payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        detailRecipe: {},
      };
    case GET_RECIPES_BY_QUERY:
      return {
        ...state,
        recipes: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        created: true,
      };

    case FILTER_SEARCHBAR:
      const filterRecipes = state.recipes;
      const filterfinish = filterRecipes.filter((recipe) => {
        const name = recipe.name.toLowerCase();
        if (name.includes(action.payload)) return recipe;
      });
      return {
        ...state,
        recipes: filterfinish,
      };

    case FILTER_BY_DIETS:
      const filterByDiet = state.allRecipes.filter((recipe) =>
        recipe.diets.some((element) => {
          return element === action.payload;
        })
      );
      return {
        ...state,
        recipes: filterByDiet,
      };
    case FILTER_BY_ORIGIN:
      let sort = [];
      if (action.payload === "DataBase") {
        sort = state.allRecipes.filter((element) => element.db === true);
      } else {
        sort = state.allRecipes.filter((element) => element.db !== true);
      }
      return {
        ...state,
        recipes: sort,
      };
    case FILTER_BY_HEALTHSCORE:
      const byHealthScore =
        action.payload === "ascendente"
          ? [...state.recipes].sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : action.payload === "descendente"
          ? [...state.recipes].sort((a, b) => {
              if (a.healthScore > b.healthScore) return -1;
              if (a.healthScore < b.healthScore) return 1;
              return 0;
            })
          : [...state.allRecipes];
      return {
        ...state,
        recipes: byHealthScore,
      };
    case FILTER_BY_NAME:
      const byName =
        action.payload === "ascendente"
          ? [...state.recipes].sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : action.payload === "descendente"
          ? [...state.recipes].sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            })
          : [...state.allRecipes];
      return {
        ...state,
        recipes: byName,
      };

    case DELETE_FILTERS:
      return {
        ...state,
        recipes: [...state.allRecipes],
      };

    default:
      return { ...state };
  }
};
export default reducer;
