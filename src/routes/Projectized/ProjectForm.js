import React from 'react';
import { Form, Input, Select, Button, AutoComplete,DatePicker } from 'antd';
import moment from 'moment';
import {saveProject} from "../../service/ProjectizedService";
import {getUserList} from "../../service/user";
import {message} from "antd/lib/index";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class ProjectForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pmList:null,
    }
  }

  async componentWillMount(){
  }

  async componentDidMount() {
    let response = await getUserList({userType:['pm']});
    this.setState({pmList:response.data||[]});
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({loading:true});

    let formValues = {};
    try{
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          formValues = {...values,
          'startDate':values['startDate'].format('YYYY-MM-DD'),
          };
        }
      });

      if(Object.keys(formValues).length > 0) {
        this.state.pmList.forEach(p=>{
          if(p.userid===formValues.projectManager){
            formValues.projectManager = {userid:p.userid,name:p.name};
          }
        });

        const {prjId} = this.props;
        if (prjId) {
          formValues.prjId = prjId;
        }

        const rep = await saveProject(formValues);
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
    const {project} = this.props;
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

    let pmOptions = [];
    if(this.state.pmList){
      this.state.pmList.forEach(pm=>{
        pmOptions.push(<Option value={pm.userid} key={pm.userid}>{pm.name}</Option>);
      });
    }

    const {currentUser} = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="项目名称："
        >
          {getFieldDecorator('name', {
            initialValue: project?project.name:'',
            rules: [{ required: true, message: '请输入项目名称', whitespace: true }],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="项目经理："
        >
          {getFieldDecorator('projectManager', {
            initialValue: project?project.projectManager.userid:currentUser.userid,
            rules: [{ required: true, message: '请指定项目经理' }],
          })(
            <Select style={{ width: 120 }}>
              {pmOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始时间："
        >
          {getFieldDecorator('startDate', {
            initialValue: moment(project?project.startDate:new Date(), 'YYYY-MM-DD'),
            rules: [{ required: true, message: '指定项目开始日期' }],
          })(
            <DatePicker format="YYYY-MM-DD"/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" icon={'save'}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export const ProjectEditForm = Form.create()(ProjectForm);