import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
//import styles from './Login.less';


const { TabPane } = Tabs;


class Login extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'ok') {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className={'main'}>
        {this.props.username}
        {this.props.password}
        <Form>
          <Tabs animated={false} className={'tabs'} activeKey={'type'}>
            <TabPane tab="账户密码登录" key="account">
              <Form.Item>
                {this.props.username}
              </Form.Item>
              <Form.Item>
                {this.props.password}
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </div>
    );
  }
}


export default connect(state=>state.user)(Login)