import React from 'react';
import {Icon,Tabs,Popconfirm,Table,Tree,Radio} from 'antd';
import styles from './dynamicSeries.css'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import update from 'immutability-helper'
import EditableCell from './EditableCell'
import uuid from 'uuid/v1'

const {TreeNode} = Tree;
const {TabPane} = Tabs;

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
export default class GroupDynamicEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            expandedKeys:[],
            search:{
                listValue:'',
                customValue:'',
            },
        };
        // 动态列
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            this.setState(update(this.state,{
                search:{listValue:{$set:''},customValue:{$set:''}},
            }));
        }
    }

    //修改动态拆分的值
    getCellChange = (index, key) => {
        return (value) => {
            const newCustomValue = update(this.props.customValue,{[index]:{value:{[key]:{$set:value}}}});
            // console.log(index,key,value);
            if(this.props.onCustomValueChange){
                this.props.onCustomValueChange([...newCustomValue]);
            }
        };
    };

    onCustomDelete = (index) => {
        // let index = -1;
        // this.state.dynamicValue.forEach((e,i)=>{if(e.key===key)index=i});
        const newCustomValue = this.props.customValue||[];
        if(newCustomValue.length > 0) newCustomValue.splice(index,1);
        if(this.props.onCustomValueChange){
            this.props.onCustomValueChange([...newCustomValue]);
        }

        // this.setState(update(this.state,{
        //     customValue:{$splice:[[index,1]]},
        // }));

    };


    customValueHandleAdd = () => {

        let newValue = {key:uuid()};

        this.props.groupFields.forEach(e=>{
            newValue[e] = "0";
        });

        const newCustomValue = this.props.customValue || [];
        newCustomValue.push({value:newValue,id:uuid()});

        if(this.props.onCustomValueChange){
            this.props.onCustomValueChange([...newCustomValue]);
        }

        // this.setState(update(this.state,{
        //     customValue:{$push:[newValue]},
        // }));
    };

    checkAll = () => {
        let values = isArray(this.props.dataMap) && this.props.dataMap.length >0 ?this.props.dataMap.filter(e=>!e.name):[];
        if(isArray(values) && values.length > 0 ) values = values.map(e=>({value:e.key}));
        if(this.props.onListValueChange){
            this.props.onListValueChange(values);
        }
        // this.setState({listValue:values});
    };

    cancelCheckAll = () => {
        if(this.props.onListValueChange){
            this.props.onListValueChange([]);
        }
    };

    reverseCheck = () => {
        let newValue = [];

        let values = isArray(this.props.dataMap) && this.props.dataMap.length>0 ?this.props.dataMap.filter(e=>!e.name):[];
        if(isArray(values) && values.length>0 ) values = values.map(e=>e.key);

        values.forEach(e=>{
            if(!this.props.listValue.some(data=>data===e)) {
                newValue.push({value:e});
            }
        });
        if(this.props.onListValueChange){
            this.props.onListValueChange(newValue);
        }
        // this.setState({
        //     listValue:newValue,
        // });
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

    handleListValueChange = (v) => {
        const values = v.map(e=>({value:e,id:uuid()}));
        if(this.props.onListValueChange){
            this.props.onListValueChange(values);
        }
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    //数据中选择的过滤值
    getDataCheckBoxPanel(){

        const {expandedKeys,autoExpandParent,search:{listValue:searchValue}} = this.state;
        const { listValue,dataList} = this.props,
        checkKeys = listValue.map(e=>e.value);

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
                            <TreeNode disabled={this.props.all} key={item.key} title={title}>
                                {loop(item.children,item.key)}
                            </TreeNode>
                        );
                    }
                    return <TreeNode disabled={this.props.all} key={item.key?item.key:(parentKey?parentKey + '-' + value:value)} title={title} />;
                });

        return (<div className={styles.valueWrap}>
            <div className={styles.customValueToolBar}>
                <input disabled={this.props.all} className={this.props.all?styles.input_disabled:''} placeholder="输入搜索文本" onChange={this.listSearchValueChange}/>
            </div>
            <div className={styles.listValueContent}>
                {
                    isArray(dataList) && dataList.length > 0 ?
                        <Tree
                            checkable
                            onExpand={this.onExpand}
                            checkedKeys={checkKeys}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={this.handleListValueChange}>
                            {loop(dataList,'')}
                        </Tree>
                        :<div className={styles.noneData}>没有数据</div>
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
        const dataSource = this.props.customValue?this.props.customValue.map(e=>e.value):[];
        return (<div className={styles.valueWrap}>
                    <div className={styles.listValueContent}>
                        <Table size="small" dataSource={dataSource}  columns={this.getCustomFilterColumns()} pagination={false}/>
                    </div>
                    <div className={styles.listValueBottomToolBar}>
                        <span onClick={this.customValueHandleAdd}><Icon type="add" />添加</span>
                    </div>
                </div>)}

    getCustomFilterColumns (){

        let columnsLength = this.props.groupFields.length + 1;

        //计算每列的平均长度
        const perWidth = Math.floor(100/columnsLength).toFixed(1) + "%";

        let columns = [{
            title: '操作',
            width : perWidth,
            className:styles.dynamicColumn_center,
            dataIndex: 'operation',
            render: (text, record,index) => {
                return (<Popconfirm title="确定要删除吗?" onConfirm={()=>this.onCustomDelete(index)}>
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
                                    ExpList = {this.props.ExpList}
                                    onChange={this.getCellChange(index, e)}
                                />
                        );
                    },
                })
            });
        return columns

    }

    render(){
        // console.log(this.props.customValue);
        return (<Tabs activeKey={this.props.activeKey} tabBarStyle={{margin:0}} onChange={this.props.onActiveKeyChange}>
                        <TabPane tab={<Radio checked={this.props.activeKey === 'list'}>数据列表</Radio>} key="list" style={{padding:0}}>
                            {this.getDataCheckBoxPanel()}
                        </TabPane>
                        <TabPane tab={<Radio checked={this.props.activeKey === 'custom'}>自定义</Radio>} key="custom" disabled={this.props.all} style={{padding:0}}>
                            {this.getCustomDataPanel()}
                        </TabPane>
                    </Tabs>)
    }
}