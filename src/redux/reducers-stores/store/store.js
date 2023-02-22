import { configureStore } from '@reduxjs/toolkit';
import {userReducer}  from '../reducers/userReducer';
import filtersReducer from '../reducers/filtersReducer';
import CartReducer from '../reducers/cartReducer';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import sessionStorage from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import directoryReducer from '../reducers/directory-reducer';
import shopReducer from '../reducers/shop-reducer';



const persistConfig ={
  key: 'root',
  storage,
  blacklist: ['user']
};


// const userPersistConfig = {
//   key: 'user',
//   storage: sessionStorage,
// }

const rootReducer = combineReducers({ 
 user: userReducer,
  filters: filtersReducer,
  cart: CartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
  reducer:  persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
  
});


export const persistor = persistStore(store );

export default store ;

//user: persistReducer(userPersistConfig, userReducer),