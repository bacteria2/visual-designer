import React from 'react';
import {Icon} from 'antd';
import styles from './index.css'

export default function (props) {
  let {itemList = [], left = 'calc(40% - 220px)'} = props
  return (<div className={styles.control} style={{left}}>{
    itemList.map(item => (<div key={item.text} onClick={item.action} >
      <Icon type={item.icon} style={{fontSize:24,margin:'4px 0 4px'}} />
      <span>{item.text}</span>
    </div>))
  }
  </div>)
}