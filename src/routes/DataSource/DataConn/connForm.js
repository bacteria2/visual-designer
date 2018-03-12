import React from 'react';
import { Form, Input, Button,message,Spin,Popconfirm,InputNumber} from 'antd';
import {textConn,saveConn,updateConn,deleteConn} from '../../../service/DataConnService'
import {queryCubeList} from '../../../service/CubeService'
import { connect } from 'react-redux';
// import styles from './DataConnection.css'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ConnForm extends React.PureComponent{

    constructor(props) {
        super(props);
        this.projectId = props.project.currentProject.get('id');
        this.state = {
            loading:false,
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        // this.originalData = this.props.updateMenu;
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
             options.type = this.props.type;
             if(canBeSubmitted){
                 let rep = null,newConn={...options};
                 if(this.props.operate === "update"){
                     newConn._id = this.props.updateMenu._id;
                     rep = await updateConn(newConn);
                 }else{
                     newConn.sqlTables = [];
                     //绑定项目ID
                     newConn.projectId = this.projectId;

                     rep = await saveConn(newConn);
                     newConn._id = rep.data && rep.data._id
                 }
                 if(rep.success){
                     message.success(rep.msg);
                     this.props.updateList('add',{_id:newConn._id});
                     this.props.updateConn(newConn);
                 }else if(rep.success === false){
                     message.error(rep.msg);
                 }else{
                     message.warning('服务器连接错误');
                 }
             }else{
                 message.warning('请填写正确的信息');
             }
         }finally {
             this.setState({loading:false});
         }

     };

    async connBeenUsedByCube(connId){
        let cubeRep = await queryCubeList(this.projectId);
        if(cubeRep.success){
            const cubeList = cubeRep.data;
            let used = false;
            cubeList.forEach(e=>{
                if(e.connId === connId) used = true
            });
            return used;
        }else{
            message.warning('获取CUBE列表失败');
            return true
        }
    }

    async deleteConn(id){
        this.setState({loading:true});
        try{
            if(id){
                let used = await this.connBeenUsedByCube(id);
                if(!used){
                    let rep = await deleteConn(id);
                    if(rep.success){
                        message.success(rep.msg);
                        this.props.updateList('delete');
                    }else if(rep.success === false){
                        message.error(rep.msg);
                    }else{
                        message.warning('服务器连接错误');
                    }
                }else{
                    message.warning('删除失败，数据源已经被用CUBE使用，请先删除CUBE');
                }
            }
        }finally {
            this.setState({loading:false});
        }
    }

    //测试数据源连接是否成功
     testConn = async (prop)=>{
         this.setState({loading:true});
         prop.type = this.props.type;
         try{
             let rep = await textConn(prop);

             if(rep.ok){
                 message.success("数据库连接成功！");
             }else if(rep.ok === false){
                 message.error("数据库连接失败！");
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
        // this.props.connTypeDic.forEach(e=>{
        const e = this.props.connTypeObj;
            if(e && e.type === currentType){
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
                                    ...decoratorOptions,
                                })(field.type==='number'?<InputNumber min={0} max={65535}  placeholder={field.required?field.name:'可选'}  />
                                    : <Input type={field.type?field.type:'text'} placeholder={field.required?field.name:'可选'} />
                                )}
                             </FormItem>
                            )
                });
            }
        // });

        return (<Spin spinning={this.state.loading} size="large">
            <Form  onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem wrapperCol={{ span: 6,offset:2 }}>

                        <Button
                            key = "test"
                            type="primary"
                            disabled={hasErrors(getFieldsError())}
                            onClick={this.testConn.bind(this,getFieldsValue())}>
                            连接测试
                        </Button>

                    {this.props.operate !== 'update'?
                        <Button
                            key = "submit"
                            style={{marginLeft:'10px'}}
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}>
                           添加
                        </Button>
                       : <Popconfirm title='如果数据源已被CUBE使用，修改数据源可能导致严重后果，确定要修改吗？' onConfirm={this.handleSubmit.bind(this)} okText="Yes" cancelText="No">
                            <Button
                                key = "submit"
                                style={{marginLeft:'10px'}}
                                type="primary"
                                disabled={hasErrors(getFieldsError())}>
                                保存修改
                            </Button>
                        </Popconfirm>
                    }


                    <Popconfirm title="你确定要删除吗?" onConfirm={this.deleteConn.bind(this,this.props.updateMenu._id)}  okText="Yes" cancelText="No">
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
export default connect(state => ({project: state.get('projectized').toObject()}))(WrappedConnForm)


