import React from 'react';
import { Menu,Icon,Dropdown } from 'antd';

export default function MenuWithContext  (props){

    let onCtxMenuSelected = (item,event) =>{
        props.onCtxMenuSelected(event.key,item);
    };

    let sumMenu = props.categoryList.map((category,index)=>{
        //产生数据连接列表
        let menuItems = [];
        for(let i=0;i<props.list.length;i++){
            let e = props.list[i];
            if(e.categoryId === category._id){
                let contentMenu = (
                    <Menu style={{width:'150px'}} key={e._id + i} onClick={onCtxMenuSelected.bind(null,e)}>
                        {props.contentMenu.map(e=>(<Menu.Item key={e.key} >{e.label}</Menu.Item>))}
                    </Menu>
                );
                menuItems.push (
                    <Menu.Item  key={e._id}  id={e._id}>
                        <Dropdown overlay={contentMenu} trigger={['contextMenu']} placement="bottomRight">
                            <div style={{width:'100%',height:'40px'}}>
                                <Icon type={e.icon?e.icon:'table'}  style={{float:'left',lineHeight:'40px'}} />
                                <div style={{float:'left'}} dangerouslySetInnerHTML ={{__html: (e.searchName?e.searchName:e.name)
                                + '<span style=\"color: #ccc\">('
                                + (e.user?e.user.name:'')
                                + ')</span>'}} />
                            </div>
                        </Dropdown>
                    </Menu.Item>
                )
            }
        }

        return (<Menu.SubMenu key={index} title={category.name}>{menuItems}</Menu.SubMenu>)
    });


    return (<Menu
        mode="inline"
        defaultOpenKeys = {['0']}
        style={{ height: props.height,border:0}}
        onSelect={props.onMenuSelected}>
        {sumMenu}
    </Menu>)

}