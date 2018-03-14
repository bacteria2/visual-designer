import React from 'react';
import PropTypes from 'prop-types';
import { Layout, message ,Spin} from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import GlobalHeader from '../components/GlobalHeader';
import { getRoutes } from '../utils';
import {getMenuData} from '../routes/menu'
import {fetchNotice,clearNotice} from '../store/Global/action'
import {fetchCurrentUser} from '../store/User/action'
import {logout} from '../store/Login/action'
import Immutable from 'immutable';
import {Error404} from '../routes/Error';
import logo from '../assets/logo/logo.png';
import {is} from 'immutable';
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const {Content} = Layout;

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

class DesignerLayout extends React.PureComponent {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'DataView';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - DataView'`;
    }
    return title;
  }

  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch(clearNotice(type));
  }

  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch(fetchNotice());
    }
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch(logout());
    }
  }

  render() {
    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location,controlMenu,dataLoading,
    } = this.props;
    const {name:projectTitle}=this.props.currentProject;

    const layout = (
        <Layout>
            {dataLoading && <Spin style={{width:'100%',height:'100%',zIndex:9999,backgroundColor:'rgba(234, 232, 232, 0.5686274509803921)',position:'fixed',paddingTop:300}} size='large' tip='loading data...'/>}
          <GlobalHeader
            logo={logo}
            isLogo
            isMenu={false}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            controlMenu={controlMenu}
            onMenuClick={this.handleMenuClick}
            collapsed={collapsed}
            title={projectTitle}
            onNoticeClear={this.handleNoticeClear}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 88px)' }}>
              <Switch>
                {
                  getRoutes(match.path, routerData).map(item =>
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
                <Route render={Error404} />
              </Switch>
            </div>
          </Content>
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

export default connect(state => {
  let currentUser=state.getIn(['user','currentUser'],Immutable.Map());
  return {
    currentProject:state.getIn(['projectized','currentProject'],Immutable.Map()).toObject(),
  currentUser: currentUser.toObject(),
  collapsed: state.get('collapsed'),
  fetchingNotices: state.get('fetchingNotices'),
  notices: state.get('notices').toArray(),
  controlMenu:state.get('controlMenu'),
  dataLoading:state.getIn(['widget','dataLoading']),
}})(DesignerLayout);
