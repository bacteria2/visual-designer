import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';
import {fetchWidgetList} from '../../store/Widget/action'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './WidgetList.css';
import Ellipsis from '../../components/Ellipsis'

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
    this.props.dispatch(fetchWidgetList())
  }

  handleTabChange = (key) => {
    let {history,location:{pathname}}=this.props;
    switch (key) {
      case '2d':
       history.push('/wiget/list/2d');
        break;
      case '3d':
        history.push('/wiget/list/3d');
        break;
      case 'map':
       history.push('/wiget/list/3d');
        break;
      default:
        break;
    }
  }

  render() {
    const { form,  list, loading  } = this.props;
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

    const tabList = [
      {
        key: '2d',
        tab: '普通图表',
      },
      {
        key: '3d',
        tab: '3D图表',
      },
      {
        key: 'map',
        tab: '地图',
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
        <p className={styles.description}>{content}</p>
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

    const loadMore = list.size > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> 加载中...</span> : '加载更多'}
        </Button>
      </div>
    ) : null;

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        tabList={tabList}
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
                      <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                      <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                      <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                      <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                      <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                      <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
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
            bodyStyle={{ padding: '8px 24px 24px 32px',overflow:'auto' }}
          >
            <List
              loading={loading}
              rowKey="_id"
              grid={{ gutter: 18, lg: 4, md: 3, sm: 2, xs: 1 }}
              dataSource={['',...list.toJS()]}
              renderItem={item => (item ? (
                  <List.Item key={item._id}>
                    <Card hoverable className={styles.card} actions={[<a onClick={()=>this.props.history.push(`/designer/widget/${item._id}`)}>操作一</a>, <a>操作二</a>]}>
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={(
                          <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                        )}
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton}>
                      <Icon type="plus" /> 新增产品
                    </Button>
                  </List.Item>
                )
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}

export default connect(state=>({
  list:state.getIn(['widget','currentList']),
  loading:state.getIn(['widget','loadingList'])}
  ))(SearchList)
