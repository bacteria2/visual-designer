import React from 'react';
import {Input} from 'antd';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber'
import debounce from 'lodash/debounce';
import isFunc from 'lodash/isFunction';
import update from 'immutability-helper'
import keycode from 'keycode'
import styles from './drag-resize.css'

export default class DragAndResize extends React.PureComponent{
    constructor(props){
        super(props);

        this.parentX = 0;
        this.parentW = 9999;
        this.parentY = 0;
        this.parentH = 9999;

        this.mouseX = 0;
        this.mouseY = 0;

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.mouseOffX = 0;
        this.mouseOffY = 0;

        this.elmX = 0;
        this.elmY = 0;

        this.elmW = 0;
        this.elmH = 0;

        this.baseLineX = 0;
        this.baseLineY = 0;

        this.state = {
            contextMenu: {
                show: false,
                left: 0,
                top: 0,
            },
            top: props.y,
            left: props.x,
            width: props.w,
            height: props.h,
            draggable:props.draggable,
            resizing: false,
            dragging: false,
            active: props.activated,
            opacity: 1,
            handle: null,
            zIndex: props.z,
            moveEnable: false,
        }
    }

    componentDidMount(){
        this.$el = this.refs['dragAndResize'];
        document.documentElement.addEventListener('mousemove', this.handleMove, true);
        document.documentElement.addEventListener('mouseup', this.handleUp, true);
        document.documentElement.addEventListener('keydown', this.keyMove, true);
        // document.documentElement.removeEventListener('resize', this.updateParent.bind(this), true)
        if(this.props.parent){
            let el=document.getElementById('workspace');
            if(el&&el.parentNode)
                el.parentNode.addEventListener('mousedown', this.deselect, false);
        }else {
            document.documentElement.addEventListener('mousedown', this.deselect, false)
        }

        window.addEventListener('resize', debounce(this.updateParent.bind(this), 200));

        if (this.minw > this.w) this.setState({width:this.props.minw});

        if (this.minh > this.h) this.setState({height:this.props.minh});

        this.updateParent();
        if(isFunc(this.props.resizing)) this.props.resizing(this.left, this.top, this.width, this.height)
    }

    // componentWillUnmount(){
    //     // document.documentElement.removeEventListener('mousemove', this.handleMove, true);
    //     // document.documentElement.removeEventListener('mousedown', this.deselect,true );
    //     // document.documentElement.removeEventListener('mouseup', this.handleUp, true);
    //     document.documentElement.removeEventListener('resize', this.updateParent, true)
    // }

    componentWillReceiveProps(props){
        this.setState({left:props.x,top:props.y});
    }

    updateParent(){
        if (this.props.parent) {
            const style = window.getComputedStyle(this.$el.parentNode, null);

            const parentW = parseInt(style.getPropertyValue('width'), 10);
            const parentH = parseInt(style.getPropertyValue('height'), 10);

            this.parentW = parentW;
            this.parentH = parentH;
            if (this.props.w > this.parentW) this.setState({width:parentW});

            if (this.props.h > this.parentH) this.setState({height:parentH});

            if ((this.x + this.w) > this.parentW) this.setState({width:parentW - this.props.x});

            if ((this.y + this.h) > this.parentH) this.setState({height:parentH - this.props.y});
        }
    }

    zIndexMenu =(e)=>{
        e.stopPropagation();
        e.preventDefault();
        this.setState(
            update(this.state,{
                contextMenu:{
                    left:{$set:e.offsetX},
                    top:{$set:e.offsetY},
                    show:{$set:true},
                },
            })
        );
    };

    elmDown = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!this.state.active) {
            this.setState({active:true});
            if(isFunc(this.props.activated)) this.props.activated(true);
        }

        this.elmX = parseInt(this.$el.style.left,10);
        this.elmY = parseInt(this.$el.style.top,10);
        this.elmW = this.$el.offsetWidth || this.$el.clientWidth;
        this.elmH = this.$el.offsetHeight || this.$el.clientHeight;

        if (this.props.parent) {
            this.baseLineX = (e.pageX || e.clientX + document.documentElement.scrollLeft) - (e.offsetX * parseFloat(this.scale));
            this.baseLineY = (e.pageY || e.clientY + document.documentElement.scrollLeft) - (e.offsetY * parseFloat(this.scale));
        }
        //判断是否是搜索组件排序引发的鼠标点击，如果是则不执行
        if(e.target.className.indexOf("search_widget") !== -1||e.target.parentNode.className.indexOf("search_widget") !== -1) return;
        if (this.state.draggable) {
            this.setState({
                opacity:0.6,
                dragging:true,
            })
        }
    };

    deselect = (e) => {

        if(this.state.active&&!e.ctrlKey){
            let target = e.target || e.srcElement;
            let regex = new RegExp('handle_([trmbl]{2})', '');

            if (target !== this.$el&&!regex.test(target.className) && target.className !== 'c-menu'){

                this.setState(
                    update(this.state,{
                        active:{$set:false},
                        contextMenu:{
                            show:{$set:false},
                        },
                    })
                );
                if(isFunc(this.props.activated)) this.props.activated(false);

            }
        }
    };
    handleDown = (handle, e) => {
        // if (e.stopPropagation) e.stopPropagation();
        // if (e.preventDefault) e.preventDefault();

        this.setState({
            handle : handle,
            resizing:true,
            active:true,
        });

    };

    maximize = (e) => {
        if (!this.props.parent || !this.state.resizable) return;
        let done = false;
        const animate = () => {
            if (!done) {
                window.requestAnimationFrame(animate)
            }
            if (this.props.axis === 'x') {
                if (
                    this.state.width === this.parentW && this.state.left === this.parentX
                ) done = true
            } else if (this.props.axis === 'y') {
                if (
                    this.state.height === this.parentH && this.state.top === this.parentY
                ) done = true
            } else if (this.props.axis === 'both') {
                if (
                    this.state.width === this.parentW &&
                    this.state.height === this.parentH &&
                    this.state.top === this.parentY &&
                    this.state.left === this.parentX
                ) done = true
            }
            if (this.props.axis === 'x' || this.props.axis === 'both') {
                if (this.state.width < this.parentW) {
                    this.width++;
                    this.setState((state)=>({width:state.width++}));
                    this.elmW++
                }

                if (this.left > this.parentX) {
                    this.setState((state)=>({width:state.left++}));
                    this.elmX--
                }
            }
            if (this.axis === 'y' || this.axis === 'both') {
                if (this.height < this.parentH) {
                    this.setState((state)=>({height:state.height++}));
                    this.elmH++
                }
                if (this.top > this.parentY) {
                    this.setState((state)=>({top:state.top--}));
                    this.elmY--
                }
            }
            if(isFunc(this.props.resizing)) this.props.resizing(this.left, this.top, this.width, this.height);
        };

        window.requestAnimationFrame(animate)
    };
    handleMove = (e)=> {
        //if (e.preventDefault) e.preventDefault()
        this.mouseX = (e.pageX || e.clientX + document.documentElement.scrollLeft - this.baseLineX) / parseFloat(this.props.scale);
        this.mouseY = (e.pageY || e.clientY + document.documentElement.scrollTop - this.baseLineY) / parseFloat(this.props.scale);

        let diffX = this.mouseX - this.lastMouseX + this.mouseOffX;

        let diffY = this.mouseY - this.lastMouseY + this.mouseOffY;

        this.mouseOffX = this.mouseOffY = 0;

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;

        let dX = diffX;
        let dY = diffY;

        if (this.state.resizing&&1 === event.which) {
            if (this.state.handle.indexOf('t') >= 0) {
                if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.props.minh));
                else if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY));
                this.elmY += diffY;
                this.elmH -= diffY
            }

            if (this.state.handle.indexOf('b') >= 0) {
                if (this.elmH + dY < this.props.minh) this.mouseOffY = (dY - (diffY = this.props.minh - this.elmH));
                else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH));
                this.elmH += diffY
            }

            if (this.state.handle.indexOf('l') >= 0) {
                if (this.elmW - dX < this.props.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.props.minw));
                else if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX));
                this.elmX += diffX;
                this.elmW -= diffX
            }

            if (this.state.handle.indexOf('r') >= 0) {
                if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
                else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
                this.elmW += diffX
            }

            // this.left = (Math.round(this.elmX / this.props.grid[0]) * this.props.grid[0]);
            // this.top = (Math.round(this.elmY / this.props.grid[1]) * this.props.grid[1]);
            //
            // this.width = (Math.round(this.elmW / this.props.grid[0]) * this.props.grid[0]);
            // this.height = (Math.round(this.elmH / this.props.grid[1]) * this.props.grid[1]);

            this.setState({
                left:(Math.round(this.elmX / this.props.grid[0]) * this.props.grid[0]),
                top:(Math.round(this.elmY / this.props.grid[1]) * this.props.grid[1]),
                width:(Math.round(this.elmW / this.props.grid[0]) * this.props.grid[0]),
                height:(Math.round(this.elmH / this.props.grid[1]) * this.props.grid[1]),
            });

            if(isFunc(this.props.resizing)) this.props.resizing(this.left, this.top, this.width, this.height);

        }
        else if (this.state.dragging&&1 === event.which) {
            if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX));
            else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW));

            if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY));
            else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH));

            this.elmX += diffX;
            this.elmY += diffY;

            if (this.props.axis === 'x' || this.props.axis === 'both') {
                this.setState({left: (Math.round(this.elmX / this.props.grid[0]) * this.props.grid[0])});
            }
            if (this.props.axis === 'y' || this.props.axis === 'both') {
                this.setState({top:(Math.round(this.elmY / this.props.grid[1]) * this.props.grid[1])});
            }
            if(isFunc(this.props.dragging)) this.props.dragging();
        }
    };
    handleUp = (e) => {

        if (this.state.resizing) {
            // this.resizing = false;
            this.setState({resizing:false});
            if(isFunc(this.props.resizestop)) this.props.resizestop();
            if(isFunc(this.props.move)) this.props.move({
                x:this.state.left
                ,y:this.state.top
                ,w:this.state.width
                ,h:this.state.height});
            // this.$emit('update:x', this.left);
            // this.$emit('update:y', this.top);
            // this.$emit('update:w',this.width);
            // this.$emit('update:h', this.height)
        }
        if (this.state.dragging) {
            this.setState({dragging:false});
            if(isFunc(this.props.dragstop)) this.props.dragstop(this.state.left,this.state.top);
            if(isFunc(this.props.move)) this.props.move({
                x:this.state.left
                ,y:this.state.top
                ,w:this.state.width
                ,h:this.state.height});
        }
        this.setState({handle:null,opacity:1});
        this.elmX = this.left;
        this.elmY = this.top
        //   e.stopPropagation();
    };

    zIndexIncrease = (e) => {
        e.stopPropagation();
        this.setState((state)=>({zIndex:++state.zIndex}));

        if(isFunc(this.props.updateZIndex)) this.props.updateZIndex(this.state.zIndex);
    };

    zIndexDecrease = (e) => {
        if(this.state.zIndex>1){
            this.setState((state)=>({zIndex:--state.zIndex}));
            if(isFunc(this.props.updateZIndex)) this.props.updateZIndex(this.state.zIndex);
            this.setState(
                update(this.state,{
                    contextMenu:{
                        show:{$set:false},
                    },
                })
            )
        }
    };

    //上下左右移动
    keyMove = (e) => {
        if(this.state.active&&this.props.draggable){
            if(keycode(e)==='up'){
                if (this.state.top - this.props.grid[1] >= this.parentY){
                    // this.top-=this.props.grid[1];
                    this.setState((state,props)=>({top:state.top-props.grid[1]}));

                    if(isFunc(this.props.move)) this.props.move({y:this.state.top});
                }
            }
            if(keycode(e)==='down'){
                if (this.state.top + this.props.grid[1] <= this.parentH-this.state.height){
                    // this.top+=this.props.grid[1];
                    this.setState((state,props) => ({top:state.top + props.grid[1]}));
                    if(isFunc(this.props.move)) this.props.move({
                        y:this.state.top});
                }
            }
            if(keycode(e)==='left'){
                if (this.state.left - this.props.grid[0] >= this.parentX){
                    // this.left-=this.props.grid[0];
                    this.setState((state,props) => ({left:state.left - props.grid[0]}));
                    if(isFunc(this.props.move)) this.props.move({
                        x:this.state.left});
                }

            }
            if(keycode(e)==='right'){
                if (this.state.left + this.props.grid[0] <= this.parentW-this.state.width){
                    this.setState((state,props)=>({left:state.left + props.grid[1]}));
                    // this.left+=this.props.grid[0];
                    if(isFunc(this.props.move)) this.props.move({
                        x:this.state.left});
                }

            }
        }
    };
    //删除layout
    deleteLayout = (e) => {
        e.stopPropagation();
        if(isFunc(this.props.deleteLayout)) this.props.deleteLayout({keyCode:46});
    };

    render() {

        const style = {
            top: this.state.top + 'px',
            left: this.state.left + 'px',
            // transform: `translateX(${this.state.left}px) translateY(${this.state.top}px)`,
            width: this.state.width + 'px',
            height: this.state.height + 'px',
            zIndex: this.state.zIndex,
            opacity: this.state.opacity};

        const containerClassName = styles.vdr + " "
            + (this.state.draggable&&styles.draggable + " ")
            + (this.state.resizable&&"resizable ")
            +(this.state.active&&"active");

        return (<div ref="dragAndResize" id={'draggable_'+this.props.containerId}  className={containerClassName }
                     onMouseDown={this.elmDown.bind(this)} onContextMenu={this.zIndexMenu.bind(this)}
                     style={style} >
        <div  className={styles.b_handler} style={{ display: this.state.active ? 'block' : 'none'}}>
            {
                this.props.resizable &&
                    this.props.handles.map(e=>(
                        <div className={styles.handle + " " + styles['handle_'+e]}
                             key={e} style={{ display: this.state.active ? 'block' : 'none',transform:`scale(${1/this.props.scale})`}}
                            onMouseDown={this.handleDown.bind(this,e)}/>
                    ))
            }
        </div>
            {this.props.children}

        <div className={styles.context_menu} style={{
            left:this.state.contextMenu.left+'px',
            top:this.state.contextMenu.top+'px',
            display:this.state.contextMenu.show?'block':'none',
            zIndex:this.state.zIndex+1}} >
            <ul>
                <li className="c-menu" onClick={this.zIndexIncrease.bind(this)}>上移一层</li>
                <li className={"c-menu "+ (this.state.zIndex===1 && styles.disabled)} onClick={this.zIndexDecrease.bind(this)} >
                    下移一层
                </li>
                <li className="c-menu" onClick={this.deleteLayout.bind(this)}>删除该层</li>
            </ul>
        </div>
    </div>)
    }
}

DragAndResize.defaultProps = {
    scale: 1,
    draggable:true,
    resizable:true,
    w:200,
    z:1,
    minw:50,
    minh:50,
    x:0,
    y:0,
    handles:['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
    axis:'both',
    grid:[1,1],
    parent:false,
};

DragAndResize.propTypes = {
    scale: PropTypes.number,
    activated:PropTypes.func,
    draggable:PropTypes.bool,
    resizable:PropTypes.bool,
    containerId:PropTypes.string,
    w:(props,propName)=>{
        if(!isNumber(props[propName]) || props[propName] <=0){
            return new Error('容器宽度不能小于0')
        }
    },
    z:PropTypes.number,
    minw:(props,propName)=>{
        if(isNumber(props[propName]) && props[propName] <=0){
            return new Error('容器最小宽度不能小于0')
        }
    },
    minh:(props,propName)=>{
        if(isNumber(props[propName]) && props[propName] <=0){
            return new Error('容器最小高度不能小于0')
        }
    },
    x:(props,propName)=>{
        if(isNumber(props[propName]) && props[propName] <0){
            return new Error('X轴不能小于0')
        }
    },
    y:(props,propName)=>{
        if(isNumber(props[propName]) && props[propName] <0){
            return new Error('Y轴不能小于0')
        }
    },
    handles:PropTypes.array,
    axis:PropTypes.oneOf(['x', 'y', 'both']),
    grid:PropTypes.array,
    parent:PropTypes.bool,
};