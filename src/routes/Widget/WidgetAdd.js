import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Select, List, Steps,  message, Icon, Divider, Row, Col, Button, Input , Pagination,Cascader , Switch} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './WidgetAdd.scss';
import {getPrototypes} from '../../service/prototype';
import {Link} from 'react-router-dom';
import { addWidget } from '../../service/widget'
import Immutable from 'immutable'


const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;
const pageSize = 5;
const Step = Steps.Step;
const steps = [{
    title: '选择原型组件（双击原型组件）',
}, {
    title: '保存组件',
}];
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

@Form.create()
class WidgetAdd extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            expand: false,
            buttonText:'更多条件',
            display:'none',
            list:[],
            total:0,
            current: 0,
            compName:'',
            compInput:true,
            compCascader:true,
            compClassify:'',
            compSelectedId:'',
            compSelectedImg:'',
            disabled:true,
            isExtendPro:true,
            labelSelect:[],
        }
        this.pagination = {page:1,pageSize:7}
        this.queryObject = {name:'',type:''}
    }

    async componentDidMount() {
        //加载数据
        this.fetchMore(this.pagination)
    }

    compSearch  = (value) => {
        //if(value){
        this.queryObject.name = value;
        this.fetchMore({...this.pagination,...this.queryObject});
        //}
    }

    fetchMore = async (queryObject) =>{
        const response = await getPrototypes(queryObject);
        if(response.success){
            const {list,total} = response.data
            this.setState({list,total,loading:false})
        }
    }

    pageSizeChange = (current, size) => {
        this.pagination = {page:current,pageSize:size}
        this.fetchMore({...this.pagination,...this.queryObject})
    }

    searchToggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand});
        if(this.state.expand){
            this.setState({buttonText:'更多条件',display:'none'});
        }else {
            this.setState({buttonText:'收起',display:'flex'});
        }
    }
    /*分页页码选中事件*/
    onChange = (page,pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    /*实例名称改变事件方法*/
    compNameChange = (e) => {
        this.setState({ compName: e.target.value , compInput: true});
    }
    /*实例分类改变事件方法*/
    compClassifyChange = (value) => {
        this.setState({ compClassify: value ,compCascader: true});
    }
    /*标签过滤*/
    labelChange = (value) => {
        if(value){
            this.setState({labelSelect:value});
        }

    };
    /*选择实例原型*/
    compSelect = (data) => {
        if(this.state.compSelectedId===data._id){
            this.setState({ compSelectedId: '',compSelectedImg: '' , disabled: true});
        }else{
            this.setState({ compSelectedId: data._id , compSelectedImg: data , disabled: false});
        }
    }
    /*是否继承原型样式*/
    prototypeStyleState = (checked) => {
        this.setState({isExtendPro:checked});
    }
    /*保存新增实例*/
    compSave = async (isDesignNow) => {
        if(!this.state.compName){
            this.setState({ compInput: false });
            return false
        }

        const { compName:name , compCascader:type , compSelectedId:prototypeId , isExtendPro:extendPrototypeStyle , labelSelect:labels } = this.state,
            {curProject:{id:projectId}} = this.props,
            rep = await addWidget({ name , type , prototypeId , extendPrototypeStyle , labels , projectId})
        if(rep.success){
            message.success('保存成功')
            if(isDesignNow){
                //跳转到设计器
                this.props.history.push(`/designer/widget/${rep.data._id}`)
            }else{
                //返回实例列表
                this.props.history.push('/widget/list/2d')
            }
        }else{
            message.warning(rep.msg)
        }

    }
    render() {
        const {form} = this.props;
        const {getFieldDecorator } = form;
        const {list,current,loading,total} = this.state;
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
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content" style={{ padding:"15px 0" }}>
                    {this.state.current?
                        <div style={{maxHeight:'calc(100vh - 222px)',overflow:'hidden'}}>
                            <Row gutter={16} style={{padding:'100px 80px'}}>
                                <Col className="gutter-row" span={12} style={{ padding:"0 60px 0 30px" }}>
                                    <Card hoverable
                                          bodyStyle={{padding:'0 0 8px 0'}}
                                          style={{height:'calc(100vh - 422px)',minHeight:300,border:'1px dotted #ccc',backgroundColor:'transparent'}}
                                          className={styles.card}>
                                        <div style={{height:'calc(100vh - 422px)',padding:'0 20px',minHeight:300,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <img alt="example"
                                                 style={{display:'block',minHeight:200,maxWidth:'100%',maxHeight:'calc(100vh - 422px)'}}
                                                 src="http://demo.gdbigdata.com:82/thumbnails/widget/w_4028a8c65e848bd7015e9ee81b003ab5.png" />
                                        </div>
                                    </Card>
                                </Col>
                                <Col className="gutter-row" span={12} style={{ padding:"0 30px 0 60px" }}>
                                    <Form layout="inline">
                                        <div className="gutter-box">
                                            <div style={{ marginBottom: 16 ,paddingLeft:30}}>
                                                <FormItem
                                                    hasFeedback
                                                    validateStatus={this.state.compInput?"":"error"}
                                                    help={this.state.compInput?"":"组件名称必填!"}
                                                >
                                                    <Input style={{minWidth:400}} addonBefore="组件名称" placeholder="请输入组件名称" size="large" onChange={this.compNameChange}/>
                                                </FormItem>
                                            </div>
                                            <Divider dashed />
                                            <div style={{ marginBottom: 16,paddingLeft:30}}>
                                                <FormItem
                                                    hasFeedback
                                                    validateStatus={this.state.compCascader?"":"error"}
                                                    help={this.state.compCascader?"":"组件分类必填!"}
                                                >
                                                    <Cascader size="large" style={{minWidth:400}} placeholder='请选择分类' options={options} onChange={this.compClassifyChange} />
                                                </FormItem>
                                            </div>
                                            <Divider dashed />
                                            <StandardFormRow title="组件标签" grid style={{ marginBottom: 16,paddingLeft:30}}>
                                                <Row>
                                                    <Col lg={16} md={24} sm={24} xs={24}>
                                                        <FormItem>
                                                            {getFieldDecorator('owner', {
                                                                initialValue: ['wjh', 'zxx'],
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
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </StandardFormRow>
                                            <div style={{ marginBottom: 16,paddingLeft:30}}>
                                                <FormItem>
                                                    继承原型样式：<Switch defaultChecked onChange={this.prototypeStyleState} style={{marginLeft:12}}/>
                                                </FormItem>
                                            </div>
                                            <Divider dashed />
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                        :<div style={{height:'calc(100vh - 222px)',overflow:'hidden',display:'flex',flexDirection: 'column'}}>
                            <Card bordered={false} bodyStyle={{ padding: '10px 32px'}}>
                                <Form layout="inline">
                                    <StandardFormRow title="搜索"  style={{ paddingBottom: 10 ,marginBottom:10}}>
                                        <Search
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
                                                <TagSelect onChange={this.handleFormSubmit} expandable>
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
                                style={{ marginTop: 12,flex:'1 1 0',overflow:'auto' }}
                                bordered={false}
                                bodyStyle={{ padding: '12px 24px 0 32px',overflow:'auto'}}
                            >
                                <List
                                    loading={loading}
                                    className="instance_list"
                                    rowKey="_id"
                                    grid={{ gutter: 18, lg: 4, md: 3, sm: 2, xs: 1 }}
                                    dataSource={[...list]}
                                    renderItem={item =>(
                                        <List.Item key={item._id}>
                                            <Card hoverable
                                                  bodyStyle={{padding:'0 0 8px 0'}}
                                                  style={{height: 219,boxSizing:'border-box',border:item._id===this.state.compSelectedId?'2px solid #1890ff':'1px solid #e8e8e8'}}
                                                  id={item._id}
                                                  onClick={()=>this.compSelect(item)}
                                                  className={styles.card}>
                                                <div style={{height:153,marginTop:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    <img alt="example"
                                                         style={{display:'block',maxWidth:'100%',maxHeight:153}}
                                                         src="http://demo.gdbigdata.com:82/thumbnails/widget/w_4028a8c65e848bd7015e9ee81b003ab5.png" />
                                                </div>
                                                <div style={{width:"100%",padding:'8px 0',textAlign:'center',marginTop:8,borderTop:'1px solid #e8e8e8'}}>
                                                    <a style={{fontSize:16,color:'#676767'}}>{item.name?item.name:'未命名'}</a>
                                                </div>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            <Card bordered={false}
                                  bodyStyle={{ padding: '14px 0'}}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:32}}>
                                    <Pagination showSizeChanger
                                                defaultPageSize = {7}
                                                pageSizeOptions = {['7','15','23','31','39','47']}
                                                onShowSizeChange={this.pageSizeChange}
                                                onChange={this.onChange} defaultCurrent={1} total={total} />
                                </div>
                            </Card>
                        </div>
                    }
                </div>
                <div className="steps-action" style={{textAlign:'right'}}>
                    {
                        this.state.current < steps.length - 1
                        &&
                        <div>
                            <Link to={'/widget/list/2d'} >
                                <Button type="primary" style={{ marginRight: 8 }}>取消</Button>
                            </Link>
                            <Button onClick={() => this.next()} disabled={this.state.disabled}>下一步</Button>
                        </div>

                    }
                    {
                        this.state.current > 0
                        &&
                        <div>
                            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                                上一步
                            </Button>
                            <Link to={'/widget/list/2d'} >
                                <Button style={{ marginRight: 8 }} type="primary">取消</Button>
                            </Link>
                            <Button style={{ marginRight: 8 }} type="primary" onClick={()=>this.compSave(false)}>保存</Button>
                            <Button  type="primary" onClick={() => this.compSave(true)}>保存并设计</Button>
                        </div>

                    }
                </div>
            </div>

        );
    }
}

export default connect(state => ({'curProject':state.getIn(['projectized','currentProject']).toObject()}))(WidgetAdd)
