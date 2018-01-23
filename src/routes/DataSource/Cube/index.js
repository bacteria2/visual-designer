import React from 'react';
import './index.css';
import CuberList from './CubeList'
import CubeEditor from './CubeEditor'
import DustbinMultipleTargets from './PivotSchema/DndDemo/Demo'
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
                <Route location={props.location} path='/cubeEditor' component={CubeEditor} />
                {/*<Route location={props.location} path='/DustbinMultipleTargets' component={DustbinMultipleTargets} />*/}
                {/*<Redirect to="/cubeList" />*/}
                <Redirect to="/cubeEditor" />
                {/*<Redirect to="/DustbinMultipleTargets" />*/}
            </Switch>
        </Router>)
}

