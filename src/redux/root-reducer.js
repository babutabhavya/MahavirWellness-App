import {combineReducers} from 'redux';
import authReducer from './reducers/auth';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
  cartReducer: persistReducer(
    {key: 'root:cart', storage: AsyncStorage},
    cartReducer,
  ),
  authReducer: persistReducer(
    {key: 'root:auth', storage: AsyncStorage},
    authReducer,
  ),
});

export default rootReducer;
