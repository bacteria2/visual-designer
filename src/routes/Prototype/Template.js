import React, { PureComponent } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
import {getTemplates}from '../../service/template';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Template.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

class Tempalte extends PureComponent {
   constructor(props){
       super(props);
       this.state={
           loading:true,
           list:[]
       }
   }

  async componentDidMount() {
        //加载数据
      const response = await getTemplates();
      if(response.success){
          this.setState({list:response.data,loading:false})
      }

  }

  handleAddTemplate=()=>{
      this.props.history.push('/prototype/templateEdit/_addNew_');
  }

  handleModifieTemplate=(name,e)=>{
      e.preventDefault();
      this.props.history.push(`/prototype/templateEdit/${name}`);
  }


  render() {
    const {list,loading} = this.state
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">组件模版</RadioButton>
          <RadioButton value="waiting">基础模版</RadioButton>
        </RadioGroup>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>创建者</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
          <div className={styles.listContentItem}>
              <span>修改时间</span>
              <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
          </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="模板列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.handleAddTemplate}>
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<a onClick={ e =>{this.handleModifieTemplate(item.name,e)}}>编辑</a>, <MoreBtn />]}
                >
                  <List.Item.Meta
                      avatar ={<Avatar icon="profile" />}
                    title={item.name}
                    description={item.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}

export default Tempalte