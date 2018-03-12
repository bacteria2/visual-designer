import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, message,Card, Select, List,  Icon, Row, Col, Input,Pagination ,Tooltip,Popconfirm,Modal} from 'antd';
import {fetchWidgetList,fetchCopyWidget,fetchDeleteWidget} from '../../store/Widget/action'
import StandardFormRow from '../../components/StandardFormRow';

import TagSelect from '../../components/TagSelect';
import styles from './WidgetList.css';
import {Link} from 'react-router-dom';

const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;


@Form.create()
class WidgetList extends PureComponent {
  state = {
      expand: false,
      buttonText:'更多条件',
      display:'none',
      categorySelect:[],
      compSearchName:'',
      labelSelect:[],
      showCopyRename:false,
      newName:'',
  };
  componentDidMount() {
    this.fetchMore({page:1,pageSize:10});
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
      this.fetchMore({page:page,pageSize:pageSize,categorySelect:this.state.categorySelect,compSearchName:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*分页页数大小方法*/
  pageSizeChange = (current, size) => {
      this.fetchMore({page:current,pageSize:size,categorySelect:this.state.categorySelect,compSearchName:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*分类方法*/
  categoryChange  = (checkedValue) => {
      this.setState({categorySelect:checkedValue});
      this.fetchMore({page:1,pageSize:10,categorySelect:checkedValue,compSearchName:this.state.compSearchName,labelSelect:this.state.labelSelect});
  }
  /*组件名称搜索*/
  compSearch  = (value) => {
      if(value){
          this.setState({compSearchName:value});
          this.queryObject =  {page:1,pageSize:10,categorySelect:this.state.categorySelect,compSearchName:value,labelSelect:this.state.labelSelect};
          this.fetchMore(this.queryObject);
      }
  }
  /*标签过滤*/
  labelChange = (value) => {
      if(value){
          this.setState({labelSelect:value});
          this.fetchMore({page:1,pageSize:10,categorySelect:this.state.categorySelect,compSearchName:this.state.compSearchName,labelSelect:value});
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

  /*发布实例*/
  deployWidget = (widget) => {

  };

  render() {
    const { form,  list, loading  } = this.props;
    const { getFieldDecorator } = form;
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
        <div style={{height:'calc(100vh - 128px)',overflow:'hidden'}}>
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
                      <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                      <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                      <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                      <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                      <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                      <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                      <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
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
            style={{ marginTop: 12 }}
            bordered={false}
            bodyStyle={{ padding: '12px 24px 0 32px',overflow:'auto',height:this.state.expand?'calc(100vh - 398px)':'calc(100vh - 273px)'}}
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
                          actions={[<Tooltip title="设计"><Icon type="setting" onClick={()=>this.props.history.push(`/designer/widget/${item._id}`)}/></Tooltip>,
                              <Link to={{pathname:'/widget/edit',query:item}}  ><Tooltip title="编辑"><Icon type="edit" /></Tooltip></Link>,
                              <Tooltip title="复制"><Icon type="copy" onClick={()=>{this.showCopyWidgetModal(item)}}/></Tooltip>,
                              <Popconfirm title="确认是否删除实例组件?" onConfirm={()=>this.compDelete(item)} okText="确定" cancelText="取消">
                                  <Tooltip title="删除" placement="bottom"><Icon type="delete"/></Tooltip>
                              </Popconfirm>,
                              <Tooltip title="发布"><Icon onClick={()=>{this.deploy(item)}} type="cloud-upload-o"/></Tooltip>,
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
                  <Pagination showSizeChanger showQuickJumper onChange={this.pageChange} onShowSizeChange={this.pageSizeChange} defaultCurrent={1} total={500} />
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
        </div>
    );
  }
}

export default connect(state=>({
  list:state.getIn(['widget','currentList']),
  project:state.get('projectized').toObject(),
  loading:state.getIn(['widget','loadingList'])}
  ))(WidgetList)
