import {
  RECEIVE_RECIPES,
  RECEIVE_STEPS,
  RECEIVE_INGREDIENTS,
<<<<<<< HEAD
  HAS_ERRORED,
  DELETE_SUCCESS
} from '../constants/appConstants'

// const initialState = {
//     isLoading : true,
//     recipe : []
// };

export function recipe(state = [], action) {
=======
  RECIPE_HAS_ERRORED,
  DELETE_SUCCESS,
  ADD_RECIPE
} from '../constants/appConstants'

export const recipe = (state = [], action) => {
>>>>>>> development
  switch (action.type) {
    case RECEIVE_RECIPES:
      return [...state, ...action.json]
<<<<<<< HEAD

    case DELETE_SUCCESS:
      return [...state, ...action.payload]

    case HAS_ERRORED:
=======

    case ADD_RECIPE:
      return [state, action.file]

    case DELETE_SUCCESS:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]

    case RECIPE_HAS_ERRORED:
>>>>>>> development
      return action.hasErrored

    default:
      return state
  }
}

<<<<<<< HEAD
export function ingredients(state = [], action) {
=======
export const ingredients = (state = [], action) => {
>>>>>>> development
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_INGREDIENTS:
      return [...state, ...action.ingredients]

    default:
      return state
  }
}

<<<<<<< HEAD
export function steps(state = [], action) {
=======
export const steps = (state = [], action) => {
>>>>>>> development
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_STEPS:
      return [...state, ...action.steps]

    default:
      return state
  }
}
