import React from 'react';
// import {requestJSON} from '../../service/index'
import { Table } from 'antd';
import update from 'immutability-helper'

export default class DynamicTable extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {},
            loading: false,
            columns:[],
        };
    }


    // handleTableChange = (pagination, filters, sorter) => {
    //     const pager = { ...this.state.pagination };
    //     pager.current = pagination.current;
    //     this.setState({
    //         pagination: pager,
    //     });
    //     this.fetch({
    //         results: pagination.pageSize,
    //         page: pagination.current,
    //         sortField: sorter.field,
    //         sortOrder: sorter.order,
    //         ...filters,
    //     });
    // };

    // fetch = async (params = {}) => {
    //
    //     this.setState({ loading: true });
    //     const paramStr = "?param=" + encodeURI(JSON.stringify(params));
    //     let results =  await requestJSON('http://localhost:60/visual' + paramStr);
    //
    //     const pagination = { ...this.state.pagination };
    //     pagination.total = results.total;
    //     this.setState({
    //         loading: false,
    //         data: results.data,
    //         pagination,
    //     });
    // };

    setColumn(props){
        const columns = props.fields.map(e=>({
            title:e.alias?e.alias + '\r\n'+ e.table:e.name,
            key:e.name,
            dataIndex:e.name,
            render:(text)=>(text&&(text+'').length>10?(text+'').split('').splice(0,10).reduce((a,b)=>(a+b)) + '...':text),
            ...e,
        }));

        let fieldCount = 0;
        props.fields.forEach(e=>{
           if(e.children && e.children.length > 0){
               e.children.forEach(()=>{fieldCount++})
           }else{
               fieldCount ++
           }
        });

        this.setState(
            update(this.state,{
                columns:{$set:columns},width:{$set:fieldCount*150}})
        );
    }

    componentDidMount() {
        this.updateProps(this.props)
    }

    updateProps(props){
        if(props.fields){
            this.setColumn(props);
            // this.fetch();
        }
        //转换数据字段的KEY为大写
        let data = props.data;
        if(data && data.length > 0){
            data = data.map((e,i) => {
                for(let key in e){
                    const value = e[key];
                    // delete e[key];
                    e[key.toUpperCase()] = value;
                    e.key = i;
                }
                return e;
            });
            this.setState({data})
        }
    }

    componentWillReceiveProps(props){
        this.setState({columns:[]});
        this.updateProps(props)
    }

    render() {

        return (
            <div style={{height:'100%',width:'100%',minWidth:this.state.width + 'px'}}>
            <Table
                   columns={this.state.columns}
                   rowKey={record => record.id}
                   dataSource={this.props.data}
                   loading={this.state.loading}
                   bordered
                   size="middle"
            />
            </div>
        );
    }
}