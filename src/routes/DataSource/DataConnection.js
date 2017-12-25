import React from 'react';
import { Layout,Menu,Icon,Button  } from 'antd';

const {  Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class DataConnection extends React.PureComponent{
    constructor(props) {
        super(props);
        // 把一级 Layout 的 children 作为菜单项
        this.menus =  [];
        // this.state = {
        //   openKeys: this.getDefaultCollapsedSubMenus(props),
        // };
    }

    componentDidMount() {
        console.log("hello",this.menus);
    }

    render(){
        console.log("hello",this.menus);
       return ( <Layout>
                    <Sider width={250} style={{ background: '#fff' }}>
                        <div style ={{padding:'10px 10px 5px 24px',borderRight: '1px solid #e8e8e8'}}>
                            <span style ={{fontSize:'16px',fontFamily:'Microsoft YaHei UI'}}>数据连接</span>
                            <Button type="primary" size="small" style ={{float:'right',marginRight:'10px',fontSize:'12px'}}>添加连接</Button>
                        </div>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: 'calc(100vh - 40px)' }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="database" />Mysql数据库</span>}>
                                <Menu.Item key="setting:1">本地数据库</Menu.Item>
                                <Menu.Item key="setting:2">项目数据库</Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub1" title={<span><Icon type="database" />Oracle数据库</span>}>
                                <Menu.Item key="setting:1">本地数据库</Menu.Item>
                                <Menu.Item key="setting:2">项目数据库</Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub3" title={<span><Icon type="file-excel" />文件数据</span>}>
                                <Menu.Item key="setting:3">本地数据库</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <div style={{ minHeight: 'calc(100vh - 40px)' }}>
                            content
                        </div>
                    </Content>
                </Layout>)
    }
}
