import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Select, Popover ,message,Tooltip} from 'antd';
import styles from './TemplateEdit.css';
import BraceEditor from '../../components/BraceEditor';
import {saveTemplate,updateTemplate,getTemplateByName}from '../../service/template';
import { beautifyJs } from '../../utils'

const { Option } = Select;

const fieldLabels = {
  name: '模板名称',
  type: '模板类型',
  version: '模板版本',
  description: '模板描述',
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
class TemplateEdit extends PureComponent {
  constructor(props){
      super(props);
      //this.templateContent ='';
      this.template = {};
      this.isModifie = false;
      this.state={
          templateContent:'',
          loading:true,
      }
  }

 async componentDidMount() {
    //加载完
     const {name:parmName} = this.props.match.params;
     this.isModifie = !(parmName === '_addNew_');
     if(this.isModifie){
         const response = await getTemplateByName({name:parmName});
         if(response.success){
             this.template = response.data;
             this.setState({ templateContent: beautifyJs(JSON.stringify(this.template.define))})
         }
     }
     this.setState({loading:false})
  }

    initFieldDecorators = () =>{
      const {getFieldDecorator} = this.props.form;
      const {name,type,version,description} = this.template;
      return{
           name:getFieldDecorator('name', {rules: [{ required: true, message: '请输入模板名称' }],initialValue:name}),
           type:getFieldDecorator('type',{rules: [{ required: true, message: '请选择模板分类' }],initialValue:type}),
           version:getFieldDecorator('version',version&&{initialValue:version}),
           description:getFieldDecorator('description',description&&{initialValue:description}),
       }
  }

  componentWillUnmount() {
    //卸载前

  }

  handleScrtipUpdate = (value) =>{
      this.setState({templateContent:value})
        //this.templateContent = value
  }

  handleSubmit =(e) =>{
      e.preventDefault();
      const {validateFields}  = this.props.form;
      validateFields(
          async (errors,values)=>{
           if(!errors){
               const define = JSON.parse(this.state.templateContent),
                     save = this.isModifie ? updateTemplate : saveTemplate,
                     vo   = this.isModifie ?{...values,define,_id:this.template._id}:{...values,define},
                     response = await save(vo)
                    if(response.success){
                        message.success("保存成功");
                    }else{
                        message.warning(response.msg)
                    }
           }
      })
  }

  handleExit=()=>{
      this.props.history.push(`/prototype/template`);
  }

  handleBeautifyJs =()=>{
     this.setState(preState =>{return {templateContent:beautifyJs(preState.templateContent)}})
     // this.templateContent = beautifyJs(this.templateContent)
     // this.setState({loading:false})
  }

  render() {
    const {getFieldsError} = this.props.form;
    const {name,type,version,description} = this.initFieldDecorators();
    const action = (<div>
                     <Button  type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} style={{marginRight:'8px'}}>保存</Button>
                     <Button   onClick={this.handleExit}>退出</Button>
                    </div>);
    const extra = (<div>
        <Tooltip title="格式化文本">
            <Icon type="solution" className={ styles.beautifyBtn } onClick={this.handleBeautifyJs}/>
        </Tooltip>
        </div>
    )

    return (
        <Form layout={'horizontal'} hideRequiredMark onSubmit={this.handleSubmit}>
        <Card title="模板" className={styles.card} bordered={true} extra={action}>
         <Row gutter={8}>
           <Col lg={6} md={6} sm={24}>
             <Card title="基本信息" className={styles.card} bordered={true} type="inner">
                 <Row gutter={16}>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.name}>
                         {name(
                             <Input placeholder="请输入模板名称" />
                         )}
                     </Form.Item>
                   </Col>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.type}>
                         {type(
                             <Select placeholder="请选择模板分类">
                               <Option value="base">基础模板</Option>
                               <Option value="component">组件模版</Option>
                             </Select>
                         )}
                     </Form.Item>
                   </Col>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.version}>
                         {version(
                             <Input disabled />
                         )}
                     </Form.Item>
                   </Col>
                 </Row>
                 <Row gutter={16}>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.description}>
                         {description(
                             <Input.TextArea  placeholder="请对该模板进行简单描述" autosize />
                         )}
                     </Form.Item>
                   </Col>
                 </Row>

             </Card>
           </Col>
           <Col lg={18} md={18} sm={24}>
             <Card title="模板定义"
                   className={styles.card}
                   bordered={true}
                   extra={extra}
                   type="inner">
               <BraceEditor
                   panelHeight={600}
                   onScriptChange={this.handleScrtipUpdate}
               >
                   {this.state.templateContent}
               </BraceEditor>
             </Card>
           </Col>
         </Row>
        </Card>
        </Form>
    );
  }
}

export default TemplateEdit
