import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import request from 'superagent'
import {
  RECEIVE_INGREDIENTS,
  INGREDIENTS_HAS_ERRORED
} from '../constants/appConstants'

export const receiveIngredients = ingredients => {
  return {
    type: RECEIVE_INGREDIENTS,
    ingredients
  }
}

export const errIngredients = bool => {
  return {
    type: INGREDIENTS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function fetchIngredients(url) {
  return dispatch => {
    return fetch(url, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(ingredients => dispatch(receiveIngredients(ingredients)))
      .catch(() => dispatch(errIngredients(true)))
  }
}
