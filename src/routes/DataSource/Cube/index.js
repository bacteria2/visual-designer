import React from 'react';
import './index.css';
import CuberList from './CubeList'
import CubeEditor from './CubeEditor'
import demo from './CubeSchema/demo'

import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { Error404 } from '../../Error'


export default function Cube(props){
    let {match, location}=props;

    return (<Switch >
                <Route location={location} path={`${match.path}/list`} component={CuberList} />
                <Route location={location} path={`${match.path}/editor/:id`} component={CubeEditor} />
                <Route location={location} path={`${match.path}/demo`} component={demo} />
                {/*<Route location={props.location} path='/DustbinMultipleTargets' component={DustbinMultipleTargets} />*/}
                {/*<Redirect to="/cubeList" />*/}
                <Redirect to={`${match.path}/demo`} />
                {/*<Redirect to="/cubeEditor" />*/}
                {/*<Redirect to="/DustbinMultipleTargets" />*/}
                <Route render={Error404} />
            </Switch> )
}

