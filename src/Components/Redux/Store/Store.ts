import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { moviesReducer } from '../Reducer/Reducer';
import { rootSaga } from '../Saga/RootSaga'; 

//  middleware для Redux Saga
const sagaMiddleware = createSagaMiddleware();

//  хранилище с редуктором и middleware
const store = createStore(
  moviesReducer,
  applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(rootSaga);

export default store;
