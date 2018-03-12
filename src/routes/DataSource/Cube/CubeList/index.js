import React from 'react';
import { Layout,Button,Modal,message,Input,Form,Spin } from 'antd';
import {queryDataConnList,queryFieldsByDBConnAndTablename,queryTableListByDbConn} from '../../../../service/DataConnService'
import {queryCubeList,deleteCubeById,renameCubeById,queryCubeCategory,addCube,updateCube,creatViewAndMdx} from '../../../../service/CubeService'
import {addMdx} from '../../../../service/mdxService'
import styles from './cube.css'
import SearchGroup from '../../../../components/SearchGroup'
import cloneDeep from 'lodash/cloneDeep'
import isString from 'lodash/isString'
import MenuWithContext from '../../../../components/MenuWithContext'
import Category from './Category'
import isArray from 'lodash/isArray'
import AddAndUpdateCube from './AddAndUpdateCube'
import CubeSummary from './CubeSummary'
import WrappedRename from '../Rename'
import update from 'immutability-helper'
import fieldsType from '../FieldsType'
import uuid from 'uuid/v1'
import AggregatorType from '../AggregatorType'
import { connect } from 'react-redux';

const {  Sider, Content } = Layout;

class CubeMange extends React.PureComponent{

    constructor(props) {
        super(props);
        // 把一级 Layout 的 children 作为菜单项
        this.showAddModal = this.showAddModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        // this.selectConnType = this.selectConnType.bind(this);
        this.updateCubeConnList = this.updateCubeConnList.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.selectCtxMenu = this.selectCtxMenu.bind(this);
        this.onRenameCube = this.onRenameCube.bind(this);
        this.projectId = props.project.currentProject.get('id')
    }

    state = {
        loading:false,
        formOperate:"add",
        cubeList: [],
        connList:[],
        showRenameModal:false,
        showCategoryManage:false,
            showAddAndUpdateModal:false,
            updateCube:{},
            addOperate:true,
        activeCube:null,
        renameCube:{},
        categoryList:[]};

    //生命周期方法
    async componentDidMount() {
         this.setState({connList:await this.queryConnList()});
         this.setState({cubeList:await this.queryCubeList()});
         this.setState({categoryList:await this.queryCubeCategoryList()});
    }

    //更新Cube列表
    async updateCubeConnList(){
        this.setState({cubeList:await this.queryConnList()});
    }

    //更新Cube分类列表
    async updateCategory(){
        const categoryList = await this.queryCubeCategoryList();
        this.setState({categoryList});
    }

    //获取Cube列表
    async queryCubeList(){
        let cubeRep = await queryCubeList(this.projectId);
        if(cubeRep.success){
            this.originalList = cloneDeep(cubeRep.data);
            return cubeRep.data;
        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    //获取数据连接列表
    async queryConnList(){
        let connRep = await queryDataConnList(this.projectId);
        if(connRep.success){
            return connRep.data;
        }else if(!connRep.success){
            message.error(connRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    //获取CUBE分类列表
    async queryCubeCategoryList(){
        let rep = await queryCubeCategory(this.projectId);
        if(rep.success){
            this.cacheData = cloneDeep(rep.data);
            if(isArray(rep.data) && rep.data.length>0){
                return rep.data
            }else{
                message.warning("分类为空，请先添加分类")
            }
        }else if(!rep.success){
            message.error(rep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    //选择主菜单
    selectMenu(item){
        // if(this.selectDel){
        //     this.selectDel = false
        // }else{
            let itemId = item.key;
            let selectCubes = this.state.cubeList.filter(e=>e._id===itemId);
            this.setState(update(this.state,{
                activeCube:{$set:selectCubes[0]},
            }));
        // }
    }

    //选择下拉菜单回调函数
    selectCtxMenu(type,item){

        switch (type){
            case 'delete':
                this.selectDel = true;
                return this.deleteCube(item._id);
            case 'rename':
                 this.openRenameCubeModal(item);
                break;
            case 'edit':
                 return this.showEditModal(item);
            default:
                break;
        }

    }

    //打开重命名Cube窗口
    openRenameCubeModal(cube){

        this.setState({
            renameCube:cloneDeep(cube),
            showRenameModal:true,
        });

    }

    //打开重命名Cube窗口
     async onRenameCube(id,name){

        this.setState({
            showRenameModal:false,
        });

        if(isString(name) && name!==""){
            if(name !== this.state.activeCube.name){
                let rep = await  renameCubeById(id,name);
                if(rep.success){
                    let target = this.state.cubeList.filter(e=>e._id===id)[0];
                    target.name = name;
                    let newData = [...this.state.cubeList];
                    this.setState({cubeList:newData});
                    message.success(rep.msg);
                }else if(!rep.success){
                    message.error(rep.msg);
                }else{
                    message.warning('服务器连接错误');
                }
            }
        }else{
            message.warn("名称不能为空")
        }

    }


    //删除Cube
    async deleteCube(id){
        let rep = await deleteCubeById(id);
        if(rep.success){
            message.success(rep.msg);
            const cubeList = this.state.cubeList.filter(e=>e._id !== id);
            this.originalList =this.originalList.filter(e=>e._id !== id);
            this.setState({cubeList});
            //如果当前选中的CUBE是需要删除的，则将选中设为NULL
            if(this.state.activeCube && this.state.activeCube._id === id){
                this.setState({activeCube:null})
            }
        }else if(!rep.success){
            message.error(rep.msg);
        }else{
            message.warning('服务器连接错误');
        }

    }

    //打开编辑CUBE的窗口
    async showEditModal(cube){
        // updateCube
        //获取CUBE分类列表
        if(isArray(this.state.categoryList) && this.state.categoryList.length>0){
            this.setState({showAddAndUpdateModal:true,updateCube:cube,addOperate:false});
        }else{
            message.error("请先添加分类")
        }
    }

    //添加Cube显示选择数据连接的窗口
    async showAddModal(){
        //获取CUBE分类列表
        if(isArray(this.state.categoryList) && this.state.categoryList.length > 0 ){
            if(isArray(this.state.connList) && this.state.connList.length > 0){
               this.setState({showAddAndUpdateModal:true,addOperate:true});
            }else{
                message.error("没有添加数据源")
            }
        }else{
            message.error("请先添加分类")
        }
    }

    // 隐藏数据连接选择窗口
    hideModal(){
        this.setState({showAddAndUpdateModal:false})
    }

    // 添加Cube，数据连接弹窗中选择了一种数据连接
    async addCubeSubmit(name,categoryID,connId){
        try{
            this.setState({loading:true});
            // 获取数据连接对象
            const conn = this.state.connList.filter(e=>e._id === connId)[0];
            let dimensions = [],measures = [],tableRel = {};

            //如果数据源是URL，则直接调用服务获取DataSet,根据数据计算维度和度量

            if(conn.type === "bean"){
                // let connInfo = this.props.datasource;
                // connInfo.beanUrl = this.props.projectized.currentProject.get('projectUrl');
                //获取表名
                let tableList = await queryTableListByDbConn(conn);
                if(tableList && tableList.length > 0){
                    const tableName = tableList[0];

                    const fieldsRep = await queryFieldsByDBConnAndTablename(conn,tableName);
                    if(fieldsRep.success){
                        const fields = fieldsRep.data;
                        tableRel = {
                            name : tableName,
                            type : "table",
                            _id : tableName + '_id',
                            fields,
                            tableAlias: tableName,
                            dataSourceId: conn._id,
                            children:[],
                        };
                        //获取数据，计算维度和度量信息
                        fields.forEach(e=>{
                            if(e.type === fieldsType.INTEGER || e.type === fieldsType.DECIMAL ){
                                e.aggregator = AggregatorType.MAX;
                                //度量
                                measures.push({
                                    tableName,
                                    tableId: tableName + '_id',
                                    field: e.name,
                                    role: "Measure",
                                    dataType: e.type,
                                    alias: e.name,
                                    fType: "Measure",
                                    fieldId: uuid().replace(/-/g,'_'),
                                    aggregator:e.aggregator,
                                });
                            }else{
                                e.aggregator = AggregatorType.COUNT;
                                //维度
                                dimensions.push({
                                    tableName,
                                    tableId: tableName + '_id',
                                    field: e.name,
                                    role: "Dimension",
                                    dataType: e.type,
                                    alias: e.name,
                                    fType: "Dimension",
                                    fieldId: uuid().replace(/-/g,'_'),
                                    aggregator:e.aggregator,
                                });
                            }
                        });
                    }else{
                        message.error("数据接口请求失败")
                    }
                }
            }

            // 获取CUBE分类对象
            const category = this.state.categoryList.filter(e=>e._id === categoryID)[0];
            console.log(this.props.user);
            console.log(this.props.project);
            // project
            let newCube = {
                categoryId : category._id,
                name : name,
                user : this.props.user,
                projectId:this.projectId,
                connId:conn._id,
                connType:conn.type,
                tableIder:0,
                tables:tableRel,
                pivotSchema:{
                    dimensions,
                    measures,
                    levels:[],
                },
            };

            //bean数据源则保存生成MDX
            if(conn.type === "bean"){
                 //创建视图
                const mdxRep = await creatViewAndMdx(conn,newCube);
                if(mdxRep.ok){
                    message.success("CUBE XML 生成成功");
                    //保存MDX
                    let mdx = mdxRep.other;
                    newCube.schemaId = mdx.schemaId;
                    newCube.viewName = mdx.factTableName;
                    mdx.updateTime = new Date();
                    //创建MDX
                    const rep = await addMdx(mdx);
                    if(rep.success){
                        console.log("schema 添加成功");
                        newCube.mdxId = rep.data._id;
                    }else if(rep.success === false){
                        message.error(rep.msg)
                    }else{
                        message.error('服务器错误，Schema保存失败')
                    }
                }
            }

            const rep = await addCube(newCube);

            if(rep.success){
                newCube._id = rep.data._id;
                newCube.conn = conn;
                newCube.category = category;
                message.success(rep.msg);

                this.setState(update(
                    this.state,{
                        cubeList:{$push:[newCube]},
                    }
                ));
                this.originalList.push(newCube);
            }else if(!rep.success){
                message.error(rep.msg);
            }else{
                message.warning('服务器连接错误');
            }

        }catch (e){
            message.error("CUBE 添加失败");
            console.log(e);
        }finally {
            this.setState({loading:false});
        }
    }

    // 添加Cube，数据连接弹窗中选择了一种数据连接
    async updateCubeSubmit(cube){

        if(cube.searchName) delete cube.searchName;
        const rep = await updateCube(cube);

        if(rep.success){
            message.success(rep.msg);
            //更新备份数据

            for(let i=0;i<this.state.cubeList.length;i++){

                if(this.state.cubeList[i]._id === cube._id) {
                    let newCubeList = [].concat(this.state.cubeList);
                    newCubeList[i] = cube;
                    this.setState({
                        cubeList:newCubeList,
                    });
                }
            }

            for(let i=0;i<this.originalList.length;i++){
                if(this.originalList[i]._id === cube._id) {
                    this.originalList[i] = cube;
                }
            }
        // console.log(this.originalList);
        }else if(!rep.success){
            message.error(rep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    //菜单栏 搜索下拉框值改变
    searchOptionSelected(option){
        if(option==='all'){
            this.setState({cubeList:cloneDeep(this.originalList)})
        }else{
            let cubeList = cloneDeep(this.originalList.filter(e=>(e.user.name === option)));
            this.setState({cubeList})
        }
    }

    //菜单栏 搜索框值改变
    doSearch(event){

        if(isString(event.target.value)&& event.target.value!==''){
            let inputValue = event.target.value;
            const re =new RegExp(inputValue,'i');
            let cubeList = cloneDeep(this.originalList).filter(e=>(re.test(e.name)));

            cubeList = cubeList.map(e=> {
                e.searchName = e.name.replace(re, "<span style=\"background-color: gold\">" + re.exec(e.name)[0] + "</span>");
                return e;
            });

            this.setState({cubeList})
        }else{
            this.setState({cubeList:cloneDeep(this.originalList)})
        }

    }

    render(){

        //空白页
        const blank = (<div className={styles.conn_form_blank} >请选择左侧CUBE</div>);

        //搜索下拉选项
        const searchOptions = ['admin','tom'].map(e=>({value:e,text:e}));
        searchOptions.push({value:'all',text:'全部用户'});

        return (<Spin spinning={this.state.loading} size="large"> <Layout>
            <Sider width={300} style={{ background: '#fff' ,borderRight: '1px solid #e8e8e8'}}>
                <div style ={{padding:'15px 10px 10px 24px'}}>
                    <span style ={{fontSize:'16px',fontFamily:'Microsoft YaHei UI'}}>CUBE </span>
                    <Button  type="primary" icon="file-add" onClick={this.showAddModal} size="small" style ={{float:'right',marginRight:'10px',fontSize:'12px'}}>添加CUBE</Button>
                    <Button  type="primary" icon="profile"  onClick={e=>this.setState({showCategoryManage:true})} size="small" style ={{float:'right',marginRight:'10px',fontSize:'12px'}}>管理分类</Button>
                </div>
                <div style ={{padding:'10px 10px 10px 20px'}}>
                    <SearchGroup optionDefault="all" options={searchOptions} search={this.doSearch.bind(this)} selected={this.searchOptionSelected.bind(this)}/>
                </div>
                { this.state.categoryList && this.state.categoryList.length > 0 &&
                    <MenuWithContext  height={'calc(100vh - 128px - 50px - 52px)'}
                                   list={this.state.cubeList}
                                   categoryList = {this.state.categoryList}
                                   onCtxMenuSelected={this.selectCtxMenu}
                                   onMenuSelected={this.selectMenu}
                                   contentMenu ={[{key:'edit',label:'编辑'},{key:'rename',label:'重命名'},{key:'delete',label:'删除'}]}/>
                }
            </Sider>
            <Content style={{ height: '100%',background: '#fff' }}>
                {this.state.activeCube ? <CubeSummary cube={this.state.activeCube}/> : blank }
            </Content>
            {
                this.state.showAddAndUpdateModal &&
                <AddAndUpdateCube
                    current = {0}
                    isAddOperate={this.state.addOperate}
                    show = {this.state.showAddAndUpdateModal}
                    hide = {this.hideModal}
                    onCancel = {this.hideModal}
                    categoryList = {this.state.categoryList}
                    connList = {this.state.connList}
                    onAddSubmit= {this.addCubeSubmit.bind(this)}
                    onUpdateSubmit = {this.updateCubeSubmit.bind(this)}
                    updateCube = {this.state.updateCube}/>
            }
            <Modal
                title = "CUBE分类管理"
                visible = {this.state.showCategoryManage}
                onCancel = {e=>this.setState({showCategoryManage:false})}
                footer={null}>
                <Category update={this.updateCategory.bind(this)}/>
            </Modal>
            {
                this.state.renameCube.name &&
                <WrappedRename
                    cancelRenameModal = {e=>(this.setState({showRenameModal:false}))}
                    id = {this.state.renameCube._id}
                    name = {this.state.renameCube.name}
                    show = {this.state.showRenameModal}
                    onrename = {this.onRenameCube}/>
            }

        </Layout></Spin>)
    }
}

export default connect(state => ({project: state.get('projectized').toObject()
    ,user:state.get('user').get('currentUser').toObject()}))(CubeMange)