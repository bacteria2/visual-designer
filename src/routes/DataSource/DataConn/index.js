import React from 'react';
import { Layout,Menu,Icon,Button,Modal,Card,Tabs,message } from 'antd';
import {queryDataConnList,queryDSTypeList} from '../../../service/DataConnService'
import WrappedConnForm from './connForm'
import DatabaseTable from './DatabaseTable'
import styles from './DataConnection.css'
import SearchGroup from '../../../components/SearchGroup'
import cloneDeep from 'lodash/cloneDeep'
import isString from 'lodash/isString'

const {  Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class DataConnection extends React.PureComponent{
    constructor(props) {
        super(props);
        // 把一级 Layout 的 children 作为菜单项
        this.state = {
            dbConnList: [],
            showAddModal:false,
            dbConnDic:[],
            formOperate:"add",
            menuSelectedKey:'',
            activeKey:'1',
            connInfo:{
                // "type":"mysql",
                // "name":"本地数据库",
                // "account":"root",
                // "pwd":"root",
                // "port":3306,
                // "server":"192.168.40.234"
            },
        };
        this.connTypeDic = [];
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.selectConnType = this.selectConnType.bind(this);
        this.updateDbConnList = this.updateDbConnList.bind(this);
        this.selectMenu = this.selectMenu.bind(this)
    }

    async componentDidMount() {
        let list =  await this.queryConnList();
        const rep = await queryDSTypeList();
        this.connTypeDic =  rep.data;
        this.setState({dbConnList:list,dbConnDic:this.connTypeDic,originalConnTypeDic:this.connTypeDic});
    }

    async updateDbConnList(type,options){
        let list = await this.queryConnList();
        this.setState({
            dbConnList:cloneDeep(list),
        });
        if(type==='delete'){//删除操作
            this.setState({connInfo:{}});
        }else if(type === 'add'){
            this.selectMenu({key:options._id});
            // this.setState({menuSelectedKey:options._id});
        }
    }

    updateConn(conn){
        this.setState({connInfo:conn})
    }

    async queryConnList(){
        let connRep = await queryDataConnList();
        if(connRep.success){
            this.originalList = connRep.data;
            return connRep.data;
        }else if(!connRep.success){
            message.error(connRep.msg);
            return null
        }else{
            message.warning('服务器连接错误');
            return null
        }
    }

    selectMenu({key}){
        let selectDbConns = this.state.dbConnList.filter(e=>e._id===key);
        this.setState({connInfo:selectDbConns[0],formOperate:"update",menuSelectedKey:key});
    }

    showModal(){
        this.setState({showAddModal:true})
    }

    hideModal(){
        this.setState({showAddModal:false})
    }

    selectConnType(type){
        this.hideModal();
        let connInfo = {name:"未命名数据连接",type};
        this.setState({connInfo,formOperate:"add",activeKey:'1',menuSelectedKey:''})
    }

    searchOptionSelected(option){
        if(option==='all'){
            this.setState({dbConnDic:this.connTypeDic})
        }else{
            let dbConnDic = this.connTypeDic.filter(e=>(e.type === option));
            this.setState({dbConnDic})
        }

    }

    doSearch(event){

        if(isString(event.target.value)&& event.target.value!==''){
            let inputValue = event.target.value;
            const re =new RegExp(inputValue,'i');
            let dbConnList = cloneDeep(this.originalList).filter(e=>(re.test(e.name)));

            dbConnList = dbConnList.map(e=> {
                e.searchName = e.name.replace(re, "<span style=\"background-color: gold\">" + re.exec(e.name)[0] + "</span>");
                return e;
            });

            this.setState({dbConnList})
        }else{
            this.setState({dbConnList:this.originalList})
        }

    }

    onTabClick(key){
        this.setState({
            activeKey:key,
        });
    }

    render(){

        //产生数据连接列表
        let subMenus = [];
        if(this.state.dbConnDic && this.state.dbConnDic.length > 0){

            let relational = [];
            let nonRelational =[];

            for(let i=0;i<this.state.dbConnDic.length;i++){

                let connType = this.state.dbConnDic[i];
                const type = connType.type;

                let menusItem =[];

                for(let i =0;i< this.state.dbConnList.length;i++){
                    let dbConn = this.state.dbConnList[i];
                    if(dbConn.type === type) menusItem.push(<Menu.Item   key={dbConn._id}  >
                        <div style={{width:'100%',height:'40px'}}>
                            <Icon type={connType.icon} style={{float:'left',lineHeight:'40px'}}/>
                            <div style={{float:'left'}} dangerouslySetInnerHTML ={{__html: dbConn.searchName?dbConn.searchName:dbConn.name}} />
                        </div>
                    </Menu.Item>)
                }


                if(connType.relational) {
                    relational = relational.concat(menusItem);
                }else{
                    nonRelational = nonRelational.concat(menusItem);
                }

            }

            subMenus = [
                <SubMenu key='relational' title={<span><Icon type='file' />关系型数据源</span>}>
                        {relational}
                     </SubMenu>,
                <SubMenu key='nonRelational' title={<span><Icon type='file' />非关系型数据源</span>}>
                    {nonRelational}
                </SubMenu>,
            ]

        }

        const gridStyle = {
            width: '33%',
            textAlign: 'center',
            cursor:"pointer",
        };

        //产生数据连接类型列表
        let dataConnTypes = null;
        if(this.state.dbConnDic.length>0){
            dataConnTypes = this.state.dbConnDic.map((e,i)=>{
                return <Card.Grid onClick={this.selectConnType.bind(this,e.type)} style={gridStyle} key={"dataConnTypes_key_"+i}>{e.name}</Card.Grid>
            });
        }

        //tab页
        const tabPages = (<div>
                            <div style={{height:'50px',lineHeight:'50px',fontSize:'18px',fontFamily:'Microsoft YaHei UI'}}>
                                <span style={{paddingLeft:'20px'}}>
                                    {this.state.connInfo.name} - {this.state.connInfo.type}</span>
                            </div>
                            <div style={{ minHeight: 'calc(100vh - 128px - 50px)' }}>
                                <Tabs   activeKey={this.state.activeKey} onTabClick={this.onTabClick.bind(this)}>
                                    <Tabs.TabPane tab="连接信息" key="1" className={styles.connFormPanel} >
                                        <WrappedConnForm key={this.state.connInfo._id}
                                                         operate = {this.state.formOperate}
                                                         updateMenu={this.state.connInfo}
                                                         type={this.state.connInfo.type}
                                                         updateList={this.updateDbConnList}
                                                         updateConn={this.updateConn.bind(this)}
                                                         connTypeObj={this.state.originalConnTypeDic?this.state.originalConnTypeDic.filter(e=>e.type === this.state.connInfo.type)[0]:{}}/>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="表信息" key="2" className={styles.connFormPanel} style={{padding:0}}>
                                        <DatabaseTable
                                            key={this.state.connInfo._id} dbConn={this.state.connInfo} />
                                    </Tabs.TabPane>
                                    {/*<Tabs.TabPane tab="相关组件" key="3" className={styles.connFormPanel}>*/}
                                        {/*<CubeTable key={this.state.connInfo._id} connId={this.state.connInfo._id} />*/}
                                    {/*</Tabs.TabPane>*/}

                                </Tabs>
                            </div>
                        </div>);

        //空白页
        const blank = (<div className={styles.conn_form_blank} >请选择左侧数据连接</div>);

        //搜索下拉选项
        const searchOptions = this.connTypeDic.map(e=>({value:e.type,text:e.name}));
        searchOptions.push({value:'all',text:'全部'});

        return ( <Layout>
                    <Sider width={300} style={{ background: '#fff' }}>
                        <div style ={{padding:'15px 10px 10px 24px',borderRight: '1px solid #e8e8e8'}}>
                            <span style ={{fontSize:'16px',fontFamily:'Microsoft YaHei UI'}}>数据连接 </span>
                            <Button type="primary" icon="file-add"  onClick={this.showModal} size="small" style ={{float:'right',marginRight:'10px',fontSize:'12px'}}>添加连接</Button>
                        </div>
                        <div style ={{padding:'10px 10px 10px 20px',borderRight: '1px solid #e8e8e8'}}>
                            <SearchGroup optionDefault="all" options={searchOptions} search={this.doSearch.bind(this)} selected={this.searchOptionSelected.bind(this)}/>
                        </div>
                        <Menu
                        mode="inline"
                        defaultOpenKeys={['relational']}
                        style={{ height: 'calc(100vh - 128px - 50px - 52px)' }}
                        selectedKeys = {[this.state.menuSelectedKey]}
                        onSelect={this.selectMenu}>
                            {subMenus}
                        </Menu>
                    </Sider>
                    <Content style={{ height: '100%',background: '#fff' }}>
                        {this.state.connInfo.name?tabPages:blank}
                    </Content>
                   <Modal
                       title="添加数据连接"
                       visible={this.state.showAddModal}
                       onCancel = {this.hideModal}
                       footer={null}
                   >
                       <Card bordered={false}>
                           {dataConnTypes?dataConnTypes:""}
                       </Card>
                   </Modal>
                </Layout>)
    }
}
