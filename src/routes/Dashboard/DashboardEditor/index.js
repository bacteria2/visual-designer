import React from 'react';
import DragAndResize from '../../../components/DragAndResize'
export default class DashboardEditor extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            editStatus:true,
            draggable:true,
        };
    }

    layoutUnSelected(selected){

           console.log("取消选中");

    }

    layoutSelected(selected){
        if(selected) {
            console.log("选中");
        }else{
            console.log("取消选中");
        }
    }

    layoutResize(){
        console.log("重置大小");
    }

    move({x,y,h,w}){

    }

    deleteLayout(){
        console.log("删除")
    }

    updateZIndex(z){
        console.log("更新zIndex" + z)
    }

    render(){
        return (<div id="workspace" style={{width:'500px',height:'500px',position:'relative',background:'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06) 2px, transparent 1px, transparent 10px),\n' +
        '    repeating-linear-gradient(-90deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06) 2px, transparent 1px, transparent 10px) 1px 1px rgb(216, 216, 216)'}}>
            <DragAndResize deactivated={this.layoutUnSelected.bind(this)}
                           h={100} w={100}
                           containerId ={'containerId'}
             activated={this.layoutSelected.bind(this)} resizestop={this.layoutResize.bind(this)}
             parent grid={[10,10]} draggable={this.state.draggable} resizable={this.state.editStatus}
             key="layoutKey" scale={1} minw={20} minh={20} move={this.move.bind(this)} updateZIndex={this.updateZIndex.bind(this)}
            deleteLayout={this.deleteLayout.bind(this)}/>
        </div>)
    }
}