import React from 'react';
import {Input,Select,Layout,Table,Modal,Spin,message} from 'antd';
import isFun from "lodash/isFunction"
import isArray from "lodash/isArray"
import {queryFieldsByDBConnAndTablename
    ,queryDataByDBConnAndTablename
    ,queryDbListByDbConn
    ,queryTableListByDbConn
    ,getDimensionAndDataSetByUrl} from '../../../service/DataConnService'
import isString from 'lodash/isString'
import cloneDeep from 'lodash/cloneDeep'
import DynamicTable from '../../../components/DynamicTable/DynamicTable'

const { Header, Content } = Layout;

export default class DatabaseTable extends React.PureComponent {

    constructor(props){
        super(props);
        this.dataViewShow = this.dataViewShow.bind(this);
        this.dataViewCancel = this.dataViewCancel.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    state = {
        loading:false,
        dataViewVisible:false,
        tableLoading:false,
        dataViewLoading:false,
        disabledSelect:false,
        dataViewTitle:'',
        dataViewFields:[],
        dataViewData:null,
        tableList:[],
        selectedTable:'选择数据库',
        columns: [{
            title: '表名',
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
            title: '状态',
            dataIndex: 'statue',
            key: 'statue',
        }, {
            title: '操作',
            dataIndex: '',
            key: 'operator',
            render:(text, record) => <a onClick={this.dataViewShow.bind(this,record.name)}>数据预览</a>,
        }],
        dbList:[],
    };

    componentDidMount(){
        this.init(this.props);
    }


    componentWillReceiveProps(props){
        this.init(props);
    }

    async init(props){
        if(props.connTypeObj ){
            // if(!props.dbConn.server || !props.dbConn.port || !props.dbConn.account || !props.dbConn.pwd || !props.dbConn.database) return ;
            let paramVerify = true;
            if(isArray(props.connTypeObj.formFields) && props.connTypeObj.formFields.length > 0){
                props.connTypeObj.formFields.forEach(e=>{
                    if(e.required && !props.dbConn[e.name]) paramVerify = false;
                })
            }else{
                paramVerify = false;
            }
            if(!paramVerify) return
        }else{
            return
        }

        this.setState({loading:true});
        try{
            //查询所有数据库
            // let databaseName = props.dbConn.database;
            // let defaultTableName = databaseName;

            // if(isString(databaseName)){
            //     this.setState({disabledSelect:true});
            // }else{

            //查询数据源所有数据
            let dbRep = await queryDbListByDbConn(props.dbConn);
            if(dbRep.success){
                this.setState({dbList:dbRep.data});
            }else if(!dbRep.success){
                message.error(dbRep.msg);
                return false
            }else{
                message.warning('服务器连接错误');
                return false
            }
                // defaultTableName = dbRep.data[0];
            // }

            //查询数据源所有表信息
            let tableList = await queryTableListByDbConn(props.dbConn);
            if(tableList && tableList.length > 0){
                tableList = tableList.map((e,i)=>({name:e,statue:'',key:i}));
                this.originalTableList = tableList;
            }else{
                tableList = [];
            }

            this.setState({tableList})

        }finally {
            this.setState({loading:false});
        }
    }


    dataViewShow = async (tableName)=>{
        if(this.props.dbConn && tableName){

            this.setState({dataViewTitle:tableName,dataViewLoading:true,dataViewVisible:true});
            try{
                const fields = await  queryFieldsByDBConnAndTablename(this.props.dbConn,tableName);
                const dataRep = await  queryDataByDBConnAndTablename(this.props.dbConn,tableName);
                this.setState({
                    dataViewFields:fields.data,
                    dataViewData:dataRep.data,
                });
            }finally {
                this.setState({dataViewLoading:false});
            }

        }else{
            console.warn("参数不全,[tableName:"+tableName+"],[dbConn:"+this.props.dbConn+"]");
        }
    };


    dataViewCancel=()=>{
        this.setState({dataViewVisible:false})
    };

    // async dbChange(tableName){
    //     this.setState({selectedTable:tableName,tableLoading:true});
    //     try{
    //         //加载第一个数据的表
    //         let tableRep = await queryTableListByDbConn(this.props.conn);
    //         let data = [];
    //
    //         if(tableRep.success){
    //             data = tableRep.data.map((e,i)=>({key:i,name:e}));
    //         }else if(!tableRep.success){
    //             message.error(tableRep.msg);
    //             return false
    //         }else{
    //             message.warning('服务器连接错误');
    //             return false
    //         }
    //         data.splice(0,1);
    //
    //         this.setState({tableList:data})
    //
    //     }finally {
    //         this.setState({tableLoading:false});
    //     }
    //
    //
    // }

    doSearch=(event)=>{

        if(isString(event.target.value) && event.target.value!==''){
            let filterDbList = cloneDeep(this.originalTableList).filter(e=>{
                const reg = new RegExp(event.target.value,'i');
                return reg.test(e.name);
            });
            this.setState({tableList:filterDbList});
        }else{
            this.setState({tableList:this.originalTableList});
        }
    };

    render(){
        let options = null;
        if (this.state.dbList.length > 0) {
            options = this.state.dbList.map(e=>(
                <Select.Option key={e} value={e}>{e}</Select.Option>
            ));
        }

        return(
            <Layout>
                <Spin spinning={this.state.loading} size="large">
                <Header style={{backgroundColor:'#fff',padding:'0 15px',height:'50px',lineHeight:'0'}} >
                    {/*<Select disabled={this.state.disabledSelect} onChange={isFun(this.dbChange)?this.dbChange:''} style={{width:'30%'}}  value ={this.state.selectedTable} defaultValue={'选择数据库'}>*/}
                        {/*{options}*/}
                    {/*</Select>*/}
                    <Input.Search onChange={isFun(this.doSearch)?this.doSearch:''}  style={{width:'30%', fontSize:'13px',fontFamily:'Microsoft YaHei UI'}} placeholder="输入搜索内容" />
                </Header>
                <Content style={{padding:'0',margin:'0'}}>
                     <Table style={{backgroundColor:'#fff'}} size="middle" loading={this.state.tableLoading}  dataSource={this.state.tableList} columns={this.state.columns} />
                </Content>
                <Modal
                    title={this.state.dataViewTitle}
                    visible={this.state.dataViewVisible}
                    onCancel={this.dataViewCancel}
                    footer={null}
                    width='80%'
                    bodyStyle={{padding:'10px',overflow:'auto'}}
                    maskClosable={false}>
                    <Spin spinning={this.state.dataViewLoading} size="large">
                        {this.state.dataViewFields.length>0 && !this.state.dataViewLoading
                            ?<DynamicTable
                                conn={this.props.conn}
                                tableName={this.state.dataViewTitle}
                                data = {this.state.dataViewData}
                                fields={this.state.dataViewFields}/>
                            :''}
                    </Spin>
                </Modal>
                </Spin>
            </Layout>)
    }
}