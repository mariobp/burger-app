import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

export default store;