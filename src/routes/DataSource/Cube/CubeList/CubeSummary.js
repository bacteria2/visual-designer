import React from 'react';
import { Layout,Button} from 'antd';
import styles from './cube.css'
import {Link} from 'react-router-dom';
const {Header,Content,Footer} = Layout;

export default function CubeSummary(props){

    return (<Layout style={{ height: '100%',background: '#fff' }}>
            <Header className={styles.summary_title}>
                {props.cube &&
                    <span>{props.cube.name}
                        <Link  to={'/cube/editor/' + props.cube._id}  style={{float: 'right'}}>
                            <Button icon="edit" style={{marginLeft:'10px'}} type="primary" size="small">设计CUBE</Button>
                        </Link>
                    </span>
                }
            </Header>
            <Content style={{ height: 'calc((100vh - 128px - 50px )/2)',background: '#fff' }}>Content</Content>
            <Footer style={{ height: 'calc((100vh - 128px - 50px )/2)',padding:'0',background: '#fff' }}>Footer</Footer>
        </Layout>)
}