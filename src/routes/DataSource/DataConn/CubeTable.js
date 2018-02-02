import React from 'react';
//import {queryCubeByDbConnId} from '../../../service/DataConnService'
import isFunction from 'lodash/isFunction';
import { Layout,Modal,Input,Table,message} from 'antd';
const { Header, Content } = Layout;
export default class CubeTable extends React.PureComponent{

    state = {
        tableLoading:false,
        columns: [{
            title: 'Cube/组件名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => {
                if(a.name>b.name){
                    return 1
                }else if(a.name<b.name){
                    return -1;
                }else{
                    return 0;
                }
            },

        }, {
            title: '创建者',
            dataIndex: 'statue',
            key: 'user',
        }, {
            title: '创建时间',
            dataIndex: 'data',
            key: 'data',
        }],
        cubeList:[],

    };

    async componentDidMount(){
        this.setState({tableLoading:true});
        try{
            //查询所有数据库
            let cubeRep = await queryCubeByDbConnId(this.props.connId);
            if(cubeRep.success){
                this.setState({cubeList:cubeRep.data});
            }else if(!cubeRep.success){
                message.error(cubeRep.msg);
                return false
            }else{
                message.warning('服务器连接错误');
                return false
            }
        }finally {
            this.setState({tableLoading:false});
        }
    }

    doSearch(event){

        // if(isString(event.target.value) && event.target.value!==''){
        //     let filterDbList = cloneDeep(this.originalDataList).filter(e=>{
        //         const reg = new RegExp(event.target.value,'i');
        //         return reg.test(e.name);
        //     });
        //     this.setState({dataList:filterDbList});
        // }else{
        //     this.setState({dataList:this.originalDataList});
        // }


    }

  render(){
      return (
          <Layout>
                  <Header style={{backgroundColor:'#fff',padding:'0 15px',height:'50px',lineHeight:'0'}} >
                      <Input.Search onChange={isFunction(this.doSearch)?this.doSearch:''}  style={{width:'30%', fontSize:'13px',fontFamily:'Microsoft YaHei UI',float:"right"}} placeholder="输入搜索内容" />
                  </Header>
                  <Content style={{padding:'0',margin:'0'}}>
                      <Table style={{backgroundColor:'#fff'}} size="middle" loading={this.state.tableLoading} pagination={false} dataSource={this.state.cubeList} columns={this.state.columns} />
                  </Content>

          </Layout>

      )
  }
}