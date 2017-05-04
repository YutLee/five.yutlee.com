import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './components/App.js'

ReactDom.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    ReactDom.render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
