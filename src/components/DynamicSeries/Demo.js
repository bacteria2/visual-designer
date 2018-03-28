import React from 'react';
import DynamicSeries from './index'
import update from 'immutability-helper'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import {seleteCubeById,seleteConnByCubeId} from '../../service/CubeService';
import {conversionConn} from '@/routes/DataSource/tools'
import {getMdxById} from '../../service/mdxService';

@DragDropContext(HTML5Backend)
export default class DYDemo extends React.PureComponent{

    async componentWillMount(){
            //请求获取 Cube
            const cubeRep = await seleteCubeById('5a798206b949b6257cff52ac');
            if(cubeRep.success){
                //请求获取DataInfo
                const cube = cubeRep.data;

                const connRep = await  seleteConnByCubeId(cube._id);
                this.conn = connRep.data;
                let connect =  conversionConn(connRep.data);

                //获取Schema
                const mdxRep = await getMdxById(cube.mdxId);

                // mdxRep.data.schema,schemaId:mdxRep.data.schemaId
                const dsInfo = {
                    schema:mdxRep.data.schema,
                    schemaId:mdxRep.data.schemaId,
                    connect,
                };

                this.setState(update(this.state,{cube:{$set:cubeRep.data},dataInfo:{$set:dsInfo}}));
            }
    }

    state = {
      dataInfo:null,
      cube:null,
      dimensions:[{
          "alias": "案件号（计数）",
          "ftype": "measure",
          "split": [{
                      "groupName": "时间",
                      "fieldId":'asdfasdfasf',
                      "groupFields":['年','月'],
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
                      "alias": "WEIXIN",
                      "fieldId":'asdfasdfasf2',
                      "values": [{
                          "value": ['0'],
                      },{
                          "value": ['但是'],
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

    handleDrop = (dimensionIndex,monitor) => {
        console.log("handleDrop",dimensionIndex,monitor);

        let newSplit = {};
        ({field:{alias:newSplit.alias,fieldId:newSplit.fieldId}} = monitor);

        //分组属性
        // ***
        /////////

        this.setState(update(this.state,{
            dimensions:{
                [dimensionIndex]:{
                  split:{
                      $push:[newSplit],
                  },
                },
            },
        }));

    };

    render(){
        return (<div style={{width:230,height:'500px',float:'left',display:'flex'}}>
            <DynamicSeries
                cube = {this.state.cube}
                dsInfo = {this.state.dataInfo}
                defaultValue={this.state.dimensions}
                onChange={(v)=>{
                    console.log(v);
                    this.setState(update(this.state,{dimensions:{$set:v}}));
                }}
            />
                </div>)
    }
}