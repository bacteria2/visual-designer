import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/LoginLayout';
import HeadBodyLayout from './layouts/HeadBodyLayout';
import Exception from './components/Exception'
import { Provider } from 'react-redux'
import Store from './store';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

function Root(props){
  return <Provider store={Store}>
    <Router>
      <Switch >
        <Route location={props.location} path='/user' component={UserLayout} />
        <Route location={props.location} path='/' component={BasicLayout} />
      </Switch>
    </Router>
  </Provider>
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
