import React from 'react';
import {Icon,Tooltip} from 'antd';
import styles from './index.css'

export default function (props) {
  let {itemList = []} = props
  return (<div className={styles.control}>{
    itemList.map(
        (item,index) => {
        const {fontSize = '32px'} = item
        return (<Tooltip key={index} placement="bottom" title={item.text}>
        <div onClick={item.action} >
           <Icon type={item.icon} style={{fontSize,margin:'4px 0 4px'}} />
        </div>
        </Tooltip>)
    })
  }
  </div>)
}