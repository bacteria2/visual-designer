module.exports = {
  getNotices (req, res) {
    res.json({
      code: 200, msg: '', data: [{
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: '通知',
      }, {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知',
      }, {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
      }, {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: '通知',
      }, {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: '通知',
      }, {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000009',
        title: '任务名称',
        description: '任务需要在 2017-01-12 20:00 前启动',
        extra: '未开始',
        status: 'todo',
        type: '待办',
      }, {
        id: '000000010',
        title: '第三方紧急代码变更',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '马上到期',
        status: 'urgent',
        type: '待办',
      }, {
        id: '000000011',
        title: '信息安全考试',
        description: '指派竹尔于 2017-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        status: 'doing',
        type: '待办',
      }, {
        id: '000000012',
        title: 'ABCD 版本发布',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '进行中',
        status: 'processing',
        type: '待办',
      }]
    })
  },
  getPage (name) {
    const pages = {
      'EchartsBaseCommon': {
        'layout': [
          'p:backgroundColor',
          'p:color'
        ],
        'properties': [
          {
            'optionKey': 'backgroundColor',
            'inputType': 'color',
            'label': '背景颜色'
          },
          {
            'optionKey': 'color',
            'inputType': 'colorList',
            'label': '序列颜色列表'
          }
        ]
      },
      'EchartsTitleContent': {
        'layout': [
          'p:title.text',
          'p:title.left',
          [
            {id: 'collapse:c1', bordered: true, defaultActiveKey: ['1']},
            [
              {header: '基础', key: '1',},
              'p:title.textStyle.fontSize',
              'p:title.text.a',
            ],
            [
              {header: '示例', key: '2',},
              'p:title.textStyle.height'
            ], [
            {header: '基础', key: '3',},
            {
              id: 'xxxTabs',
              panels: ['xpanel1', 'xpanel2'],
              'xpanel1': [
                {tab: '高亮', key: 'xhighlight',},
                'p:title.textStyle.xpanel1.fontSize',
                'p:title.textStyle.width',
              ],
              'xpanel2': [
                {tab: '普通', key: 'xnormal',},
                'p:title.textStyle.xpanel2.fontSize',
                'p:title.textStyle.xpanel2.height',
              ],
            }
          ]],
          {
            id: 'tttt',
            panels: ['panel1', 'panel2'],
            'panel1': [
              {tab: '高亮', key: 'highlight',},
              'p:title.subtext',
              'p:title.textStyle.panel1.height',
            ],
            'panel2': [
              {tab: '普通', key: 'normal',},
              'p:title.textStyle.panel2.fontSize',
              'p:title.textStyle.panel2.height',
            ],
          }
        ],
        'properties': [
          {
            inputType: 'text',
            optionKey: 'title.text',
            label: '标题'
          }, {
            inputType: 'switchable',
            optionKey: 'title.left',
            ui: [
              {
                name: 'number', max: 120, min: 10,
                formatterType: 'pixel',
              },
              {
                name: 'select',
                options: [{text: '左', value: 'left'}, {text: '中', value: 'center'}, {text: '右', value: 'right'}]
              },
              {
                name: 'slider', max: 100, min: 0,
                formatterType: 'percent',
                marks: {
                  0: '0%', 50: '50%', 100: {
                    style: {
                      color: '#f50',
                    },
                    label: '100%',
                  }
                }
              }
            ],
            label: '标题a'
          }, {
            inputType: 'text',
            optionKey: 'title.text.b',
            label: '标题b'
          }, {
            inputType: 'slider',
            optionKey: 'title.textStyle.fontSize',
            min: 4,
            max: 16,
            label: '字体大小'
          }, {
            inputType: 'slider',
            optionKey: 'title.textStyle.height',
            min: 8,
            max: 16,
            label: '字体间隔'
          }, {
            inputType: 'slider',
            optionKey: 'title.textStyle.width',
            min: 8,
            max: 16,
            label: 'width'
          }, {
            inputType: 'textArea',
            optionKey: 'title.subtext',
            label: '副标题文本'
          }, {
            inputType: 'slider',
            optionKey: 'title.textStyle.range',
            min: 4,
            max: 16,
            range: true,
            label: '字体大小'
          }],
      },
      'EchartsXAxisLine': {
        'layout': [
          'p:xAxis.$i.show',
          'p:xAxis.$i.name',
          'p:xAxis.$i.nameRotate'
        ],
        'properties': [
          {
            'optionKey': 'xAxis.$i.show',
            'inputType': 'select',
            'label': '显示标题',
            'options': [
              {
                'text': '是',
                'value': true
              },
              {
                'text': '否',
                'value': false
              }
            ]
          },
          {
            'optionKey': 'xAxis.$i.name',
            'inputType': 'text',
            'label': '标题内容'
          },
          {
            'optionKey': 'xAxis.$i.nameRotate',
            'inputType': 'slider',
            'min': 0,
            'max': 360,
            'label': 'name旋转'
          }
        ]
      },
      'EchartsXAxisLable': {
        'layout': [
          'p:xAxis$i.axisLabel.show',
          [
            {
              'id': 'collapse-font',
              'bordered': true,
              'defaultActiveKey': [
                '1'
              ]
            },
            [
              {
                'header': '字体',
                'key': '1'
              },
              'xAxis$i.axisLabel.textStyle.color',
              'xAxis$i.axisLabel.textStyle.fontSize'
            ]
          ]
        ],
        'properties': [
          {
            'optionKey': 'xAxis$i.axisLabel.show',
            'inputType': 'select',
            'label': '显示标签',
            'options': [
              {
                'text': '是',
                'value': true
              },
              {
                'text': '否',
                'value': false
              }
            ]
          },
          {
            'optionKey': 'xAxis$i.axisLabel.textStyle.color',
            'inputType': 'color',
            'label': '标签文本颜色'
          },
          {
            'optionKey': 'xAxis$i.axisLabel.textStyle.fontSize',
            'inputType': 'number',
            'label': '标签文本颜色'
          }
        ]
      }
    }

    return pages[name]
  },
  getMeta () {
    return {
      'optionMeta': {
        'normal': [
          {
            'label': '基础',
            'key': 'base',
            'children': [
              {name: 'EchartsBaseCommon', label: '通用'},
              {name: 'EchartsBaseAdvanced', label: '高级'}
            ]
          },
          {
            'label': '标题',
            'key': 'Title',
            'children': [
              {name: 'EchartsTitleContent', label: '内容'},
              {name: 'EchartsTitleStyle', label: '样式'},
            ]
          },
          {
            'label': '图例',
            'key': 'Legend',
            'children': [
              {name: 'EchartsLegendBasic', label: '基础'},
              {name: 'EchartsLegendOthers', label: '高级'},
            ]
          },
          {
            'label': '提示',
            'key': 'Tooltip',
            'children': [
              {name: 'EchartTooltipCommon', label: '通用'},
            ]
          },
          {
            'label': '工具',
            'key': 'Toolbox',
            'children': [
              {name: 'EchartsToolboxBasic', label: '基础'},
            ]
          }
        ],
        'addable': [
          {
            'label': 'X轴',
            'key': 'xAxis',
            'children': [
              {name: 'EchartsXAxisLine', label: '轴线'},
              {name: 'EchartsXAxisLable', label: '标签'},
            ]
          }
        ]
      },
      'dataMeta': {},
    }
  },
  getWidget () {
    return {
      'prototypeId': '777777',
      'script': {
        initiation: `function(){
             let {Toolkit} = window;
           return Toolkit.asyncCharts(document.getElementById('chart'))
        }`,
        render: `if ($chart) $chart.invoke('setOption', $option, true)`,
      },
      rawOption: {
        title: {
          text: 'abdeeesc',
          subtext: '123123',
          textStyle: {
            fontSize: 16,
            height: 32,
            width: 120,
          },
        },
        xAxis: [{name: 123, nameRotate: 130}, {name: 2223, nameRotate: 230}],
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265'],
        tooltip: {
          formatter (param) {
            return param.name + 'w'
          }
        }
      },
      data: {
        legend: {
          data: ['销量', '产量']
        },
        xAxis: [{data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']}, {data: ['1', '2', '3', '4', '5', '6']}],
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '产量',
          type: 'bar',
          data: [15, 25, 46, 20, 30, 26]
        }],
      },
      dataOption: {},
      option: {},
      name: '',
      type: '',
    }
  },
}
