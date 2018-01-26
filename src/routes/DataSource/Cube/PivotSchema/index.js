import React from 'react';
import {Icon,Menu,Dropdown} from 'antd';
import styles from './fieldsEditor.css'
import  FieldsType from '../FieldsType'
import update from 'immutability-helper'
import isBoolean from 'lodash/isBoolean'
import WrappedRename from '../Rename'
import cloneDeep from 'lodash/cloneDeep'
import uuid from 'uuid/v1'
import Level from './Levels'
import Dimension from './Dimension'
import { DragDropContext } from 'react-dnd'

export default class PivotSchema extends React.PureComponent{

    constructor(props){
        super(props);

        this.measureTypeDic = { };
        this.measureTypeDic[FieldsType.STRING] = styles.cube_style_measure_str ;
        this.measureTypeDic[FieldsType.INTEGER] = styles.cube_style_measure_int ;
        this.measureTypeDic[FieldsType.DECIMAL] = styles.cube_style_measure_decimal ;
        this.measureTypeDic[FieldsType.DATE] = styles.cube_style_measure_date ;

        this.dimensionTypeDic = { };
        this.dimensionTypeDic[FieldsType.STRING] = styles.cube_style_dimension_str ;
        this.dimensionTypeDic[FieldsType.INTEGER] = styles.cube_style_dimension_int ;
        this.dimensionTypeDic[FieldsType.DECIMAL] = styles.cube_style_dimension_decimal ;
        this.dimensionTypeDic[FieldsType.DATE] = styles.cube_style_dimension_date ;

    }

    state = {
        data:null,
        showRenameModal:false,
        showUpdateLevel:false,
        updateLevelName:'',
        updateLevelIndex:-1,
        dimensionTables:[],
        measureTables:[]
    };

    componentWillReceiveProps(props){

        this.setState({cube:props.data});

        if(props.data && props.data.pivotSchema && props.data.pivotSchema.dimensions){
           const dimensionTables =  getTables(props.data.pivotSchema.dimensions);
           this.setState({dimensionTables});
        }

        if(props.data && props.data.pivotSchema && props.data.pivotSchema.measures){
            const measureTables =  getTables(props.data.pivotSchema.measures);
            this.setState({measureTables});
        }

        if(props.data && props.data.pivotSchema && props.data.pivotSchema.levels){

            let levels =  cloneDeep(props.data.pivotSchema.levels);

            levels = levels.map(level => {
                level.fields = level.fields.map(e=>{
                    e = props.data.pivotSchema.dimensions.filter(field=>field.fieldId === e)[0];
                    return e
                });
                level.expanded = true;
               return level
            });

            this.setState({levels});
        }

        function getTables(data){
            let tables = {};
            data.forEach(e=>{
                if(e.tableName){
                    const {dataType,field,alias,fieldId,$type} = e,
                        dimension = {dataType,field,alias,fieldId,$type};
                    let table;

                    if(tables.hasOwnProperty(e.tableId)){
                        table = tables[e.tableId];
                    }else{
                        table = PivotSchema.extractTable(e);
                    }
                    table.fields.push(dimension);
                    tables[e.tableId] = table;
                }

            });
            return tables
        }
    }

    //从CUBE 字段中提取table信息
    static extractTable(pivot){
        let {tableName,tableId,alias,expanded} = pivot;
        // if(tableName) tableName = "扩展字段";
        if(!isBoolean(expanded)) expanded = true;
        return {tableName,tableId,alias,expanded,fields:[]};
    }


    // getDimensions() {
    //     if(this.state.data && this.state.data.pivotSchema && this.state.data.pivotSchema.dimensions){
    //         const dimensions = this.state.data.pivotSchema.dimensions;
    //         return this.getFields(dimensions,this.dimensionTypeDic);
    //     }
    // }
    //
    // getMeasures() {
    //     if(this.state.data && this.state.data.pivotSchema && this.state.data.pivotSchema.measures){
    //         const measures = this.state.data.pivotSchema.measures;
    //         return this.getFields(measures,this.measureTypeDic);
    //     }
    // }

    //切换是否显示表单的字段
    toggleTable(tableId,type){
        if(type === FieldsType.MEASURE){
           // let table = this.state.measureTables[tableId];
           //  table.expanded =  !table.expanded;
            this.setState(
                update(this.state, {
                    measureTables: {
                        [tableId]: {
                            $toggle:['expanded']
                        },
                    }
                })
            )
        }else{
            this.setState(
                update(this.state, {
                    dimensionTables: {
                        [tableId]: {
                            $toggle:['expanded']
                        },
                    }
                })
            )
        }
    }

    //切换是否显示表单的字段
    toggleLevel(index){

        this.setState(
            update(this.state, {
                levels: {
                    [index]: {
                        $toggle:['expanded']
                    },
                }
            })
        )
    }

    deleteLevel(index,e){
        e.stopPropagation();
        this.setState(
            update(this.state, {
                levels: {
                    $splice:[[index,1]]
                }
            })
        )
    }

    renameLevel(level,index,e){
        e.stopPropagation();
        this.setState({
            updateLevelIndex:index,
            updateLevelName:level.name,
            showUpdateLevel:true
        })
    }

    getLevelDom(){
        if (!this.state.levels) return null;
        return this.state.levels.map((level,index)=>{
            return <Level
                key={level.id}
                level = {level}
                index = {index}
                accepts ={[FieldsType.DIMENSION,FieldsType.MEASURE]}
                toggle = {this.toggleLevel.bind(this,index)}
                onDrop = {this.addToLevel.bind(this)}
                delete = {this.deleteLevel.bind(this,index)}
                rename = {this.renameLevel.bind(this,level, index)}
                getMenu= {this.getMenu.bind(this)}
                dimensionTypeDic = {this.dimensionTypeDic}/>
        });
        // return <Levels
        //     levels = {this.state.levels}
        //     accepts ={[FieldsType.DIMENSION]}
        //     toggle = {this.toggleLevel.bind(this)}
        //     onDrop = {this.addToLevel.bind(this)}
        //     delete = {this.deleteLevel.bind(this)}
        //     rename = {this.renameLevel.bind(this)}
        //     getMenu= {this.getMenu.bind(this)}
        //     dimensionTypeDic = {this.dimensionTypeDic}/>
    }

    //获取CUBE 字段的列表
    getTableDom(tables,type) {
        return <Dimension data={tables}
                          type={type}
                          accepts={[type === FieldsType.MEASURE?FieldsType.DIMENSION:FieldsType.MEASURE,'level']}
                          onDrop = {this.convertPivot.bind(this)}
                          removeLevel = {this.removeLevel.bind(this)}
                          onLevelConvert = {this.levelConvert.bind(this)}
                          toggle={this.toggleTable.bind(this)}
                          getMenu= {this.getMenu.bind(this)}
                          levels={this.state.levels}
        />
    }

    //CUBE 字段菜单点击
    menuClickHandle(table,field,fieldIndex,levelIndex,{key}){

        switch (key){
            case "convertPivot":
                //转换维度或度量
                if(levelIndex === undefined){
                    this.convertPivot({srcTable:table,field,fieldIndex});
                }else{
                    //层级直接转换为度量
                    this.levelConvert({field,fieldIndex,levelIndex},'measureTables');
                }

                break;
            case FieldsType.STRING:case FieldsType.INTEGER:case FieldsType.DECIMAL:case FieldsType.DATE:
                covertType.call(this);
                break;
            case "rename":
                this.renamePivotName = field.$type === FieldsType.DIMENSION ? 'dimensionTables':'measureTables';
                this.renameTableId = table.tableId;
                this.renameFromLevel = false;

                let renameField = {index:fieldIndex,alias:field.alias,name:field.field};
                if(levelIndex !== undefined){
                    this.renameFromLevel = true;
                    //重命名层中属性的名称
                    //找出属性在维度表中的索引
                    this.state.dimensionTables[field.tableId].fields.forEach((e,i)=>{
                        if(e.fieldId===field.fieldId) renameField.index = i});
                }
                this.setState({showRenameModal:true,renameField});
                break;
            case "createLevel": //创建层级
                this.updateLevelField = {
                    field,table,index:fieldIndex
                };
                this.setState({showUpdateLevel:true,updateLevelId:null,updateLevelName:''});
                break;
            case "removeFieldFromLevel":
                this.removeLevel({levelIndex,fieldIndex});
                break;
            default :
                console.log("key:",key);

        }

        function covertType(){
            const pivotName = field.$type === FieldsType.DIMENSION ? 'dimensionTables':'measureTables';
            let newType = key;
            if(newType === field.dataType) newType = null ;
            //更新表单
            this.setState(
                update(this.state,{
                    [pivotName]:{
                        [table.tableId]:{
                            fields:{
                                [fieldIndex]:{
                                    $merge:{covertType:newType}
                                }
                            }
                        }
                    }
                })
            );
        }
    }


    removeLevel({levelIndex,fieldIndex}){
        this.setState(
            update(this.state,{
                levels:{
                    [levelIndex]:{
                        fields:{$splice:[[fieldIndex,1]]}
                    }
                }
            })
        );
    }

    //将属性添加到层
    addToLevel({srcTable,srcLevelIndex,targetLevelIndex,field,fieldIndex}){
        if(!field.tableId) field.tableId = srcTable.tableId;
        if(srcTable){
            //从维度或度量中来
            this.setState(update(
                this.state,{
                    levels:{
                        [targetLevelIndex]:{
                            fields:{$splice:[[0,0,field]]}
                        }
                    }
                }
            ));
            //如果从度量中来，则把属性转换为维度
            if(field.$type === FieldsType.MEASURE)
                this.convertPivot({srcTable,field,fieldIndex});

        }else{
            //从其他层来
            this.setState(update(
                this.state,{
                    levels:{
                        [targetLevelIndex]:{
                            fields:{$splice:[[0,0,field]]}
                        },
                        [srcLevelIndex]:{
                            fields:{$splice:[[fieldIndex,1]]}
                        }
                    }
                }
            ));
        }
    }

    //度量和维度互相转换
    convertPivot({srcTable,field,fieldIndex}){
        const srcPivotName = field.$type === FieldsType.DIMENSION ? 'dimensionTables':'measureTables';
        const targetPivotName = field.$type === FieldsType.DIMENSION ? 'measureTables':'dimensionTables';
        const newFieldsType = field.$type === FieldsType.DIMENSION ? FieldsType.MEASURE : FieldsType.DIMENSION;

        //判断度量中是否已经存在表名
        let targetTable = this.state[targetPivotName][srcTable.tableId];
        let targetTables = {};
        field.$type = newFieldsType;
        if(!targetTable){
            targetTable = PivotSchema.extractTable(srcTable);
            targetTable.fields.push(field);
            const newTable = {};
            newTable[srcTable.tableId] = targetTable;
            targetTables = {$merge:newTable};
        }else{
            targetTables = {
                [srcTable.tableId]:{
                    fields:{$push:[field]}
                }
            }
        }

        //判断源表单是否只有一个属性，如果只有一个属性，则删除表格
        let srcTables = null ;
        if(srcTable.fields.length > 1){
            srcTables = {
                [srcTable.tableId]:{
                    // fields:{$apply:fields => (fields.filter(e => e.id !== field.fieldId))}
                    fields:{$splice:[[fieldIndex,1]]}
                }
            }
        }else{

            delete this.state[srcPivotName][srcTable.tableId];

            srcTables = {
                $set:this.state[srcPivotName]
            }
        }

        //更新表单
        this.setState(
            update(this.state,{
                [targetPivotName]:targetTables,
                [srcPivotName]:srcTables
            })
        );
    }

    //层级属性转换为度量
    levelConvert({field,fieldIndex,levelIndex},targetType='measureTables'){
        let srcType = 'dimensionTables';
        if(targetType === 'dimensionTables') srcType = 'measureTables';
        //从维度表中删除属性

        //将属性添加到目标表中
        let srcTable = this.state[srcType][field.tableId];
        let targetTable = this.state[targetType][field.tableId];
        let targetTables = {};
        field.$type = targetType === 'measureTables'?FieldsType.MEASURE:FieldsType.DIMENSION;
        if(!targetTable){
            targetTable = PivotSchema.extractTable(srcTable);
            targetTable.fields.push(field);
            const newTable = {};
            newTable[field.tableId] = targetTable;
            targetTables = {$merge:newTable};
        }else{
            targetTables = {
                [field.tableId]:{
                    fields:{$push:[field]}
                }
            }
        }

        //找出属性在维度表中的索引
        let fieldIndexInTable = 0;
        this.state[srcType][field.tableId].fields.forEach((e,i)=>{
            if(e.fieldId===field.fieldId) fieldIndexInTable = i});


        //更新表单
        this.setState(
            update(this.state,{
                [targetType]:targetTables,
                [srcType]:{
                    [field.tableId]:{
                        // fields:{$apply:fields => (fields.filter(e => e.id !== field.fieldId))}
                        fields:{
                            $splice:[[fieldIndexInTable,1]]
                        }
                    }
                },
                levels:{
                    [levelIndex]:{
                        fields:{
                            $splice:[[fieldIndex,1]]
                        }
                    }
                }
            })
        );
    }

    //生成CUBE 字段菜单
    getMenu(table,field,fieldIndex,levelIndex){

        const currentType = field.covertType?field.covertType:field.dataType;

        return (
            <Menu  onClick={this.menuClickHandle.bind(this,table,field,fieldIndex,levelIndex)}>
                <Menu.Item key="rename">
                    重命名
                </Menu.Item>
                {
                    field.$type === FieldsType.DIMENSION &&
                    <Menu.Item key={levelIndex!==undefined?'removeFieldFromLevel':'createLevel'}>
                    {levelIndex!==undefined?'移出层':'创建层级'}
                    </Menu.Item>
                }
                <Menu.SubMenu key="sub" title="转换类型">
                    <Menu.Item key={FieldsType.STRING} disabled = {currentType === FieldsType.STRING}>
                        {field.covertType?(field.dataType === FieldsType.STRING ?'还原':'转换'):'转换'}为字符型
                    </Menu.Item>
                    <Menu.Item key={FieldsType.INTEGER} disabled = {currentType === FieldsType.INTEGER}>
                        {field.covertType?(field.dataType === FieldsType.INTEGER?'还原':'转换'):'转换'}为整形
                    </Menu.Item>
                    <Menu.Item key={FieldsType.DATE} disabled = {currentType === FieldsType.DATE}>
                        {field.covertType?(field.dataType === FieldsType.DATE?'还原':'转换'):'转换'}为日期型
                    </Menu.Item>
                    <Menu.Item key={FieldsType.DECIMAL} disabled = {currentType === FieldsType.DECIMAL}>
                        {field.covertType?(field.dataType === FieldsType.DECIMAL?'还原':'转换'):'转换'}为小数型
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="convertPivot">
                    转换为{field.$type === FieldsType.DIMENSION?'度量':'维度'}
                </Menu.Item>
            </Menu>
        )
    }

    onRenameField(index,name){

        const renameTableField = {
            [this.renameTableId]:{
            fields:{
                    [index]:{
                        alias:{$set:name}
                    }
                }
            }
        };
        //更新层中属性的名称
        if(this.renameFromLevel){
            let levelIndex = -1,levelFieldIndex = -1,fieldId = this.state.dimensionTables[this.renameTableId].fields[index].fieldId;
            console.log("this.renameTableId:",this.renameTableId,"fieldId:",fieldId);
            this.state.levels.forEach((level,li)=>{
                level.fields.forEach((field,fi)=>{
                    if(field.fieldId === fieldId) {
                        levelIndex = li;
                        levelFieldIndex = fi;
                    }
                })
            });
            this.setState(
                update(this.state,{
                    showRenameModal:{$set:false},
                    [this.renamePivotName]:renameTableField,
                    levels:{
                        [levelIndex]:{
                            fields:{
                                [levelFieldIndex]:{
                                    alias:{$set:name}
                                }
                            }
                        }
                    }
                })
            );
        }else{
            this.setState(
                update(this.state,{
                    showRenameModal:{$set:false},
                    [this.renamePivotName]:renameTableField
                })
            );
        }
    }

    updateLevel(index,name){
        if( index > -1 ){
            //重命名
            this.setState(
                update(this.state,{
                    showUpdateLevel:{$set:false},
                    levels:{
                        [index]:{
                            name:{$set:name}
                        }
                    }
                })
            );
        }else{
            //添加层
            this.setState(
                update(this.state,{
                    showUpdateLevel:{$set:false},
                    levels:{
                        $splice:[[0,0,{name,id:uuid(),expanded:true,fields:[
                            Object.assign(this.updateLevelField.field,{tableId:this.updateLevelField.table.tableId})
                        ]}]]
                    },
                    dimensionTables:{
                        [this.updateLevelField.table.tableId]:{
                            fields:{$splice:[[this.updateLevelField.table.index,1]]}
                        }
                    }
                })
            );
        }
    }

    render(){
        return (<div className={styles.container}>
            <h1>维度</h1>
                <div className={styles.dimensions}>
                    <content>
                        {this.getTableDom(this.state.dimensionTables,FieldsType.DIMENSION)}
                        {this.getLevelDom()}
                    </content>
                </div>
            <h1>度量</h1>
            <div className={styles.measures}>
                    <content>
                        {this.getTableDom(this.state.measureTables,FieldsType.MEASURE)}
                    </content>
            </div>
            {
                this.state.renameField &&
                <WrappedRename
                    cancelRenameModal = {e=>(this.setState({showRenameModal:false}))}
                    id = {this.state.renameField.index}
                    title = {'重命名表单：' + this.state.renameField.name}
                    name = {this.state.renameField.alias?this.state.renameField.alias:this.state.renameField.name}
                    show = {this.state.showRenameModal}
                    onrename = {this.onRenameField.bind(this)}/>
            }{
            this.state.showUpdateLevel &&
                <WrappedRename
                    cancelRenameModal = {e=>(this.setState({showUpdateLevel:false}))}
                    id = {this.state.updateLevelIndex}
                    title = {'层名称'}
                    name = {this.state.updateLevelName}
                    show = {this.state.showUpdateLevel}
                    onrename = {this.updateLevel.bind(this)}/>
            }

        </div>)
    }
}