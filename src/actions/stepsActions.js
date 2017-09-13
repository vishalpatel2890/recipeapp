import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import request from 'superagent'
import { RECEIVE_STEPS, STEPS_HAS_ERRORED } from '../constants/appConstants'
import { fetchIngredients } from './ingredientsActions'

//pass fetch data to store
export const receiveSteps = steps => {
  return {
    type: RECEIVE_STEPS,
    steps
  }
}

//error handling - not functional yet
export const errSteps = bool => {
  return {
    type: STEPS_HAS_ERRORED,
    hasErrored: bool
  }
}

//fetch steps
export function fetchSteps(url) {
  return dispatch => {
    // dispatch(requestRecipe())
    return fetch(url, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(steps => dispatch(receiveSteps(steps)))
      .catch(() => dispatch(errSteps(true)))
  }
}

//fetch steps and ingredients
export const fetchStepsIngr = (urls, urli) => {
  return dispatch =>
    Promise.all([dispatch(fetchSteps(urls)), dispatch(fetchIngredients(urli))])
}
