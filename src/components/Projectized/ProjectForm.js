import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Divider, AutoComplete, Button,DatePicker, Radio } from 'antd'
import { saveProject } from '../../service/ProjectizedService'
import { message } from 'antd/lib/index'

import zh_CN from 'antd/lib/date-picker/locale/zh_CN';
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}


class ProjectForm extends React.PureComponent {

  state = {
    loading: false,
    dbType1:1,
  }

  static defaultProps={
    pmList: [],
    project:{},
  }

  static propTypes={
    pmList:PropTypes.array,
  }
  dbTypeChange  = (e) =>{
      this.setState({
          dbType1: e.target.value,
      });
  }
  handleSubmit = (e) => {
      console.log(999);
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
    const { pmList,form:{getFieldDecorator} } = this.props
    return (<Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem  {...formItemLayout} label="项目名称:" style={{display:'block'}}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入项目名称', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}   label="项目经理:" style={{display:'block'}}>
            {getFieldDecorator('projectManager', {
              rules: [{required: true, message: '请指定项目经理'}],
            })(
              <Select style={{width: 120}}>
                {pmList.map(pm => <Option value={pm.userid} key={pm.userid}>{pm.name}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="开始时间:" style={{display:'block'}}
          >
            {getFieldDecorator('startDate', {
              rules: [{required: true, message: '指定项目开始日期'}],
            })(
              <DatePicker format="YYYY-MM-DD" locale={{...zh_CN}} />
            )}
          </FormItem>
          <Divider dashed style={{margin:'8px 0'}}>数据源信息</Divider>
          <FormItem  {...formItemLayout}  label="数据库类型:" style={{display:'block'}}>
            {getFieldDecorator('dbType', {
                    rules: [{required: true}],
                }
             )(<RadioGroup onChange={this.dbTypeChange}>
                <RadioButton value="Mysql">Mysql</RadioButton>
                <RadioButton value="Oracle">Oracle</RadioButton>
                <RadioButton value="SQL Server">SQL Server</RadioButton>
            </RadioGroup>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="服务器:" style={{display:'block'}}>
            {getFieldDecorator('sever', {
              rules: [{required: true, message: '请输入服务器', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="端口:" style={{display:'block'}}>
            {getFieldDecorator('dbPort', {
              rules: [{required: true, message: '请输入端口号', whitespace: true}],
            })(<Input style={{width: 120}} type='number'/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="账号:" style={{display:'block'}}>
            {getFieldDecorator('dbUser', {
              rules: [{required: true, message: '请输入账号', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}  label="密码:" style={{display:'block'}}>
            {getFieldDecorator('dbPwd', {
              rules: [{required: true, message: '请输入密码', whitespace: true}],
            })(<Input type="password"/>)}
          </FormItem>
          <FormItem  {...formItemLayout} style={{display:'block'}} label={this.state.dbType1===2?"SSD:":"数据库:"}>
            {getFieldDecorator('db', {
                rules: [{required: true, message: '请输入数据库', whitespace: true}],
            })(<Input/>)}
          </FormItem>
        </Form>
    )
  }
}

export default Form.create({
  onFieldsChange (props, value) {
    props.onFormFieldsChange(value);
  },
  mapPropsToFields ({project}) {
    if (project) {
      return {
        "name":Form.createFormField({value:project.name}),
        "projectManager":Form.createFormField({value:project.projectManager}),
        "startDate":Form.createFormField({value:project.startDate}),
        "dbType":Form.createFormField({value:project.dbType}),
        "sever":Form.createFormField({value:project.sever}),
        "dbPort":Form.createFormField({value:project.dbPort}),
        "dbUser":Form.createFormField({value:project.dbUser}),
        "dbPwd":Form.createFormField({value:project.dbPwd}),
        "db":Form.createFormField({value:project.db}),
      };
    }
  },
})(ProjectForm)