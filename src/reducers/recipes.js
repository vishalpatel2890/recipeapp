import {
  RECEIVE_RECIPES,
  RECEIVE_STEPS,
  RECEIVE_INGREDIENTS,
  RECIPE_HAS_ERRORED,
  DELETE_SUCCESS,
  ADD_RECIPE
} from '../constants/appConstants'

export const recipe = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RECIPES:
      return [...state, ...action.json]

    case ADD_RECIPE:
      return [state, action.file]

    case DELETE_SUCCESS:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]

    case RECIPE_HAS_ERRORED:
      return action.hasErrored

    default:
      return state
  }
}

export const ingredients = (state = [], action) => {
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_INGREDIENTS:
      return [...state, ...action.ingredients]

    default:
      return state
  }
}

export const steps = (state = [], action) => {
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_STEPS:
      return [...state, ...action.steps]

    default:
      return state
  }
}
