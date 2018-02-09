import React from 'react';
import { Form, Input, Select, Button, AutoComplete,DatePicker } from 'antd';
import {getUserList,saveUser} from "../../service/user";
import {message} from "antd/lib/index";
import {connect} from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;

class UserForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      editUser:null,
    }
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({loading:true});

    let formValues = {};
    try{
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          formValues = {...values};
        }
      });

      if(Object.keys(formValues).length > 0) {
        const {editUser} = this.props;
        if (editUser) {
          formValues = {...formValues,_id:editUser._id,status:editUser.status};
        }else{
          formValues.status = 1;
          formValues.password = '123456';
        }
        formValues.updateTime = Date.now();

        const rep = await saveUser(formValues);
        if (rep.success) {
          this.props.savedHandle();
        }else if(!rep.success){
          message.error(rep.msg);
        }else{
          message.warning('保存失败');
        }
      }
    }catch(e){

    }finally{
      this.setState({loading: false});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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
    };

    const userTypes = [
      {
        id: 'developer',
        name: '开发人员',
      },
      {
        id: 'pm',
        name: '项目经理',
      },
    ];

    const {editUser} = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="账号："
        >
          {getFieldDecorator('userid', {
            initialValue: editUser?editUser.userid:'',
            rules: [
              { required: true, message: '请输入登录账号', whitespace: true },
              {validator:async(rule,value,callback)=>{
                if(editUser !== null){
                  callback();
                  return;
                }
                const resp = await getUserList({userid:value});
                if(resp.success && resp.data.length>0){
                  callback('登录账号已经存在，请重新输入');
                }else {
                  callback();
                }
              }}],
          })(
            <Input maxLength={30} disabled={editUser?true:false}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称："
        >
          {getFieldDecorator('name', {
            initialValue: editUser?editUser.name:'',
            rules: [{ required: true, message: '请输入用户名称' }],
          })(
            <Input maxLength={30}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户类型："
        >
          {getFieldDecorator('userType', {
            initialValue: editUser?editUser.userType:[userTypes[0].id],
            rules: [{ required: true, message: '请指定用户类型' }],
          })(
            <Select
              mode="multiple"
              style={{ maxWidth: 386, width: '100%' }}
              placeholder="选择用户类型"
            >
              {
                userTypes.map(type =>
                  <Option key={type.id} value={type.id}>{type.name}</Option>
                )
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" icon={'save'}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(UserForm);