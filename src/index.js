import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import ReactGA from 'react-ga';

import configureStore from './helpers/store';
import Index from './containers/Index';
import registerServiceWorker from './registerServiceWorker';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import '../stylesheets/style.scss';
import '../stylesheets/00_foundation/reset.css';
import '../stylesheets/00_foundation/foundation.css';
import '../stylesheets/00_foundation/loading.css';


const store = configureStore();

ReactGA.initialize('UA-119666839-1', {debug: true});
const page = window.location.href;
ReactGA.pageview(page);

render(
  (
    <Provider store={store}>
      <Index />
    </Provider>
  ), document.getElementById('root')
);

registerServiceWorker();
