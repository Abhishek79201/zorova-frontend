import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './component/store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='495364068061-v39bvpmh5g42p0dd4o8u378i7u36fi12.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
