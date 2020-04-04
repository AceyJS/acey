import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-ascey' //HERE
import store from './ascey/store' //HERE

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* HERE */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
