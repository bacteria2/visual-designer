import React from 'react';
import Slicer from './index'
import CubeSchema from '../../../src/routes/DataSource/Cube/CubeSchema'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import  FieldsType from '../../../src/routes/DataSource/Cube/FieldsType'
import update from 'immutability-helper'
import isArray from 'lodash/isArray'

const data ={ IS_END: ['中国','外国','日本'],
    AA:[
        {
            name:'AA_ACCOUNT_NO',
            value:2016,
        },
        {
            name:'AA_ACCOUNT_NO',
            value:2011,
        },
        {
            name:'AA_ACCOUNT_NO',
            value:2012,
        },{
            name:'AA_ACCOUNT_NO',
            value:2013,
        },

    ],
    时间:[{
            name:'年',
            value:2016,
            children:[
                {
                    name:'月',
                    value:12,
                    children:[28,29,30,31],
                },
            ],
        },{
            name:'年',
            value:2018,
            children:[
                {
                    name:'月',
                    value:10,
                    children:[1,2,3,4],
                },
            ],
        }],
};

@DragDropContext(HTML5Backend)
export default class SlicerDemo extends React.PureComponent{

    state = {
        filterData : [
            {
                "alias": "日",
                "groupName":"时间",
                "groupFields":["年","月","日"],
                "fType" : "dimension",
                "values":[
                    [2018,10,2],
                    [2018,10,3],
                    [2018,10,4],
                    [2019,5,4],
                    {
                        "key":"ddd",
                        "value":["值1","值2","值3"],
                    },
                    {
                        "key":"ttt",
                        "value":["值1","值2","值3"],
                    },
                ],
            },
        ],
        data,
    };

    handleDrop = (monitor) => {

        console.log(monitor);

        const {groupName,groupFields,field:{field,alias,fieldId}} = monitor;

        let newFilterDimension = {alias,field,fieldId,hide:false, ftype : "dimension"};

        if(groupName && isArray(groupFields)){
            newFilterDimension.groupName = groupName;
            newFilterDimension.groupFields = groupFields.map(e=>e.alias);
        }

        this.setState(update(this.state,{
            filterData:{$push:[newFilterDimension]},
            dataSet:{$set:data},
        }));
    };

    render(){
        const containerStyle = {float:'left',height:'800px',width:'230px',marginLeft:'20px',position:'relative',display:'flex'};

        return (<div><div style={{width:230,height:'100px',float:'left',display:'flex'}}>
            <Slicer accepts={[FieldsType.DIMENSION,FieldsType.LEVEL]}
                    onDrop={this.handleDrop}
                    data={this.state.data}
                    filterData={this.state.filterData}
                    onChange={(v)=>{
                console.log(v);
                return this.setState({filterData:v});}} />
        </div><div style={containerStyle}>
            <CubeSchema getData={()=>{}} onChange={()=>{}} />
        </div></div>)
    }

}