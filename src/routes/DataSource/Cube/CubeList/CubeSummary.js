import React from 'react';
import { Layout,message,Button} from 'antd';
import {seleteCubeById} from '../../../../service/CubeService'
import styles from './cube.css'
import {Link} from 'react-router-dom';
const {Header,Content,Footer} = Layout;

export default class CubeSummary extends React.PureComponent{

    state = {
        cube:null
    };

    async componentDidMount(){
        //根据ID查询CUBE
        let cubeRep = await seleteCubeById(this.props.cubeId);

        if(cubeRep.success){
            this.setState({
                cube:cubeRep.data
            });

        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    render(){
        return (<Layout style={{ height: '100%',background: '#fff' }}>
            <Header className={styles.summary_title}>
                {this.state.cube &&
                    <span>{this.state.cube.name}
                        <Link  to='/cubeEditor'  style={{float: 'right'}}>
                            <Button icon="edit" style={{marginLeft:'10px'}} type="primary" size="small">设计CUBE</Button>
                        </Link>
                    </span>
                }
            </Header>
            <Content style={{ height: 'calc((100vh - 128px - 50px )/2)',background: '#fff' }}>Content</Content>
            <Footer style={{ height: 'calc((100vh - 128px - 50px )/2)',padding:'0',background: '#fff' }}>Footer</Footer>
        </Layout>)
    }
}