let mockjs =require( 'mockjs');
let {getNotices, getPage, getWidget, getMeta} = require('./notice')

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
  'GET /visual/api/user/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      code:200,
      msg:"",
      data:{
        name: 'Shepard',
        avatar: '/static/image/avatar/timg.jpg',
        userid: '00000001',
        notifyCount: 12,
      }
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
  //login
  'POST /visual/api/login/account': (req, res) => {
    const { password, userName } = req.body;
    res.send({ status: password === '888888' && userName === 'admin' ? 'ok' : 'error', type: 'account' });
  },
  'POST /visual/api/login/mobile': (req, res) => {
    res.send({ status: 'ok', type: 'mobile' });
  },
  'POST /visual/api/user/registry': (req, res) => {
    res.send({ status: 'ok' });
  },
  'GET /visual/api/widget/propertyPages/:name': (req, res) => {
    return res.json({code: 200, success: true, msg: '', data: getPage(req.params.name)})
  },
  // 'GET /visual/api/widget/:id': (req, res) => {
  //   if (req.params.id === '888888')
  //     return res.json({code: 200, success: true, msg: '', data: getWidget()})
  //   else
  //     return res.json({code: 400, success: false, msg: `id ${req.params.id} not found`, data: {}})
  // },
  'GET /visual/api/prototype/meta/:id': (req, res) => {
    if (req.params.id === '777777')
      return res.json({code: 200, success: true, msg: '', data: getMeta()})
    else
      return res.json({code: 400, success: false, msg: `id ${req.params.id} not found`, data: {}})
  }
};

module.exports = noProxy ? {} : delay(proxy, 500)
