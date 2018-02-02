import React from 'react';
import { Form,  Modal,Select, Input,Checkbox } from 'antd';


export default Form.create()(function (props){
    const { visible, onCancel, onOk, form } = props;
    const { getFieldDecorator } = form;

    return  (<Modal
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
    >
         <Form layout='horizontal' >
           <Form.Item label="标题">
             {getFieldDecorator('title',{
               rules: [{ required: true, message: 'Please input the title of collection!' }],
             })(<Input />)}
           </Form.Item>
           <Form.Item label="类型">
             {getFieldDecorator('type',{
               rules: [{ required: true, message: 'Please input the title of collection!' }],
             })(<Input />)}
           </Form.Item>
           <Form.Item>
             {getFieldDecorator('canCopy',{
               valuePropName: 'checked',
               initialValue: true,
               rules: [{ required: true, message: 'Please input the title of collection!' }],
             })(<Checkbox >可复制</Checkbox>)}
           </Form.Item>
           <Form.Item label="Description">
             {getFieldDecorator('description')(
               <Select  >
                <Select.Option value="lisa">李三</Select.Option>
             </Select>)}
           </Form.Item>
           <Form.Item label="详情描述">
             {getFieldDecorator('description')(<Input.TextArea rows={4} />)}
           </Form.Item>
         </Form>
       </Modal>)
})