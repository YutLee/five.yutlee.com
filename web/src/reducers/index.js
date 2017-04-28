import { combineReducers } from 'redux'

export default function index(state = {customerName: ''}, action) {
  let newState = Object.assign({}, state, {
        customerName: action.customerName
      });
  switch (action.type) {
    case 'GET_CUSTOMER_NAME': {
      return newState;
    }
    default:
      return state
  }
}