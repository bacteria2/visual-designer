import React from 'react'
import propTypes from 'prop-types'
import { Modal, Form, Input, Icon, Button,  Divider,message } from 'antd'
import styles from './index.css'
import { List,Map } from 'immutable'

const FormItem = Form.Item

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function ItemBox ({onEditClick, onRemoveClick, onItemClick, name}) {
  return (
    <div
      onClick={onItemClick}
      className={styles.boxItem}><span className={styles.textTitle}>{name}</span>
      <Icon type='delete' onClick={e => {
        e.stopPropagation()
        onRemoveClick && onRemoveClick()
      }}/>
      <Icon type='edit' onClick={e => {
        e.stopPropagation()
        onEditClick && onEditClick()
      }}/></div>)
}

function WidgetTypes(props){
    const types = props.widgetTypes.map((item,index) =>{
        return <Button style={(props.curSeriesType === item)?{backgroundColor:'#FFF6C2'}:{}} key={`${item}_${index}`} size='small' onClick={ ()=>{props.widgetTypesChange(item,props.dataItemId)}}>{item}</Button>
    })
    return(<div style={{display:'inlineFlex',lineHeight:'30px'}}><span>表现形式: </span><Button.Group>{types}</Button.Group></div>)
}

@Form.create()
export default class ConditionItemList extends React.PureComponent {

  handleModalOpen=(index)=>{
    const {form,itemList}=this.props;
    const {name,condition}=itemList.get(index).toObject()
    form.setFieldsValue({name,condition})
    this.setState({showEditModal: true,currentEditIndex:index})
  }

  handleFormSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.info(`提交出错,请检查表单输入内容:${err}`, 3);
        return;
      }
      this.props.onUpdateClick(this.state.currentEditIndex,values)
      this.setState({showEditModal: false})
    });
  }

  state = {
    showEditModal: false,
    currentEditIndex:-1,
  }

  static propTypes = {
    onAddClick: propTypes.func,
    onRemoveClick: propTypes.func,
    onItemClick: propTypes.func,
    onUpdateClick:propTypes.func,
    itemList: propTypes.instanceOf(List),
  }

  render () {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form
    const {itemList,onAddClick,onRemoveClick,onItemClick,dynamicDataItemConfig,onMergeConditionStyle} =this.props;
    const {showEditModal} = this.state
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('name') && getFieldError('name')
    const passwordError = isFieldTouched('condition') && getFieldError('condition')

    // 动态数据相关配置
    const { condtionStylePage , dynamicSeriesTypeChange, widgetTypes ,curSeriesType ,dataItemId} = dynamicDataItemConfig

    return (<React.Fragment>
      <WidgetTypes dataItemId={dataItemId} widgetTypesChange={dynamicSeriesTypeChange} widgetTypes={widgetTypes} curSeriesType={curSeriesType}/>

      {/*<Divider style={{fontSize:12}}>条件样式 <Icon style={{cursor:'pointer'}} type='plus' onClick={e=>onAddClick&&onAddClick()}></Icon></Divider>*/}

      <div style={{border: '1px solid #c5c3c3',marginBottom:24,marginTop:10}}>
        <div style={{borderBottom:'1px solid #c5c3c3',display: 'flex', justifyContent: 'space-around', lineHeight: '32px',backgroundColor:'#eee'}}>
          <span className={styles.arrayItemLabel}>条件样式</span>
          <span className={styles.arrayItemAction}>
        <Button icon='plus' onClick={e=>onAddClick&&onAddClick()}/>
        <Button icon='eye-o' onClick={e=>onMergeConditionStyle&&onMergeConditionStyle()} disabled={itemList.size === 0}/>
        </span>
        </div>
        <div style={itemList.size>0?{padding:'4px'}:null}>
        {itemList.map((item,index)=>(<ItemBox
           key={index+item.get('name')}
           name={item.get('name')}
           onEditClick={e=>this.handleModalOpen(index)}
           onRemoveClick={e=>onRemoveClick&&onRemoveClick(index)}
           onItemClick={e=>onItemClick&&onItemClick(index,condtionStylePage)}
        />))}
        </div>
      </div>
      <Modal
        title="条件修改"
        visible={showEditModal}
        footer={null}
        onCancel={e => this.setState({showEditModal: false})}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
            label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '名称不能为空!'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="条件名称"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
            label="条件文本"
          >
            {getFieldDecorator('condition', {
              rules: [{required: true, message: '条件文本不能为空!'}],
            })(
              <Input.TextArea autosize={{minRows:4,maxRows:10}} prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              确定
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </React.Fragment>)
  }

}
