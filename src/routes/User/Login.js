import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.css';
import {userAccountLogin} from '../../store/Login/action'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
  state = {
    autoLogin: true,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 1) {
      this.props.history.push(nextProps.login.redirectTarget||'/dashboard')
    }
  }


  onTabChange = (type) =>this.setState({ type });


  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch(userAccountLogin(values))
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => (<Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon closable />);


  render() {
    const { login } = this.props;
    //const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
         // defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" >{
            login.status === 4 &&
            login.submitting === false &&
            this.renderMessage('账户或密码错误')
          }{
              login.status === 5 &&
              login.submitting === false &&
              this.renderMessage('服务器异常')
          }
          <UserName name="username" />
          <Password name="password" />
          </Tab>
          {/*<Tab key="account" tab="账户密码登录">*/}
            {/*{*/}
              {/*login.status === 'error' &&*/}
              {/*login.type === 'account' &&*/}
              {/*login.submitting === false &&*/}
              {/*this.renderMessage('账户或密码错误')*/}
            {/*}*/}
            {/*<UserName name="userName" />*/}
            {/*<Password name="password" />*/}
          {/*</Tab>*/}
          {/*<Tab key="mobile" tab="手机号登录">*/}
            {/*{*/}
              {/*login.status === 'error' &&*/}
              {/*login.type === 'mobile' &&*/}
              {/*login.submitting === false &&*/}
              {/*this.renderMessage('验证码错误')*/}
            {/*}*/}
            {/*<Mobile name="mobile" />*/}
            {/*<Captcha name="captcha" />*/}
          {/*</Tab>*/}
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit loading={login.submitting}>登录</Submit>
          {/*<div className={styles.other}>*/}
            {/*<Link className={styles.register} to="/user/register">注册账户</Link>*/}
          {/*</div>*/}
        </Login>
      </div>
    );
  }
}
export default connect(state => ({login: state.get('login').toObject()}))(LoginPage)