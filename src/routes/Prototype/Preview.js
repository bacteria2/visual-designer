import React from 'react';
import { Form,  Modal,Select, Input } from 'antd';



export default function Preview(props){
    return <Modal>
      {()=>{
        switch (props.type){
          case 1:
            return <div>1</div>
          default:
            return <div>2</div>
        }
      }}
    </Modal>
}