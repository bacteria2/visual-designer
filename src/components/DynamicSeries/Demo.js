import React from 'react';
import DynamicSeries from './index'

export class DYDemo extends React.PureComponent{

    state = {
      dimensions:[{
          "alias": "案件号（计数）",
          "ftype": "measure",
          "split": [{
                      "groupName": "时间",
                      "alias": "月",
                      "values": [{
                          "name": "本月",
                          "value": [2017, 12],
                      },
                          {
                              "name": "上年同期",
                              "value": [2016, 12],
                          },
                      ],
                  },
                  {
                      "alias": "案件类别",
                      "values": [{
                          "value": ["$ALL"],
                      }],
                  },
                ],
            },
          {
              "alias": "案件号（去重计数）",
              "ftype": "measure",
          },
          {
              "alias": "街道",
              "ftype": "dimension",
              "values": ["祖庙", "南庄"],
          },
      ],
    };

    render(){
        return (<div style={{width:230,height:'100px',float:'left',display:'flex'}}>
                    <DynamicSeries defaultValue={this.state.dimensions} onChange={(v)=>console.log(v)} />
                </div>)
    }
}