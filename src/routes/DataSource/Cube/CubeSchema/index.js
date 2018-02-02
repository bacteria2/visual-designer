import React from 'react';
import { Select,message } from 'antd';
import PivotSchema from '../PivotSchema'
import update from 'immutability-helper'
import {updateCube} from '../../../../service/CubeService.js'
import {queryCubeList,queryCubeCategory} from '../../../../service/CubeService';
import styles from './cubeSchema.css'
// import { DragDropContext,DragSource } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'

const {OptGroup,Option} = Select;
//
// @DragDropContext(HTML5Backend)
export default class CubeSchema extends React.PureComponent{

    state = {
        currentCube:null,
        cubeCategoryList:null,
        cubeList:null,
    };

    async componentDidMount(){

        //初始化CUBE数据列表
        let cubeRep = await queryCubeList();
        if(cubeRep.success){
             const cubeList = cubeRep.data;
             if(cubeList){
                 this.setState(
                     update(this.state,{
                         currentCube:{$set:  cubeList[0]},
                         cubeList:{$set:cubeList},
                     })
                 )
             }
        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }

        let rep = await queryCubeCategory();
        if(rep.success){
            const cubeCategoryList = rep.data;
            if(cubeCategoryList){
                this.setState(
                    update(this.state,{
                        cubeCategoryList:{$set:  cubeCategoryList},
                    })
                )
            }
        }else if(!rep.success){
            message.error(rep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    getGroupOption(){
        return this.state.cubeCategoryList.map((category)=> {
            //产生数据连接列表
            let options = [];
            for (let i = 0; i < this.state.cubeList.length; i++) {
                let cube = this.state.cubeList[i];
                if (cube.categoryId === category._id) {
                    options.push(<Option value={cube._id} key={cube._id}>{cube.name}</Option>)
                }
            }
            return <OptGroup label={category.name} key={category._id}>{options}</OptGroup>
        });

    }


    handleChange(value) {
       const selectCube = this.state.cubeList.filter(e=>e._id === value)[0];
       this.setState(
           update(this.state,{
               currentCube:{$set:selectCube},
           })
       )
    }

    async update(pivotSchema){
        const newCube =  update(
            this.state.currentCube,{
                pivotSchema:{$set:pivotSchema},
            }
        );
        this.setState({currentCube:newCube});

        const rep = await updateCube(newCube);
        if(rep.success){
            message.success(rep.msg);
            //更新列表中的CUBE
            let  cubeIndex ;
            this.state.cubeList.forEach((e,i)=>{
                if(e._id === newCube._id) cubeIndex = i;
            });
            this.setState(
                update(this.state,{
                        cubeList:{
                            [cubeIndex]:{
                                $set:newCube,
                            },
                        },
                    }
                )
            );

        }else if(rep.success === false){
            message.error(rep.msg)
        }else{
            message.error('服务器错误，保存失败')
        }
    }

    render(){
        return (<div className={styles.container} style={{width:'100%',textAlign:'center'}}>
            <h1>数据模型</h1>
            {
                this.state.cubeCategoryList &&
                <Select
                    defaultValue={this.state.currentCube._id}
                    style={{ width: '80%',margin:'10px 0' }}
                    onChange={this.handleChange.bind(this)}>
                    {this.getGroupOption()}
                </Select>
            }

                <PivotSchema data={this.state.currentCube} update={this.update.bind(this)}
                            height = 'calc(100% - 83px)'/>

        </div>)
    }
}
