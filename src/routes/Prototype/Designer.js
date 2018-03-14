/**
 * Created by lenovo on 2018/1/3.
 */
import React from 'react';
import PropTypes from 'prop-types';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SubmitForm from './SubmitForm';
import BraceEditor from '../../components/BraceEditor';
import { Form, Card,  Button, message ,Tooltip ,Icon} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import {getPrototypeById,addPrototype,updatePrototype} from '../../service/prototype';
import { beautifyJs } from '../../utils';
import Immutable from 'immutable'


const tabListNoTitle = [
    {
  key: 'render',
  tab: '渲染脚本',
}, {
  key: 'option',
  tab: '基础属性配置',
}, {
  key: 'optionMeta',
  tab: '组件调整项',
}, {
  key: 'dataMeta',
  tab: '数据调整项',
}];

class Designer  extends React.PureComponent{
  constructor(props){
    super(props)
    this.vo = {render:'',option:'',optionMeta:"",dataMeta:""}
    this.isModif = false
    this.state={
        loading:true,
        controlCollapsed:false,
        modalVisible:false,
        tab:'render',
    }
  }

    async componentDidMount() {
        //加载完
        const {id} = this.props.match.params;
        this.isModif = !(id === '_addNew_');
        if(this.isModif){
            const response = await getPrototypeById({id});
            if(response.success){
                this.vo = this.transData("VO",response.data);
            }else{
                message.warning(response.msg);
            }
        }
        this.setState({loading:false})
    }

  handleModalVisible=()=>{
    this.setState({modalVisible:!this.state.modalVisible});
  }

  handleScrtipUpdate=(text)=>{
    this.vo[this.state.tab] = text;
  }

  handleControlCollapsed=()=>{
    this.setState({controlCollapsed:!this.state.controlCollapsed})
  }

  handleTabChange=(key)=>{
    this.setState({tab:key})
  }

  handleSave = async()=>{
      const save = this.isModif ? updatePrototype : addPrototype;
      const response = await save(this.transData("DO",this.vo))
      if(response.success){
          message.success("保存成功");
      }else{
          message.warning(response.msg)
      }
  }

  transData = (type,data) =>{
        let d = {...data}
        switch(type){
            case "VO":
               d.optionMeta = JSON.stringify(data.optionMeta);
               d.dataMeta = JSON.stringify(data.dataMeta);
               d.option = JSON.stringify(data.option);
            break;
            case "DO":
               d.optionMeta = JSON.parse(data.optionMeta);
               d.dataMeta = JSON.parse(data.dataMeta);
               d.option = JSON.parse(data.option);
            break;
          default:
            break;
        }
        return d
  }

  handleBeautifyJs = () =>{
      const keys = ['render','option','optionMeta','dataMeta']
      keys.forEach(k =>{
          this.vo[k] = beautifyJs(this.vo[k])
      })
      this.setState(preState => {let curState = Immutable.fromJS(preState)
          curState = curState.set('tab','render')
          return curState.toJS()
      })
  }

  render(){
    const controls= (<Card title='控制'  bordered={false} extra={<a onClick={this.handleControlCollapsed}>{this.state.controlCollapsed?'展开':'收起'}</a>}>
      {!this.state.controlCollapsed&&
      <Form layout="inline">
        <StandardFormRow title='基础' style={{ paddingBottom: 11 }}>
          <Button onClick={this.handleSave}>快速保存</Button>
          <Button onClick={this.handleModalVisible}>保存</Button>
          <Button onClick={this.handleBeautifyJs} icon='solution'>格式化</Button>
        </StandardFormRow>
        <StandardFormRow title='预览' block style={{ paddingBottom: 11 }}>
          <Button>预览图形</Button>
        </StandardFormRow>
      </Form>}
    </Card>)

    return (<PageHeaderLayout
      onTabChange={this.handleTabChange}
      content={controls}
      activeTabKey = {this.state.tab}
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
            {this.vo[this.state.tab]}
          </BraceEditor>
        </Card>
      </div>
      <SubmitForm  visible={this.state.modalVisible}
                   onCancel={this.handleModalVisible}/>
    </PageHeaderLayout>)
  }
}

Designer.propTypes = {
  text:PropTypes.string,
}

export default Designer