import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, AutoComplete, DatePicker, Card } from 'antd'
import moment from 'moment'
import { saveProject } from '../../service/ProjectizedService'
import { getUserList } from '../../service/user'
import { message } from 'antd/lib/index'

const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
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
  }

  static defaultProps={
    pmList: [],
    project:{},
  }

  static propTypes={
    pmList:PropTypes.array,
  }

  handleSubmit = (e) => {
    this.setState({loading: true})
    this.props.form.validateFieldsAndScroll(async (err, values) => {
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
        console.log(values);
        const rep = await saveProject(formValues)
        rep.success?this.props.savedHandle(): message.error(rep.msg)
      }
      this.setState({loading: false})
    })
  }

  render () {
    const { pmList,form:{getFieldDecorator} } = this.props
    return (<Form onSubmit={this.handleSubmit} >
          <FormItem  {...formItemLayout}  label="项目名称:">
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入项目名称', whitespace: true}],
            })(<Input/>)}
          </FormItem>
          <FormItem  {...formItemLayout}   label="项目经理:" >
            {getFieldDecorator('projectManager', {
              rules: [{required: true, message: '请指定项目经理'}],
            })(
              <Select style={{width: 120}}>
                {pmList.map(pm => <Option value={pm.userid} key={pm.userid}>{pm.name}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="开始时间:"
          >
            {getFieldDecorator('startDate', {
              rules: [{required: true, message: '指定项目开始日期'}],
            })(
              <DatePicker format="YYYY-MM-DD"/>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="项目URL:">
            {getFieldDecorator('projectUrl', {
              rules: [{required: true, message: '请输入项目部署的URL', whitespace: true},{type: 'url',message: 'URL格式错误'}],
            })(<Input maxLength={200}/>)}
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
        "startDate":Form.createFormField({value:moment(project.startDate ? project.startDate : new Date(), 'YYYY-MM-DD')}),
        "projectUrl":Form.createFormField({value:project.projectUrl}),
      };
    }
  },
})(ProjectForm)