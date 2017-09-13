import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import request from 'superagent'
import {
  RECEIVE_RECIPES,
  RECIPE_HAS_ERRORED,
  DELETE_SUCCESS
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

export const errRecipe = bool => {
  return {
    type: RECIPE_HAS_ERRORED,
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

export const postRecipe = (file, history) => async dispatch => {
  try {
    const res = await request
      .post('https://quiet-citadel-22666.herokuapp.com/recipes/')
      .send(file)
    history.push('/recipelist')
  } catch (err) {
    console.log(err)
  }
}
