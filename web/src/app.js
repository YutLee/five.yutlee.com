import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import App from './components/App';

let enhancer;
if (process.env.NODE_ENV !== 'production') {
	enhancer = compose(
    applyMiddleware(thunk, createLogger()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}else {
	enhancer = compose(
    applyMiddleware(thunk)
  )
}

let store = createStore(reducer, enhancer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)