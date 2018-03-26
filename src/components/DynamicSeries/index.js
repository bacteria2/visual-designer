import React from 'react';
import {Icon,Menu,Dropdown,Modal,message} from 'antd'
import styles from './dynamicSeries.css'
import isArray from 'lodash/isArray'
import update from 'immutability-helper'
import DynamicSeriesEditorModal from './DynamicSeriesEditorModal'


//动态序列
export default class DynamicSeries extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            editIndex:-1,
            showDynamicEditorWin:false,
        }
    }

    // async componentWillReceiveProps(nextProps){
    //     await this.initCube(nextProps);
    // }
    //
    // async componentDidMount(){
    //     console.log('componentDidMount');
    //     await this.initCube(this.props);
    // }
    //
    // async initCube(props){
    //     if(props.cubeId){
    //         //请求获取 Cube
    //         const cubeRep = await seleteCubeById(props.cubeId);
    //         if(cubeRep.success){
    //
    //             //请求获取DataInfo
    //
    //             this.setState(update(this.state,{cube:{$set:cubeRep.data}}));
    //         }else if(!cubeRep.success){
    //             message.error(cubeRep.msg);
    //         }else{
    //             message.warning('服务器连接错误');
    //         }
    //     }
    // }

    menuVisibleChange = (k,v) => {
        if(v){
            this.setState({activeItem:k})
        }else{
            this.setState({activeItem:''})
        }
    };

    menuSelectHandle = (filterIndex,{ key}) => {
        switch (key){
            case "edit":
                this.startEditor(filterIndex);
                break;
            case "remove":
                Modal.confirm({
                    content: '确定要删除该过滤项吗？',
                    onOk:()=>{
                        if(this.props.onChange) this.props.onChange(
                            update(this.props.defaultValue,{$splice:[[filterIndex,1]]})
                        );
                    },
                    onCancel() {},
                });
                break;
            default:
        }

        this.setState({activeItem:''})
    };

    startEditor = (index) => {
        // const dimension = this.props.defaultValue[index];

        // this.editIndex = index;
        this.setState({
            showDynamicEditorWin:true,
            editIndex:index,
        });

    };

    getMenu(filterItem,filterIndex){
        return  (<Menu style={{fontSize:'13px'}} onClick={this.menuSelectHandle.bind(null,filterIndex)}>
                    <Menu.Item key="edit" disabled={filterItem.hide}>
                        <span style={{fontWeight:'bold',fontSize:'13px'}}>编辑动态序列</span>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item  key="remove">
                        <span style={{fontSize:'13px'}}>移除</span>
                    </Menu.Item>
                </Menu>);
    }

    handleValueChange = (v) => {

        const newData = update(this.props.defaultValue,{
            [this.state.editIndex]:{$set:v},
        });

        this.setState({
            showDynamicEditorWin:false,
            editIndex:-1});

        if(this.props.onChange) this.props.onChange(newData);
    };

    render(){
        const editDimension = isArray(this.props.defaultValue)?this.props.defaultValue[this.state.editIndex]:null;

        const items = isArray(this.props.defaultValue) && this.props.defaultValue.map((e,i)=>(
            <li key={i + e.alias} className={styles.measureItem + ' '
            + (this.state.activeItem === e.alias?styles.measureItemActive:'')}>
                <span>{e.alias}</span>
                <Dropdown overlay={this.getMenu(e,i)} trigger={['click']} placement="bottomCenter" onVisibleChange={this.menuVisibleChange.bind(null,e.alias)}>
                    <Icon type="caret-down" style={{}}/>
                </Dropdown>
            </li>));
        return ([<ul key='dimensionItems' className={styles.mainWrap}>{items}</ul>,
            this.props.cube && <DynamicSeriesEditorModal key = "editor"
                                      dsInfo = {this.props.dsInfo}
                                      cube = {this.props.cube}
                                      visible = {this.state.showDynamicEditorWin}
                                      dimension = {editDimension}
                                      onOK = {this.handleValueChange}
                                      onCancel = {()=>{this.setState({showDynamicEditorWin:false,editIndex:-1})}}/>])
    }

}