import React from 'react';
import { Modal,Divider,Radio} from 'antd';
import styles from './membersSort.css'
import DnDRow from './DnDRow'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext} from 'react-dnd';
import update from 'immutability-helper'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'

const {Group:RadioGroup} = Radio;
const {Button:RadioButton } = Radio;


const BASIS_SOURCE = 'source';  //数据源排序
const BASIS_WORD = 'word'; //首字符排序
const BASIS_CUSTOM = 'custom'; //自定义排序

@DragDropContext(HTML5Backend)
export default class MembersSort extends React.PureComponent{
    constructor(props){
        super(props);
        const {order,dataSort,basis} = this.analysisProps(props);
        this.state = {order,dataSort,basis};
    }

    componentWillReceiveProps(nextProps){
        const {order,dataSort,basis} = this.analysisProps(nextProps);
        this.setState(update(this.state,{
            order:{$set:order},
            dataSort:{$set:dataSort},
            basis:{$set:basis},
        }));
    }

    //解析数据，计算默认值
    analysisProps(props){
        const {sort,data} = props;
        let order = 'asc',dataSort = data||[],basis;
        if(isString(sort)) {
            order = sort ;
            basis = BASIS_WORD;
        }else if(isArray(sort)) {
            dataSort = sort;
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
            this.props.onSubmit(sort)
        }

    };

    handleOrderChange = (event)=>{
        const order = event.target.value;
        this.setState({order});
    };

    handleBasisChange = (event) => {
        const basis = event.target.value ;
        this.setState({basis});
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
                    <RadioGroup style={{height:'100px'}} onChange={this.handleBasisChange} value={this.state.basis}>
                        <Radio style={radioStyle} value={BASIS_SOURCE}>数据源顺序</Radio>
                        <Radio style={radioStyle} value={BASIS_WORD}>首字符</Radio>
                        <Radio disabled={!isArray(this.state.dataSort) || this.state.dataSort.length <= 0} style={radioStyle} value={BASIS_CUSTOM}>自定义排序</Radio>
                    </RadioGroup>
                    <div className={this.state.basis === BASIS_CUSTOM ?styles.customSort:styles.customSort_disabled}>
                        { this.state.dataSort.map((e,i)=>(
                            <DnDRow index={i}
                                    value={e}
                                    moveRow={this.handleMoveRow}
                                    unEdit = {this.state.basis !== BASIS_CUSTOM}/>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>)
    }
}