import React from 'react';
import { Layout, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import DragAndResize from '../../../components/DragAndResize'
import styles from './dashboardEditor.css'
import {getClassName} from '../../../utils'
import DesignerLayout from '../../../layouts/DesignerLayout'
import GlobalHeader from '../../../components/GlobalHeader';
import logo from '../../../assets/logo/logo.png';

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};

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
        if(selected){
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
        // return (<div id="workspace" className={getClassName({drawable:false,workspace:true,'workspaceGrid':true},styles)}
        //             style={{width:'500px',height:'500px',backgroundColor:'#fff'}}>
        //     <DragAndResize deactivated={this.layoutUnSelected.bind(this)} h={100} w={100} containerId ={'containerId'}
        //      activated={this.layoutSelected.bind(this)} resizestop={this.layoutResize.bind(this)}
        //      parent grid={[10,10]} draggable={this.state.draggable} resizable={this.state.editStatus}
        //      key="layoutKey" scale={1} minw={20} minh={20} move={this.move.bind(this)} updateZIndex={this.updateZIndex.bind(this)}
        //     deleteLayout={this.deleteLayout.bind(this)}>
        //         Hello word!
        //     </DragAndResize>
        // </div>)
        const {
            currentUser, collapsed, fetchingNotices, notices, routerData, match, location,controlMenu,
        } = this.props;

        const layout = (<Layout><GlobalHeader
            logo={logo}
            isLogo
            isMenu={false}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            controlMenu={controlMenu}
            onMenuClick={this.handleMenuClick}
            collapsed={collapsed}
            onNoticeClear={this.handleNoticeClear}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}/></Layout>);

        return (<DocumentTitle title={this.getPageTitle()}>
            <ContainerQuery query={query}>
                {params => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        </DocumentTitle>)
    }
}