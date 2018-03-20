import React from 'react';
import { Select,message,Icon,Tooltip,Modal } from 'antd';
import PivotSchema from '../PivotSchema'
import update from 'immutability-helper'
import {queryCubeList,queryCubeCategory,updateCube,seleteConnByCubeId,creatViewAndMdx} from '../../../../service/CubeService';
import {updateMdx,getMdxById,wideTable} from '../../../../service/mdxService';
import { queryDataByDBConnAndTablename
    ,queryFieldsByDBConnAndTablename} from '../../../../service/DataConnService'
import styles from './cubeSchema.css'
import {conversionConn,generateSql} from '@/routes/DataSource/tools'
import DynamicTable from '@/components/DynamicTable/DynamicTable'
import { connect } from 'react-redux';
const confirm = Modal.confirm;
const {OptGroup,Option} = Select;
//
// @DragDropContext(HTML5Backend)
class CubeSchema extends React.PureComponent{
    constructor(props){
        super(props);
        this.projectId = props.project.currentProject.get('id');
        this.state = {
            currentCube:null,
            cubeCategoryList:null,
            cubeList:null,
            dataViewVisible:false,
            dataViewData:[],
            dataViewFields:[],
        };
    }

    async componentDidMount(){

        //初始化CUBE数据列表
        let cubeRep = await queryCubeList(this.projectId);
        if(cubeRep.success){
             const cubeList = cubeRep.data;
             if(cubeList && cubeList.length > 0){
                 //初始化选中的默认CUBE
                 if(!this.props.cubeId){
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
                 }else{
                     const defaultCube = cubeList.filter(e=>e._id === this.props.cubeId)[0];
                     this.setState(
                         update(this.state,{
                             currentCube:{$set: defaultCube},
                             cubeList:{$set:cubeList},
                         })
                     );
                     if(defaultCube.mdxId){
                         this.getDataByCube(defaultCube,true);
                     }
                 }
             }
             //获取第一个CUBE的 MDX，调用回调函数传递给父级

        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }

        let rep = await queryCubeCategory(this.projectId);
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

    async getDataByCube(cube,unChange){

        const mdxRep = await getMdxById(cube.mdxId);

        if(mdxRep.success){
            //获取数据连接信息

            const connRep = await  seleteConnByCubeId(cube._id);
            this.conn = connRep.data;
            let connInfo;
            connInfo =  conversionConn(connRep.data);
            if(cube.connType === 'bean'){
                connInfo.model = cube.model;
            }
            const options = {mdx:mdxRep.data.schema,schemaId:mdxRep.data.schemaId,connInfo,cubeId:cube._id};
            if(connRep.success){
                if(this.props.onChange && !unChange){
                    this.props.onChange(options);
                }else if(this.props.onUpdate && unChange){
                    this.props.onUpdate(options);
                }
            }else{
                message.error("获取数据连接失败！")
            }
        }else{
            message.error("获取CUBE XML失败！")
        }
    }


    handleChange(value) {
       //提示 修改CUBE将清除所有数据项和相关的样式
        const _self = this;
        confirm({
            title: '确定要切换CUBE吗?',
            content: '如果切换了CUBE，将清除所有数据项和相关的样式',
            onOk() {
                const selectCube = _self.state.cubeList.filter(e=>e._id === value)[0];
                _self.setState(
                    update(_self.state,{
                        currentCube:{$set:selectCube},
                    })
                );
                _self.getDataByCube(selectCube);
            },
            onCancel() {},
        });
    }

    async update(pivotSchema,updateTables){
        // if(this.state.currentCube.connType === 'bean') return ;
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
                    // message.success("CUBE修改成功");
                    const cubeRep = await updateCube(newCube);
                    if(cubeRep.success){
                        message.success(cubeRep.msg);
                        //重新传递CUBE XML
                        // const connInfo = conversionConn(this.conn);
                        // let connInfo;
                        // if(newCube.connType === 'bean'){
                        //     connInfo = newCube.conn;
                        // }else{
                        //     connInfo = conversionConn(this.conn);
                        // }
                        let connInfo =  conversionConn(this.conn);
                        if(newCube.connType === 'bean'){
                            connInfo = newCube.conn;
                        }
                        if(this.props.onUpdate) this.props.onUpdate({mdx:mdx.schema,connInfo,cubeId:newCube._id,schemaId:mdx.schemaId});

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
        if(this.state.currentCube.connType !== 'bean'){
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
        }else{
            const tableName = this.state.currentCube.tables.name;
            const fields = await  queryFieldsByDBConnAndTablename(this.conn,tableName);
            if(fields && fields.data ){
                const dataRep = await  queryDataByDBConnAndTablename(this.conn,tableName);
                if(dataRep && dataRep.data) {
                    this.setState({
                        dataViewFields:fields.data,
                        dataViewData:dataRep.data,
                        dataViewVisible:true});
                }else{
                    message.error("获取数据失败");
                }
            }else{
                message.error("获取字段信息失败");
            }
        }
            //URL 数据源，则直接请求接口，返回成功则保存数据，设定固定表名：数据集
            // let ddRep = await getDimensionAndDataSetByUrl(this.conn);
            // if(ddRep.success){
            //     //生成预览数据列头信息
            //     const dimension = ddRep.dimension;
            //     const fields = dimension.map(e=>({name:e,comments:e}));
            //     //转换 Antd表格所要的数据格式
            //     const dataSet = ddRep.data;
            //     const dataViewData = dataSet.map(e=>{
            //         let data = {};
            //         e.forEach((value,i) => {
            //             data[dimension[i]] = value;
            //         });
            //         return data
            //     });
            //
            //
            //     this.setState({dataViewFields:fields,dataViewData,dataViewVisible:{$set:true}});
            // }else if(ddRep.success === false){
            //     message.error(ddRep.msg);
            //     return false
            // }else{
            //     message.warning('服务器连接错误');
            //     return false
            // }
        // }
    }

    render(){
        return (<div className={styles.container} style={{width:'100%',textAlign:'center'}}>
            <h1>数据模型
                <Tooltip title="数据预览">
                    <span className={styles.perview}><Icon type="table" onClick={this.perView.bind(this)} /></span>
                </Tooltip>
            </h1>
            {
                this.state.cubeCategoryList &&
                <Select
                    value={this.state.currentCube._id}
                    style={{ width: '80%',margin:'10px auto' }}
                    onChange={this.handleChange.bind(this)}>
                    {this.getGroupOption()}
                </Select>
            }
            <div style={{flex:'auto',display:'flex'}}>
                <PivotSchema data={this.state.currentCube}
                             update={this.update.bind(this)}
                             unEditFields={this.props.unEditFields}
                             // unMenu={this.state.currentCube && this.state.currentCube.connType === 'bean'}
                             // unDrop={this.state.currentCube && this.state.currentCube.connType === 'bean'}
                             // unDrap={this.state.currentCube && this.state.currentCube.connType === 'bean'}
                />
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
export default connect(state => ({project: state.get('projectized').toObject()}))(CubeSchema)