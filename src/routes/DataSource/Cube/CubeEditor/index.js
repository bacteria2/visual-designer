import React from 'react';
import { Layout,Card,Button,Icon} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css'
import cubeData from './demoData/cube.json'
import TableRelEditor from './TableRelEditor'

const {Header,Content,Footer,Sider} = Layout;
export default class CubeEditor extends React.PureComponent{
    constructor(props){
        super(props);
        // this.cube = this.props.location.query;
    }

    getTables(){
        let tables = [];
        for(let i =0;i<50;i++){
            tables.push('ydp_user_info'+i);
        }

        const gridStyle = {
            width: '10%',
            textAlign: 'center',
            padding:'5px 10px 5px 20px',
            // backgroundImage:require('@/assets/images/datasource/table.png'),
            backgroundPositionY:'left',
            backgroundRepeat:'none'
        };

        return  (<Card className={styles.cube_editor_tables_wrap}>
            {tables.map(e=><Card.Grid key={e} draggable="true" onDragStart={ev=>{ev.dataTransfer.setData("name",e);}}  className={styles.cube_editor_tables_item}>{e}</Card.Grid>)}
        </Card>)
    }

    componentDidMount(){
        // this.props.match.params.cube
    }

    render(){
        return <Layout>
            <Sider className={styles.cube_editor_sider} width="250">Sider</Sider>
            <Layout>
                <Header className={styles.cube_editor_title}>
                    {cubeData.name}
                    <div className={styles.cube_editor_toolBar}>
                        <Button type="primary" icon="copy"  size="small">另保存为</Button>
                        <Button type="primary" icon="save" size="small">保存</Button>
                        <Link  to={'/cubeList'}><Button icon="logout" type="primary" size="small">退出</Button></Link>
                    </div>
                </Header>
                <Footer className={styles.cube_editor_content} style={{padding:'0',borderBottom: '1px solid rgb(232, 232, 232)'}}>
                    {this.getTables()}
                </Footer>
                <Content className={styles.cube_editor_content}
                         style={{overflow:'auto',display:'flex'}}>
                    <TableRelEditor/>
                </Content>

            </Layout>
        </Layout>
    }
}