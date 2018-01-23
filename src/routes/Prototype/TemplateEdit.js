import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Select, Popover } from 'antd';
import styles from './TemplateEdit.css';
import BraceEditor from '../../components/BraceEditor';

const { Option } = Select;

const fieldLabels = {
  name: '模板名称',
  type: '模板类型',
  version: '模板版本',
  description: '模板描述',
};

@Form.create()
class TemplateEdit extends PureComponent {
  state = {
    width: '100%',
    templateContent:'abc'
  };
  componentDidMount() {
    //加载完
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    //卸载前
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }

  handleScrtipUpdate = () =>{

  }
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };

    const action = (<Button  type="primary">保存</Button>);

    return (
        <Card title="模板" className={styles.card} bordered={true} extra={action}>
         <Row gutter={8}>
           <Col lg={6} md={6} sm={24}>
             <Card title="基本信息" className={styles.card} bordered={true} type="inner">
               <Form layout={'horizontal'} hideRequiredMark>
                 <Row gutter={16}>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.name}>
                         {getFieldDecorator('name', {
                             rules: [{ required: true, message: '请输入模板名称' }],
                         })(
                             <Input placeholder="请输入模板名称" />
                         )}
                     </Form.Item>
                   </Col>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.type}>
                         {getFieldDecorator('type')(
                             <Select placeholder="请选择模板分类">
                               <Option value="base">基础模板</Option>
                               <Option value="component">组件模版</Option>
                             </Select>
                         )}
                     </Form.Item>
                   </Col>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.version}>
                         {getFieldDecorator('version')(
                             <Input disabled />
                         )}
                     </Form.Item>
                   </Col>
                 </Row>
                 <Row gutter={16}>
                   <Col span={24}>
                     <Form.Item label={fieldLabels.description}>
                         {getFieldDecorator('description')(
                             <Input.TextArea  placeholder="请对该模板进行简单描述" autosize />
                         )}
                     </Form.Item>
                   </Col>
                 </Row>
               </Form>
             </Card>
           </Col>
           <Col lg={18} md={18} sm={24}>
             <Card title="模板定义" className={styles.card} bordered={true} type="inner">
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
    );
  }
}

export default TemplateEdit
