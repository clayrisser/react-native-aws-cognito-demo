import reduxThunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import reducers from './reducers';

const composeEnhancers = composeWithDevTools({});

export default function() {
  const middleware = composeEnhancers(applyMiddleware(reduxThunk));
  const reducer = combineReducers(reducers);
  return createStore(reducer, initialState, middleware);
}
