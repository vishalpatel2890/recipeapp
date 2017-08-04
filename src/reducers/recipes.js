import {RECEIVE_RECIPES, RECEIVE_STEPS, RECEIVE_INGREDIENTS, HAS_ERRORED} from '../constants/appConstants';

// const initialState = {
//     isLoading : true,
//     recipe : []
// };

export function recipe(
  state = [],
  action
) {
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_RECIPES:
     return [...state, ...action.json];

    case HAS_ERRORED:
          return action.hasErrored;

    default:
            return state
}
}

export function ingredients(
  state = [],
  action
) {
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_INGREDIENTS:
     return [...state, ...action.ingredients];

     default:
      return state
 }
 }

export function steps(
  state = [],
  action
) {
  switch (action.type) {
    // case REQUEST_RECIPES:
    //   return [state, action.isLoading];

    case RECEIVE_STEPS:
     return [...state, ...action.steps];

     default:
             return state
 }
 }






// export function recipes(  state = {
//     isFetching: false,
//     didInvalidate: false,
//     recipes: []
//   },
//   action
// ) {
//     switch (action.type) {
//         case 'FETCH_RECIPE':
//         return Object.assign({}, state, {
//           isFetching: true,
//           didInvalidate: false,
//           recipes : action.recipes
//         })
//         default:
//             return state;
//     }
// }
