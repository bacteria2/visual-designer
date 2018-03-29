import React from 'react'
import styles from './tables.css'
import TableEditor from './TableEditor'
import TableList from './TableList'

export default class Tables extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (<div className={styles.mainWrap}>
                    <div className={styles.leftWrap}>
                        <TableList/>
                    </div>
                    <div className={styles.rightWrap}>
                        {/*<TableEditor/>*/}
                    </div>
                </div>)
    }
}