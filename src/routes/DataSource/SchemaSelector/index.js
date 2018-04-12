import React from 'react'
import {Tooltip,Icon} from 'antd'
import styles from './schemaSelector.css'
import TableSchema from '../Tables/TableSchema'
import CubeSchema from '../Cube/CubeSchema'

export default class SchemaSelector extends React.PureComponent{
    constructor(props){
        super(props);
        let cube = true;
        if(this.props.tableId) cube = false;
        this.state={cube}
    }

    state = {
        cube:true,  // true : cube false : table
    };

    handleToggle = () => {
        this.setState((preState)=>({cube:!preState.cube}),()=>{
            if(this.props.onChangeType){
                this.props.onChangeType(this.state.cube?'cube':'table')
            }
        });
    };

    render(){
        return (<div className={styles.container} style={{width:'100%',textAlign:'center'}}>
            <h1>{this.state.cube?'Cube':'表'}模型
                <Tooltip title="模型切换">
                    <span className={styles.preview}><Icon type="swap" onClick={this.handleToggle}  /></span>
                </Tooltip>
            </h1>
            {
                this.state.cube ?
                <CubeSchema {...this.props}/>:<TableSchema {...this.props}/>
            }
        </div>)
    }
}