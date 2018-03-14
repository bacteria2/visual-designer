import React from 'react';
import CacheEditor from './index'

export default class CacheEditorDemo extends React.PureComponent{

    changeHandle = (data)=>{
        console.log(data);
    };

    render(){
        return (<div style={{width:400}}>
            <CacheEditor defaultValue={{
                enable:true,
                interval:600,
                flushTime:'060200'}} onChange={this.changeHandle}/>
        </div>)
    }

}