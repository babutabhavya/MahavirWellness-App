import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import {persistStore} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(rootReducer, applyMiddleware(...[sagaMiddleware]));

let persistor = persistStore(store);
export {persistor, sagaMiddleware};
export default store;
