import React from 'react';
import { Form,  Modal,Select, Input } from 'antd';


export default Form.create()(function (props){
    const { visible, onCancel, onOk, form } = props;
    const { getFieldDecorator } = form;

    return  <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
    >
         <Form >
           <Form.Item label="Title">
             {getFieldDecorator('title',{
               rules: [{ required: true, message: 'Please input the title of collection!' }],
             })(<Input />)}
           </Form.Item>
           <Form.Item label="Description">
             {getFieldDecorator('description')(
               <Select  >
                <Select.Option value="lisa">李三</Select.Option>
             </Select>)}
           </Form.Item>
           <Form.Item label="Description">
             {getFieldDecorator('description')(<Input.TextArea rows={4} />)}
           </Form.Item>
         </Form>
       </Modal>
})