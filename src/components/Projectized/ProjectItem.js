import React from 'react'
import { Card, Icon, Row, Col,Popconfirm ,message,Modal} from 'antd'
import styles from './index.css';
const confirm = Modal.confirm;

function SingleRow ({label,children}) {
  return (<Row gutter={8} style={{padding:"3px 0"}}>
    <Col span={6} value={100} className={styles.lineLabel}>
      {label}
    </Col>
    <Col span={18}>
      {children}
    </Col>
  </Row>)
}

export default function (props) {
  const {deleteable,editable,onEditClick, onDeleteClick,onMemberAddClick, data={}, onViewClick} = props;
  return (
      <div onClick={()=>onViewClick(data)} style={{cursor:'pointer'}}>
          <Card title={data.name}  extra={<div>
              <Icon type="edit" style={{marginRight:12,display:editable?"inline-block":"none"}} className={styles.editIcon} onClick={onEditClick}/>
              <Icon type="delete" style={{display:deleteable?"inline-block":"none"}}
                    onClick={(e)=>{e.stopPropagation();
                        if(data.instance>0){
                            message.warning('有实例数量，不能删除项目！');
                        }else {
                            confirm({
                                title: '确认删除该项目?',
                                okText: '确认',
                                cancelText: '取消',
                                onOk() {
                                    onDeleteClick();
                                },

                            });
                        }
                    }}
                    className={styles.editIcon} />
              </div>}
          >
              <SingleRow label='开始时间:' >{data.startDate}</SingleRow>
              <SingleRow label='项目成员:'>
                  <span>{data.members ? data.members.length : 0}</span>
                  <Icon type={'user-add'} className={styles.inlineEditIcon} onClick={onMemberAddClick}/>
              </SingleRow>
              <SingleRow label='实例数量:'>
                  <span>16</span>
                 {/* <Icon className={styles.inlineEditIcon} type={'eye-o'} onClick={()=>onViewClick(data)}/>*/}
              </SingleRow>
          </Card>
      </div>
  )
}