import React from 'react';
import './index.css';
import CuberList from './CubeList'
import CubeEditor from './CubeEditor'
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
                {/*<Redirect to="/cubeList" />*/}
                <Redirect to="/cubeEditor" />
            </Switch>
        </Router>)
}

