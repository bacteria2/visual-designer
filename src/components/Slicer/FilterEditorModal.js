import React from 'react';
import {Modal} from 'antd';
import styles from './slicer.css'


export default class FilterEditorModal extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    submitData = ()=>{

        if(this.props.onOK){
            this.props.onOK(this.props.defaultValue);
        }
    };

    render(){
        return (<Modal title="过滤项编辑"
                       width={540}
                       visible={this.props.visible}
                       bodyStyle = {{padding:'0 20px'}}
                       onOk={this.submitData}
                       onCancel={this.props.onCancel}
                       okText="确认"
                       maskClosable = {false}
                       cancelText="取消">
            <div className={styles.filterEditorWrap}>

            </div>
        </Modal>)
    }
}