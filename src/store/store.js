import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';
import createSagaMiddleware from 'redux-saga'
import { watchAuth, watchBurguerBuilder, watchOrder } from './sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurguerBuilder);
sagaMiddleware.run(watchOrder);
export default store;