import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown,Form, message,Card, Select, List,  Icon, Row, Col, Input,Pagination ,Tooltip,Popconfirm,Modal,Switch} from 'antd';
import {fetchWidgetList, fetchCopyWidget, fetchDeleteWidget, ChangeLoading, fetchDeployWidgetList} from '../../store/Widget/action'
import StandardFormRow from '../../components/StandardFormRow';

import TagSelect from '../../components/TagSelect';
import styles from './WidgetList.css';
import {Link} from 'react-router-dom';
import {queryDataConnList} from "../../service/DataConnService";
import {deployWidget} from "../../service/widget";
const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;


@Form.create()
class WidgetList extends PureComponent {
  constructor(props) {
      super(props);
      this.queryConnList=this.queryConnList.bind(this);
      this.deployWidget=this.deployWidget.bind(this);
  }
  state = {
      expand: false,
      buttonText:'更多条件',
      display:'none',
      categorySelect:[],
      compSearchName:'',
      labelSelect:[],
      showCopyRename:false,
      newName:'',
      showDeployWidget:false,
      connList:[],
      projectId : this.props.project.currentProject.get('id'),
      conn:'',
      idList:[],
      createTable:false,
      editWidget:{},
  };
  async componentDidMount() {
    this.pagination = {page:1,pageSize:7};
    this.fetchMore({page:1,pageSize:7});
    this.setState({connList:await this.queryConnList()});
  }
  //获取数据连接列表
  async queryConnList(){
      let connRep = await queryDataConnList(this.state.projectId);
      if(connRep.success){
          return connRep.data;
      }else if(!connRep.success){
          message.error(connRep.msg);
      }else{
          message.warning('服务器连接错误');
      }
  }
  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  }

  fetchMore = (condition) => {
    this.props.dispatch(fetchWidgetList(condition))
  }

  searchToggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand});
      if(this.state.expand){
          this.setState({buttonText:'更多条件'});
          this.setState({display:'none'});
      }else {
          this.setState({buttonText:'收起'});
          this.setState({display:'flex'});
      }
  }
  /*分页页数方法*/
  pageChange = (page,pageSize) => {
      this.pagination = {page,pageSize}
      this.fetchMore({...this.pagination,categorySelect:this.state.categorySelect,name:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*分页页数大小方法*/
  pageSizeChange = (current, size) => {
      this.pagination = {page:current,pageSize:size}
      this.fetchMore({...this.pagination,categorySelect:this.state.categorySelect,name:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*分类方法*/
  categoryChange  = (checkedValue) => {
      this.setState({categorySelect:checkedValue});
      this.fetchMore({...this.pagination,categorySelect:checkedValue,name:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*组件名称搜索*/
  compSearch  = (value) => {
      //if(value){
          this.setState({compSearchName:value});
          this.queryObject =  {...this.pagination,categorySelect:this.state.categorySelect,name:value,labelSelect:this.state.labelSelect};
          this.fetchMore(this.queryObject);
      //}
  }
  /*标签过滤*/
  labelChange = (value) => {
      if(value){
          this.setState({labelSelect:value});
          this.fetchMore({...this.pagination,categorySelect:this.state.categorySelect,name:this.state.compSearchName,labelSelect:value});
      }

  };

  /*删除实例组件*/
  compDelete(widget) {
      this.props.dispatch(fetchDeleteWidget(widget._id,this.queryObject));
  }

  /*显示复制实例重命名的弹窗*/
  showCopyWidgetModal(widget){
    if(widget) this.setState({showCopyRename:true,copySrcWidget:widget, newName:''});
  }
  /*复制实例*/
  copyWidget = () => {

      this.setState({showCopyRename:false});

      const {copySrcWidget:widget,newName} = this.state;

      if(widget._id){
          this.props.dispatch(fetchCopyWidget(widget._id,newName));
      }else{
          message.warn("复制失败，获取实例ID异常");
      }
  };
  /*编辑发布实例信息*/
  deployWidgetEdit = (widget) => {
    let selectedId=[];
    if(widget._id){
        selectedId[0]=widget._id;
        this.setState({idList:selectedId});
    }
    this.setState({showDeployWidget:true})
  };
  /*加入发布列表*/
  addDeployWidgetList = (widget,deployedList) => {
      if(widget._id){
          if(deployedList.indexOf(widget._id)==-1){
              deployedList.push(widget._id);
              this.props.dispatch(fetchDeployWidgetList(deployedList));
              message.success('加入发布列表成功');
          }else {
              message.info('发布列表已存在该实例，请确认！');
          }
      }
  }
  /*确定发布实例*/
  async deployWidget () {
      let data={
          "dbOption":{
              "createTable":this.state.createTable,
          },
          "idList":this.state.idList,
      }
      if (!this.state.conn){
          data.dbOption.host=this.state.connList[0].server;
          data.dbOption.user=this.state.connList[0].account;
          data.dbOption.password=this.state.connList[0].pwd;
          if(this.state.connList[0].type==="mysql"){
              data.dbOption.database=this.state.connList[0].database;
          }else if(this.state.connList[0].type==="oracle"){
              data.dbOption.serviceName=this.state.connList[0].database;
          }else{
              message.warning('不支持当前选择的数据库类型，请重新选择！');
              return false;
          }
      }else{
          this.state.connList.map((e) => {
              if(e._id===this.state.conn){
                  data.dbOption.host=e.server;
                  data.dbOption.user=e.account;
                  data.dbOption.password=e.pwd;
                  if(e.type==="mysql"){
                      data.dbOption.database=e.database;
                  }else if(e.type==="oracle"){
                      data.dbOption.serviceName=e.database;
                  }else{
                      message.warning('不支持当前选择的数据库类型，请重新选择！');
                      return false;
                  }
              }
          })
      }
     if(data.dbOption.user){
         const deployWidgetRep =await deployWidget(data);
         if(deployWidgetRep.success){
             message.success('组件发布成功');
             this.setState({showDeployWidget:false})
         }else if(!deployWidgetRep.success){
             message.error(deployWidgetRep.msg);
         }else{
             message.warning('服务器连接错误');
         }
     }
  };
  onConnSelect(value){
      this.setState({ conn:value });
  }
  /*是否创建表开关*/
  createTableSwitch= (checked) =>{
      this.setState({createTable:checked});
  }
  /*实例下拉菜单显示*/
  widgetVisibleChange = (widget) =>{
      this.setState({editWidget:widget});
  }
  render() {
    const { form,  list:{total,list}, loading ,deployList } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
       labelCol: { span: 6 },
       wrapperCol: { span: 14 },
    };
    const menu = (
      <Menu>
          <Menu.Item>
              <span onClick={()=>{this.addDeployWidgetList(this.state.editWidget,[...deployList.toJS()])}}>加入发布列表</span>
          </Menu.Item>
          <Menu.Item>
              <span onClick={()=>{this.deployWidgetEdit(this.state.editWidget)}}>立即发布</span>
          </Menu.Item>
      </Menu>
    );

    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    return (
        <div style={{height:'calc(100vh - 128px)',overflow:'hidden',display:'flex',flexDirection: 'column'}}>
          <Card bordered={false} bodyStyle={{ padding: '10px 32px'}}>
            <Form layout="inline">
              <StandardFormRow title="搜索"  style={{ paddingBottom: 10 ,marginBottom:10}}>
                <Search
                    placeholder="请输入实例名称"
                    onSearch={value => this.compSearch(value)}
                    enterButton
                    style={{ width: 300 }}
                />
                <a style={{ fontSize: 14 , float : 'right'}} onClick={this.searchToggle}>
                    {this.state.buttonText} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </StandardFormRow>
              <StandardFormRow title="所属类目"  style={{ paddingBottom: 10,marginBottom:10,display: this.state.display }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.categoryChange} expandable>
                      <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                      <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                      <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="owner" grid style={{ display: this.state.display }}>
                <Row>
                  <Col lg={16} md={24} sm={24} xs={24}>
                    <FormItem>
                      {getFieldDecorator('owner', {
                        initialValue: ['wjh'],
                      })(
                        <Select
                          mode="multiple"
                          style={{ maxWidth: 286, width: '100%' }}
                          placeholder="选择 owner"
                          onChange={this.labelChange}
                        >
                          {
                            owners.map(owner =>
                              <Option key={owner.id} value={owner.id}>{owner.name}</Option>
                            )
                          }
                        </Select>
                      )}
                      <a className={styles.selfTrigger} onClick={this.setOwner}>只看自己的</a>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <Card
            style={{ marginTop: 12,flex:'1 1 0',overflow:'auto'}}
            bordered={false}
            bodyStyle={{ padding: '12px 24px 0 32px'}}
          >
            <List
              loading={loading}
              className="instance_list"
              rowKey="_id"
              grid={{ gutter: 18, lg: 4, md: 3, sm: 2, xs: 1 }}
              dataSource={['',...list.toJS()]}
              renderItem={item => (item ? (
                  <List.Item key={item._id}>
                    <Card hoverable
                          bodyStyle={{padding:'0 0 8px 0'}}
                          style={{height: 250}}
                          className={styles.card}
                          actions={[<Tooltip title="设计">
                            <Icon type="setting" onClick={()=>{
                              this.props.history.push(`/designer/widget/${item._id}`)
                              this.props.dispatch({type:ChangeLoading,payload:true})
                            }}/></Tooltip>,
                              <Link to={{pathname:'/widget/edit',query:item}}  ><Tooltip title="编辑"><Icon type="edit" /></Tooltip></Link>,
                              <Tooltip title="复制"><Icon type="copy" onClick={()=>{this.showCopyWidgetModal(item)}}/></Tooltip>,
                              <Popconfirm title="确认是否删除实例组件?" onConfirm={()=>this.compDelete(item)} okText="确定" cancelText="取消">
                                  <Tooltip title="删除" placement="bottom"><Icon type="delete"/></Tooltip>
                              </Popconfirm>,
                              <Dropdown overlay={menu} placement="topCenter" onVisibleChange={() => this.widgetVisibleChange(item)}>
                                  {/*<Tooltip title="发布"><Icon onClick={()=>{this.deployWidgetEdit(item)}} type="cloud-upload-o"/></Tooltip>,*/}
                                  <Icon type="cloud-upload-o" style={{padding:'2px 10px'}}/>
                              </Dropdown>,
                          ]}>
                        <div style={{padding:'8px 0 8px 30px'}}>
                            <a style={{fontSize:16,color:'#676767'}}>{item.name?item.name:'未命名'}</a>
                        </div>
                        <div style={{height:153,display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <img alt="example"
                                 style={{display:'block',maxWidth:'100%',maxHeight:153}}
                                 src="http://demo.gdbigdata.com:82/thumbnails/widget/w_4028a8c65e848bd7015e9ee81b003ab5.png" />
                        </div>
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                      <Link to={'/widget/add'} >
                        <Card bodyStyle={{padding:'0'}} hoverable className={styles.card} style={{display:'flex',justifyContent:'center',height: 250,alignItems:'center'}}>
                            <Icon type="plus" style={{ fontSize:140 }}/>
                        </Card>
                      </Link>
                  </List.Item>
                )
              )}
            />
          </Card>
          <Card bordered={false}
                bodyStyle={{ padding: '14px 0'}}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:32}}>
                  <Pagination showSizeChanger
                              showQuickJumper
                              defaultPageSize = {7}
                              pageSizeOptions = {['7','15','23','31','39','47']}
                              onChange={this.pageChange}
                              onShowSizeChange={this.pageSizeChange}
                              defaultCurrent={1} total={total} />
              </div>
          </Card>
          <Modal
             title="重命名"
             visible={this.state.showCopyRename}
             onOk={this.copyWidget}
             onCancel={()=>{this.setState({showCopyRename:false})}}
          >
            <Input placeholder="实例名称" value = {this.state.newName} onChange={(e)=>{
                this.setState({newName:e.target.value});
            }}/>
          </Modal>
          <Modal
              title="组件发布"
              cancelText={'取消'}
              okText={'确定'}
              visible={this.state.showDeployWidget}
              onOk={this.deployWidget}
              onCancel={()=>{this.setState({showDeployWidget:false})}}
          >
              <Form >
                  <FormItem
                      {...formItemLayout}
                      label="数据源"
                      style={{marginBottom:8}}
                  >
                      <Select key = "conn"
                              placeholder="请选择数据源:"
                              value = {this.state.conn?this.state.conn:this.state.connList[0]&&this.state.connList[0].name}
                              onSelect = {this.onConnSelect.bind(this)}
                      >
                          {this.state.connList.map(e => (<Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>))}
                      </Select>
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="是否新建表:"
                      style={{marginBottom:0}}
                  >
                      <Switch onChange={this.createTableSwitch}/>
                      <span style={{color:'red',display:'inline-block',marginLeft:20}}>
                        开启会重新创建新表！
                      </span>
                  </FormItem>
              </Form>

          </Modal>
        </div>
    );
  }
}

export default connect(state=>({
  list:state.getIn(['widget','currentList']).toObject(),
  deployList:state.getIn(['widget','deployList']),
  project:state.get('projectized').toObject(),
  loading:state.getIn(['widget','loadingList'])}
))(WidgetList)
