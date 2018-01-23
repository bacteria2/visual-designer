/**
 * Created by lenovo on 2018/1/3.
 */
import React from 'react';
import PropTypes from 'prop-types';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SubmitForm from './SubmitForm';
import BraceEditor from '../../components/BraceEditor';
import {connect} from 'react-redux';
import { Form, Card, Modal, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';

const contentListNoTitle = {
  render: <p>article content</p>,
  example: <p>app content</p>,
  compAdjust: <p>project content</p>,
  dataAdjust: <p>project content</p>,
  dimensionDef: <p>project content</p>,
};

const tabListNoTitle = [{
  key: 'render',
  tab: '渲染脚本',
}, {
  key: 'example',
  tab: '图形示例',
}, {
  key: 'compAdjust',
  tab: '组件调整项',
}, {
  key: 'dataAdjust',
  tab: '数据调整项',
},{
  key: 'dimensionDef',
  tab: '数据维度定义',
}];

const PropTypeForm=function () {

}

class Designer  extends React.PureComponent{
  constructor(props){
    super(props)
  }

  state={
    controlCollapsed:false,
    modalVisible:false,
    tab:'render',
    //widget属性

    render:'',
    example:'',
    compAdjust:"",
    dataAdjust:"",
    dimensionDef:"",
  }

  handleModalVisible=()=>{
    this.setState({modalVisible:!this.state.modalVisible});
  }
  handleScrtipUpdate=(text)=>{
    this.setState({[this.state.tab]:text});
  }
  handleControlCollapsed=()=>{
    this.setState({controlCollapsed:!this.state.controlCollapsed})
  }
  handleTabChange=(key)=>{
    this.setState({tab:key})
  }

  render(){
    const controls= <Card title='控制'  bordered={false} extra={<a href="#" onClick={this.handleControlCollapsed}>{this.state.controlCollapsed?'展开':'收起'}</a>}>
      {!this.state.controlCollapsed&&
      <Form layout="inline">
        <StandardFormRow title='基础' style={{ paddingBottom: 11 }}>
          <Button>快速保存</Button>
          <Button onClick={this.handleModalVisible}>保存</Button>
          <Button>读取</Button>
        </StandardFormRow>
        <StandardFormRow title='预览' block style={{ paddingBottom: 11 }}>
          <Button>预览图形</Button>
          <Button>预览调整项</Button>
          <Button>预览数据定义</Button>
        </StandardFormRow>
        <StandardFormRow title='模板方法' block style={{ paddingBottom: 11 }}>
          <Button>预览图形</Button>
          <Button>预览调整项</Button>
          <Button>预览数据定义</Button>
        </StandardFormRow>
      </Form>}
    </Card>

    return <PageHeaderLayout
      onTabChange={this.handleTabChange}
      content={controls}
    >
      <div>
        <Card
          style={{ width: '100%'}}
          tabList={tabListNoTitle}
          onTabChange={(key) => { this.handleTabChange(key, 'noTitleKey'); }}
        >
          <BraceEditor
            panelHeight={800}
            onScriptChange={this.handleScrtipUpdate}
          >
            {this.state[this.state.tab]}
          </BraceEditor>
        </Card>
      </div>
      <SubmitForm  visible={this.state.modalVisible}
                   onCancel={this.handleModalVisible}/>
    </PageHeaderLayout>
  }
}

Designer.propTypes = {
  text:PropTypes.string
}

export default Designer