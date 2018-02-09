import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Store from './store'
import { getRouterData } from './routes/nav'
import config from './config'
import { saveStatusWithUser } from './store/Login/action'
import { getLoginUser } from './service/user';
import {fetchAuth} from './store/authorization/action'
import { saveCurrentUser } from './store/User/action'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'


const routerData = getRouterData()
const UserLayout = routerData['/user'].component
const BasicLayout = routerData['/'].component
const DesignerLayout = routerData['/designer'].component

function App (props) {
  const {location, status} = props
  const needAuth = status !== 1 && config.needLogin

  return (<Router>
      <Switch>
        <Route location={location} path='/user' render={prop => <UserLayout {...prop} routerData={routerData}/>}/>
        {needAuth ?
        <Redirect key={'redirect'} from="/" to='/user/login'/>:[
            <Route key={'designer'} location={location} path='/designer' render={prop => <DesignerLayout routerData={routerData} {...prop} />}/>,
            <Route key={'basic'} location={location} path='/'  render={prop => <BasicLayout routerData={routerData} {...prop} />}/>,
          ]
        }
      </Switch>
    </Router>)
}

const Root = connect(state => state.get('login').toObject())(App);

async function initiation(){
  //加载权限列表
  Store.dispatch(await fetchAuth())
  //加载登陆用户
  const {success=false,data} = await getLoginUser()
  if(success){
    Store.dispatch(saveStatusWithUser(data))
    Store.dispatch(saveCurrentUser(data))
  }
}

(async function () {
  await initiation();
  ReactDOM.render(<Provider store={Store}><Root/></Provider>, document.getElementById('root'))
  registerServiceWorker()
})()

