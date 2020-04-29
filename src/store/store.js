import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

export default store;