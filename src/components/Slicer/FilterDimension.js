import React from 'react';
import {Icon,Menu,Dropdown,Modal} from 'antd'
import style from './slicer.css'
import isArray from 'lodash/isArray'

const confirm = Modal.confirm;

export default class FilterDimension extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeItem:'',
        }
    }

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
                if(this.props.onEdit) this.props.onEdit(filterIndex);
                break;
            case "hide":
                if(this.props.onHide) this.props.onHide(filterIndex);
                break;
            case "remove":
                confirm({
                    content: '确定要删除该过滤项吗？',
                    onOk:()=>{
                        if(this.props.onRemove) this.props.onRemove(filterIndex);
                    },
                    onCancel() {},
                });
                break;
            default:
        }

        this.setState({activeItem:''})
    };

    getMenu(filterItem,filterIndex){
        return  (<Menu style={{fontSize:'13px'}} onClick={this.menuSelectHandle.bind(null,filterIndex)}>
            <Menu.Item key="edit" disabled={filterItem.hide}>
                <span style={{fontWeight:'bold',fontSize:'13px'}}>编辑筛选器</span>
            </Menu.Item>
            <Menu.Item key="hide">
                <span style={{fontSize:'13px'}}>{filterItem.hide?'启用筛选项':'禁用筛选项'}</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item  key="remove">
                <span style={{fontSize:'13px'}}>移除</span>
            </Menu.Item>
        </Menu>);
    }

    render(){
        const items = isArray(this.props.data) && this.props.data.map((e,i)=>(
            <li key={e.field} className={style.filterDimensionItem + ' '
                + (e.hide&&style.filterDimensionItemHide) + ' '
                + (this.state.activeItem === e.alias?style.filterDimensionItemActive:'')}>
            <span>{e.alias}{e.hide && ' - [已禁用]'}</span>
            <Dropdown overlay={this.getMenu(e,i)} trigger={['click']} placement="bottomCenter" onVisibleChange={this.menuVisibleChange.bind(null,e.alias)}>
                <Icon type="caret-down" style={{}}/>
            </Dropdown>
        </li>));
        return (<ul>{items}</ul>)
    }

}