import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {  BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { CookiesProvider } from 'react-cookie';
import AlertTemplate from 'react-alert-template-basic'

// Redux Set up
// reducer
import rootReducer from './reducer'
// Redux Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '100px',
  containerStyle: {
    zIndex: 1000,
  },
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <App />
          </Router>
        </AlertProvider>
      </CookiesProvider>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
