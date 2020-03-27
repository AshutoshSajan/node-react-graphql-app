import {
  createStore,
  applyMiddleware
} from 'redux';

import {
  combineReducers
} from 'redux';
import Thunk from 'redux-thunk';

import {
  usersReducer
} from './users';



const rootReducer = combineReducers({
  user: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(Thunk));