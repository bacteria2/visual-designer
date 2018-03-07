import React from 'react';
import { Layout,Button} from 'antd';
import styles from './cube.css'
import {Link} from 'react-router-dom';
import TableRelEditor from '../CubeEditor/TableRelEditor'
import { DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import PivotSchema from '../PivotSchema'

const {Header,Content,Footer} = Layout;

@DragDropContext(HTML5Backend)
export default class CubeSummary extends React.PureComponent{

    state = {
        cube:{},
    };

    componentDidMount(){
        this.setState({
            cube: this.props.cube,
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            cube: props.cube,
        })
    }

    render(){
        return (<Layout style={{ height: '100%',background: '#fff' }}>
            <Header className={styles.summary_title}>
                {this.props.cube &&
                <span>{this.props.cube.name}
                    <Link  to={'/data_source/cubeEditor/' + this.props.cube._id}  style={{float: 'right'}}>
                            <Button disabled ={this.props.cube.conn.type === 'url'} icon="edit" style={{marginLeft:'10px'}} type="primary" size="small">设计CUBE</Button>
                        </Link>
                    </span>
                }
            </Header>
            <Content style={{ height: 'calc((100vh - 128px - 50px )/2 - 100px)',background: '#fff' ,display:'flex'}}>
                <TableRelEditor cube={this.props.cube} editable={false}/>
            </Content>
            <Footer style={{ height: 'calc((100vh - 128px - 50px )/2 + 100px)',padding:'0',background: '#fff',display:'flex'}}>
                <PivotSchema data={this.state.cube} height='calc((100vh - 128px - 50px )/2 + 100px)'
                             type="row"
                             unMenu = {true}
                             unDrap = {true}
                             unDrop = {true}
                />
            </Footer>
        </Layout>)
    }

}