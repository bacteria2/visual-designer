import React from 'react';
import { Modal,Divider,Radio,message} from 'antd';
import styles from './membersSort.css'
import DnDRow from './DnDRow'
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext} from 'react-dnd';
import update from 'immutability-helper'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

const {Group:RadioGroup} = Radio;
const {Button:RadioButton } = Radio;


const BASIS_SOURCE = 'source';  //数据源排序
const BASIS_WORD = 'word'; //首字符排序
const BASIS_CUSTOM = 'custom'; //自定义排序
//
// @DragDropContext(HTML5Backend)
export default class MembersSort extends React.PureComponent{
    constructor(props){
        super(props);
        const {order,dataSort,basis} = MembersSort.analysisProps(props);
        this.state = {order,dataSort,basis,editIndex:-1};
        this.all = this.allModel(props.data);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            const {order,dataSort,basis} = MembersSort.analysisProps(nextProps);
            this.all = this.allModel(nextProps.data);
            this.setState(update(this.state,{
                order:{$set:order},
                dataSort:{$set:dataSort},
                basis:{$set:basis},
            }));
        }
    }

    //解析数据，计算默认值
    static analysisProps(props){
        const {sort,data} = props;
        let order = 'asc',dataSort = data||[],basis;
        if(isString(sort)) {
            order = sort ;
            basis = BASIS_WORD;
        }else if(isArray(sort) || (isArray(data) && isObject(data[0]) && data[0].hasOwnProperty('value'))) {
            // dataSort = sort;
            basis = BASIS_CUSTOM;
        }else {
            basis = BASIS_SOURCE
        }

        return {order,dataSort,basis}
    }

    submitData = () => {
        let sort = [];
        switch (this.state.basis){
            case BASIS_WORD:
                //字母顺序
                sort = this.state.order;
                break;
            case BASIS_CUSTOM:
                //自定义顺序
                sort = this.state.dataSort;
                break;
            default :
                //数据源顺序
                sort = false;
        }

        if(this.props.onSubmit){
            this.props.onSubmit(sort,this.state.dataSort)
        }

    };

    reSortData(){
        const {groupFields} = this.props,{order} = this.state;
        if(!this.all && this.state.dataSort.length > 0 && this.state.dataSort[0].hasOwnProperty('value')){
            let newDataSort = [...this.state.dataSort];
            if(isArray(groupFields) && groupFields.length > 0 && isObject(newDataSort[0].value)){

                newDataSort.sort(({value:p},{value:n}) => {
                    // let flag = -1;
                    //正序
                    //对数据进行排序
                    if(order === 'asc'){
                        for(let i = 0 ; i < groupFields.length ; i++){
                            let field = groupFields[i];
                            if(p[field] > n[field]) {
                                return 1
                            }else if(p[field] < n[field]){
                                return -1
                            }else {
                                //
                                if(i === groupFields.length - 1 ){
                                    return 0
                                }
                            }
                        }
                    }else{
                        //反序
                        for(let i = 0 ; i < groupFields.length ; i++){
                            let field = groupFields[i];
                            if(p[field] < n[field]) {
                                return 1
                            }else if(p[field] > n[field]){
                                return -1
                            }else {
                                //
                                if(i === groupFields.length - 1 ){
                                    return 0
                                }
                            }
                        }
                    }
                });

            }else{
                //对数据进行排序
                if(order === 'asc'){
                    //正序
                    newDataSort.sort((i,j)=>{if(i.value>j.value){return 1}else if(i.value === j.value){return 0}else{return -1}});
                }else{
                    //反序
                    newDataSort.sort((i,j)=>{if(i.value>j.value){return -1}else if(i.value === j.value){return 0}else{return 1}});
                }
            }

            this.setState(update(this.state,{
                order:{$set:order},
                dataSort:{$set:newDataSort},
            }));
        }
    }

    handleOrderChange = (event)=>{
        const order = event.target.value;
        this.setState(()=>({order}),this.reSortData);
    };

    handleBasisChange = (event) => {
        const basis = event.target.value ;
        this.setState(()=>({basis}),()=>{
            if(basis === BASIS_WORD){
                //按字母排序
                this.reSortData();
            }
        });
    };

    handleMoveRow = (dragIndex, hoverIndex) => {
        const { dataSort } = this.state;
        const dragRow = dataSort[dragIndex];

        this.setState(
            update(this.state, {
                dataSort: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };

    handleRename = (index,newName) => {

        if(newName){
            // newName = this.state.data[index].value.join('-');
            this.setState(update(this.state,{
                editIndex:{$set:-1},
                dataSort:{
                    [index]:{
                        $merge:{name:newName},
                    },
                },
            }));
        }else{
            this.setState({
                editIndex:-1,
            })
        }


    };

    handleStartRename = (index) => {
        this.setState({editIndex:index});
    };

    allModel = (values) => {
        let flag = false;
        if(isArray(values) && values.length > 0){
           if(isObject(values[0]) && isArray(values[0].value)){
               if(values.some(e=>e.value.some(value=>(value === '$ALL')))) flag = true
           }else if(isObject(values[0]) && isObject(values[0].value)){
               const {value} = values[0];
               for(let key in value){
                   if(value.hasOwnProperty(key) && value[key] === '$ALL') {
                       flag = true;
                       break
                   }
               }
           }
        }
        return flag
    };

    render(){

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (<Modal title = {'排序'}
                       width = {500}
                       visible = {this.props.visible}
                       bodyStyle = {{padding:'10px 20px',height:'500px',backgroundColor:'#fafafa'}}
                       onOk = {this.submitData}
                       onCancel = {this.props.onCancel}
                       okText = "保存"
                       maskClosable = {false}
                       cancelText = "取消">
            <div className={styles.contentWrap}>
                <h1 className={styles.modalTitle}>排序规则</h1>
                <div className={styles.sortRule}>
                    <RadioGroup disabled={this.state.basis !== BASIS_WORD} size="small" onChange={this.handleOrderChange} value={this.state.order}>
                        <RadioButton   value='asc'>升序</RadioButton >
                        <RadioButton   value='desc'>降序</RadioButton >
                    </RadioGroup>
                </div>
                <Divider style={{margin:0}}/>
                <h1 className={styles.modalTitle}>排序依据</h1>
                <div className={styles.sortBasis}>
                    <RadioGroup style={{marginBottom:'10px'}} onChange={this.handleBasisChange} value={this.state.basis}>
                        {
                            (!isArray(this.state.dataSort) || !isObject(this.state.dataSort[0]) || !this.state.dataSort[0].hasOwnProperty('value')) &&
                            <Radio style={radioStyle} value={BASIS_SOURCE}>无序</Radio>
                        }
                        <Radio style={radioStyle} value={BASIS_WORD}>首字符</Radio>
                        <Radio disabled={!isArray(this.state.dataSort) || this.state.dataSort.length <= 0 || this.all} style={radioStyle} value={BASIS_CUSTOM}>自定义排序</Radio>
                    </RadioGroup>
                    <div className={this.state.basis === BASIS_CUSTOM ?styles.customSort:styles.customSort_disabled}>
                    {/*<div className={styles.customSort}>*/}
                        { this.state.dataSort.map((e,i)=>(
                            <DnDRow index={i}
                                    key = {i}
                                    value={e}
                                    moveRow={this.handleMoveRow}
                                    onStartRename = {this.handleStartRename.bind(null,i)}
                                    editIndex = {this.state.editIndex}
                                    onRename={this.handleRename.bind(null,i)}
                                    disabled = {this.state.basis !== BASIS_CUSTOM}/>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>)
    }
}