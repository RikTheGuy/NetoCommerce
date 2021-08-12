import React from 'react';
import MainNavigator from './screens/navigation/MainNavigator.js'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { ProductListReducer, ProductDetailReducer } from './store/reducers/ProductReducer.js'
import { CartReducer } from './store/reducers/CartReducer.js'

const reducer = combineReducers({
  productList: ProductListReducer, productDetail: ProductDetailReducer,
  cart: CartReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}