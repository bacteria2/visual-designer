import React from 'react';
import {Modal} from 'antd';

export default class FilterEditorModal extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    submitData = ()=>{

    };

    render(){
        return (<Modal title="过滤项编辑"
                       visible={this.props.visible}
                       onOk={this.submitData}
                       onCancel={this.props.onCancel}
                       okText="确认"
                       cancelText="取消">
            <div>过滤器编辑</div>
        </Modal>)
    }
}