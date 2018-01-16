import React from 'react';
import { Table,Popconfirm,Input,Button,message,Spin } from 'antd';
import styles from './cube.css'
import {queryCubeCategory,addCubeCategory,updateCubeCategory,deleteCubeCategory,queryCubesByCategory} from '../../../../service/CubeService'
import cloneDeep from 'lodash/cloneDeep'
import isArray from 'lodash/isArray'
import uuid from 'uuid/v1'

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

/**
 * Cube分类管理
 */
export default class Category extends React.PureComponent{

    constructor(props) {
        super(props);
        this.columns = [{
            title: '分类名称',
            dataIndex: 'name',
            width: '50%',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className={styles.editable_row_operations}>
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                  <Popconfirm title="确定要取消吗?" onConfirm={() => this.cancel(record.id)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                                :<span> <a onClick={() => this.edit(record.id)}>编辑</a>
                                <Popconfirm title="确定要删除吗?" onConfirm={() => this.remove(record.id)}>
                                                    <a>删除</a>
                                                  </Popconfirm>
                                </span>

                        }
                    </div>
                );
            },
        }];
        let data = [];
        this.state = { data,loading:false };
        this.cacheData = [];
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];

        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    async save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];

        if (target) {
            if(target.newCategory){
                delete target.editable;
                delete target.newCategory;
                //提交到服务器
                try{
                    this.setState({ loading: true });
                    let rep = await addCubeCategory(target);
                    if(rep.success){
                        message.success(rep.msg);
                        this.setState({ data: newData });
                        this.cacheData = newData.map(item => ({ ...item }));
                    }else if(!rep.success){
                        message.error(rep.msg);
                        target.editable = true;
                        target.newCategory = true;
                    }else{
                        message.warning('服务器连接错误');
                        target.editable = true;
                        target.newCategory = true;
                    }
                }finally {
                    this.setState({ loading: false });
                }


            }else{
                try{
                    this.setState({ loading: true });
                    delete target.editable;
                    //提交到服务器
                    let rep = await updateCubeCategory(target);
                    if(rep.success){
                        message.success(rep.msg);
                        this.setState({ data: newData });
                        this.cacheData = newData.map(item => ({ ...item }));
                    }else if(!rep.success){
                        message.error(rep.msg);
                        target.editable = true;
                    }else{
                        message.warning('服务器连接错误');
                        target.editable = true;
                    }
                }finally {
                    this.setState({ loading: false });
                }
            }
        }
    }

    async remove(key){
        //查询分类下面是否存在CUBE，有则不能删除
        const rep = await queryCubesByCategory(key);
        //分类下面存在CUBE
        if(isArray(rep.data) && rep.data.length>0){
            message.warn("该分类下面有CUBE，无法删除")
        }else{
            try{
                this.setState({ loading: true });
                const deleteRep = await deleteCubeCategory(key);
                if(deleteRep.success){
                    message.success(deleteRep.msg);
                    const newData = this.state.data.filter(e => e.id !== key);
                    this.setState({ data: newData });
                    //更新
                    this.props.update();
                }else if(!deleteRep.success){
                    message.error(deleteRep.msg);
                }else{
                    message.warning('服务器连接错误');
                }
            }finally {
                this.setState({ loading: false });
            }

        }
    }

    add(){
        let newCategory = {
            id:uuid(),
            name:"未命名分类",
            newCategory:true,
            editable:true
        };
        const newData = cloneDeep(this.state.data);
        newData.push(newCategory);
        this.setState({ data: newData });

    }

    cancel(key) {

        const target = this.state.data.filter(item => key === item.id)[0];
        if(!target.newCategory){
            const newData = [...this.state.data];
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
                delete target.editable;
                this.setState({ data: newData });
            }
        }else{

            const newData = this.state.data.filter(item => key !== item.id);
            this.setState({ data: newData });
        }

    }

    async componentDidMount(){
        //
        let rep = await queryCubeCategory();
        if(rep.success){
            const cubeCategoryList = rep.data.map(e=>({...e,key:e.id}));
            this.cacheData = cloneDeep(cubeCategoryList);
            this.setState({data:cubeCategoryList});
        }else if(!rep.success){
            message.error(rep.msg);
        }else{
            message.warning('服务器连接错误');
        }

    }

    render() {
        return (<Spin spinning={this.state.loading} size="large">
            <Button type="primary"  onClick={this.add.bind(this)} size="small" style ={{margin:'0 0 20px 0'}}>添加CUBE分类</Button>
            <Table bordered dataSource={this.state.data} columns={this.columns} />
        </Spin>)
    }
}