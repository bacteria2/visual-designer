import React from 'react';
import {requestJSON} from '../../service/index'
import { Table } from 'antd';

export default class DynamicTable extends React.PureComponent{

    state = {
        data: [],
        pagination: {},
        loading: false,
        columns:[],
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = async (params = {}) => {

        this.setState({ loading: true });
        const paramStr = "?param=" + encodeURI(JSON.stringify(params));
        let results =  await requestJSON('http://localhost:60/visual' + paramStr);

        const pagination = { ...this.state.pagination };
        pagination.total = results.total;
        this.setState({
            loading: false,
            data: results.data,
            pagination,
        });
    };

    setColumn(){

        const columns = this.props.fields.map(e=>({
            title:e.name,
            key:e.name,
            dataIndex:e.name,
        }));
        this.setState({columns});
    }

    componentDidMount() {
        if(this.props.fields){
            this.setColumn();
            this.fetch();
        }
    }

    componentWillUnmount(){
        console.log("dead");
    }

    render() {
        return (
            <Table
                columns={this.state.columns}
                   rowKey={record => record.id}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        );
    }
}