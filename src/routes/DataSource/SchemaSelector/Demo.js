import React from 'react'
import SchemaSelector from './index'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


@DragDropContext(HTML5Backend)
export default class SchemaDemo extends React.PureComponent{

    render(){
        const containerStyle = {float:'left',height:'800px',width:'300px',position:'relative',display:'flex'};
        return (<div style={{height:'800px'}}>
                    <div style={{...containerStyle,marginLeft:'20px'}}>
                        <SchemaSelector
                                         onChange={(e)=>{console.log(e)}}
                                         onChangeType = {(e)=>{console.log(e)}}
                        />
                    </div>
                </div>)
    }
}