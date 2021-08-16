import React from 'react';
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProductListReducer, ProductDetailReducer } from './store/reducers/ProductReducer.js'
import { OrderListReducer, OrderDetailReducer, OrderCreateReducer } from './store/reducers/OrderReducer.js'
import { CartReducer, CartAddressReducer } from './store/reducers/CartReducer.js'
import { LoginReducer, RegisterReducer } from './store/reducers/AuthReducer.js'

import MainNavigator from './screens/navigation/MainNavigator.js'

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['data']
}

const reducer = combineReducers({
  productList: ProductListReducer, productDetail: ProductDetailReducer,
  orderList: OrderListReducer, orderDetail: OrderDetailReducer, orderCreate: OrderCreateReducer,
  cart: CartReducer, cartAddress: CartAddressReducer,
  authLogin: persistReducer(authConfig, LoginReducer), authRegister: RegisterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}