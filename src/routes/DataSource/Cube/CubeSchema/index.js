import React from 'react';
import { Select,message,Icon,Tooltip,Modal } from 'antd';
import PivotSchema from '../PivotSchema'
import update from 'immutability-helper'
import {queryCubeList,queryCubeCategory,updateCube,seleteConnByCubeId,creatViewAndMdx} from '../../../../service/CubeService';
import {updateMdx} from '../../../../service/mdxService';
import {getMdxById} from '../../../../service/mdxService.js'
import styles from './cubeSchema.css'
import {conversionConn,generateSql} from '@/routes/DataSource/tools'
import DynamicTable from '@/components/DynamicTable/DynamicTable'
import {wideTable} from '../../../../service/mdxService.js'
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
        dataViewVisible:false,
        dataViewData:[],
        dataViewFields:[],
    };

    async componentDidMount(){

        //初始化CUBE数据列表
        let cubeRep = await queryCubeList();
        if(cubeRep.success){
             const cubeList = cubeRep.data;
             if(cubeList && cubeList.length > 0){
                 const defaultCube = cubeList[0];
                 this.setState(
                     update(this.state,{
                         currentCube:{$set:  cubeList[0]},
                         cubeList:{$set:cubeList},
                     })
                 );
                 if(defaultCube.mdxId){
                     this.getDataByCube(defaultCube);
                 }
             }
             //获取第一个CUBE的 MDX，调用回调函数传递给父级



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

    async getDataByCube(cube){
        const mdxRep = await getMdxById(cube.mdxId);
        if(mdxRep.success){
            const mdx = mdxRep.data.schema;
            //获取数据连接信息
            const connRep = await  seleteConnByCubeId(cube._id);
            this.conn = connRep.data;
            const connInfo = conversionConn(connRep.data);
            if(connRep.success){
                if(this.props.getData){
                    this.props.getData({mdx,connInfo});
                }
            }else{
                message.error("获取数据连接失败！")
            }

        }else{
            message.error("获取CUBE XML失败！")
        }
    }


    handleChange(value) {
       const selectCube = this.state.cubeList.filter(e=>e._id === value)[0];
       this.setState(
           update(this.state,{
               currentCube:{$set:selectCube},
           })
       );
       this.getDataByCube(selectCube);
    }

    async update(pivotSchema,updateTables){
        const newCube =  update(
            this.state.currentCube,{
                pivotSchema:{$set:pivotSchema},
            }
        );

        if(updateTables){
            //更新 tables中字段的隐藏和显示属性
            const allFields = pivotSchema.dimensions.concat(pivotSchema.measures);

            const tables = newCube.tables;

            if(tables && tables._id){
                recursionTable(tables);
            }

            function recursionTable(table){
                const fields = table.fields;
                fields.forEach(tableField=>{
                    const field = allFields.filter(e=>(e.tableId === table._id && e.field === tableField.name))[0];
                    field && (tableField.disable = field.disable);
                });
                if(table.children && table.children.length >0){
                    table.children.forEach(e=>{
                        recursionTable(e);
                    });
                }
            }
        }

        if(newCube.mdxId){

            newCube.viewSql = generateSql(newCube.tables,true).sql;
            //重新生成MDX
            const repMdx = await creatViewAndMdx(this.conn,newCube);

            if(repMdx.ok){

                //保存MDX
                let mdx = repMdx.other;
                newCube.schemaId = mdx.schemaId;
                newCube.viewName = mdx.factTableName;
                mdx._id = newCube.mdxId;
                const updateMdxRep = await updateMdx(mdx);

                if(updateMdxRep.success){
                    message.success("CUBE修改成功");
                    const cubeRep = await updateCube(newCube);
                    if(cubeRep.success){
                        message.success(cubeRep.msg);
                        //重新传递CUBE XML
                        const connInfo = conversionConn(this.conn);
                        this.props.getData({mdx:mdx.schema,connInfo});

                        //更新列表中的CUBE
                        let  cubeIndex  = -1;
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
                        this.setState({currentCube:newCube});

                    }else if(cubeRep.success === false){
                        message.error(cubeRep.msg)
                    }else{
                        message.error('服务器错误，保存失败')
                    }

                }else if(updateMdxRep.success === false){
                    message.error(updateMdxRep.msg)
                }else{
                    message.error('服务器错误，保存失败')
                }
            }
        }
    }

    async perView(){

        if(!this.state.currentCube.tables || !this.state.currentCube.tables._id){
            message.warn('无法预览，请先编辑宽表信息');
            return
        }
        const result = generateSql(this.state.currentCube.tables,true);
        //处理成合并列头的数据结构
        let columns = [];
        result.fieldsDic.forEach(e=>{
            const tables = columns.filter(column=>column.name === e.table);
            let table = {};
            if(tables.length>0){
                //存在表
                table = tables[0];

            }else{
                //不存在，需要新建
                table = {name:e.table};
                table.children = [];
                columns.push(table);
            }

            table.children.push({name:e.generateField
                ,title:e.alias
                ,key:e.generateField
                ,render:columnRender
                ,dataIndex:this.conn.type === 'oracle'?e.generateField.toUpperCase():e.generateField,
            });

            function columnRender(text){
                return (text&&(text+'').length>10?(text+'').split('').splice(0,10).reduce((a,b)=>(a+b)) + '...':text)
            }

        });
        // const viewFields = result.fieldsDic.map(e=>({name:e.generateField,alias:e.alias,table:e.table}));
        //查询数据
        const rep = await wideTable(this.conn,result.sql);
        if(rep.success){
            this.setState(
                update(this.state,{
                    dataViewVisible:{$set:true},
                    dataViewData:{$set:rep.data},
                    dataViewFields:{$set:columns},
                })
            );

        }else if(rep.success === false){
            message.error(rep.msg)
        }else{
            message.error('服务器错误，保存失败')
        }
        //开启数据预览Modal
    }

    render(){
        return (<div className={styles.container} style={{width:'100%',textAlign:'center'}}>
            <h1>数据模型
                <Tooltip title="数据预览">
                    <span ><Icon type="table" onClick={this.perView.bind(this)} /></span>
                </Tooltip>
            </h1>
            {
                this.state.cubeCategoryList &&
                <Select
                    defaultValue={this.state.currentCube._id}
                    style={{ width: '80%',margin:'10px auto' }}
                    onChange={this.handleChange.bind(this)}>
                    {this.getGroupOption()}
                </Select>
            }
            <div style={{flex:'auto',display:'flex'}}>
                <PivotSchema data={this.state.currentCube}
                             update={this.update.bind(this)}/>
            </div>
            <Modal
                title='宽表数据预览'
                visible={this.state.dataViewVisible}
                onCancel={()=>{this.setState({dataViewVisible:false})}}
                footer={null}
                width='80%'
                bodyStyle={{padding:'10px',overflow:'auto'}}
                maskClosable={false}>
                {this.state.dataViewFields.length &&
                <DynamicTable
                    conn={this.props.conn}
                    tableName={this.state.dataViewTitle}
                    data = {this.state.dataViewData}
                    fields={this.state.dataViewFields}/>
                }
            </Modal>
        </div>)
    }
}
