import React from 'react';
import {Modal,Radio,Tabs} from 'antd';
import styles from './slicer.css'
const TabPane = Tabs.TabPane;
// const RadioGroup = Radio.Group;

const FILTER_TYPE_LIST = 0; //选择数据
const FILTER_TYPE_CUSTOM = 1; //自定义
const FILTER_TYPE_ALL = 2; //使用全部

export default class FilterEditorModal extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    submitData = ()=>{

        if(this.props.onOK){
            this.props.onOK(this.props.defaultValue);
        }
    };

    handleFilterTypeChange = (v) => {
        console.log(v);
    };

    render(){
        return (<Modal title="过滤项编辑"
                       width={540}
                       visible={this.props.visible}
                       bodyStyle = {{padding:'0 20px'}}
                       onOk={this.submitData}
                       onCancel={this.props.onCancel}
                       okText="确认"
                       maskClosable = {false}
                       cancelText="取消">
            <div className={styles.filterEditorWrap}>
                <div className={styles.filterEditorTypeRow}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="从列表中选择" key="1">

                        </TabPane>
                        <TabPane tab="自定义条件" key="2">

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>)
    }
}