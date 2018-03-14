import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, AutoComplete, DatePicker, Card,Radio ,Divider} from 'antd'
import moment from 'moment'
import { saveProject } from '../../service/ProjectizedService'
import { message } from 'antd/lib/index'

import zh_CN from 'antd/lib/date-picker/locale/zh_CN';
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
/*const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;*/
const formItemLayout = {
  labelCol: {
    xs: {span: 18},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 18},
    sm: {span: 18},
  },
}

class ProjectForm extends React.PureComponent {
  state = {
    loading: false,
    dbType1:1,
  }
  static defaultProps={
    project:{},
  }

  handleSubmit = (e) => {
    this.setState({loading: true});
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let formValues = {
          ...values,
          prjId:this.props.prjId,
          'startDate': values['startDate'].format('YYYY-MM-DD'),
        }

        this.state.pmList.forEach(p => {
          if (p.userid === formValues.projectManager) {
            formValues.projectManager = {userid: p.userid, name: p.name}
          }
        })
        const rep = saveProject(formValues)
        rep.success?this.props.savedHandle(): message.error(rep.msg)
      }
      this.setState({loading: false})
    })
  }

  render () {
    const { form:{getFieldDecorator} } = this.props;
    return (<Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem  {...formItemLayout} label="项目名称:" style={{display:'block'}}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入项目名称', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="开始时间:" style={{display:'block'}}
          >
            {getFieldDecorator('startDate', {
              rules: [{required: true, message: '指定项目开始日期'}],
            })(
              <DatePicker format="YYYY-MM-DD" locale={{...zh_CN}} />
            )}
          </FormItem>
         {/* <Divider dashed style={{margin:'8px 0'}}>数据源信息</Divider>
          <FormItem  {...formItemLayout}  label="数据库类型:" style={{display:'block'}}>
            {getFieldDecorator('dbOption.dbType', {
                    rules: [{required: true}],
                }
             )(<RadioGroup onChange={this.dbTypeChange}>
                <RadioButton value="Mysql">Mysql</RadioButton>
                <RadioButton value="Oracle">Oracle</RadioButton>
                <RadioButton value="SQL Server">SQL Server</RadioButton>
            </RadioGroup>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="服务器:" style={{display:'block'}}>
            {getFieldDecorator('host', {
              rules: [{required: true, message: '请输入服务器', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="端口:" style={{display:'block'}}>
            {getFieldDecorator('dbPort', {
              rules: [{required: true, message: '请输入端口号', whitespace: true}],
            })(<Input style={{width: 120}} type='number'/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="账号:" style={{display:'block'}}>
            {getFieldDecorator('user', {
              rules: [{required: true, message: '请输入账号', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="密码:" style={{display:'block'}}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码', whitespace: true}],
            })(<Input type="password"/>)}
          </FormItem>
          <FormItem  {...formItemLayout} style={{display:'block'}} label={this.state.dbType1===2?"SSD:":"数据库:"}>
            {getFieldDecorator('database', {
                rules: [{required: true, message: '请输入数据库', whitespace: true}],
            })(<Input/>)}
          </FormItem>*/}
        </Form>
    )
  }
}

export default Form.create({
  onFieldsChange (props, value) {
    props.onSave(value);
  },
  mapPropsToFields ({project}) {
    console.log(project);
    if (project) {
      return {
        "name":Form.createFormField({value:project.name}),
        "startDate":Form.createFormField({value:moment(project.startDate ? project.startDate :new Date(), 'YYYY-MM-DD')}),
        /*"dbType":Form.createFormField({value:project.dbType}),
        "host":Form.createFormField({value:project.host}),
        "dbPort":Form.createFormField({value:project.dbPort}),
        "user":Form.createFormField({value:project.user}),
        "password":Form.createFormField({value:project.password}),
        "database":Form.createFormField({value:project.database}),*/
      };
    }
  },
})(ProjectForm)