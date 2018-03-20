import React from 'react';
import {Modal,Icon,Tabs,Checkbox,message,Popconfirm,Table} from 'antd';
import styles from './slicer.css'
import findIndex from 'lodash/findIndex'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import update from 'immutability-helper'
import EditableCell from './EditableCell'

const TabPane = Tabs.TabPane;

export default class FilterEditorModal extends React.PureComponent{

    constructor(props){
        super(props);
        const {listValue,customValue,dynamicValue,count} = this.analysisValue(props);
        this.state = {
            listValue,
            customValue,
            dynamicValue,
            count,
            search:{
                listValue:'',
                customValue:'',
            },
        };
        this.columns = [{
            title: '变量名',
            dataIndex: 'key',
            width: '40%',
            className:styles.dynamicColumn,
            render: (text, record,index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'key')}
                />
            ),
        }, {
            title: '默认值',
            width: '40%',
            dataIndex: 'value',
            className:styles.dynamicColumn,
            render: (text, record,index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'value')}
                />
            ),
        }, {
            title: '操作',
            width: '20%',
            className:styles.dynamicColumn_center,
            dataIndex: 'operation',
            render: (text, record,index) => {
                return (
                          <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(index)}>
                                <a>删除</a>
                            </Popconfirm>
                        );
            },
        }];
    }

    onCellChange = (index, key) => {
        return (value) => {
            this.setState(update(this.state,{
                dynamicValue:{
                    [index]:{
                        [key]:{$set:value},
                    },
                },
            }));
        };
    };

    onDelete = (index) => {
        // let index = -1;
        // this.state.dynamicValue.forEach((e,i)=>{if(e.key===key)index=i});
        this.setState(update(this.state,{
            dynamicValue:{$splice:[[index,1]]},
        }));
    };

    handleAdd = () => {
        const newCount = this.state.count + 1;
        this.setState(update(this.state,{
            dynamicValue:{$push:[{key:'param' + newCount,value:'defaultValue'}]},
            count:{$set:newCount},
        }));
    };

    componentWillReceiveProps(nextProps){
        const {listValue,customValue,dynamicValue} = this.analysisValue(nextProps);
        this.setState(update(this.state,{
            listValue:{$set:listValue},
            customValue:{$set:customValue},
            dynamicValue:{$set:dynamicValue},
        }));
    }

    // componentShouldUpdate(){
    //     return super.componentShouldUpdate(arguments) && this.props.visible
    // }

    submitData = ()=>{
        if(this.props.onOK){
            const newData = this.state.listValue.concat(this.state.customValue).concat(this.state.dynamicValue);
            this.props.onOK(newData);
        }
    };

    analysisValue(props){
        const {defaultValue,dataList} = props;
        let {count} = props;
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
        if(!isNumber(count)) count = 0 ;

        return {listValue,customValue,dynamicValue,count}
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
        const value = event.target.value;
        this.setState(update(this.state,{
            search:{
                customValue:{$set:value},
            },
        }));
    };

    listSearchValueChange = (event) => {
        const value = event.target.value;
        this.setState(update(this.state,{
            search:{
                listValue:{$set:value},
            },
        }));
    };

    handleListValueChange = (v,event) => {
        const checked = event.target.checked;
        if(checked){
            this.setState(update(this.state,{
                listValue:{
                   $push:[v],
                },
            }));
        }else{
            let index = -1;
            this.state.listValue.forEach((e,i)=>{if(e ===v) index = i});
            this.setState(update(this.state,{
                listValue:{
                    $splice:[[index,1]],
                },
            }));
        }
        console.log(v,checked);
    };

    handleAddCustomValue = () => {
        //判断是否存在相同的过滤值
        const customFilter = this.state.customValue.filter(e=>(e === this.state.search.customValue));
        if(customFilter.length === 0){
            const listFilter = this.state.listValue.filter(e=>(e === this.state.search.customValue));
            if(listFilter.length > 0) {
                message.warn("添加失败，该过滤值已存在");
                return
            }
        }else{
            message.warn("添加失败，该过滤值已存在");
            return
        }

        this.setState(update(this.state,{
            customValue:{
                $push:[this.state.search.customValue],
            },
            search:{
                customValue:{$set:''},
            },
        }));
    };

    handleRemoveCustomValue = (index) => {
        this.setState(update(this.state,{
            customValue:{
                $splice:[[index,1]],
            },
        }));
    };

    //动态参数
    getDynamicDataList(){
      return (<div className={styles.valueWrap}>
          <div className={styles.listValueContent}>
          <Table size="small" dataSource={this.state.dynamicValue}  columns={this.columns} pagination={false}/>
          </div>
          <div className={styles.listValueBottomToolBar}>
              <span onClick={this.handleAdd}><Icon type="add" /> 添加</span>
          </div>
      </div>)
    }

    //数据中选择的过滤值
    getDataCheckBoxPanel(){

        let {dataList:filterData} = this.props;
        if(this.state.search.listValue && isArray(filterData) && filterData.length > 0){
            filterData = filterData.filter(e=>(e.indexOf(this.state.search.listValue) !== -1));
        }

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input placeholder="输入搜索文本" onChange={this.listSearchValueChange}/>
            </div>
            <div className={styles.listValueContent}>
                {
                    isArray(filterData) && filterData.length > 0? filterData.map((e,i) => {
                        let defaultChecked = false;
                        const index = findIndex(this.state.listValue,data=>(data === e));
                        if(index !== -1) defaultChecked = true;
                        return (<div  key={i} className={styles.listFilterItem}><Checkbox style={{width:'100%'}} onChange={this.handleListValueChange.bind(null,e)} checked={defaultChecked} ><span className={styles.contentFontSize}>{e}</span></Checkbox></div>)
                    }):<div className={styles.listFilterItem}>没有数据</div>
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
    getCustomDataPanel(){

        let {customValue:filterData} = this.state;
        if(this.state.search.customValue && isArray(filterData) && filterData.length > 0){
            filterData = filterData.filter(e=>(e.indexOf(this.state.search.customValue) !== -1));
        }

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input placeholder="输入要搜索或添加的文本" value={this.state.search.customValue} onChange={this.customSearchValueChange}/>
                {this.state.search.customValue && <Icon type="plus" onClick={this.handleAddCustomValue}/>}
            </div>
            <div className={styles.customValueContent}>
                {
                  filterData.map((e,i) => (<div key={e + i} className={styles.customFilterItem}>
                      <span className={styles.contentFontSize}>{e}</span>
                      <Icon type="delete" onClick={this.handleRemoveCustomValue.bind(null,i)}/>
                  </div>))
                }
            </div>
        </div>)
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
                            {this.getDataCheckBoxPanel()}
                        </TabPane>
                        <TabPane tab="自定义条件" key="2">
                             {this.getCustomDataPanel()}
                        </TabPane>
                        <TabPane tab="动态参数" key="3">
                            {this.getDynamicDataList()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>)
    }
}