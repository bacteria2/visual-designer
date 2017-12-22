import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import Login from '../routes/User/Login'



class UserLayout extends React.PureComponent {

  render() {
    return (
      <div className={'container'}>
        <div className={'top'}>
          <div className={'header'}>
            <Link to="/">
              <img alt="" className={'logo'} src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
              <span className={'title'}>Ant Design</span>
            </Link>
          </div>
          <p className={'desc'}>Ant Design 是西湖区最具影响力的 Web 设计规范</p>
        </div>
        <Route path={this.props.match.path+'/login/:id'} component={Login}/>
      </div>
    );
  }
}

export default UserLayout;
