import React from 'react';
import isNum from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import isFunc from 'lodash/isFunction'
import {captureMouse} from '@/utils'
import styles from './Continuity.css'
import {Modal} from 'antd'

const NODE_RADIUS = 5,
    NODE_LINE_WIDTH = 1,
    NODE_LINE_COLOR = '#91d5ff',
    NODE_COLOR = '#91d5ff',
    AXIS_LINE_WIDTH = 1,
    AXIS_LINE_COLOR = '#91d5ff',
    LABEL_COLOR = "#999",
    LABEL_FONT = '13px Arial',
    PADDING_LEFT = 10,
    PADDING_RIGHT= 10,
    NODE_ACTIVE_COLOR = '#c1d50f';


const canvasStyle = {
    width:'100%',
    height:'50px'};

export default class CustomSection extends React.Component{

    constructor(props){
        super(props);
        this.state = {bigCanvasVisible:false}
        this.pieces = [];
    }

    componentDidMount(){

        //分段数量
        this.section = this.props.section || 5;

        //最大值最小值
        this.min = this.props.min;
        this.max = this.props.max;

        //分段数据
        this.sectionsData = this.props.defaultValue;

        //元数据
        this.mateData = {};

        //初始化分段数据
        if(!isArray(this.sectionsData) || this.sectionsData.length !== (this.section + 1) || this.sectionsData[0].lt !== this.min || this.sectionsData[this.sectionsData.length - 1].gt !== this.max){
            if(isNum(this.min) && isNum(this.max) && this.max > this.min){
                this.initSectionsData();
                //更新数据到父组件
                this.submitData();
            }
        }else{
            //有初始数据，则解析数据
            this.analysisSectionData();
        }

        //初始化Canvas Dom元素
        this.initCanvas();

        if(isNum(this.min) && isNum(this.max) && this.max > this.min){
            //渲染Canvas
            this.renderCanvas();
            this.registerEvent();
        }else{
            //数据格式不对，清除画布
            this.ctx.clearRect(0,0,this.cWidth,this.cHeight);
            console.log('最大值和最小值异常','min=',this.min,'max=',this.max)
        }
    }

    // 分段值不同
    shouldComponentUpdate(nextProps,nextState){
        return this.props.section !== nextProps.section
                || this.props.min !== nextProps.min
                || this.props.max !== nextProps.max
                || this.state.bigCanvasVisible !== nextState.bigCanvasVisible
                || this.pieces !== nextProps.defaultValue
                || !nextProps.defaultValue
    }

    componentWillUpdate(nextProps,nextState){
        this.section = nextProps.section;
        this.min = nextProps.min;
        this.max = nextProps.max;

        if(this.state.bigCanvasVisible === nextState.bigCanvasVisible) { //更新不是由于state引起的
            this.initSectionsData();
            //更新数据到父组件
            this.submitData();
        }
    }

    componentDidUpdate(){
        //更新分段重新渲染Canvas
        this.computeMateData();
        this.renderCanvas();
        this.registerEvent();
    }

    initSectionsData(){
        //初始化分段数据
        const sum = this.max - this.min;
        //每段的数值
        const eachSection = (sum/this.section);
        this.sectionsData = [];

        for(let i = 0 ; i < this.section ; i++){
            let b = (this.min + i*eachSection).toFixed(2);
            let result =  Number(b.substring(0,b.toString().length - 1));
            this.sectionsData.push(result);
        }
        this.sectionsData.push(this.max);
    }

    analysisSectionData(){
        this.sectionsData = this.sectionsData.map((e,i) => {
            if(i === 0){
                return e.lt
            }else if(i === this.sectionsData.length - 1){
                return e.gt
            }else {
                return e.lte
            }
        })
    }

    renderCanvas(){
        const {startX,y,endX,labelY,subNodePos} = this.mateData,ctx = this.ctx;
        let measure = null;
        ctx.clearRect(0,0,this.cWidth,this.cHeight);
        ctx.font = LABEL_FONT;
        //主轴
        ctx.beginPath();
        ctx.moveTo(startX,y);
        ctx.lineTo(endX,y);
        ctx.lineWidth = AXIS_LINE_WIDTH;
        ctx.strokeStyle = AXIS_LINE_COLOR;
        ctx.stroke();

        //节点
        if(isArray(subNodePos) && subNodePos.length > 0){
            subNodePos.forEach((e,i)=>{
                let radius = NODE_RADIUS;
                if(this.activeNode === i) radius = NODE_RADIUS + 10;
                ctx.beginPath();
                ctx.arc(e,y,NODE_RADIUS,0,Math.PI*2);
                ctx.lineWidth = NODE_LINE_WIDTH;
                let nodeColor = NODE_COLOR;
                if( i === this.moveNode || i === this.activeNode){
                    nodeColor = NODE_ACTIVE_COLOR;
                }
                ctx.fillStyle = nodeColor;
                ctx.fill();
                //绘制文字
                ctx.beginPath();
                measure = ctx.measureText(this.sectionsData[i]);
                ctx.fillStyle = LABEL_COLOR;
                ctx.fillText(this.sectionsData[i],e - measure.width/2,labelY);
                ctx.fill();

            });

        }else{
            console.log("没有分段信息",subNodePos);
        }
    }

    computeMateData(){
        //开始坐标
        this.mateData.startX = NODE_RADIUS + NODE_LINE_WIDTH + PADDING_LEFT;
        //Y轴坐标
        this.mateData.y = this.cHeight/2 + 10;
        //文字Y轴坐标
        this.mateData.labelY = this.cHeight/2 ;
        //结束横坐标
        this.mateData.endX = this.cWidth - NODE_RADIUS - NODE_LINE_WIDTH - PADDING_RIGHT;
        //每个值对应的像素大小
        this.pixelPerValue = (this.cWidth - PADDING_RIGHT - PADDING_LEFT - 10)/(this.max - this.min);

        //计算分节点的位置
        this.mateData.subNodePos = [];
        this.mateData.subNodePos.push(this.mateData.startX);
        if(isArray(this.sectionsData) && this.sectionsData.length>0){
            for(let i = 1 ; i < this.section  ; i++){
                this.mateData.subNodePos.push(this.mateData.startX + (this.sectionsData[i] - this.min)*this.pixelPerValue);
            }
        }
        this.mateData.subNodePos.push(this.mateData.endX);
    }

    initCanvas(){
        let canvasId = 'customSection';
        if(this.state.bigCanvasVisible) canvasId = 'customSection_big';
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = this.cWidth = this.canvas.clientWidth;
        this.canvas.height = this.cHeight =  this.canvas.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.computeMateData();
    }

    registerEvent(){

        this.canvas.onmousemove = mouseMove.bind(this);
        this.canvas.onmousedown = mouseDown.bind(this);
        this.canvas.onmouseup = mouseUp.bind(this);
        this.canvas.ondblclick = dblClickHandle.bind(this);


        let mouse = captureMouse(this.canvas),
            startMove,moveNode,moveStartX;
        //初始化变量
        initMate.call(this);

        function mouseMove(e){

            if(!startMove){ //不是在移动节点
                const activeNode = this.activeNode = getNodeByMouse.call(this);
                if(isNum(activeNode)){
                    if(!this.actived){
                        this.actived = true;
                        // reDraw.call(this);
                    }
                }else{
                    if(this.actived){
                        this.actived = false;
                        this.activeNode = null;
                        // reDraw.call(this);
                    }
                }
            }else{//移动节点

                //移动距离
                let movingDistance = e.x - moveStartX ;
                //当然节点最大值，最小值
                const min = this.sectionsData[moveNode - 1] + 1;
                const max = this.sectionsData[moveNode + 1] - 1;
                const moveValue = movingDistance / this.pixelPerValue;
                // const formatValue = Number(moveValue.substring(0,moveValue.toString().length - 1));
                let currentNodeValue = (this.sectionsData[moveNode] + moveValue).toFixed(2);
                currentNodeValue = Number(currentNodeValue.substring(0,currentNodeValue.toString().length - 1));
                if(currentNodeValue <= min) currentNodeValue = min;
                if(currentNodeValue >= max) currentNodeValue = max;
                this.sectionsData[moveNode] = currentNodeValue;
                this.computeMateData();
                this.renderCanvas();
                moveStartX = e.x;
            }

        }

        function mouseDown(e){
            if(isNum(this.activeNode)){
                this.canvas.style.cursor = 'pointer';
                //标记开始移动
                startMove = true;
                moveNode = this.moveNode = this.activeNode;
                moveStartX = e.x;
            }
        }

        function mouseUp(){
            this.canvas.style.cursor = 'default';
            initMate.call(this);
            this.renderCanvas();
            //更新数据到父组件
            this.submitData();
        }

        //初始化 开始标志、移动节点、开始移动距离
        function initMate(){
            startMove = false;
            moveNode = this.moveNode = this.activeNode = -1;
            moveStartX = 0;
        }
        //通过鼠标位置计算鼠标是否在节点上面
        function getNodeByMouse(){
            let activeNode = null;
            this.mateData.subNodePos.forEach((arc,i,arr)=>{
                if(i !== 0 && i < arr.length - 1){
                    if(Math.sqrt(Math.pow(mouse.x - arc,2) + Math.pow(mouse.y - this.mateData.y,2)) <= NODE_RADIUS) activeNode = i ;
                }
            });
            return activeNode
        }
        //双击画布
        function dblClickHandle(){
            // this.setState({bigCanvasVisible:true});
            this.setState({bigCanvasVisible:true});
            this.dataBackups = [...this.sectionsData];
        }
    }

    submitData(){
        // lt（小于，little than），gt（大于，greater than），lte（小于等于 lettle than or equals），gte（大于等于，greater than or equals）
        // pieces: [
        //     {gt: 1500},            // (1500, Infinity]
        //     {gt: 900, lte: 1500},  // (900, 1500]
        //     {gt: 310, lte: 1000},  // (300, 900]
        //     {gt: 200, lte: 300}
        // ]
        this.pieces = [];
        this.sectionsData.forEach((e,i)=>{
            if(i===0) {
                // this.pieces.push({lt:e});
            }else{
                const perValue = this.sectionsData[i - 1];
                if(i === 1){
                    this.pieces.push({gte: perValue, lte: e});
                }else{
                    this.pieces.push({gt: perValue, lte: e});
                }
            }
        });

        // this.pieces.push({gt:this.sectionsData[this.sectionsData.length - 1]});

        if(isFunc(this.props.onChange)){
            this.props.onChange(this.pieces);
        }
    }

    saveBigCanvas = ()=>{
        this.setState(()=>({bigCanvasVisible:false}),()=>{
            this.initCanvas();
            this.renderCanvas();
            this.registerEvent();
        });
    };

    cancelBigCanvas = () => {
        this.sectionsData = this.dataBackups;
        this.setState(()=>({bigCanvasVisible:false}),()=>{
            this.initCanvas();
            this.renderCanvas();
            this.registerEvent();
        });
    };

    render(){
        return (<div>{  !this.state.bigCanvasVisible &&
                        <canvas id="customSection" style={canvasStyle}/>
                    }
                    <Modal
                        title="编辑分段"
                        visible={this.state.bigCanvasVisible}
                        destroyOnClose = {true}
                        width = "80%"
                        onOk={this.saveBigCanvas}
                        onCancel = {this.cancelBigCanvas}>
                        <canvas id="customSection_big" style={canvasStyle} ref={(e)=>{
                            this.initCanvas();
                            this.renderCanvas();
                            this.registerEvent();
                        }}/>
                    </Modal>
                </div>)
    }
}