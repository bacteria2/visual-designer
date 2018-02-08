import React from 'react';
import { message,Menu,Button,Icon,Modal} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css'
import uuid from 'uuid/v1'
import {DragAndDrop,captureMouse} from '../../tools'
import WrappedRename from '../Rename'
import Connect from './Connect'
import { DropTarget } from 'react-dnd'
import {queryFieldsByDBConnAndTablename} from '../../../../service/DataConnService.js'
import fieldsType from '../FieldsType'
import AggregatorType from '../AggregatorType'
import update from 'immutability-helper'
import find from 'lodash/find'
const confirm = Modal.confirm;

const dustbinTarget = {
    drop(props, monitor,component) {
        component.drop({...monitor.getItem()});
    },
    hover(props, monitor, component){
        component.dragOver(monitor.getClientOffset());
        // console.log('1111');
    },
};

@DropTarget(['table','sql'], dustbinTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class TableRelEditor extends React.PureComponent{

    constructor(props){
        super(props);
        //表格关系结构
        this.tables = null;
        //表格ID与表格对象映射
        this.tableSore = {};
        this.hoverTable = {};
        this.actived = false;
        this.boxSize = {width:200,height:34,marginBottom:8};
        this.line = {width:100};
        this.canvasStyle = {
            line:"#dedede",
            fill:"#f1f1f1",
            text:"14px Microsoft YaHei",
            textColor:"#666",
        };
        this.canvasEles = {rect:[],arc:[]};
        this.state = {
            contextMenu:{
                show:false,
                x:0,
                y:0,
                selectedKeys:[]},
            showRenameModal:false,
            connect:{
                show:false,
            },
        };
        this.editImg = new Image();
        this.editImg.src = require('@/assets/images/datasource/edit.png');
    }

    componentDidMount(){

        // const container = document.getElementById("editorCanvas_container");

        this.canvas = document.getElementById("editorCanvas");
        this.dragAbleCanvas = document.getElementById("dragAbleCanvas");
        if(this.props.editable){
            this.dadCanvas = new DragAndDrop('dragAbleCanvas');
            this.dadCanvas.setOption({
                onDragStart:this.copyCanvasDrag.bind(this),
                onDrop:this.copyCanvasDrop.bind(this),
                onMove:this.copyTableDragOver.bind(this),
            });
        }


        this.ctx = this.canvas.getContext("2d");
        this.dragAblectx = this.dragAbleCanvas.getContext("2d");

        //初始化表格关系
        this.tables = this.props.cube.tables;
        recursionTable.call(this,this.tables);
        //将表格对象和ID映射保存
        function recursionTable(tables){
            if(tables && tables._id) this.tableSore[tables._id] = tables;
            if(tables && tables.children && tables.children.length > 0){
                tables.children.forEach(e=>{
                    recursionTable.call(this,e)
                })
            }
        }

        this.draw();
    }

    componentWillReceiveProps(props){
        //初始化表格关系
        this.tables = props.cube.tables;

        if(this.tables && this.tables._id) recursionTable.call(this,this.tables);
        //将表格对象和ID映射保存
        function recursionTable(tables){
            if(tables._id) this.tableSore[tables._id] = tables;
            if(tables.children && tables.children.length > 0){
                tables.children.forEach(e=>{
                    recursionTable.call(this,e)
                })
            }
        }

        this.draw();
    }



    drop(data){
        // ev.preventDefault();
        // const data = {name:ev.dataTransfer.getData("name"),
        //     type:ev.dataTransfer.getData("type"),
        //     id:ev.dataTransfer.getData("id")
        // };
        this.dragExit();
        this.addTable(data);
    }

    dragExit(){
        // if(ev.target._id === 'dragAbleCanvas') return;
        const canvas = document.getElementById("editorCanvas_container");
        canvas.style.borderColor = "#fff";
        // this.hoverTable = null;
        // this.renderActiveTable();

    }

    dragOver({x,y}){
        // ev.preventDefault();

        if(this.canvasEles.rect.length > 0 ){
            let mouse = this.transformCoordinate({pageX:x,pageY:y});
            this.hoverTable = getActiveTable.call(this,mouse);
            this.renderActiveTable();
        }else{
            const canvas = document.getElementById("editorCanvas_container");
            canvas.style.borderColor = "dodgerblue";
        }

        function getActiveTable(mouse){
            let activeTable = this.canvasEles.rect[0].table;
            this.canvasEles.rect.forEach(table=>{
                if(mouse.x > table.x && mouse.x - table.x < table.width && mouse.y > table.y && mouse.y - table.y < table.height) {
                    activeTable = table.table;
                }
            });
            return activeTable
        }
    }

    copyTableDragOver(ev){

        if(this.canvasEles.rect.length > 0 ){
            let mouse = this.transformCoordinate(ev);
            this.hoverTable = getActiveTable.call(this,mouse);
            if(this.hoverTable && !tableValid.call(this,this.hoverTable)) this.hoverTable = null;

            if(this.hoverTable && !this._hover){
                this._hover = true;
                this.renderActiveTable();
            }else if(!this.hoverTable && this._hover ){
                this._hover = false;
                this.renderActiveTable();
            }

        }

        function getActiveTable(mouse){
            let activeTable = null;
            this.canvasEles.rect.forEach(table=>{
                if(mouse.x > table.x && mouse.x - table.x < table.width && mouse.y > table.y && mouse.y - table.y < table.height) {
                    activeTable = table.table;
                }
            });
            return activeTable
        }

        function tableValid(table){
            let tables = this.copyTables.filter(e => e._id === table._id);
            return tables.length === 0 ;
        }
    }


    //转换坐标
    transformCoordinate(event){
        let mouse = {x:0,y:0};
        let x,y;
        // 获取鼠标位于当前屏幕的位置v， 并作兼容处理
        if(event.pageX||event.pageY){
            x = event.pageX;
            y = event.pageY;
        }else{
            x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }
        let bBox = this.canvas.getBoundingClientRect();
        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= bBox.left;
        y -= bBox.top;
        let scale = this.canvas.width/bBox.width;
        mouse.x = x*scale;
        mouse.y = y*scale;
        return mouse
    }

    async addTable(table){
        if(!table) return;
        this.props.startLoading();
        try{
            table._id = "t" + (this.props.cube.tableIder + 1);
            //table属性：name、type、_id
            //判断表格类型，如果是SQL视图，则直接从对象中拿字段，如果不是则需要调用服务取字段
            let fields;
            if(table.type === 'sql'){
                fields = table.fields;
            }else{
                //获取字段更新CUBE
                const fieldsRep = await queryFieldsByDBConnAndTablename(this.props.datasource,table.name);
                if(fieldsRep.success){
                    fields = fieldsRep.data;
                }
            }

            if(fields){
                //获取表格字段成功
                const newTable = {
                    ...table,
                    fields,
                    tableAlias: table.name,
                    dataSourceId: this.props.datasource._id,
                    children:[],
                };

                if(!this.tables || !this.tables._id){
                    this.tables = newTable;
                }else{
                    let parentId = this.hoverTable._id || this.tables._id;
                    this.hoverTable = {};
                    //自动关联左表和右表相同的字段
                    const conditions = getConditions(this.tableSore[parentId].fields,fields);

                    //赋值左表
                    newTable.join = {
                        parentId,
                        method: "left",
                        conditions,
                    };

                    //加入父节点的子节点
                    let parentTable = this.tableSore[parentId];

                    parentTable.children.push(newTable);

                }
                this.tableSore[newTable._id] = newTable;

                //字段获取成功，将fields转换成维度和度量
                let dimension = [],measure=[];
                fields.forEach(e=>{
                    if(e.type === fieldsType.INTEGER || e.type === fieldsType.DECIMAL ){
                        e.aggregator = AggregatorType.MAX;
                        //度量
                        measure.push({
                            tableName: table.name,
                            tableId: table._id,
                            field: e.name,
                            role: "Measure",
                            dataType: e.type,
                            alias: e.name,
                            fType: "Measure",
                            fieldId: uuid().replace(/-/g,'_'),
                            aggregator:e.aggregator,
                        });
                    }else{
                        e.aggregator = AggregatorType.COUNT;
                        //维度
                        dimension.push({
                            tableName: table.name,
                            tableId: table._id,
                            field: e.name,
                            role: "Dimension",
                            dataType: e.type,
                            alias: e.name,
                            fType: "Dimension",
                            fieldId: uuid().replace(/-/g,'_'),
                            aggregator:e.aggregator,
                        });
                    }
                });
                //更新CUBE
                let newCube = update(this.props.cube,{
                    tables:{$set:this.tables},
                    tableIder:{$set:this.props.cube.tableIder + 1},
                    pivotSchema:{
                        dimensions:{$push:dimension},
                        measures:{$push:measure},
                    },
                });
                this.props.update(newCube);
                //重新渲染关系图
                this.draw();
            }else{
                message.error("添加表是失败，未获取到字段信息")
            }

            function getConditions(parentFields,fields){
                let condition = [];
                if(fields &&fields.length >0){
                    fields.forEach(e=>{
                        const sameFields =   parentFields.filter(parentField=>parentField.name===e.name);
                        if(sameFields.length > 0){
                            condition.push({
                                key:uuid(),
                                left:sameFields[0].name,
                                right:e.name,
                            })
                        }
                    })
                }
                return condition
            }
        }finally {
            this.props.endLoading();
        }
    }

    //计算位置信息
    init(){
        this.canvasEles = {rect:[],arc:[]};
        if(!this.tables) return ;

        //计算每个元素占用的行数
        // for(let i = 0 ; i < this.tables.children.length ; i ++){
        //     let child = this.tables.children[i];
        //     recursionTree(child);
        // }
        let countX = 1;
        const countY = recursionTree(this.tables,1);

        function recursionTree(table,level){

            table.rows = 1;
            table.level = level;
            if(level > countX) countX = level;

            if(table.children && table.children.length >0){
                level ++;
                for(let i = 0 ; i < table.children.length ; i ++){
                    let child = table.children[i];
                    table.rows += recursionTree(child,level) ;
                }
                table.rows -- ;
            }

            return table.rows
        }

        const width = countX * (this.boxSize.width + 2) + (countX - 1) * this.line.width;
        let height = countY * (this.boxSize.height + 2) + (countY - 1) * this.boxSize.marginBottom + 10;
        height = height >  200 ? width : 200 ;
        this.canvas.width = this.dragAbleCanvas.width = width ;
        this.canvas.height = this.dragAbleCanvas.height = height ;

    }

    draw(redraw){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        if(this.tables && this.tables._id) {
            //计算横向和纵向元素
            if(!redraw) this.init();
            this.paint(this.ctx,this.tables,1,1,false);
            //注册事件
            if(!redraw && this.props.editable) this.registerEvent();
        }else{
            this.canvasEles = {rect:[],arc:[]};
        }
    }

    paint(ctx,data,startX,startY,copy){
            if(copy) this.copyTables = [];
            ctx.fillStyle = this.canvasStyle.fill;
            ctx.strokeStyle = this.canvasStyle.line;
            ctx.font = this.canvasStyle.text;
            ctx.baseline = "top";
            ctx.lineWidth = 2;
            const arcRadius = 12.5;

            //绘制Canvas
            recursionRender.call(this,data,startX,startY);

            function recursionRender(table,x,y){

                renderTable.call(this,table,x,y);

                if(table.children &&table.children.length >0){

                    let countY = y;

                    table.children.forEach((e,i)=>{

                        const childX = x + this.boxSize.width + this.line.width;
                        //空行，前面节点的子节点大于2,
                        let blankRow = 0;
                        if(i !== 0 ) blankRow = table.children[i-1].rows - 1 ;
                        const childY = countY +  blankRow*(this.boxSize.height + this.boxSize.marginBottom) ;
                        countY = childY + this.boxSize.height + this.boxSize.marginBottom;
                        //画连接线
                        renderLine.call(this,x,y,childX,childY,blankRow,e);
                        //递归绘制子节点
                        recursionRender.call(this,e,childX,childY);
                    })
                }
            }

            function renderTable(table,x,y){
                if(!copy){
                    table.pos = {x,y};
                    //储存元素
                    this.canvasEles.rect.push({x,y,width:this.boxSize.width,height:this.boxSize.height,table:table});
                }else{
                    //记录复制的表格
                    this.copyTables.push(table);
                }

                //绘制元素
                ctx.beginPath();
                ctx.save();
                ctx.rect(x,y,this.boxSize.width,this.boxSize.height);
                //激活的Table
                if(this.hoverTable && this.hoverTable._id && this.hoverTable._id === table._id){
                    ctx.strokeStyle = "dodgerblue";
                }
                ctx.stroke();
                ctx.fill();

                ctx.fillStyle = this.canvasStyle.textColor;
                ctx.fillText(table.tableAlias,x + 20,y + 22);
                ctx.restore();
            }

            function renderLine(x0,y0,x1,y1,blankRow,table){
                x0  = x0 + this.boxSize.width + 1;
                y0 += 0.5;
                y1 += 0.5;
                const drop = y1 - y0;
                //线条分三段和一个圆，圆直径：25
                const startX = x0;
                const startY = y0 + this.boxSize.height/2;
                const lineLong = (x1 - x0 - arcRadius*2) / 3;
                ctx.save();
                ctx.lineWidth = 1;
                ctx.lineJoin = "round";
                ctx.beginPath();
                if(drop===0){
                    ctx.moveTo(startX,startY);
                    ctx.lineTo(x1,y1 + this.boxSize.height/2);
                }else{
                    const y = y1 - this.boxSize.height/2 - this.boxSize.marginBottom - 10 - blankRow * (this.boxSize.height + this.boxSize.marginBottom);
                    ctx.moveTo(startX + lineLong,y < startY ? startY : y);
                    ctx.lineTo(startX + lineLong ,y1 + this.boxSize.height/2 - 10);
                    ctx.arcTo(startX + lineLong ,y1 + this.boxSize.height/2 ,startX + lineLong + 10,y1 + this.boxSize.height/2 ,10);
                    ctx.lineTo(x1 ,y1 + this.boxSize.height/2);
                }

                ctx.stroke();
                ctx.restore();
                ConnectionPoint.call(this,x0,x1,y1,table);
            }

           function ConnectionPoint(x0,x1,y1,table){

               const lineLong = (x1 - x0 - arcRadius*2) / 3;
               const x =  x0 + lineLong + 10 + (x1 - x0 - lineLong - 10)/2;
               const y = y1 + this.boxSize.height/2;
               if(!copy){
                   //储存元素
                   table.pos = {x,y};
                   this.canvasEles.arc.push({x,y,radius:arcRadius,table:table});
               }
               ctx.save();
               ctx.lineWidth = 2;
               ctx.beginPath();
               ctx.arc(x,y,arcRadius,0,2*Math.PI);
               ctx.fillStyle = "#fff";
               if(!table.join.conditions.length>0) ctx.strokeStyle ="red";
               if(this.activeArc && this.activeArc._id === table._id) ctx.strokeStyle ="#1890ff";
               // ctx.strokeStyle = "blue";
               ctx.stroke();
               ctx.fill();
               if(this.activeArc && this.activeArc._id === table._id){
                   ctx.drawImage(this.editImg,x - 8,y - 8 )
               }else{
                   ctx.fillStyle = table.join.conditions.length>0?"#1890ff":"red";

                   ctx.fillText(table.join.conditions.length>0?table.join.conditions.length:"?"
                       ,x - (table.join.conditions.length > 9?8:4)
                       ,y + 5 );
               }

               ctx.restore();
           }

    }

    clearEvent(){
        this.dragAbleCanvas.onmousemove = null;
        this.dragAbleCanvas.onclick = null;
    }

    registerEvent(){
        //注册事件
        this.dadCanvas.dragAble(true);
        let mouse = captureMouse(this.dragAbleCanvas);
        this.dragAbleCanvas.onmousemove = mouseMove.bind(this);
        this.dragAbleCanvas.onclick = mouseClick.bind(this);


        function mouseMove(){

            const activeTable = this.activeTable = getTableByMouse.call(this);
            const activeArc = this.activeArc = getArcByMouse.call(this);

            if(activeTable || activeArc){
                if(!this.actived){
                    this.actived = true;
                    if(activeTable){
                        this.dragAbleCanvas.style.cursor = 'move';
                        //绘制下拉菜单按钮
                        this.renderTableMenuButton();
                    }else{
                        this.dragAbleCanvas.style.cursor = 'pointer';
                        reDraw.call(this);
                    }
                }

                if(activeTable){

                    //判断是否点击菜单
                    if( !this.mouseOnMenu  && mouse.x >= activeTable.pos.x + this.boxSize.width - 30){

                        this.mouseOnMenu = true;
                        this.dragAbleCanvas.style.cursor = 'pointer';

                    }else if(this.mouseOnMenu && mouse.x < activeTable.pos.x + this.boxSize.width - 30){

                        this.mouseOnMenu = false;
                        this.dragAbleCanvas.style.cursor = 'move';

                    }
                }

            }else{
                if(this.actived){
                    this.actived = false;
                    this.mouseOnMenu = false;
                    this.dragAbleCanvas.style.cursor = 'default';
                    reDraw.call(this);
                }
            }

            function reDraw(){
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                if(this.tables) this.paint(this.ctx,this.tables,1,1,true);
            }

        }

        function mouseClick(ev){
            ev.preventDefault();
            ev.stopPropagation();
            if(this.mouseOnMenu || this.activeArc){
                if(this.mouseOnMenu){
                    let contextMenu = {...this.state.contextMenu};
                    contextMenu.show = true;
                    contextMenu.selectedKeys = [];
                    contextMenu.x = this.activeTable.pos.x + this.boxSize.width - 25;
                    contextMenu.y = this.activeTable.pos.y + 30;
                    contextMenu.activeTable = this.activeTable;
                    this.setState({contextMenu});
                }else if(this.activeArc){
                    let connect = {...this.state.connect};
                    connect.show = true;
                    connect.activeTable = this.activeArc;
                    this.setState({connect});
                    // console.log("this.activeArc:" + this.activeArc.name);
                }
            }else{
                let contextMenu = {...this.state.contextMenu};
                contextMenu.show = false;
                this.setState({contextMenu});
            }
        }

        function getTableByMouse(){
            let activeTable = null;
            this.canvasEles.rect.forEach(table=>{
                if(mouse.x > table.x && mouse.x - table.x < table.width && mouse.y > table.y && mouse.y - table.y < table.height) {
                    activeTable = table.table;
                }
            });
            //

            return activeTable
        }

        function getArcByMouse(){
            let activeArc = null;
            this.canvasEles.arc.forEach(arc=>{
                if(Math.sqrt(Math.pow(mouse.x - arc.x,2) + Math.pow(mouse.y - arc.y,2)) <= arc.radius) activeArc = arc.table;
            });
            return activeArc
        }
    }

    renderTableMenuButton(){
        const ctx = this.dragAblectx;
        ctx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
        ctx.save();
        ctx.translate(this.activeTable.pos.x + this.boxSize.width - 25 ,this.activeTable.pos.y + 15);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(14,0);
        ctx.lineTo(7,7);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fill();
        ctx.restore()
    }

    clearTableMenuButton(){
        this.dragAblectx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
    }

    renderActiveTable(){
        // const ctx = this.dragAblectx;
        // ctx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
        // ctx.save();
        // ctx.strokeStyle = "dodgerblue";
        // ctx.beginPath();
        // ctx.rect(this.hoverTable.pos.x,this.hoverTable.pos.y,this.boxSize.width,this.boxSize.height);
        // ctx.stroke();
        // ctx.restore()
        this.draw(true);
    }


    copyCanvasDrag(){
        this.dragAblectx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
        //拖动是，清除原本的事件
        this.clearEvent();
        if(this.activeTable){
            this.moveTable = this.activeTable;
            this.paint(this.dragAblectx,this.activeTable,this.activeTable.pos.x,this.activeTable.pos.y,true);
        }
    }

    copyCanvasDrop(){
        //停止拖动时，注册原本事件
        this.registerEvent();
        this.dragAblectx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
        //重新渲染
        if(this.hoverTable && this.hoverTable._id && this.moveTable){
            let oldParentTableId = this.moveTable.join.parentId;

            //从原来父节点中删除此子节点
            let oldParentTable = this.tableSore[oldParentTableId];
            oldParentTable.children = oldParentTable.children.filter(e => e._id !== this.moveTable._id);
            //表格添加到新的父节点
            this.moveTable.join.parentId = this.hoverTable._id;
            this.moveTable.join.conditions = [];
            this.hoverTable.children.push(this.moveTable);

            this.hoverTable = null;
            this.draw();
        }
        this.moveTable = null;
    }

    contentMenuSelect({key}){
        
        arguments[0].domEvent.stopPropagation();

        if(key === 'delete'){
            confirm({
                title: '确定要删除表：' + this.state.contextMenu.activeTable.tableAlias,
                okText: '删除',
                okType: 'danger',
                cancelText: '取消',
                onOk:deleteNode.bind(this),
                onCancel() {
                    console.log('Cancel');
                },
            });
        }else if(key === 'rename'){
            this.setState({showRenameModal:true});
        }

        let contextMenu = {...this.state.contextMenu};
        contextMenu.show = false;
        this.setState({contextMenu});

        function deleteNode(){

            //删除CUBE中的表
            deleteTableFromCube.call(this);


            this.draw();
            this.dragAblectx.clearRect(0,0,this.dragAbleCanvas.width,this.dragAbleCanvas.height);
        }

        function deleteTableFromCube(){
            const tableId = this.state.contextMenu.activeTable._id;
            const deleteTableIds = recursionGetTableIds(this.tables,tableId);
            const dimension = this.props.cube.pivotSchema.dimensions.filter(e=>(find(deleteTableIds,tableId => tableId === e.tableId) === undefined));
            const measure = this.props.cube.pivotSchema.measures.filter(e=>(find(deleteTableIds,tableId => tableId === e.tableId) === undefined));
            const levels = this.props.cube.pivotSchema.levels.map(level => {
                level.fields = level.fields.filter(e=>(find(dimension,field => field.fieldId === e) !== undefined));
                return level
            });

            if(this.state.contextMenu.activeTable.join){
                let parentNode = this.tableSore[this.state.contextMenu.activeTable.join.parentId];
                parentNode.children = parentNode.children.filter(e => e._id !== this.state.contextMenu.activeTable._id);
            }else{
                this.tables = null;
            }

            //更新CUBE
            let newCube = update(this.props.cube,{
                tables:{$set:this.tables},
                pivotSchema:{
                    dimensions:{$set:dimension},
                    measures:{$set:measure},
                    levels:{$set:levels},
                },
            });
            this.props.update(newCube);
        }

        function recursionGetTableIds(table,tableId,isDelete){

            let tableIds = [] ;

            if(table._id === tableId)  {
                tableIds = [tableId];
                isDelete = true;
            }else if(isDelete){
                tableIds = [table._id];
            }

            if(table.children && table.children.length >0){
                table.children.forEach(e => {
                    tableIds = tableIds.concat(recursionGetTableIds(e,tableId,isDelete));
                })
            }

            return tableIds
        }

    }

    onRenameTable(tableId,name){
        let table = this.tableSore[tableId];
        table.tableAlias = name;
        this.setState({showRenameModal:false});
        this.draw();
    }
    //连接Modal取消时触发
    onCancelConnect(){
        let connect = {...this.state.connect};
        connect.show = false;
        connect.activeTable = null;
        this.setState({connect});
    }

    //更新字段
    onUpdateFields(){
        
    }

    render(){
        const {
            isOver,
            canDrop,
            connectDropTarget,
        } = this.props;
        const isActive = isOver && canDrop;

        let borderColor = "#fff";
        if (isActive) {
            borderColor = '#fff'
        } else if (canDrop) {
            borderColor = 'dodgerblue'
        }

        return connectDropTarget(<div id="editorCanvas_container" className={styles.editorCanvas_container}
                                      style={{borderColor}}
                    // onDrop={this.drop.bind(this)}
                    // onDragOver={this.dragOver.bind(this)}
                    // onDragLeave={this.dragExit.bind(this)}
                    onClick={e=>{if(e.target._id === 'editorCanvas_container') this.setState({contextMenu:{show:false}})}}>
                <canvas  id="editorCanvas" className={styles.table_editor_canvas}>
                浏览器版本太低</canvas>
                <canvas  id="dragAbleCanvas"
                         className={styles.table_editor_dragable_canvas}
                        >
                </canvas>
            <Menu style={{zIndex:99999,position:'absolute',
                display:this.state.contextMenu.show?'block':'none',
                selectable:false,
                top:this.state.contextMenu.y + "px",
                left:this.state.contextMenu.x + "px",
                border: '1px solid #e8e8e8'}}
                  onClick = {this.contentMenuSelect.bind(this)}>
                <Menu.Item key="delete" style={{margin:0}}>删除</Menu.Item>
                <Menu.Item key="rename" style={{margin:0}}>重命名</Menu.Item>
            </Menu>
            {
                this.state.contextMenu.activeTable &&
                <WrappedRename
                    cancelRenameModal = {e=>(this.setState({showRenameModal:false}))}
                    id = {this.state.contextMenu.activeTable._id}
                    name = {this.state.contextMenu.activeTable.name}
                    show = {this.state.showRenameModal}
                    onrename = {this.onRenameTable.bind(this)}/>
            }{
                this.state.connect.activeTable &&
                <Connect visible = {this.state.connect.show}
                         type={this.props.datasource.type}
                         onCancel = {this.onCancelConnect.bind(this)}
                         onUpdateFields = {this.onUpdateFields.bind(this)}
                         leftTable = {this.tableSore[this.state.connect.activeTable.join.parentId]}
                         rightTable = {this.state.connect.activeTable}/>
            }

        </div>)

    }
}