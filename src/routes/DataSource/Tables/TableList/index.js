import React from 'react'
import {Button,Menu,Icon} from 'antd'
import styles from './tableList.css'
import SearchGroup from '../../../../components/SearchGroup'
import isArray from 'lodash/isArray'
import { getUserList } from '../../../../service/user';

export default class TableList extends React.PureComponent{

    handleSearch = (v) => {
        console.log(v);
    };

    handleSearchOptionSelect = (v) => {
        console.log(v);
    };

    getUserOption(){
        let searchOptions = [],
            {currentProject} = this.props,
            cpo = currentProject.toObject();
        if(isArray(cpo.members)){
            searchOptions = cpo.members.map(e=>({value:e.name,text:e.name}));
        }

        searchOptions.push({value:'all',text:'全部用户'});
        return searchOptions
    }

    getMenuItem(){
        let items = [];
        const {value} = this.props;
        if(isArray(value) && value.length > 0){
                    items=value.map(e=>(<Menu.Item key={e.name}>
                                            <Icon type="table" />
                                            <span>{e.name}</span>
                                            <span style={{color:'#ccc'}}> ({e.user ? (e.user.name ||'') :''})</span>
                                        </Menu.Item>));
        }
        return items
    }

    render(){

        //搜索下拉选项

        return (<div className={styles.listWrap}>
                    <div className={styles.titleBar}>
                        <span style ={{fontSize:'16px',fontFamily:'Microsoft YaHei UI'}}>表模型 </span>
                        <Button  type="primary" icon="file-add" onClick={this.props.onAddNew} size="small" style ={{float:'right',marginRight:'10px'}}>添加表模型</Button></div>
                    <div className={styles.searchBar}>
                        <SearchGroup optionDefault="all" options={this.getUserOption()} search={this.handleSearch} selected={this.handleSearchOptionSelect}/>
                    </div>
                    <div className={styles.listPanel}>
                        <Menu
                            selectedKeys={[this.props.currentValue && this.props.currentValue.name]}
                            onSelect = {this.props.onSelect}
                            style={{border:0}}>
                            {this.getMenuItem()}
                        </Menu>

                    </div>
            </div>)
    }
}