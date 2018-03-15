import React from 'react';
import CacheEditor from './index'

export default class CacheEditorDemo extends React.PureComponent{

    changeHandle = (k,data)=>{
        console.log(data);
    };

    render(){
        return (<div style={{width:400}}>
            <CacheEditor defaultValue={{
                enable:false,
                }} onChange={this.changeHandle}/>
        </div>)
    }

}