import React from 'react'
import TableSchema from './index'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


@DragDropContext(HTML5Backend)
export default class TableSchemaDemo extends React.PureComponent{

    render(){
        const containerStyle = {float:'left',height:'800px',width:'300px',position:'relative',display:'flex'};
        return (<div style={{height:'800px'}}>
                    <div style={{...containerStyle,marginLeft:'20px'}}>
                        <TableSchema value = "5acacb96acab040c601a9a5f"/>
                    </div>
                </div>)
    }
}