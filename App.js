import React from 'react';
import MainNavigator from './screens/navigation/MainNavigator.js'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { ProductListReducer } from './store/reducers/ProductReducer.js'

const reducer = combineReducers({
  productList: ProductListReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}