import { combineReducers } from 'redux'
import { recipe, steps, ingredients } from './recipes'

const appReducer = combineReducers({
  recipe: recipe,
  steps: steps,
  ingredients: ingredients
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_REDUX') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
