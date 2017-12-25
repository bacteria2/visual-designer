import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { NavLink,Link, Route, Redirect, Switch } from 'react-router-dom';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import styles from './BasicLayout.css';
import HeaderSearch from '../components/HeaderSearch';
import NoticeIcon from '../components/NoticeIcon';
import GlobalFooter from '../components/GlobalFooter';
import { getNavData } from '../routes/nav';
import { getRouteData } from '../utils';
import {SaveClearedNotices,SaveNotices} from '../store/Global/action'
import {fetchNotice} from '../store/Project/action'

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
    this.menus =  getNavData().reduce((arr, current) => arr.concat(current.children), []);;
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimeout);
  }

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }

  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </a>
            ) : (
              <Link to={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  }

  getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = 'DataView';
    getRouteData('BasicLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - DataView`;
      }
    });
    return title;
  }

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }

  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'ChangeLayoutCollapsed',
      payload: !collapsed,
    });
    this.resizeTimeout = setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }, 600);
  }

  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: SaveClearedNotices,
      payload: type,
    });
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'FetchNotices',
      });
    }
  }

  render() {
    const { currentUser, collapsed, fetchingNotices } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();

    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };

    const layout = (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={this.onCollapse}
          width={256}
          className={styles.sider}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src={require('../assets/logo/logo.png')} alt="logo" />
              <h1>粤数可视化平台</h1>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            {...menuProps}
            onOpenChange={this.handleOpenChange}
            selectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{ margin: '16px 0', width: '100%' }}
          >
            {this.getNavMenuItems(this.menus)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {/*<div className={styles.right}>*/}
              {/*<HeaderSearch*/}
                {/*className={`${styles.action} ${styles.search}`}*/}
                {/*placeholder="站内搜索"*/}
                {/*dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}*/}
                {/*onSearch={(value) => {*/}
                  {/*console.log('input', value); // eslint-disable-line*/}
                {/*}}*/}
                {/*onPressEnter={(value) => {*/}
                  {/*console.log('enter', value); // eslint-disable-line*/}
                {/*}}*/}
              {/*/>*/}
              {/*<NoticeIcon*/}
                {/*className={styles.action}*/}
                {/*count={currentUser.notifyCount}*/}
                {/*onItemClick={(item, tabProps) => {*/}
                  {/*console.log(item, tabProps); // eslint-disable-line*/}
                {/*}}*/}
                {/*onClear={this.handleNoticeClear}*/}
                {/*onPopupVisibleChange={this.handleNoticeVisibleChange}*/}
                {/*loading={fetchingNotices}*/}
                {/*popupAlign={{ offset: [20, -16] }}*/}
              {/*>*/}
                {/*<NoticeIcon.Tab*/}
                  {/*list={noticeData['通知']}*/}
                  {/*title="通知"*/}
                  {/*emptyText="你已查看所有通知"*/}
                  {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"*/}
                {/*/>*/}
                {/*<NoticeIcon.Tab*/}
                  {/*list={noticeData['消息']}*/}
                  {/*title="消息"*/}
                  {/*emptyText="您已读完所有消息"*/}
                  {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"*/}
                {/*/>*/}
                {/*<NoticeIcon.Tab*/}
                  {/*list={noticeData['待办']}*/}
                  {/*title="待办"*/}
                  {/*emptyText="你已完成所有待办"*/}
                  {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"*/}
                {/*/>*/}
              {/*</NoticeIcon>*/}
              {/*{currentUser.name ? (*/}
                {/*<Dropdown overlay={menu}>*/}
                  {/*<span className={`${styles.action} ${styles.account}`}>*/}
                    {/*<Avatar size="small" className={styles.avatar} src={currentUser.avatar} />*/}
                    {/*{currentUser.name}*/}
                  {/*</span>*/}
                {/*</Dropdown>*/}
              {/*) : <Spin size="small" style={{ marginLeft: 8 }} />}*/}
            {/*</div>*/}
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
              {
                getRouteData('BasicLayout').map(item =>
                  (
                    <Route
                      exact={item.exact}
                      key={item.path}
                      path={item.path}
                      component={item.component}
                    />
                  )
                )
              }
              {/*<Redirect to="/designer/basic" />*/}
            </Switch>
            <GlobalFooter
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2017 Guangdong
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.get('user.username'),
  collapsed: state.get('collapsed'),
  fetchingNotices: state.get('fetchingNotices'),
  notices: state.get('notices'),
}))(BasicLayout);
