import React, { PureComponent } from 'react';
import { Form, Card, Select, List, Steps,  message, Icon, Divider, Row, Col, Button, Input , Pagination,Cascader} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './WidgetAdd.scss';
import {getPrototypes} from '../../service/prototype';
import {Link} from 'react-router-dom';


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
            current: 0,
            compName:'',
            compInput:true,
            compCascader:true,
            compClassify:'',
            compSelectedId:'',
            compSelectedImg:'',
            disabled:true,
        }
    }

    async componentDidMount() {
        //加载数据
        const response = await getPrototypes();
        if(response.success){
            this.setState({list:response.data,loading:false})
        }
    }

    setOwner = () => {
        const { form } = this.props;
        form.setFieldsValue({
            owner: ['wzj'],
        });
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
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
    }
    next() {
        console.log(this.state.compSelectedId);
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    compNameChange = (e) => {
        this.setState({ compName: e.target.value });
        this.setState({ compInput: true });
    }
    compClassifyChange = (value) => {
        this.setState({ compClassify: value });
        this.setState({ compCascader: true });
    }
    compSelect(data) {
        if(this.state.compSelectedId===data._id){
            this.setState({ compSelectedId: '' });
            this.setState({ compSelectedImg: '' });
            this.setState({ disabled: true });
        }else{
            this.setState({ compSelectedId: data._id });
            this.setState({ compSelectedImg: data });
            this.setState({ disabled: false });
        }
    }
    compSave = () => {
        if(!this.state.compName){
            this.setState({ compInput: false });
        }
        if(!this.state.compClassify){
            this.setState({ compCascader: false });
        }
        if(this.state.compClassify&&this.state.compName){
            message.success('可以保存')
        }
    }
    render() {
        const {form} = this.props;
        const {getFieldDecorator } = form;
        const {list,current,loading} = this.state;
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
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                        :<div style={{height:'calc(100vh - 222px)',overflow:'hidden'}}>
                            <Card bordered={false} bodyStyle={{ padding: '10px 32px'}}>
                                <Form layout="inline">
                                    <StandardFormRow title="搜索"  style={{ paddingBottom: 10 ,marginBottom:10}}>
                                        <Search
                                            placeholder="请输入原型名称"
                                            onSearch={value => console.log(value)}
                                            style={{ width: 260 }}
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
                                                        initialValue: ['wjh', 'zxx'],
                                                    })(
                                                        <Select
                                                            mode="multiple"
                                                            style={{ maxWidth: 286, width: '100%' }}
                                                            placeholder="选择 owner"
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
                                bodyStyle={{ padding: '12px 24px 0 32px',overflow:'auto',height:this.state.expand?'calc(100vh - 492px)':'calc(100vh - 367px)'}}
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
                                                    <a style={{fontSize:16,color:'#676767'}}>{item.title?item.title:'未命名'}</a>
                                                </div>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            <Card bordered={false}
                                  bodyStyle={{ padding: '14px 0'}}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:32}}>
                                    <Pagination showSizeChanger showQuickJumper onChange={this.onChange} defaultCurrent={1} total={500} />
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
                            <Button style={{ marginRight: 8 }} type="primary" onClick={this.compSave}>保存</Button>
                            <Button  type="primary" onClick={() => message.success('Processing complete!')}>保存并设计</Button>
                        </div>

                    }
                </div>
            </div>

        );
    }
}

export default (WidgetAdd)
