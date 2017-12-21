import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/LoginLayout';
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

ReactDOM.render(
  <Provider store={Store}>
  <Router>
    <Switch >
      <Route exact path="/" key='index' render={() => (<Redirect to="/main"/>)}/>,
      <Route   path='/user' component={UserLayout} />
      <Route   path='/main' component={BasicLayout} />
      <Route render={()=><Exception type="403" linkElement={Link}/>}/>
    </Switch>
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
