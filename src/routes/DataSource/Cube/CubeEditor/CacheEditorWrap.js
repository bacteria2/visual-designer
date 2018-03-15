import React from 'react'
import {Modal} from 'antd'
import isFunc from 'lodash/isFunction'
import CacheEditor from '../../../../components/CacheEditor'

export default class CacheEditorWrap extends React.PureComponent{

    constructor(props){
        super(props);
        this.defaultValue = this.props.defaultValue;
    }

    submitData = () => {
        if(isFunc(this.props.onChange)){
            this.props.onChange(this.defaultValue);
            this.props.onCancel();
        }
    };

    handleChange = (k,v) => { // k: enable,interval,flushTime
        this.defaultValue[k] = v;
        switch (k){
            case 'interval':
                delete this.defaultValue.flushTime;
                break;
            case 'flushTime':
                delete this.defaultValue.interval;
                break;
            default:
        }
    };

    render(){
        return (<Modal
            title='缓存设置'
            visible={this.props.visible}
            onCancel={this.props.onCancel}
            width='400px'
            bodyStyle={{padding:'0 10px',overflow:'auto'}}
            maskClosable={false}
            destroyOnClose = {true}
            onOk = {this.submitData} >
            <CacheEditor defaultValue={this.props.defaultValue} onChange={this.handleChange}/>
        </Modal>)
    }
}