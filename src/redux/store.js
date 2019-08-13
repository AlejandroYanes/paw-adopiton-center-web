import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers';

const store = createStore(
  combineReducers({ ...appReducers }),
  applyMiddleware(thunk),
);

export default store;
