import React from 'react'
import {Button,Menu,Icon} from 'antd'
import styles from './tableList.css'
import SearchGroup from '../../../../components/SearchGroup'

export default class TableList extends React.PureComponent{

    handleAddTables = () => {

    };

    handleSearch = (v) => {
        console.log(v);
    };

    handleSearchOptionSelect = (v) => {
        console.log(v);
    };

    render(){

        //搜索下拉选项
        const searchOptions = ['admin','tom'].map(e=>({value:e,text:e}));
        searchOptions.push({value:'all',text:'全部用户'});

        return (<div className={styles.listWrap}>
                    <div className={styles.titleBar}>
                        <span style ={{fontSize:'16px',fontFamily:'Microsoft YaHei UI'}}>表模型 </span>
                        <Button  type="primary" icon="file-add" onClick={this.handleAddTables} size="small" style ={{float:'right',marginRight:'10px',fontSize:'12px'}}>添加表模型</Button></div>
                    <div className={styles.searchBar}>
                        <SearchGroup optionDefault="all" options={searchOptions} search={this.handleSearch} selected={this.handleSearchOptionSelect}/>
                    </div>
                    <div className={styles.listPanel}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}>
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop" />
                                <span>Option 2</span>
                            </Menu.Item>
                        </Menu>

                    </div>
            </div>)
    }
}