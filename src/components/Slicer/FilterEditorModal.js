import React from 'react';
import {Modal,Icon,Tabs,Checkbox} from 'antd';
import styles from './slicer.css'
import findIndex from 'lodash/findIndex'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import update from 'immutability-helper'

const TabPane = Tabs.TabPane;


const FILTER_TYPE_LIST = 0; //选择数据
const FILTER_TYPE_CUSTOM = 1; //自定义
const FILTER_TYPE_ALL = 2; //使用全部

export default class FilterEditorModal extends React.PureComponent{

    constructor(props){
        super(props);
        const {listValue,customValue,dynamicValue} = this.analysisValue(props);
        this.state = {
            listValue,
            customValue,
            dynamicValue,
            search:{
                listValue:'',
                customValue:'',
            },
        }
    }

    componentWillReceiveProps(nextProps){
        const {listValue,customValue,dynamicValue} = this.analysisValue(nextProps);
        this.setState(update(this.state,{
            listValue:{$set:listValue},
            customValue:{$set:customValue},
            dynamicValue:{$set:dynamicValue},
        }));
    }

    submitData = ()=>{

        if(this.props.onOK){
            this.props.onOK(this.props.defaultValue);
        }
    };

    analysisValue(props){
        const {defaultValue,dataList} = props;
        let listValue = [],customValue = [],dynamicValue = [];
        if(isArray(defaultValue) && defaultValue.length > 0){
            defaultValue.forEach(e => {
                const index = findIndex(dataList,data=>(data === e));
                if(index !== -1) {
                    //过滤值在数据中，则为数据列表中选择的数据
                    listValue.push(e);
                }else if(isObject(e)){
                    //过滤值是一个对象，则为动态过滤
                    dynamicValue.push(e);
                }else{
                    //自定义过滤值
                    customValue.push(e);
                }
            });
        }

        return {listValue,customValue,dynamicValue}
    }

    handleFilterTypeChange = (v) => {
        console.log(v);
    };

    checkAll = () => {
        this.setState({
            listValue:[...this.props.dataList],
        });
    };

    cancelCheckAll = () => {
        this.setState({
            listValue:[],
        });
    };

    reverseCheck = () => {
        let newValue = [];
        this.props.dataList.forEach(e=>{
            const index = findIndex(this.state.listValue,data=>(data === e));
            if(index === -1) {
                newValue.push(e);
            }
        });

        this.setState({
            listValue:newValue,
        });
    };

    customSearchValueChange = (event) => {
        // const event = event.target.value;
    };

    //数据中选择的过滤值
    getDataCheckBoxList(){
        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input placeholder="输入搜索文本" onChange={this.customSearchValueChange}/>
            </div>
            <div className={styles.valueContent}>
                {
                    this.props.dataList.map(e => {
                        let defaultChecked = false;
                        const index = findIndex(this.state.listValue,data=>(data === e));
                        if(index !== -1) defaultChecked = true;
                        return (<div key={e}><Checkbox key={e} checked={defaultChecked} ><span className={styles.contentFontSize}>{e}</span></Checkbox></div>)
                    })
                }
            </div>
            <div className={styles.listValueBottomToolBar}>
                <span onClick={this.checkAll}><Icon type="check-square" /> 全选选中</span>
                <span onClick={this.cancelCheckAll}><Icon type="close-square" /> 全选取消</span>
                <span onClick={this.reverseCheck}><Icon type="minus-square" /> 反选</span>
            </div>
        </div>)
    }

    //自定义过滤值
    getCustomDataList(){
        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input placeholder="输入要搜索或添加的文本"/>
            </div>
            <div className={styles.valueContent}>
                {
                    this.state.customValue.map(e => (
                        <div key={e} ><Checkbox checked={false} ><span className={styles.contentFontSize}>{e}</span></Checkbox></div>
                    ))
                }
            </div>
        </div>)
    }

    //动态参数
    getDynamicDataList(){

    }

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
                <div className={styles.filterEditorTypeRow}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="从列表中选择" key="1">
                            {this.getDataCheckBoxList()}
                        </TabPane>
                        <TabPane tab="自定义条件" key="2">
                             {this.getCustomDataList()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>)
    }
}