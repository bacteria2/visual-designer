import React from 'react';
import {Modal,Icon,Tabs,Checkbox,message,Popconfirm,Table,Tree} from 'antd';
import styles from './slicer.css'
import findIndex from 'lodash/findIndex'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import update from 'immutability-helper'
import EditableCell from './EditableCell'
import uuid from 'uuid/v1'

const TreeNode = Tree.TreeNode;

const TabPane = Tabs.TabPane;

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => {
                    if(item.key){
                        return item.key === key
                    }else{
                        return node.key + "-" + item === key
                    }
                })) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key,node.children);
            }
        }
    }
    return parentKey;
};



//组过滤项编辑
export default class GroupFilterEditorModal extends React.PureComponent{
    constructor(props){
        super(props);
        const {listValue,customValue,dynamicValue,count} = this.analysisValue(props);
        this.state = {
            expandedKeys:[],
            listValue,
            customValue,
            dynamicValue,
            count,
            search:{
                listValue:'',
                customValue:'',
            },
        };
        // 动态列
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            const {listValue,customValue,dynamicValue,count} = this.analysisValue(nextProps);
            this.setState(update(this.state,{
                listValue:{$set:listValue},
                customValue:{$set:customValue},
                dynamicValue:{$set:dynamicValue},
                count:{$set:count},
            }));
        }
    }

    getCellChange = (type,index, key) => {
        return (value) => {
            this.setState(update(this.state,{
                [type]:{
                    [index]:{
                        [key]:{$set:value},
                    },
                },
            }));
        };
    };

    onCustomDelete = (index) => {
        // let index = -1;
        // this.state.dynamicValue.forEach((e,i)=>{if(e.key===key)index=i});
        this.setState(update(this.state,{
            customValue:{$splice:[[index,1]]},
        }));
    };

    onDynamicDelete = (index) => {
        // let index = -1;
        // this.state.dynamicValue.forEach((e,i)=>{if(e.key===key)index=i});
        this.setState(update(this.state,{
            dynamicValue:{$splice:[[index,1]]},
        }));
    };


    dynamicValueHandleAdd = () => {
        const newCount = this.state.count + 1;

        let newValue = {key:uuid()};
        this.props.groupFields.forEach(e=>{
            newValue[e] = "0";
        });

        newValue.param = 'param' + newCount;

        this.setState(update(this.state,{
            dynamicValue:{$push:[newValue]},
            count:{$set:newCount},
        }));
    };

    customValueHandleAdd = () => {
        let newValue = {key:uuid()};
        this.props.groupFields.forEach(e=>{
            newValue[e] = "0";
        });

        this.setState(update(this.state,{
            customValue:{$push:[newValue]},
        }));
    };

    // componentShouldUpdate(){
    //     return super.componentShouldUpdate(arguments) && this.props.visible
    // }

    submitData = ()=>{

        const {onOK,groupFields} = this.props;
        if(onOK){
            const listValue = this.state.listValue.map(e=>e.split('-'));
            const customValue = this.state.customValue.map(e => {
                 let value = [];
                    groupFields.forEach(field=>{
                        value.push(e[field]);
                    });
                 return value;
            });

            const dynamicValue = this.state.dynamicValue.map(e => {
                let value = [];
                groupFields.forEach(field=>{
                    value.push(e[field]);
                });
                return {value,key:e.param};
            });

            const newData = listValue.concat(customValue).concat(dynamicValue);
            onOK(newData);
        }
    };

    analysisValue(props){
        const {defaultValue,dataList,groupFields} = props;

        let {count} = props;
        // [{年:2018,月:12,日:10}]
        let listValue = [],customValue = [],dynamicValue = [];

        if(isArray(defaultValue) && defaultValue.length > 0){

            defaultValue.forEach(filterValue=>{
                let item = {};
                if(isArray(filterValue)){
                    if(isArray(dataList) && dataList.length > 0){
                        let childrenData = dataList,inDataList = true;

                        //解析数据，分析是自定义值，还是数据列表中的值
                        /* 循环判断当前值是否存在子集，直到最后一位数存在子集中，则可以认为是数据列表中的值 */
                        for(let i = 0 ;i < filterValue.length;i++){
                            const v = filterValue[i];
                            if(i < filterValue.length -1){
                                if(childrenData){
                                    childrenData = getChildren(childrenData,v);
                                }else{
                                    //未查询到子集则不是数据列表中的值
                                    inDataList = false;
                                    break;
                                }
                            }else{
                                const index = findIndex(childrenData,e=>v==e);
                                if(index === -1) inDataList = false;
                            }
                        }


                        if(inDataList){
                            //在数据列表中
                            listValue.push(filterValue.join('-'));
                        }else{
                            //自定义
                            filterValue.forEach((v,i)=>{
                                const levelField = groupFields[i];
                                item[levelField] = v;
                                item.key = uuid();
                            });
                            //将自定义参数设置到数组
                            customValue.push(item);
                        }

                    }else{
                        //自定义值
                        filterValue.forEach((v,i)=>{
                            const levelField = groupFields[i];
                            item[levelField] = v;
                            item.key =  uuid();;
                        });
                        //将自定义参数设置到数组
                        customValue.push(item);
                    }
                }else{
                    //动态参数值
                    const param = filterValue.key;
                    const values = filterValue.value;

                    values.forEach((v,i)=>{
                        const levelField = groupFields[i];
                        item[levelField] = v;
                    });

                    item.param = param;
                    //将动态参数设置到数组
                    dynamicValue.push(item);
                }

            });

        }

        if(!isNumber(count)) count = 0 ;

        return {listValue,customValue,dynamicValue,count};

        //循坏数据树
        function getChildren(treeArr,value){
            let children = null;
            treeArr.forEach(e=>{
                if(e.value == value){
                    children = e.children;
                }
            });
            return children
        }
    }

    checkAll = () => {
        let values = isArray(this.props.dataMap) && this.props.dataMap.length>0 ?this.props.dataMap.filter(e=>!e.name):[];
        if(isArray(values) && values.length>0 ) values = values.map(e=>e.key);

        this.setState({
            listValue:values,
        });
    };

    cancelCheckAll = () => {
        this.setState({
            listValue:[],
        });
    };

    reverseCheck = () => {
        let newValue = [];

        let values = isArray(this.props.dataMap) && this.props.dataMap.length>0 ?this.props.dataMap.filter(e=>!e.name):[];
        if(isArray(values) && values.length>0 ) values = values.map(e=>e.key);

        values.forEach(e=>{
            if(!this.state.listValue.some(data=>data===e)) {
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
        const value = event.target.value,{dataList,dataMap} = this.props;
        if(value){
            const expandedKeys = dataMap.map((item) => {
                let key = item.key?item.key:item;
                if(isNumber(key)) key +='';
                if (key.indexOf(value) > -1) {
                    return getParentKey(key, dataList);
                }
                return null;
            }).filter((item, i, self) => item && self.indexOf(item) === i);

            this.setState(update(this.state,{
                expandedKeys:{$set:expandedKeys},
                search:{
                    listValue:{$set:value},
                },
            }));
        }else{
            this.setState(update(this.state,{
                expandedKeys:{$set:[]},
                search:{
                    listValue:{$set:value},
                },
            }));
        }

    };

    handleListValueChange = (v,event) => {
        const checkedNodes = event.checkedNodes.map(e=>e.key);

        this.setState(update(this.state,{
            listValue:{
                $set:checkedNodes,
            },
        }));

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

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    //数据中选择的过滤值
    getDataCheckBoxPanel(){

        let {dataList:filterData} = this.props;
        const { search:{listValue:searchValue}, expandedKeys, autoExpandParent,listValue } = this.state;

        const loop = (data,parentKey) => data.map((item) => {
            let value = item.value? item.value :item ;
            if(isNumber(value)) value +='';
            const index = value.indexOf(searchValue);
            const beforeStr = value.substr(0, index);
            const afterStr = value.substr(index + searchValue.length);
            const title = index > -1 ? (
                    <span>
                {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                {afterStr}
                </span>
                    ) : <span>{value}</span>;
                    if (item.children) {
                        return (
                            <TreeNode key={item.key} title={title}>
                                {loop(item.children,item.key)}
                            </TreeNode>
                        );
                    }
                    return <TreeNode key={item.key?item.key:parentKey + '-' + value} title={title} />;
                });

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input placeholder="输入搜索文本" onChange={this.listSearchValueChange}/>
            </div>
            <div className={styles.listValueContent}>
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    checkedKeys={listValue}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={this.handleListValueChange}>
                    {
                        isArray(filterData) && filterData.length > 0?
                            loop(filterData,'')
                            :<div className={styles.listFilterItem}>没有数据</div>
                    }

                </Tree>


            </div>
            <div className={styles.listValueBottomToolBar}>
                <span onClick={this.checkAll}><Icon type="check-square" /> 全选选中</span>
                <span onClick={this.cancelCheckAll}><Icon type="close-square" /> 全选取消</span>
                <span onClick={this.reverseCheck}><Icon type="minus-square" /> 反选</span>
            </div>
        </div>)
    }

    //动态参数
    getDynamicDataList(){
        return (<div className={styles.valueWrap}>
            <div className={styles.listValueContent}>
                <Table size="small"
                       dataSource={this.state.dynamicValue}
                       columns={this.getCustomFilterColumns('dynamicValue')}
                       pagination={false}/>
            </div>
            <div className={styles.listValueBottomToolBar}>
                <span onClick={this.dynamicValueHandleAdd}><Icon type="add" /> 添加</span>
            </div>
        </div>)
    }

    //自定义过滤值
    getCustomDataPanel(){
        return (<div className={styles.valueWrap}>
                    <div className={styles.listValueContent}>
                        <Table size="small" dataSource={this.state.customValue}  columns={this.getCustomFilterColumns('customValue')} pagination={false}/>
                    </div>
                    <div className={styles.listValueBottomToolBar}>
                        <span onClick={this.customValueHandleAdd}><Icon type="add" /> 添加</span>
                    </div>
                </div>)
    }

    getCustomFilterColumns (type){

        let columnsLength = this.props.groupFields.length + 1;

        if(type !== 'customValue') columnsLength ++;

        //计算每列的平均长度
        const perWidth = Math.floor(100/columnsLength).toFixed(1) + "%";

        let columns = [{
            title: '操作',
            width : perWidth,
            className:styles.dynamicColumn_center,
            dataIndex: 'operation',
            render: (text, record,index) => {
                return (<Popconfirm title="确定要删除吗?" onConfirm={() => type === 'customValue' ?this.onCustomDelete(index):this.onDynamicDelete(index)}>
                        <a>删除</a>
                    </Popconfirm>);
            },
        }];
        if(isArray(this.props.groupFields))
            this.props.groupFields.forEach(e=>{
                columns.splice(columns.length-1,0,{
                    title: e,
                    width : perWidth,
                    className:styles.dynamicColumn,
                    dataIndex: e,
                    render: (text,record,index) => {
                        return (
                                <EditableCell
                                    value={text}
                                    onChange={this.getCellChange(type,index, e)}
                                />
                        );
                    },
                })
            });

        if(type !== 'customValue') {
            //动态参数需要增加参数名列
            columns.unshift({
                title: '变量名',
                dataIndex: 'param',
                width: perWidth,
                className:styles.dynamicColumn,
                render: (text, record,index) => (
                    <EditableCell
                        value={text}
                        onChange={this.getCellChange(type,index,'param')}
                    />
                ),
            });
        }
        return columns

    }

    render(){
        return (<Modal title={'过滤项编辑 - ' + this.props.groupFields.join("/")}
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