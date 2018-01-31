import React from 'react';
import './index.css';
import CuberList from './CubeList'
import CubeEditor from './CubeEditor'
import demo from './CubeSchema/demo'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

export default function Cube(props){
    return (<Router>
            <Switch >
                <Route location={props.location} path='/cubeList' component={CuberList} />
                <Route location={props.location} path='/cubeEditor/:id' component={CubeEditor} />
                <Route location={props.location} path='/demo' component={demo} />
                {/*<Route location={props.location} path='/DustbinMultipleTargets' component={DustbinMultipleTargets} />*/}
                {/*<Redirect to="/cubeList" />*/}
                <Redirect to="/demo" />
                {/*<Redirect to="/cubeEditor" />*/}
                {/*<Redirect to="/DustbinMultipleTargets" />*/}
            </Switch>
        </Router>)
}

