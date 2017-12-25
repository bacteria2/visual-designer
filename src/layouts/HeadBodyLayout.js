import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin } from 'antd';
//import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { NavLink,Link, Route, Redirect, Switch } from 'react-router-dom';
//import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
//import styles from './BasicLayout.less';
// import HeaderSearch from '../components/HeaderSearch';
// import NoticeIcon from '../components/NoticeIcon';
//import GlobalFooter from '../components/GlobalFooter';
// import { getNavData } from '../common/nav';
// import { getRouteData } from '../utils/utils';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class BasicLayout extends React.PureComponent {

  constructor(props) {
    super(props);
    // 把一级 Layout 的 children 作为菜单项
    this.menus =  [];
    // this.state = {
    //   openKeys: this.getDefaultCollapsedSubMenus(props),
    // };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  componentWillUnmount() {
    clearTimeout(this.resizeTimeout);
  }
  render() {
    const { currentUser, collapsed, fetchingNotices } = this.props;

    const menu = (
      <Menu className={'menu'} selectedKeys={[]}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    // const noticeData = this.getNoticeData();

    // Don't show popup menu when it is been collapsed
    // const menuProps = collapsed ? {} : {
    //   openKeys: this.state.openKeys,
    // };

    const layout = (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={this.onCollapse}
          width={256}
          className={'sider'}
        >
          <div className={'logo'}>
            <Link to="/">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
              <h1>Ant Design Pro</h1>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ margin: '16px 0', width: '100%' }}
          >

          </Menu>
        </Sider>
        <Layout>
          <Header className={'header'}>
            <Icon
              className={'trigger'}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <NavLink
            to={`/user/login/${new Date().getTime()}`}
            activeStyle={ {
              textDecoration: 'none',
              color: 'black'
            }}
          >
            toLoginPage
          </NavLink>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            {/*<Switch>*/}
            {/*{*/}
            {/*getRouteData('BasicLayout').map(item =>*/}
            {/*(*/}
            {/*<Route*/}
            {/*exact={item.exact}*/}
            {/*key={item.path}*/}
            {/*path={item.path}*/}
            {/*component={item.component}*/}
            {/*/>*/}
            {/*)*/}
            {/*)*/}
            {/*}*/}
            {/*<Redirect to="/dashboard/analysis" />*/}
            {/*</Switch>*/}
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <ContainerQuery query={query}>
        {params => <div className={classNames(params)}>{layout}</div>}
      </ContainerQuery>
    );
  }
}

export default connect(state => ({
  currentUser: state.get('user.username'),
  collapsed: state.get('collapsed'),
  fetchingNotices: state.get('fetchingNotices'),
  notices: state.get('notices'),
}))(BasicLayout);
