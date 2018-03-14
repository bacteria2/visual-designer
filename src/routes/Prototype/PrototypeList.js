import React, { PureComponent } from 'react';
import { Form, Card, Select, List, Icon, Row, Col, Input , Pagination ,Tooltip,Popconfirm} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './PrototypeList.css';
import {getPrototypes} from '../../service/prototype';

const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;

@Form.create()
class PrototypeList extends PureComponent {
  constructor(props){
    super(props);
    this.state={
        loading:true,
        expand: false,
        buttonText:'更多条件',
        display:'none',
        list:[],
        total:0,
    }
    this.pagination = {page:1,pageSize:7}
    this.queryObject = {name:'',type:''}
  }

  componentDidMount() {
    //加载数据
   this.fetchMore(this.pagination)
 }

fetchMore = async (queryObject) =>{
    const response = await getPrototypes(queryObject);
    if(response.success){
        const {list,total} = response.data
        this.setState({list,total,loading:false})
    }
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

 onChange = (page,pageSize) => {
     this.pagination = {page,pageSize}
     this.fetchMore({...this.pagination,...this.queryObject})
 }

 pageSizeChange = (current, size) => {
     this.pagination = {page:current,pageSize:size}
     this.fetchMore({...this.pagination,...this.queryObject})
 }


 /*删除原型组件*/
 protoDelete(value) {
    console.log(value);
 }

    /*组件名称搜索*/
compSearch  = (value) => {
        //if(value){
        this.queryObject.name = value;
        this.fetchMore({...this.pagination,...this.queryObject});
        //}
    }

handleTypeChange = (checkedValue) =>{
    this.queryObject.type = checkedValue
    this.fetchMore({...this.pagination,...this.queryObject});
}


 render() {
    const {form} = this.props;
    const { getFieldDecorator } = form;
    const {list,loading,total} = this.state;
      return (
          <div style={{height:'calc(100vh - 128px)',overflow:'hidden'}}>
            <Card bordered={false} bodyStyle={{ padding: '10px 32px'}}>
              <Form layout="inline">
                <StandardFormRow title="搜索"  style={{ paddingBottom: 10 ,marginBottom:10}}>
                  <Search
                      placeholder="请输入原型名称"
                      onSearch={value => this.compSearch(value)}
                      enterButton
                      style={{ width: 300 }}
                  />
                  <a style={{ fontSize: 14 , float : 'right'}} onClick={this.searchToggle}>
                      {this.state.buttonText} <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                </StandardFormRow>
                <StandardFormRow title="所属分类"  style={{ paddingBottom: 10,marginBottom:10,display: this.state.display }}>
                  <FormItem>
                      {getFieldDecorator('category')(
                          <TagSelect onChange={this.handleTypeChange} expandable>
                            <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                            <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                            <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                          </TagSelect>
                      )}
                  </FormItem>
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
                  dataSource={['',...list]}
                  renderItem={item => (item ? (
                          <List.Item key={item._id}>
                            <Card hoverable
                                  bodyStyle={{padding:'0 0 8px 0'}}
                                  style={{height: 250}}
                                  className={styles.card}
                                  actions={[<Tooltip title="设计"><Icon type="setting" onClick={()=>this.props.history.push(`/prototype/designer/${item._id}`)}/></Tooltip>,
                                      <Tooltip title="编辑"><Icon type="edit" /></Tooltip>,
                                      <Popconfirm title="确认是否删除原型组件?" onConfirm={()=>this.protoDelete(item)} okText="确定" cancelText="取消">
                                          <Tooltip title="删除" placement="bottom"><Icon type="delete"/></Tooltip>
                                      </Popconfirm>,
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
                            <Card bodyStyle={{padding:'0'}} hoverable className={styles.card} style={{display:'flex',justifyContent:'center',height: 250,alignItems:'center'}}>
                              <Icon type="plus" style={{ fontSize:140 }}/>
                            </Card>
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
                            onChange={this.onChange}
                            onShowSizeChange={this.pageSizeChange}
                            defaultCurrent={1}
                            total={total} />
              </div>
            </Card>
          </div>
      );
  }
}

export default (PrototypeList)
