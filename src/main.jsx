import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/index.jsx'
import { productsFetch } from './components/store/features/ProductSlide.jsx'
import {CartSlice} from './components/store/features/CartSlice.jsx'
import { AuthSlice } from './components/store/features/AuthSlice.jsx'
store.dispatch(productsFetch())
store.dispatch(CartSlice.actions.getCartTotal())
store.dispatch(AuthSlice.actions.loadUser())
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
