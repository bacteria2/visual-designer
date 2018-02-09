import React from 'react';
import styles from './index.css';
import { Layout, Tag } from 'antd'

export { default as ProjectEditForm } from './ProjectForm'
export { default as ProjectItem } from './ProjectItem'

export function MemberList (props) {
  const {onMemberClick,editable, memberList, memberInProject=[] } = props
  return (<Layout>
             <Layout.Content className={styles.memberList}>
               {memberList.map(member =>(<Tag.CheckableTag
                 key={'key_' + member.get('name')}
                 checked={memberInProject.some(({userid})=>userid===member.get('userid'))}
                 onChange={checked =>editable&&onMemberClick(member, checked)}
               >
                  {member.get('name')}
               </Tag.CheckableTag>) )}
             </Layout.Content>
  </Layout>)
}