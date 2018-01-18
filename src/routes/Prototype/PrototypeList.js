import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './PrototypeList.css';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@Form.create()
class SearchList extends PureComponent {
  componentDidMount() {
    this.fetchMore();
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  }

  fetchMore = () => {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: pageSize,
      },
    });
  }

  render() {
    const { form, list: { list, loading } } = this.props;
    const { getFieldDecorator } = form;

    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <p className={'description'}>{content}</p>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
        </div>
      </div>
    );

    const pageHeaderContent = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore = list.length > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> 加载中...</span> : '加载更多'}
        </Button>
      </div>
    ) : null;

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        onTabChange={this.handleTabChange}
      >
        <div>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit} expandable>
                      <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                      <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                      <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                      <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="owner"
                grid
              >
                <Row>
                  <Col lg={16} md={24} sm={24} xs={24}>
                    <FormItem>
                      {getFieldDecorator('owner', {
                        initialValue: ['wjh', 'zxx'],
                      })(
                        <Select
                          mode="multiple"
                          style={{ maxWidth: 286, width: '100%' }}
                          placeholder="选择 owner"
                        >
                          {
                            owners.map(owner =>
                              <Option key={owner.id} value={owner.id}>{owner.name}</Option>
                            )
                          }
                        </Select>
                      )}
                      <a className={styles.selfTrigger} onClick={this.setOwner}>只看自己的</a>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
              <StandardFormRow
                title="其它选项"
                grid
                last
              >
                <Row gutter={16}>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label="活跃用户"
                    >
                      {getFieldDecorator('user', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="不限"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="lisa">李三</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label="好评度"
                    >
                      {getFieldDecorator('rate', {})(
                        <FormItem
                          label="好评度"
                        >
                          {getFieldDecorator('rate', {})(
                            <Select
                              onChange={this.handleFormSubmit}
                              placeholder="不限"
                              style={{ maxWidth: 200, width: '100%' }}
                            >
                              <Option value="good">优秀</Option>
                            </Select>
                          )}
                        </FormItem>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{padding:0}}
          >
            <List
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText type="star-o" text={item.star} />,
                    <IconText type="like-o" text={item.like} />,
                    <IconText type="message" text={item.message} />,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={(
                      <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                    )}
                    description={
                      <span>
                        <Tag>Ant Design</Tag>
                        <Tag>设计语言</Tag>
                        <Tag>蚂蚁金服</Tag>
                      </span>
                    }
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

export default connect(({list={list:[],loading:true}})=>({list}))(SearchList)
