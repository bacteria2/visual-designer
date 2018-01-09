import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import Store from './store';
import {getRouterData} from './routes/nav';


import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


function Root(props){
  const routerData = getRouterData();
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const DesignerLayout = routerData['/designer'].component;
  return <Provider store={Store}>
    <Router>
      <Switch >
        <Route location={props.location} path='/user' render={ props => <UserLayout {...props} routerData={routerData} /> } />
        <Route location={props.location} path='/designer' render={ props => <DesignerLayout {...props} routerData={routerData} /> } />
        <Route location={props.location} path='/' render={ props => <BasicLayout {...props} routerData={routerData}/> } />
      </Switch>
    </Router>
  </Provider>
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
