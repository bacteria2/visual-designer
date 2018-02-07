import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './LoginLayout.css';
import { getRoutes } from '../utils';
import logo from '@/assets/logo/logo.png'

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 粤数可视化技术部出品</div>;

function getPageTitle(props) {
  const { routerData, location } = props;
  const { pathname } = location;
  let title = 'DataView Login';
  if (routerData[pathname] && routerData[pathname].name) {
    title = `${routerData[pathname].name} - DataView Login`;
  }
  return title;
}

function UserLayout (props) {
  const { routerData, match } = props;
  return (
      <DocumentTitle title={getPageTitle(props)}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>粤数可视化平台</span>
              </Link>
            </div>
            <p className={styles.desc}/>
          </div>
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
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
}

export default UserLayout;
