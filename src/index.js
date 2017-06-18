import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.css';
import './cosmo/css/cosmo.css';
import './index.css';

injectTapEventPlugin();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
