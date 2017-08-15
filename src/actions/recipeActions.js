import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import {RECEIVE_RECIPES, RECEIVE_STEPS, RECEIVE_INGREDIENTS, HAS_ERRORED} from '../constants/appConstants';


// export function requestRecipe(bool) {
//   return {
//     type: REQUEST_RECIPES,
//     isLoading: bool
//   }
// }

export function receiveRecipe(json) {
  return {
    type: RECEIVE_RECIPES,
    json
  }
}

export function clearRedux() {
  return {
    type: 'CLEAR_REDUX',
  }
}

export function receiveSteps(steps) {
  return {
    type: RECEIVE_STEPS,
    steps
  }
}

export function receiveIngredients(ingredients) {
  return {
    type: RECEIVE_INGREDIENTS,
    ingredients
  }
}

export function errRecipe(bool) {
  return {
    type: HAS_ERRORED,
    hasErrored: bool
  }
}

export function errSteps(bool) {
  return {
    type: HAS_ERRORED,
    hasErrored: bool
  }
}

export function fetchRecipe(url) {
  return dispatch => {

    return fetch(url, {
      mode:'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type':'text/plain',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'True',
          'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-methods, Access-Control-Allow-Origin, x-requested-with',
          'Access-Control-Allow-Methods' : 'GET, OPTIONS'
      },
    })
      .then(response => response.json())
      .then(json => dispatch(receiveRecipe(json)))
      .catch(() => dispatch(errRecipe(true)));
  }
}

export function fetchSteps(url) {
  return dispatch => {
    // dispatch(requestRecipe())
    return fetch(url, {
      mode:'cors'
    })
      .then(response => response.json())
      .then(steps => dispatch(receiveSteps(steps)))
      .catch(() => dispatch(errSteps(true)));
  }
}

export function fetchIngredients(url) {
  return dispatch => {
    return fetch(url, {
      mode:'cors'
    })
      .then(response => response.json())
      .then(ingredients => dispatch(receiveIngredients(ingredients)))
      .catch(() => dispatch(errSteps(true)));
  }
}

export function fetchStepsIngr(urls,urli) {
  return dispatch => Promise.all([
    dispatch(fetchSteps(urls)),
    dispatch(fetchIngredients(urli))
  ]);
}
