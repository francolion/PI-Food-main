import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  RESET_DETAIL,
  GET_RECIPES_BY_QUERY,
  RECIPE_NOT_FOUND,
  FILTER_SEARCHBAR,
  FILTER_BY_DIETS,
  FILTER_BY_HEALTHSCORE,
  FILTER_BY_NAME,
  FILTER_BY_ORIGIN,
  DELETE_FILTERS,
} from "./actionsTypes";

import axios from "axios";

export const getAllRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/recipes");
    const recipes = apiData.data;
    dispatch({ type: GET_ALL_RECIPES, payload: recipes });
  };
};
export const getRecipeDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    const data = response.data;
    return dispatch({
      type: GET_RECIPE_BY_ID,
      payload: data,
    });
  };
};
export const resetDetail = (dispatch) => {
  return (dispatch) => {
    return dispatch({
      type: RESET_DETAIL,
    });
  };
};
export const getRecipesByQuery = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/?name=${name}`
      );
      const payload = response.data;
      return dispatch({
        type: GET_RECIPES_BY_QUERY,
        payload,
      });
    } catch (error) {
      return dispatch({
        type: RECIPE_NOT_FOUND,
      });
    }
  };
};
export const getAllDiets = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/diets");
    const data = response.data;
    return dispatch({
      type: GET_ALL_DIETS,
      payload: data,
    });
  };
};
export const createRecipe = (payload) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/recipes/",
      payload
    );
    if (response.status !== 400) {
      return dispatch({
        type: CREATE_RECIPE,
        payload,
      });
    }
  };
};
export const filterSearchBar = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_SEARCHBAR,
      payload,
    });
  };
};

export const filterByName = (order) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_NAME,
      payload: order,
    });
  };
};
export const filterByDiets = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_DIETS,
      payload,
    });
  };
};
export const filterByOrigin = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_ORIGIN,
      payload,
    });
  };
};
export const filterByHealthScore = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_HEALTHSCORE,
      payload,
    });
  };
};

export const deleteFilters = () => {
  return (dispatch) => {
    return dispatch({
      type: DELETE_FILTERS,
    });
  };
};
