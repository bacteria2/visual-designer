let mockjs =require( 'mockjs');
let {getNotices}=require('./notice')

var delay = function (proxy, timer) {
  var mockApi = {};
  Object.keys(proxy).forEach(function (key) {
    mockApi[key] = function (req, res) {

      var result = proxy[key].$body || proxy[key];

      var foo;
      if (Object.prototype.toString.call(result) === '[object Function]') {
        foo = result;
      } else {
        foo = function (req, res) {
          res.json(result);
        }
      }

      setTimeout(function () {
        foo(req, res);
      }, timer);
    }
  });
  mockApi.__mockData = proxy;
  return mockApi;
}

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /visual/api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /visual/api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /visual/api/project/notice': getNotices,

  'POST /visual/api/forms': (req, res) => {
    res.send('Ok');
  },
  'GET /visual/api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
};

module.exports= noProxy ? {} : delay(proxy,1000);
