import React, { PureComponent } from 'react';
import {Table, Card,Icon,Input,Button ,Divider,Popconfirm} from 'antd';
import styles from './AppType.css';
import { appTypeData } from "../../service/widget";

const Search = Input.Search;

const columns = [{
    title: '组件分类名称',
    dataIndex: 'name',
    key: 'name',
    width: 250,
}, {
    title: '备注',
    dataIndex: 'notes',
    key: 'notes',
}, {
    title: '操作',
    key: 'action',
    width: 182,
    render: (text, record) => (
        <span>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除分类?" onConfirm={() => deleteSubColumn(record)}>
                <a href="" >删除</a>
            </Popconfirm>
        </span>
    ),
}];


const expandedRowRender = (record) => {
    const subTable={
        bordered: false,
        loading: false,
        size: 'default',
        title: undefined,
        showHeader:false,
        pagination:false,
    }
    const subColumns = [{
        title: '组件分类名称',
        dataIndex: 'name',
        key: 'name',
        className:styles.subColumn,
        width: 250,
    }, {
        title: '备注',
        dataIndex: 'notes',
        key: 'notes',
        className:styles.subColumn,
    }, {
        title: '操作',
        key: 'action',
        width: 150,
        className:styles.subColumnAction,
        render: (text, record) => (
            <span>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除分类?" onConfirm={() => deleteSubColumn(record)}>
                <a href="" >删除</a>
            </Popconfirm>
        </span>
        ),
    }];

    return (
        <Table
            columns={subColumns}
            dataSource={record.childrens}
            {...subTable}
        />
    );
};
function deleteSubColumn(record) {
    console.log(record)
}

class AppType extends PureComponent {
    state = {
        tablePro:{
            bordered: true,
            expandedRowRender,
            loading: false,
            size: 'default',
            title: undefined,
            showHeader:true,
            pagination:false,
        },
       data:[],
    };
    componentDidMount() {
        this.setState({data:appTypeData()});
    }

    render() {

        return (
            <div style={{height:'calc(100vh - 116px)',overflow:'hidden',marginTop: -12}}>
                <Card bordered={false}  bodyStyle={{ padding: '12px 24px 0 32px',overflow:'hidden',height:'calc(100vh - 173px)'}} title="应用分类">
                    <div style={{display:'flex',flexDirection: 'column',height:'calc(100vh - 185px)'}}>
                        <div className="table-operations" style={{paddingBottom:12,textAlign:'right'}}>
                            <Button >
                                <Icon type="plus-square-o" />新增
                            </Button>
                            <Search style={{marginLeft:10,display:'inline-block',width:230}} placeholder="组件分类名称" enterButton="搜索" />
                        </div>
                        <div style={{flex:'1 1 0',overflow:'auto'}} >
                            <Table expandedRowKeys={'1'} {...this.state.tablePro} columns={columns} dataSource={this.state.data} />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AppType
