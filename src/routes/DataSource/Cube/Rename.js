import React from 'react';
import { Modal,message,Input,Form } from 'antd';
//重命名窗口
class Rename extends React.PureComponent{

    state ={
        name:''
    };

    componentWillReceiveProps(nextProps){
        this.newName =nextProps.name;
        this.setState({
            name:nextProps.name
        })
    }

    submitRename = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    this.props.onrename(this.props.id,this.props.form.getFieldsValue()[this.props.name]["newName"])
                }else{
                    message.warn("请输入CUBE名称")
                }
            },
        );
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        return (<Modal
            title={this.props.name}
            visible={this.props.show}
            onCancel = {this.props.cancelRenameModal}
            onOk={this.submitRename.bind(this)}>
            {getFieldDecorator(this.props.name + ".newName",{
                initialValue:this.props.name,
                rules: [{
                    required:true,
                    message: '请输入CUBE名称',
                }],
            })(<Input />)}

        </Modal>)
    }
}

export default Form.create()(Rename);
