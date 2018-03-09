import React, { PureComponent } from 'react';
import { Form, Card, Select,  message, Divider, Row, Col, Button, Input ,Cascader} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import {Link} from 'react-router-dom';

const { Option } = Select;
const FormItem = Form.Item;

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
class WidgetEdit extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            compName:"",
            compInput:true,
            compCascader:true,
            compClassify:[],
            compSelectedId:'',
            compSelectedImg:'',
            labelSelect:[],
        }
    }
    componentDidMount() {
        if(this.props.location.query){
            if(this.props.location.query.name){
                this.setState({compName: this.props.location.query.name });
                this.setState({compClassify: ['zhejiang', 'hangzhou', 'xihu']});
                this.setState({labelSelect:  ['zxx']});
            }
        }

    }
    compNameChange = (e) => {
        this.setState({ compName: e.target.value });
        this.setState({ compInput: true });
    }
    compClassifyChange = (value) => {
        this.setState({ compClassify: value });
        this.setState({ compCascader: true });
    }
    compSave = () => {
        if(!this.state.compName){
            this.setState({ compInput: false });
        }
        if(!this.state.compClassify.length){
            this.setState({ compCascader: false });
        }
        if(this.state.compClassify.length&&this.state.compName){
            message.success('可以保存')
        }
    }
    /*标签过滤*/
    labelChange = (value) => {
        console.log(value);
        if(value){
            this.setState({labelSelect:value});
        }

    }
    render() {
        const {form} = this.props;
        const {getFieldDecorator } = form;
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
            <div style={{maxHeight:'calc(100vh - 128px)',overflow:'hidden'}}>
                <Row gutter={16} style={{padding:'84px 80px'}}>
                    <Col className="gutter-row" span={12} style={{ padding:"0 60px 0 30px" }}>
                        <Card hoverable
                              bodyStyle={{padding:'0 0 8px 0'}}
                              style={{height:'calc(100vh - 328px)',minHeight:300,border:'1px dotted #ccc',backgroundColor:'transparent'}}
                              >
                            <div style={{height:'calc(100vh - 328px)',padding:'0 20px',minHeight:300,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img alt="example"
                                     style={{display:'block',minHeight:200,maxWidth:'100%',maxHeight:'calc(100vh - 328px)'}}
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
                                        <Input style={{minWidth:400}} value={this.state.compName} addonBefore="组件名称" placeholder="请输入组件名称" size="large" onChange={this.compNameChange}/>
                                    </FormItem>
                                </div>
                                <Divider dashed />
                                <div style={{ marginBottom: 16,paddingLeft:30}}>
                                    <FormItem
                                        hasFeedback
                                        validateStatus={this.state.compCascader?"":"error"}
                                        help={this.state.compCascader?"":"组件分类必填!"}
                                    >
                                        <Cascader size="large" style={{minWidth:400}} placeholder='请选择分类' value={this.state.compClassify} options={options} onChange={this.compClassifyChange} />
                                    </FormItem>
                                </div>
                                <Divider dashed />
                                <StandardFormRow title="组件标签" grid style={{ marginBottom: 16,paddingLeft:30}}>
                                    <Row>
                                        <Col lg={16} md={24} sm={24} xs={24}>
                                            <FormItem>
                                                {getFieldDecorator('owner', {
                                                    initialValue: this.state.labelSelect,
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
                            </div>
                        </Form>
                    </Col>
                </Row>
                <Row >
                    <Col style={{textAlign:'right'}}>
                        <div>
                            <Link to={'/widget/list/2d'} >
                                <Button style={{ marginRight: 8 }} >取消</Button>
                            </Link>
                            <Button style={{ marginRight: 8 }} type="primary" onClick={this.compSave}>保存</Button>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default (WidgetEdit)
