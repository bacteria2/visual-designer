import React from 'react';
import Slicer from './index'

const dataSet = [
    ['a','b','c'],
    [1,2,3],
    [4,5,6]];

const dataItem = ['a','b','c'];

const filterData =  [
    {
        alias: "来源",
        field:'a',
        hide:false,
        ftype : "dimension",
        values:[
            "电话投诉",
            "微信上报",
            {
                "key":"paramName",  //变量名，手工录入
                "value":"随手拍上报", //默认值，如果是多个值，则用数组
            },
        ],
    },{
        alias: "规格",
        field:'b',
        hide:true,
        ftype : "dimension",
    },
];

export default class SlicerDemo extends React.PureComponent{

    state = {
        filterData :  [
            {
                alias: "来源",
                field:'a',
                hide:false,
                ftype : "dimension",
                values:[
                    "电话投诉",
                    "微信上报",
                    {
                        "key":"paramName",  //变量名，手工录入
                        "value":"随手拍上报", //默认值，如果是多个值，则用数组
                    },
                ],
            },{
                alias: "规格",
                field:'b',
                hide:true,
                ftype : "dimension",
            },
        ],
    }

    render(){
        return (<div style={{width:230}}>
            <Slicer dataSet={dataSet} filterData={this.state.filterData} onChange={(v)=>this.setState({filterData:v})} />
        </div>)
    }

}