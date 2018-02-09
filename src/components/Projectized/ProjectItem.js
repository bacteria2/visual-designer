import React from 'react'
import { Card, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom';
import styles from './index.css';

function SingleRow ({label,children}) {
  return (<Row gutter={8}>
    <Col span={6} value={100} className={styles.lineLabel}>
      {label}
    </Col>
    <Col span={18}>
      {children}
    </Col>
  </Row>)
}

export default function (props) {
  const {editable, onEditClick, onMemberAddClick, data={}, onViewClick,pmList} = props;
  const projectManager=pmList.find(el=>el.userid===data.projectManager)||{};

  return (<Card title={data.name} extra={editable ? <Icon type="edit" className={styles.editIcon} onClick={onEditClick}/> : null}>
    <SingleRow label='开始时间:'>{data.startDate}</SingleRow>
    <SingleRow label='项目成员:'>
      <span>{data.members ? data.members.length : 0}</span>
      <Icon type={'user-add'} className={styles.inlineEditIcon} onClick={onMemberAddClick}/>
    </SingleRow>
    <SingleRow label='实例数量:'>
      <span>16</span>
      <Icon className={styles.inlineEditIcon} type={'eye-o'} onClick={()=>onViewClick(data)}/>
    </SingleRow>
    <SingleRow label='项目经理:'>
      <div>{projectManager.name}</div>
    </SingleRow>
  </Card>)
}