import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import indexOf from 'lodash/indexOf';
import max from 'lodash/max';
import {captureMouse,computeSecBezier} from './utils';
(function(){
    let RelationGraph = function(el,width,height,al){
        this.canvasEl = el;
        this.avtiveEl = al;
        this.options = null;
        this.pWidth = width - this.paddRight;
        this.pHeight= height;
        this.ctx = null ;
        this.mainNode={};  //主节点信息
        this.treeNodes = []; //子节点信息
        this.sourceNodes = [];  //来源节点
        this.timer = 0;
        this.tipsEl = null;
        this.realLayerRange = 0; //实际各层之间的距离
        this.sourceRealLayerRange = 0; //来源节点实际各层之间的距离
    };
    RelationGraph.prototype ={
        paddRight:50,
        anInce:30,
        setOption:function(options){
            if(isObject(options)){
                try {
                    this._installOption(options);
                } catch (e) {
                    if(console) console.warn("绘制图形失败:"+e.message);
                    return
                }
                this._draw();
            }else{
               if(console) console.warn("option设置错误");
               return false;
            }
        },
        resize:function(){
            let _self = this;
            clearTimeout(_self.timer);
            _self.timer = setTimeout(function() {
                let parentEl = _self.canvasEl.parentNode;
                _self.pWidth = parentEl.clientWidth;
                _self.pHeight = parentEl.clientHeight;
                _self.canvasEl.setAttribute("width",_self.pWidth );
                _self.canvasEl.setAttribute("height",_self.pHeight);
                _self.canvasEl.style.width = _self.pWidth + "px";
                _self.canvasEl.style.height = _self.pHeight + "px";

                _self.avtiveEl.setAttribute("width",_self.pWidth );
                _self.avtiveEl.setAttribute("height",_self.pHeight);
                _self.avtiveEl.style.width = _self.pWidth + "px";
                _self.avtiveEl.style.height = _self.pHeight + "px";

                window.requestAnimationFrame(_self._draw.bind(_self));
            }, 300);
        },
        _draw:function(){
            //初始化节点数组，将数据写入数组中
            this.treeNodes = [];
            this.sourceNodes = [];
            //清除事件
            this.avtiveEl.onmousedown = null;
            this.avtiveEl.onmousemove = null;
            this.rectRange = 10;
            this.initNodeArr();
            //计算主节点位置
            this.computePostion();
            this.ctx = this.canvasEl.getContext("2d");
            this.ctx.clearRect(0,0,this.canvasEl.width,this.canvasEl.height);
            if(typeof this.options.borderColor ==='string'){
                this.ctx.strokeStyle =this.options.borderColor;
            }
            if(typeof this.options.backgroundColor ==='string'){
                this.canvasEl.style.backgroundColor = this.options.backgroundColor;
            }else{
                this.canvasEl.style.backgroundColor ="";
            }
            //画标题
            if(this.options.title.show){
                this._drawTitle();
            }

            //画主节点
            if(this._isFlow()){
                this._drawMainNode();
            }else{
                this._drawMainCompany();
            }
             //画子节点
             this._drawSubNodes(this.treeNodes);

        },
        //是否为流向图
        _isFlow:function(){
            return this.options.chartType.toLowerCase()!=='structure';
        },
        _drawTitle:function(){

            let ctx = this.ctx,posX = 0,posY = 10;
            ctx.save();
            ctx.globalCompositeOperation  = "copy";
            this.ctx.font = installTextStyle(this.options.title.style);
            let textMeasure = this.ctx.measureText(this.options.title.text);
            if(!isNumber(this.options.title.left)){
                posX =  (this.pWidth - textMeasure.width) / 2 ;
            }else{
                posX = this.options.title.left;
            }
            if(isNumber(this.options.title.top)){
                posY = this.options.title.top;
            }

            console.log("this.options.title",this.options.title);

            ctx.fillStyle = this.options.title.style.color;
            ctx.textBaseline = 'middle' ;
            ctx.fillText(this.options.title.text,posX,posY);
            ctx.restore();
        },
        _drawMainNode:function(){
            let ctx = this.ctx;
            let startPoint_x = this.mainNode.graphInfo.posX;
            let startPoint_y = this.mainNode.graphInfo.posY;
            //主节点圆路径，画边框
            ctx.beginPath();
            ctx.save();
            ctx.arc(startPoint_x,startPoint_y,this.options.mainRadius,0,2*Math.PI,true);
            if(typeof this.options.mainBorderWidth ==='number'){
                this.ctx.lineWidth = this.options.mainBorderWidth*2;
            }
            ctx.stroke();
            // 填充
            let color = this.options.colors?this.options.colors[0]:'#ccc';
            if(typeof color ==="string" ){ //字符串，纯背景色
                ctx.fillStyle = color;
            }else if( isArray(color)&&color.length>0){ //数组，渐变色
                // 线性渐变
                // var lingrad = this.ctx.createLinearGradient(startPoint_x,startPoint_y-this.options.mainRadius,startPoint_x,startPoint_y+2*this.options.mainRadius);
                // 径向渐变
                let radialGradient = ctx.createRadialGradient(startPoint_x-Math.floor(this.options.mainRadius/2),startPoint_y - Math.floor(this.options.mainRadius/3),Math.floor(this.options.mainRadius/3),startPoint_x,startPoint_y,this.options.mainRadius);
                for(let i=0;i<color.length;i++){
                    radialGradient.addColorStop(i/(color.length-1), color[i]);
                }
                ctx.fillStyle =radialGradient;
            }
            ctx.fill();
            ctx.restore();
            //渲染文字
            ctx.save();
            this.ctx.font = installTextStyle(this.options.textStyles[0]);
            ctx.fillStyle = this.options.textStyles[0].color;
            ctx.textBaseline = 'middle' ;
            ctx.fillText(this.options.data.text,startPoint_x + this.options.mainRadius + this.options.mainBorderWidth + 10,startPoint_y);
            ctx.restore();
            let _self = this;
            //画父节点线
            setTimeout(function(){
                let parentIds = _self.treeNodes[0].nodes[0].parent_id;
                if(isArray(parentIds)&&parentIds.length>0){
                    for(let _j=0;_j<parentIds.length;_j++){
                        let parentNodes  = function(parentid){
                            for(let _i=0;_i<_self.treeNodes.length;_i++){
                                let parentNodes = _self.treeNodes[_i].nodes.filter(function(e){
                                    return e.id === parentid;
                                });
                                if(isArray(parentNodes)&&parentNodes.length>0) return parentNodes;
                            }
                        }(parentIds[_j]);
                        if(isArray(parentNodes)){
                            let parentNode = parentNodes[0];
                            _self._drawLines(parentNode.graphInfo.posX,parentNode.graphInfo.posY ,startPoint_x,startPoint_y );
                        }
                    }
                }
            },0);

            //画来源节点
            if(isArray(this.sourceNodes)&&this.sourceNodes.length>1){
                this._drawSubNodes(this.sourceNodes,true);
            }
        },
        _drawMainCompany:function(){
            let ctx = this.ctx;
            this.ctx.font = installTextStyle(this.options.textStyles[0]);
            let mainTitle = ctx.measureText(this.options.data.text);
            let titleWidth = mainTitle.width;
            let recWidth,textHeight,recHeight; //框的宽度
            if(typeof this.options.mainRectPaddingX ==='number'){
                recWidth = titleWidth + this.options.mainRectPaddingX*2;
            }else{
                recWidth = titleWidth + 20;
            }
            if(typeof this.options.textStyles[0].fontSize ==='number'){
                textHeight = this.options.textStyles[0].fontSize ;
            }else{
                if(this.options.textStyles[0].fontSize.indexOf('px')!==-1){
                    textHeight = parseInt(this.options.textStyles[0].fontSize.replace(/px/g,''));
                }else{
                    textHeight = 13;
                }
            }
            if(typeof this.options.mainRectPaddingY ==='number'){
                recHeight = textHeight + this.options.mainRectPaddingY*2;
            }else{
                recHeight = textHeight +20;
            }
            //计算起点 X 和 Y轴
            let startPoint_x = Math.floor(this.mainNode.graphInfo.posX - recWidth/2 );
            let startPoint_y = Math.floor(this.mainNode.graphInfo.posY - recHeight/2) ;
            //画框
            ctx.beginPath();
            ctx.roundRect(startPoint_x,startPoint_y,recWidth,recHeight,3);
            this.treeNodes[0].nodes[0].rect = {};
            this.treeNodes[0].nodes[0].rect.width = recWidth;
            this.treeNodes[0].nodes[0].rect.height = recHeight;
            if(typeof this.options.mainBorderWidth ==='number'){
                this.ctx.lineWidth = this.options.mainBorderWidth*2;
            }
            if(this.options.showBorder) ctx.stroke();
            // 画背景色
            let color = this.options.colors?this.options.colors[0]:'#ccc';
            if(typeof color ==="string" ){ //字符串，纯背景色
                ctx.fillStyle = color;
            }else if(color instanceof Array&&color.length>0){ //数组，渐变色
                let linearGradient = this.ctx.createLinearGradient(startPoint_x,startPoint_y,startPoint_x+recWidth,startPoint_y);
                for(let i=0;i<color.length;i++){
                    linearGradient.addColorStop(i/(color.length-1), color[i]);
                }
                ctx.fillStyle = linearGradient;
            }
            ctx.fill();
            //渲染文字
            ctx.save();
            ctx.fillStyle = this.options.textStyles[0].color;
            ctx.textBaseline = 'middle' ;
            ctx.fillText(this.options.data.text,startPoint_x+Math.floor((recWidth - titleWidth)/2),startPoint_y+Math.floor(recHeight/2));
            ctx.restore();
        },
        //画子节点
        _drawSubNodes:function(nodes,flag){ //flag:true 来源节点
            let perY
                ,perRadius
                ,perBorder
                ,range = this.realLayerRange
                ,subBorderWidth = this.options.subBorderWidth
                ,subRadius =  this.options.subRadius
                ,_self = this
                ,ctx = this.ctx
                ,aniTime=0;
            //将主节点的坐标信息复制到数组
            nodes[0].nodes[0].graphInfo = this.mainNode.graphInfo;
            //计算每个点坐标：层距离  半径+边框+间距+半径+边框

            for(let i = 1 ; i < nodes.length ; i++){

                if(i===1){
                    perRadius = this.options.mainRadius ;
                    perBorder = this.options.mainBorderWidth;
                }else{
                    perRadius =  this.options.subRadius;
                    perBorder = this.options.subBorderWidth;
                }
                perY =  nodes[i-1].nodes[0].graphInfo.posY;

                let posY;
                if(flag){
                    posY = perY - perRadius -  perBorder - range - subBorderWidth - subRadius;
                }else{
                    posY= perY + perRadius +  perBorder + range + subBorderWidth + subRadius;
                }
                //X轴偏移量，水平居中
                let offsetX = Math.floor((this.pWidth- nodes[i].nodes.length*nodes[i].layerRange)/2) ;
                for(let j = 1 ; j <= nodes[i].nodes.length ; j++){
                    //动画延迟增量
                    aniTime += this.anInce;
                    let layerRanger = nodes[i].layerRange;
                    let posX = offsetX + layerRanger*j - Math.floor(layerRanger/2);
                    nodes[i].nodes[j-1].graphInfo = {
                        posX:posX,
                        posY:posY
                    };
                     //画节点
                    (function(px,py,time,i,j){
                        if(_self.options.animation){
                            setTimeout(drawNode,time)
                        }else{
                            drawNode();
                        }
                        function drawNode(){
                            //主节点圆路径，画边框
                            ctx.beginPath();
                            ctx.save();
                            let rectX,rectY,textLong,textHeight;
                            if(_self._isFlow()){
                                ctx.arc(px,py,_self.options.subRadius,0,2*Math.PI,true);
                            }else{
                                textHeight = _self.options.textStyles[1].fontSize;
                                let height = textHeight + 2* _self.options.subRectPaddingY;
                                _self.options.subRadius = Math.ceil(height/2);
                                rectX = px - Math.floor((nodes[i].layerRange - _self.rectRange)/2);
                                rectY = py - Math.ceil(height/2);
                                ctx.roundRect(rectX,rectY,nodes[i].layerRange - 10,height,3);
                                textLong = nodes[i].layerRange-10;

                                nodes[i].nodes[j-1].rect = {};
                                nodes[i].nodes[j-1].rect.width = nodes[i].layerRange - 10;
                                nodes[i].nodes[j-1].rect.height = height;

                            }

                            if(typeof _self.options.subBorderWidth ==='number'){
                                _self.ctx.lineWidth = _self.options.subBorderWidth*2;
                            }
                            if(_self.options.showBorder)  ctx.stroke();
                            //填充
                            let color;
                            if(flag){
                                color = isArray(_self.options.sourceColors)?_self.getColor(_self.options.sourceColors,i-1):'#ccc';
                            }else{
                                color = isArray(_self.options.colors)?_self.getColor(_self.options.colors,i):'#ccc';
                                if(nodes[i].nodes[j-1].skeletonColor){
                                    color = nodes[i].nodes[j-1].skeletonColor;
                                }
                            }
                            if(typeof color ==="string" ){ //字符串，纯色
                                ctx.fillStyle = color;
                            }else if( isArray(color)&&color.length>0){ //数组，渐变色
                                // 径向渐变
                                let radialGradient = ctx.createRadialGradient(px-Math.floor(_self.options.mainRadius/2),py - Math.floor(_self.options.mainRadius/3),Math.floor(_self.options.mainRadius/3),px,py,_self.options.mainRadius);
                                for(let ci=0;ci<color.length;ci++){
                                    radialGradient.addColorStop(ci/(color.length-1), color[ci]);
                                }
                                ctx.fillStyle =radialGradient;
                            }
                            ctx.fill();
                            ctx.restore();
                            let fontStyle = installTextStyle(_self.options.textStyles[1]);
                            //渲染文字
                            if(isString(nodes[i].nodes[j-1].text)&&_self._isFlow()){
                                let fontColor = _self.options.textStyles[1].color;
                                _self._drawText(px,py,nodes[i].layerRange-(_self.options.subBorderWidth+_self.options.subRadius)*2,nodes[i].nodes[j-1].text,fontColor,fontStyle,_self.options.textStyles[1].fontSize);
                            }else{
                                let fontColor = _self.options.textStyles[1].color;
                                _self._drawText(rectX,py,textLong,nodes[i].nodes[j-1].text,fontColor,fontStyle,textHeight);
                            }
                            //画内部图形
                            if(_self._isFlow()){
                                if(flag){
                                    if(_self.options.showInnerShape&&isArray(_self.sourceNodes[i].nodes[j-1].sub_node_ids)&&_self.sourceNodes[i].nodes[j-1].sub_node_ids.length>0){ //********/
                                        _self._drawInnerShape(px,py,_self.options.subRadius);
                                    }else{
                                        let hasParent = function(id){
                                            for(let _i=0;_i<nodes.length;_i++){
                                                let parentNodes = nodes[_i].nodes.filter(function(e){
                                                    return indexOf(e.parentId,id)!==-1;
                                                });
                                                if(isArray(parentNodes)&&parentNodes.length>0) return true;
                                            }
                                            return null;
                                        }(_self.sourceNodes[i].nodes[j-1].id);
                                        if(hasParent){
                                            _self._drawInnerShape(px,py,_self.options.subRadius);
                                        }
                                    }
                                }else{
                                    if(_self.options.showInnerShape&&(isString(nodes[i].nodes[j-1].parent_id)||isArray(nodes[i].nodes[j-1].parent_id))){
                                        _self._drawInnerShape(px,py,_self.options.subRadius);
                                    }
                                }
                            }
                        }

                    })(posX,posY,aniTime,i,j);

                     //画连接线
                     //父节点，只要一个节点则为字符串，如果有多个节点则为字符串
                     let parentIds = nodes[i].nodes[j-1].parent_id;
                     if(isString(parentIds)){
                        (function(parentId,time,x,y){
                            if(_self.options.animation){
                                setTimeout(function(){drawLine.call(_self,parentId,x,y)},time)
                            }else{
                                drawLine.call(_self,parentId,x,y);
                            }

                        })(parentIds,aniTime,posX,posY);
                     }else if(isArray(parentIds)){
                         for(let _i=0;_i<parentIds.length;_i++){
                            let _parentId = parentIds[_i];
                            (function(parentId,time,x,y){
                                if(_self.options.animation){
                                    setTimeout(function(){
                                        drawLine.call(_self,parentId,x,y);
                                    },time)
                                }else{
                                    setTimeout(function(){
                                        drawLine.call(_self,parentId,x,y);},
                                    0);
                                }
                            })(_parentId,aniTime,posX,posY);
                         }
                     }
                     //内部函数，调用_drawLines()绘制线条
                    function drawLine(parentId,tx,ty){
                        let _self = this;
                        let parentNodes  = function(parentId){
                            for(let _i=0;_i<nodes.length;_i++){
                                let parentNodes = nodes[_i].nodes.filter(function(e){
                                    return e.id === parentId;
                                });
                                if(isArray(parentNodes)&&parentNodes.length>0) return parentNodes;
                            }
                            return null;
                        }(parentId);

                        if(isArray(parentNodes)){
                            let parentNode = parentNodes[0];
                            let lineY = ty;
                            if(flag){
                                this._drawLines(parentNode.graphInfo.posX,parentNode.graphInfo.posY,perRadius+perBorder,tx,lineY,_self.options.subBorderWidth + _self.options.subRadius,true); //********/
                            }else{
                                this._drawLines(parentNode.graphInfo.posX,parentNode.graphInfo.posY,perRadius+perBorder,tx,lineY,_self.options.subBorderWidth + _self.options.subRadius)
                            }
                        }
                    }
                }
            }
            //画完子节点 注册事件
            if(this.options.enableEvent){
                if(_self.options.animation){
                    setTimeout(function(){
                        _self._installEvent();
                    },aniTime);
                }else{
                    _self._installEvent();
                }
            }
        },
        _drawText:function(tx,ty,range,text,color,fontStyle,fontSize){
            let _range = range - 10
            ,ctx = this.ctx
            ,lineHeight = Math.floor(fontSize*1.3)
            ,textNum = text.length;
            ctx.save();
            this.ctx.font = fontStyle;
            ctx.fillStyle = color;
            ctx.textBaseline = 'middle' ;
            let textMeasure = ctx.measureText(text)
            ,textWidth = textMeasure.width
            ,textStartX = tx + this.options.subRadius + this.options.subBorderWidth + 5;
            if(_range>textWidth||textNum===1){ //如果位置足够
                if(!this._isFlow()){
                    textStartX = tx + (range - textWidth)/2 ;
                }
                ctx.fillText(text,textStartX,ty);
            }else{ //位置不够
                if(this._isFlow()){
                    let textRow = Math.ceil(textWidth/_range);
                    if(textRow>textNum) textRow = textNum;
                    let offSet = textNum%textRow
                    , rowNum =  Math.floor(textNum/textRow)
                    , startY = ty - Math.round(textRow*lineHeight/2) + Math.round(fontSize/2)
                    , textIndex = 0;
                    for(let i =0;i<textRow;i++){
                        let posY = startY + i*lineHeight,currentNum;
                        if(offSet-->0){
                            currentNum = rowNum + 1;
                        }else{
                            currentNum = rowNum;
                        }
                        let currentText = text.substr(textIndex,currentNum);
                        textIndex += currentNum;
                        // if(!this._isFlow()){
                        //     var currentTextMeansure = ctx.measureText(currentText);
                        //     var currentTextWidth = currentTextMeansure.width;
                        //     textStartX = tx + (range - currentTextWidth)/2 ;
                        // }
                        ctx.fillText(currentText,textStartX,posY);
                    }
                }else{
                    let perTextWidthMeasure = ctx.measureText("国") //计算一个字的宽度
                    , perTextWidth = perTextWidthMeasure.width
                    , textNum = Math.floor(_range/perTextWidth)  //计算最多放多少文字
                    , subText = text.substr(0,textNum-1) + "...";
                    ctx.fillText(subText,tx+5,ty);
                }

            }
            ctx.restore();
        },
        _drawLines:function(px,py,pShapeLong,cx,cy,cShapeLong,flag){ //true ： 来源线
            let ctx = this.ctx,my=py;
            if(!flag) my +=  pShapeLong;
            ctx.beginPath();
            ctx.moveTo(px,my);
            let arrowX,arrowY,rotate=0,cpx,cpy,secBezier = false;
            if(py === cy){
                ctx.moveTo(px,py+cShapeLong);

                cpx = Math.round((cx - px)/2) + px;
                cpy = py + cShapeLong + Math.abs(Math.round((cx - px)/3));
                let maxCpy = py + cShapeLong +  Math.abs(this.realLayerRange*3/4);
                if(cpy>maxCpy) cpy = maxCpy;
                ctx.quadraticCurveTo(cpx,cpy,cx,cy + cShapeLong);
                secBezier = true;
                arrowX = cpx;
                arrowY =py + cShapeLong + Math.abs(Math.round((cx - px)/6));
                //箭头旋转角度
                let aTanY,aTanX;
                if(flag){
                    aTanY = py-cy ;
                    aTanX = px-cx ;
                }else{
                    aTanY = cy - py;
                    aTanX = cx - px;
                }
                let radian = Math.atan2(aTanY,aTanX);
                rotate = radian - Math.PI/2;
                cy += cShapeLong;
            }else if((!flag&&py>cy )||(flag&&py<cy)){
                if(!this._isFlow()){
                    cy += this.options.subRadius + this.options.subBorderWidth;
                    py -= this.options.subRadius - this.options.subBorderWidth;
                    ctx.moveTo(px,py);
                }

                if(flag){
                     cpx =cx - Math.round((px - cx)/2)  ;
                     cpy = py +50 ;
                }else{
                     cpx = px - Math.round((cx - px)/2)  ;
                     cpy = cy +50 ;
                }

                ctx.quadraticCurveTo(cpx,cpy,cx,cy);
                secBezier = true;
                let aTanY,aTanX,radian;
                if(flag){
                    aTanY = - cy + py;
                    aTanX = - cx + px;
                }else{
                    aTanY = cy - py;
                    aTanX = cx - px;
                }
                radian = Math.atan2(aTanY,aTanX);
                rotate = radian - Math.PI/2;

                let t = 0.5;
                let pos = computeSecBezier({x:px,y:my},{x:cpx,y:cpy},{x:cx,y:cy},t);
                arrowX = pos.x;
                arrowY = pos.y;
            }else{
                let layerRange,offsetX = cx;
                if(flag) {
                    layerRange = this.sourcelayerRange;
                }else{
                    layerRange = this.realLayerRange;
                    py +=  pShapeLong;
                }

                if(!this._isFlow()){
                    cy -= this.options.subRadius -this.options.subBorderWidth;
                }

                if(Math.abs(py-cy)>2*layerRange){
                    offsetX = (px -cx)/Math.abs(px -cx)*10 + cx;
                }

                //三次贝塞尔曲线
                let cp1x = px + (offsetX -px )/2 ;
                let cp1y = cy - Math.floor(3*this.realLayerRange/4);
                if(flag){
                    cp1y = cy + Math.floor(3*this.realLayerRange/4);
                }
                // let cp2x = cx;
                let cp2y =cy - Math.floor(3*this.realLayerRange/4);
                if(flag){
                    cp2y = cy + Math.floor(3*this.realLayerRange/4);
                }
                let targetY = cy - Math.floor(this.realLayerRange/2);
                if(flag) targetY = cy + Math.floor(this.realLayerRange/2);
                ctx.bezierCurveTo(cp1x, cp1y, offsetX, cp2y,offsetX,targetY);
                ctx.lineTo(cx,cy);
                if(flag){
                    arrowX = offsetX;
                    arrowY = cy + Math.floor(this.realLayerRange/2)
                }else{
                    arrowX = offsetX;
                    arrowY = cy - Math.floor(this.realLayerRange/2)
                }
            }
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            if(isNumber(this.options.connLineWidth)){
                ctx.lineWidth = this.options.connLineWidth
            }
            if(isString(this.options.connLineColor)){
                ctx.strokeStyle = this.options.connLineColor;
            }
            ctx.stroke();
            ctx.restore();
            ctx.save();
            //画箭头
            if(this.options.showArrow){
                if(isString(this.options.arrowColor)){
                    ctx.fillStyle = this.options.arrowColor;
                }

                if(!isString(this.options.arrowType)||this.options.arrowType==='default'){
                    let line =isNumber(this.options.arrowWidth)?this.options.arrowWidth:5
                        , deg = 35
                        , radian = deg*(Math.PI/180);
                    ctx.translate(arrowX,arrowY);
                    ctx.rotate(rotate);
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(Math.cos(radian)*line,-Math.sin(radian)*line);
                    ctx.lineTo(0,line);
                    ctx.lineTo(-Math.cos(radian)*line,-Math.sin(radian)*line);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }else{

                    if(secBezier){
                        ctx.beginPath();
                        let pos1 = computeSecBezier({x:px,y:my},{x:cpx,y:cpy},{x:cx,y:cy},0.5);
                        ctx.moveTo(pos1.x,pos1.y);
                        ctx.arc(pos1.x,pos1.y,1.5,0,2*Math.PI,true);
                        console.log(pos1);

                        let pos2 = computeSecBezier({x:px,y:my},{x:cpx,y:cpy},{x:cx,y:cy},0.55);
                        ctx.moveTo(pos2.x,pos2.y);
                        ctx.arc(pos2.x,pos2.y,2.5,0,2*Math.PI,true);

                        let pos3 = computeSecBezier({x:px,y:my},{x:cpx,y:cpy},{x:cx,y:cy},0.62);
                        ctx.moveTo(pos3.x,pos3.y);
                        ctx.arc(pos3.x,pos3.y,2.5,0,2*Math.PI,true);
                        ctx.fill();
                        ctx.fillStyle = "rgba(160,180,202,0.2)";
                        ctx.arc(pos3.x,pos3.y,7,0,2*Math.PI,true);
                        ctx.fill();
                    }else{
                        ctx.translate(arrowX,arrowY);
                        ctx.beginPath();
                        ctx.moveTo(0,0);
                        ctx.arc(0,0,1.5,0,2*Math.PI,true);
                        ctx.moveTo(0,10);
                        ctx.arc(0,10,2.5,0,2*Math.PI,true);
                        ctx.moveTo(0,25);
                        ctx.arc(0,25,3.5,0,2*Math.PI,true);
                        ctx.fill();
                        ctx.fillStyle = "rgba(160,180,202,0.2)";
                        ctx.arc(0,25,7,0,2*Math.PI,true);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }
        },
        //绘制内部图形
        _drawInnerShape:function(x,y,r){
            let ctx = this.ctx
                , factor = 3/5;
            ctx.save();
            ctx.translate(x,y);
            ctx.strokeStyle ="#e7e7e7";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0,Math.floor(r*factor));
            ctx.moveTo(0,0);
            ctx.lineTo(0,-Math.floor(r*factor));
            ctx.moveTo(0,0);
            ctx.lineTo(Math.floor(r*factor),0);
            ctx.moveTo(0,0);
            ctx.lineTo(-Math.floor(r*factor),0);
            ctx.stroke();
            ctx.restore();
        },
        //计算主节点位置和画布元素垂直分布
        computePostion:function(){
            this.realLayerRange = this.options.layerRange;
            this.sourcelayerRange = this.options.sourcelayerRange;
            let height = (this.options.mainRadius + this.options.mainBorderWidth)*2,sourceHeight = 0,sumHeight
            , deep = this.treeNodes.length - 1
            , sourceDeep = this.sourceNodes.length - 1;
            if(!this._isFlow()){
                let textHeight = this.options.textStyles[1].fontSize||13
                , height = textHeight + 2* this.options.subRectPaddingY;
                this.options.subRadius = Math.ceil(height/2);
            }
            //计算总的高度
            height += deep*(this.options.layerRange + (this.options.subRadius+this.options.subBorderWidth)*2);
            if(this._isFlow()){
                sourceHeight = sourceDeep*(this.options.sourcelayerRange + (this.options.subRadius+this.options.subBorderWidth)*2);
            }
            sumHeight = height + sourceHeight;
            let posY;
            if(sumHeight<this.pHeight){
                posY= Math.floor((this.pHeight - sumHeight)/2) + sourceHeight +  (this.options.mainRadius + this.options.mainBorderWidth);
            }else{
                if(this.options.autoLayerRange){//自动计算各层高度
                    let outOfRange = sumHeight + this.options.paddTop + 50 - this.pHeight
                    , perLayerOffsetHeight = Math.ceil(outOfRange/(deep+sourceDeep)) ; //每层需要减去的高度
                    this.realLayerRange -= perLayerOffsetHeight;
                    this.sourcelayerRange -=  perLayerOffsetHeight;
                    if(this.realLayerRange<0) this.realLayerRange = 0;
                    if(this.sourcelayerRange<0) this.sourcelayerRange = 0;
                    if(this._isFlow()){
                        sourceHeight = sourceDeep*(this.sourcelayerRange + (this.options.subRadius+this.options.subBorderWidth)*2);
                    }
                    height = deep*(this.realLayerRange + (this.options.subRadius+this.options.subBorderWidth)*2) + (this.options.mainRadius + this.options.mainBorderWidth)*2;

                    sumHeight = height + sourceHeight;
                    posY= Math.floor((this.pHeight - sumHeight)/2) + sourceHeight +  (this.options.mainRadius + this.options.mainBorderWidth) ;
                }else{
                    posY = this.options.paddTop + sourceHeight + (this.options.mainRadius + this.options.mainBorderWidth);
                    sumHeight += this.options.paddTop;
                    let parentEl = this.canvasEl.parentNode;
                    this.canvasEl.setAttribute("height",sumHeight);
                    this.canvasEl.style.height = sumHeight +"px";
                    if(this.options.scale){ //是否自动缩小
                        let scale = this.pHeight/sumHeight;
                        this.scale = scale;
                        this.canvasEl.style.transformOrigin ="50% 0"
                        this.canvasEl.style.transform = "scale("+scale+")";
                        parentEl.style.overflow = "hidden";
                    }else{
                        parentEl.style.overflow = "hidden";
                    }
                }
            }
            let posX = Math.floor(this.pWidth/2);
            this.mainNode.graphInfo ={
                posX:posX,
                posY:posY
            }
        },
        initNodeArr:function(){
            this.recursionNode(this.options.data,0,this.options.data.parentId);
            if(isObject(this.options.sourceData)){
                this.recursionNode(this.options.sourceData,0,null,true);
            }
           //计算各层节点间隔距离
           if(this.treeNodes.length>1) this.computeLay(this.treeNodes,this.options.nodeRange);
           if(this.sourceNodes.length>1) this.computeLay(this.sourceNodes,this.options.nodeRange);
        },
        computeLay:function(arr,nodeRange){
            for(let i=arr.length-1;i>0;i--){
                //当前层级节点数组
                let currentLay = arr[i].nodes
                //总结点数量
                , count = currentLay.length
                //计算节点间距
                , range = Math.floor((this.pWidth)/count);
                if(range>nodeRange){
                    range = nodeRange;
                }
                arr[i].layerRange = range;
            }
        },
        recursionNode:function(options,level,parentID,flag,skeletonColor){ //flag 控制是否为来源节点  skeletonColor:脉络颜色
            let treeNodes;
            if(flag){ //true 为来源节点
                treeNodes = this.sourceNodes;
            }else{
                treeNodes = this.treeNodes;
            }
            //将节点保存到数组
            if(!isObject(treeNodes[level])){
                treeNodes[level] = {};
                treeNodes[level].nodes = [];
            }
             let node = {};
             node = cloneDeep(options);
             delete node.childrens;
             node.sub_node_ids = [];
             node.parent_id = parentID;
             if(isString(skeletonColor)||isArray(skeletonColor)){
                node.skeletonColor = skeletonColor
             }
             treeNodes[level].nodes.push(node);
            if(isArray(options.childrens)){ //存在子节点
                level++;
                let deepCount = 1;
                let subDeepCounts =new Array(options.childrens.length);
                subDeepCounts.fill(deepCount);
                for(let i=0;i<options.childrens.length;i++){
                    node.sub_node_ids.push( options.childrens[i].id);
                    let currentParentId = options.id;
                    if(isArray(options.childrens[i].parentId)&&options.childrens[i].parentId.length>0){
                        if(indexOf(options.childrens[i].parentId,options.id)===-1){
                           options.childrens[i].parentId.push(options.id);
                        }
                        currentParentId = options.childrens[i].parentId;
                    }

                    //获取脉络颜色
                    if(level === 1&&isArray(this.options.groupColors)){
                        skeletonColor =  this.options.groupColors[i];
                     }
                    let deepCounts =  this.recursionNode.call(this,options.childrens[i],level,currentParentId,flag,skeletonColor);
                    if(options.childrens[i].childrens&&options.childrens[i].childrens.length>0){
                        let maxDeep =max(deepCounts);
                        //记录每个节点所拥有的子节点个数
                        options.childrens[i].subNodes = deepCounts.length;
                        subDeepCounts[i] = deepCount + maxDeep;
                    }
                }
                return subDeepCounts;
            }else{
                return 0;
            }
        },
        getColor:function(colors,index){
            let color = colors[index];
            if(isString(color)||isArray(color)){
                return color;
            }else{
                return this.getColor(colors,--index);
            }
        },
        _installEvent:function(){
            let _self = this
            , mouse = captureMouse(this.avtiveEl);
            this.avtiveEl.onmousedown = mouseDown ;
            this.avtiveEl.onmousemove = mouseMove ;
            function mouseDown(){
                let nodes = _self.treeNodes;
                if(_self._isFlow()){
                    nodes = nodes .concat(_self.sourceNodes);
                }
                //判断如果XY在节点范围内，则调用回调函数
                if(isFunction(_self.options.clickHandler)){
                    let node =getNodes(mouse,nodes);
                    if(isObject(node)){
                        _self.options.clickHandler(node);
                    }
                }
            }

            let mouseIn = false;
            function mouseMove(){
                if(isNumber(_self.scale)){
                    mouse.x /= _self.scale;
                    mouse.y /= _self.scale;
                }
                let nodes = _self.treeNodes;
                if(_self._isFlow()){
                    nodes = nodes .concat(_self.sourceNodes);
                }
                let node  =  getNodes(mouse,nodes);
                let ani  ;
                if(isObject(node)){
                    _self.avtiveEl.style.cursor = 'pointer';
                    if(_self.tipsEl){
                        //绘制Tips
                        _self._drawTips(node,mouse);
                    }
                    if(!mouseIn){
                        mouseIn = true;
                        //绘制活动波纹
                        let ctx = _self.avtiveEl.getContext("2d")
                        , posX = node.graphInfo.posX
                        , posY = node.graphInfo.posY
                        , r = _self.options.subRadius + _self.options.subBorderWidth;
                        if(posX === _self.mainNode.graphInfo.posX&&posY === _self.mainNode.graphInfo.posY){
                            r = _self.options.mainRadius + _self.options.mainBorderWidth;
                        }
                        let count,activeR,range,rv,opacity,rectWidth,rectHeight,lineWidth;
                         count = 1;
                         activeR = r;
                         range = 5;
                         rv = 0.07;
                         opacity = 1;
                         lineWidth = 4;
                         if(!_self._isFlow()){
                            rectWidth = node.rect.width+5;
                            rectHeight = node.rect.height+5;
                         }
                        ripple();
                        function ripple(){
                            activeR += rv ;
                            count ++;
                            opacity -= rv/range;
                            ctx.clearRect(0,0,_self.avtiveEl.width,_self.avtiveEl.height);
                            ctx.beginPath();
                            if(_self._isFlow()){
                                activeR += rv ;
                                if(count>=range/rv){
                                    return
                                    // activeR = r;
                                    // count = 1;
                                    // opacity = 1;
                                }
                                ctx.arc(posX,posY,activeR,0,2*Math.PI,true);
                                // ctx.lineWidth = lineWidth;
                            }else{
                                rectWidth += rv ;
                                rectHeight += rv;

                                if(count>=range/rv){
                                    return
                                    // rectWidth = node.rect.width;
                                    // rectHeight = node.rect.height;
                                    // opacity = 1;
                                    // count = 1;
                                }
                                posX = node.graphInfo.posX - rectWidth/2;
                                posY = node.graphInfo.posY - rectHeight/2;
                                ctx.rect(posX,posY,rectWidth,rectHeight);
                                // ctx.lineWidth = lineWidth/2;
                            }
                            lineWidth -=  8*rv/range;
                            ctx.lineWidth = lineWidth;
                            ctx.strokeStyle = "rgba(78,98,132,"+opacity+")";
                            ctx.stroke();
                            if(mouseIn) setTimeout(ripple,17);
                        }
                    }

                }else{
                    if(_self.tipsEl){
                        //绘制Tips
                        _self._hiddenTips(node,mouse);
                    }
                    let ctx = _self.avtiveEl.getContext("2d");
                    ctx.clearRect(0,0,_self.avtiveEl.width,_self.avtiveEl.height);
                    _self.avtiveEl.style.cursor = 'default';
                    mouseIn  = false;
                    window.cancelAnimationFrame(ani);
                    window.requestAnimationFrame(function(){});
                }
            }

            function getNodes(mouse,nodes){
                for(let _i=0 ; _i < nodes.length;_i++){
                    let clickNodes = nodes[_i].nodes.filter(function(e){
                        let pos = e.graphInfo;
                        if(_self._isFlow()){
                            // 点到 圆心的距离 小于 半径
                            let r = _self.options.subRadius + _self.options.subBorderWidth;
                            if(pos.posX === _self.mainNode.graphInfo.posX&&pos.posY === _self.mainNode.graphInfo.posY){
                                r = _self.options.mainRadius + _self.options.mainBorderWidth;
                            }
                            let flag = (Math.pow(mouse.x-pos.posX,2) + Math.pow(mouse.y-pos.posY,2))<r*r;
                            return flag;
                        }else{
                            let rect =  e.rect;
                            //矩形。计算在矩形范围内
                            try {
                                return (Math.abs(mouse.x - pos.posX) < rect.width/2)&&(Math.abs(mouse.y - pos.posY) < rect.height/2);
                            } catch (error) {
                                console.log(pos);
                            }
                        }
                    });

                    if(isArray(clickNodes)&&clickNodes.length>0){
                        let node = cloneDeep(clickNodes[0]);
                        delete node.sub_node_ids;
                        delete node.parent_id;
                        return node
                    }
                }
            }
        },
        _drawTips:function(node,mouse){
            this.tipsEl.style.display ="block";
            this.tipsEl.innerHTML = node.text;
            this.tipsEl.style.left = mouse.x + 20 +"px";
            this.tipsEl.style.top = mouse.y + 20 +"px";
            let fontHeight = getTextHeight.call(this);
            this.tipsEl.style.lineHeight = fontHeight + 7 +"px";
            function getTextHeight(){
                if(isObject(this.options.tipsStyle)&&isNumber(this.options.tipsStyle.fontSize)){
                    return this.options.tipsStyle.fontSize;
                }else{
                    return 13;
                }
            }
        },
        _hiddenTips:function(){
            this.tipsEl.style.display ="none";
        },
        _installOption:function(options){
            this.options = cloneDeep(options);
            if(!isObject(options.data)) throw new Error("data属性设置错误");
            //设置默认值
            if(!isArray(this.options.colors)){
                this.options.colors = [['#F4F201','#E4C700'],'#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']; //子节点颜色数组，第一个为主节点颜色, 颜色设置为数组为渐变
            }
            if(!isArray(this.options.sourceColors)){ //来源节点颜色数组
                this.options.sourceColors =  ['#73eb2b','#73eb2b', '#546570', '#c4ccd3'] ;
            }
            if(!isString(this.options.borderColor)){
                this.options.borderColor = "#ccc" ;
            }
            if(!isString(this.options.chartType)){
                this.options.chartType = "flow" ;
            }
            if(!isArray(this.options.textStyles)){
                this.options.textStyles = [{fontSize:13,fontFamily:'Microsoft YaHei',color:'red'},{fontSize:12,fontFamily:'Microsoft YaHei',color:'#333'}];
            }
            if(!isNumber(this.options.mainRectPaddingX)){
                this.options.mainRectPaddingX = 20;
            }
            if(!isNumber(this.options.mainRectPaddingY)){
                this.options.mainRectPaddingY = 10;
            }
            if(!isNumber(this.options.subRectPaddingX)){
                this.options.subRectPaddingX = 5;
            }
            if(!isNumber(this.options.subRectPaddingY)){
                this.options.subRectPaddingY = 10;
            }
            if(!isNumber(this.options.paddTop)){
                this.options.paddTop = 20;
            }
            if(!isNumber(this.options.mainRadius)){
                this.options.mainRadius = 15;
            }
            if(!isNumber(this.options.subRadius)){
                this.options.subRadius = 10;
            }
            if(!isNumber(this.options.mainBorderWidth)){
                this.options.mainBorderWidth = 4;
            }
            if(!isNumber(this.options.subBorderWidth)){
                this.options.subBorderWidth = 2;
            }
            if(!isNumber(this.options.layerRange)){
                this.options.layerRange = 150;
            }
            if(!isNumber(this.options.sourcelayerRange)){
                this.options.sourcelayerRange = 150;
            }
            if(!isNumber(this.options.nodeRange)){
                this.options.nodeRange = 100;
            }
            if(!isNumber(this.options.connLineWidth)){
                this.options.connLineWidth = 1;
            }
            if(!isString(this.options.connLineColor)){
                this.options.connLineColor = "#999";
            }
            if(!isString(this.options.arrowColor)){
                this.options.arrowColor = "#666";
            }
            if(!isNumber(this.options.arrowWidth)){
                this.options.arrowWidth = 6;
            }
            if(!isObject(this.options.title)){
                this.options.title = {
                    show:false
                }
            }else{
                if(!isObject(this.options.title.style)){
                    this.options.title.style = {fontSize:20,fontFamily:'Microsoft YaHei',color:'#000000'} ;
                }
            }

            if(!isBoolean(this.options.autoLayerRange)){
                this.options.autoLayerRange = true;
            }

            if(!isBoolean(this.options.showInnerShape)){
                this.options.showInnerShape = true;
            }

            if(!isBoolean(this.options.showArrow)){
                this.options.showArrow = true;
            }

            if(!isBoolean(this.options.enableEvent)){
                this.options.enableEvent = true;
              }

            if(!isBoolean(this.options.showTips)){
                this.options.showTips = true;
            }

            if(this.options.showTips){
                this.tipsEl = document.createElement("div");
                this.tipsEl.style = "position: absolute; display: none; border-style: solid; transition: all 1s;"
                +"font-size:13px;font-family:Microsoft YaHei; white-space: nowrap; z-index: 9999999; background-color: rgba(50, 50, 50, 0.701961); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255);  font-weight: normal; font-stretch: normal;   padding: 5px; left: 0; top: 0;"
                this.canvasEl.parentNode.appendChild(this.tipsEl);
            }
        }
    };
    function init(id){
        let canvasEl =document.createElement("canvas");
        if( typeof id ==='string' ){
            let parentEl = document.getElementById(id);
            if(parentEl){
                return initCanvas(parentEl,canvasEl);
            }
        }else if(id instanceof Node){
            return initCanvas(id,canvasEl)
        }else{
            canvasEl = null;
            if(console) console.error("init出错，父元素ID不能为空");
        }

        function initCanvas(parentEl,canvasEl){
            let pWidth = parentEl.clientWidth;
            if(parentEl.scrollWidth > pWidth){
                pWidth = parentEl.scrollWidth;
            }
            let pHeight = parentEl.clientHeight;
            if(parentEl.scrollHeight > pHeight){
                pHeight = parentEl.scrollHeight;
            }
            let canvases = parentEl.getElementsByTagName("canvas");
            if(canvases.length>1){
                if(console) console.warn("警告：重复初始化！");
            }
            parentEl.style.position="relative";
            canvasEl.setAttribute("id",random());
            canvasEl.setAttribute("width",pWidth );
            canvasEl.setAttribute("height" , pHeight);
            canvasEl.setAttribute("style","position: absolute; left: 0px; top: 0px; width: "+ pWidth+"px; height:  "+ pHeight +"px; padding: 0px; margin: 0px; border-width: 0px;");
            parentEl.appendChild(canvasEl);
            let avtiveEl = canvasEl.cloneNode(true);
            avtiveEl.setAttribute("id",random());

            parentEl.appendChild(avtiveEl);
            return new RelationGraph(canvasEl,pWidth,pHeight,avtiveEl);
        }
    };

     //随机产生字符串
     function random(length) {
        if(typeof length !== 'number' ) length = 32;
        let str = Math.random().toString(36).substr(2);
        if (str.length>=length) {
            return str.substr(0, length);
        }
        str += random(length-str.length);
        return str;
    }
    //
    // function installStyle(styleObj){
    //     let styleStr='',key,value;
    //     for(key in styleObj){
    //         if(typeof styleObj[key] ==='number'){
    //             value =styleObj[key] +"px";
    //         }else{
    //             value =styleObj[key];
    //         }
    //         let regx = new RegExp("[A-Z]+");
    //         key = key.replace(regx,function(a){
    //                 return "-"+a.toLowerCase();
    //         });
    //
    //         styleStr += key+":"+ value+";"
    //     }
    //     return styleStr
    // }

    function installTextStyle(styleObj){
        let styleStr='';
        if(typeof styleObj.fontSize ==='number'){
            styleStr = styleObj.fontSize +"px"
        }else if(typeof styleObj.fontSize ==='string'){
            if(styleObj.fontSize.indexOf('px')!==-1){
                styleStr = styleObj.fontSize ;
            }else{
                styleStr = styleObj.fontSize +"px"
            }
        }else{
            styleStr ="13px"
        }
        if(typeof styleObj.fontFamily ==='string'){
            styleStr +=" "+styleObj.fontFamily;
        }
        return styleStr;
    }
    window.nebulaMap = {init:init};
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) {r = w / 2;}
        if (h < 2 * r){ r = h / 2;}
        this.beginPath();
        this.moveTo(x+r, y);
        this.arcTo(x+w, y, x+w, y+h, r);
        this.arcTo(x+w, y+h, x, y+h, r);
        this.arcTo(x, y+h, x, y, r);
        this.arcTo(x, y, x+w, y, r);
        this.closePath();
        return this;
    }
})();


