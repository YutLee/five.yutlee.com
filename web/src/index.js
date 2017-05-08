import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import App from './components/App.js';
import About from './components/About.js';

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

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(['./components/App.js', './components/About.js'], () => {
    ReactDom.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Route exact path="/" component={App}/>
              <Route path="/about" component={About}/>
            </div>
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
