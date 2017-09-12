import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import request from 'superagent'
import {
  RECEIVE_RECIPES,
  RECEIVE_STEPS,
  RECEIVE_INGREDIENTS,
  HAS_ERRORED,
  DELETE_SUCCESS,
  ADD_RECIPE
} from '../constants/appConstants'

export const receiveRecipe = json => {
  return {
    type: RECEIVE_RECIPES,
    json
  }
}

export const clearRedux = () => {
  return {
    type: 'CLEAR_REDUX'
  }
}

export const receiveSteps = steps => {
  return {
    type: RECEIVE_STEPS,
    steps
  }
}

export const receiveIngredients = ingredients => {
  return {
    type: RECEIVE_INGREDIENTS,
    ingredients
  }
}

export const errRecipe = bool => {
  return {
    type: HAS_ERRORED,
    hasErrored: bool
  }
}

export const errSteps = bool => {
  return {
    type: HAS_ERRORED,
    hasErrored: bool
  }
}

export const fetchRecipe = url => {
  return async dispatch => {
    try {
      const res = await fetch(url, {
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/plain',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'True',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
          'Access-Control-Allow-Methods': 'GET, OPTIONS'
        }
      })
      const json = await res.json()
      dispatch(receiveRecipe(json))
    } catch (err) {
      dispatch(errRecipe(true))
    }
  }
}

export const fetchSteps = url => {
  return async dispatch => {
    try {
      const res = await fetch(url, {
        mode: 'cors'
      })
      const steps = await res.json
      dispatch(receiveSteps(steps))
    } catch (err) {
      dispatch(errSteps(true))
    }
  }
}

export const fetchIngredients = url => {
  return async dispatch => {
    try {
      const res = await fetch(url, {
        mode: 'cors'
      })
      const ingredients = await res.json()
      dispatch(receiveIngredients(ingredients))
    } catch (err) {
      dispatch(errSteps(true))
    }
  }
}

export const fetchStepsIngr = (urls, urli) => {
  return dispatch =>
    Promise.all([dispatch(fetchSteps(urls)), dispatch(fetchIngredients(urli))])
}

export const deleteSuccess = idx => {
  return {
    type: DELETE_SUCCESS,
    payload: idx
  }
}

export const deleteRecipe = (id, idx) => {
  return async dispatch => {
    try {
      const res = await fetch(
        `https://quiet-citadel-22666.herokuapp.com/recipes/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
          }
        }
      )
      dispatch(deleteSuccess(idx))
    } catch (error) {
      console.log(error)
    }
  }
}

export const postRecipe = file => async dispatch => {
  try {
    await request
      .post('https://quiet-citadel-22666.herokuapp.com/recipes/')
      .send(file)
  } catch (err) {
    console.log(err)
  }
}

export const addRecipe = file => {
  return {
    type: ADD_RECIPE,
    file
  }
}
