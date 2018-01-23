import React from 'react';
import { Form, Input, Button,message,Spin,Popconfirm} from 'antd';
import connTypeDic from './dbTypeDic.json'
import {textConn,saveConn,updateConn,deleteConn} from '../../../service/DataConnService'


// import styles from './DataConnection.css'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ConnForm extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

     handleSubmit = async (e) => {
         e.preventDefault();
         this.setState({loading:true});

         try{
             let canBeSubmitted = false;
             let options = {};
             this.props.form.validateFields((err, values) => {
                 if (!err) {
                     canBeSubmitted = true;
                     options = values;
                 }
             });

             if(canBeSubmitted){
                 let rep = null;
                 if(this.props.operate === "update"){
                     options.id = this.props.updateMenu.id;
                     rep = await updateConn(options);
                 }else{
                     rep = await saveConn(options);
                 }

                 if(rep.success){
                     message.success(rep.msg);
                     this.props.updateList();
                 }else if(rep.success){
                     message.error(rep.msg);
                 }else{
                     message.warning('服务器连接错误');
                 }
             }else{
                 message.warning('请填写正确的信息');
             }
         }catch (e){

         }finally {
             this.setState({loading:false});
         }

     };

    async deleteConn(id){
        this.setState({loading:true});
        try{
            if(id){
                let rep = await deleteConn(id);
                if(rep.success){
                    message.success(rep.msg);
                    this.props.updateList();
                }else if(rep.success){
                    message.error(rep.msg);
                }else{
                    message.warning('服务器连接错误');
                }
            }
        }finally {
            this.setState({loading:false});
        }
    }

    //测试数据源连接是否成功
     testConn = async (prop)=>{
         this.setState({loading:true});
         try{
             let rep = await textConn(prop);

             if(rep.success){
                 message.success(rep.msg);
             }else if(!rep.success){
                 message.error(rep.msg);
             }else{
                 message.warning('服务器连接错误');
             }
         }finally {
             this.setState({loading:false});
         }

    };

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,getFieldsValue } = this.props.form;

        //生成数据连接表单
        const currentType = this.props.type;

        let formItems = [];
        connTypeDic.forEach(e=>{
            if(e.type === currentType){
                formItems = e.formFields.map(field=>{

                    const fileKey =  field.name;

                    const error = isFieldTouched(fileKey) && getFieldError(fileKey);

                    let decoratorOptions = {};

                    if(field.required === true)  decoratorOptions.rules = [{ required: true, message: '请输入' + field.label + "!" }] ;

                    if(this.props.updateMenu[field.name]){
                        decoratorOptions.initialValue = this.props.updateMenu[field.name]
                    }

                    return (
                             <FormItem
                                validateStatus={error? 'error' : ''}
                                help={error || ''}
                                label ={field.label}
                                required = {field.required}
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 6 }}
                                key = {fileKey}>
                                {getFieldDecorator(fileKey, {
                                    ...decoratorOptions
                                })(
                                    <Input type={field.type?field.type:'text'} placeholder={field.required?field.name:'可选'} />
                                )}
                             </FormItem>
                            )
                });
            }
        });

        return (<Spin spinning={this.state.loading} size="large">
            <Form  onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem wrapperCol={{ span: 6,offset:2 }}>
                    <Button
                        key = "test"
                        type="primary"
                        disabled={hasErrors(getFieldsError())}
                        onClick={this.testConn.bind(this,getFieldsValue())}
                    >
                        连接测试
                    </Button>
                    <Button
                        key = "submit"
                        style={{marginLeft:'10px'}}
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}>
                        {this.props.operate === 'update'?'修改':'添加'}
                    </Button>
                    <Popconfirm title="你确定要删除吗?" onConfirm={this.deleteConn.bind(this,this.props.updateMenu.id)}  okText="Yes" cancelText="No">
                        <Button
                            key = "submit"
                            style={{marginLeft:'10px'}}
                            type="primary"
                            // onClick={this.delete.bind(this,this.props.updateMenu.id)}
                            disabled={!(this.props.operate === 'update')}>
                            删除
                        </Button>
                    </Popconfirm>
                </FormItem>
            </Form>
        </Spin>);
    }

}

const WrappedConnForm = Form.create()(ConnForm);

export default WrappedConnForm


