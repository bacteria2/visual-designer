import React, { Component } from 'react';
import { Card, Col, Row,Icon,Modal,Tag ,Layout,Button,Form } from 'antd';
import { Link } from 'react-router-dom';
import {message} from "antd/lib/index";
import {queryProjects,saveProjectMember} from "../../service/ProjectizedService";
import {getCurrentUser, getUserList} from "../../service/user";
import {ProjectEditForm} from "./ProjectForm";

export const currentUser = async()=>{
  let response = await getCurrentUser();
  if(response.success){
    return response.data;
  }else if(!response.success){
    message.error(response.msg);
    return null
  }else{
    message.warning('服务器连接错误');
    return null
  }
}

export default class ProjectList extends Component{
  constructor(props){
    super(props);
    this.state = {loading: true, data: null,showAddMemberModal:false, members: null,currentPrj:null,showProjectEditModal:false,editProject:null};
  }

  async componentDidMount() {
    this.user = await currentUser();
    console.log(this.user);
    let list =  await this.queryProjectList({$or:[{'projectManager.userid':this.user.userid},{'members.userid':this.user.userid}]});
    let devList = await this.queryDevelopers();
    this.setState({loading: false, data: list||[], developers: devList||[]});
  }

  async queryProjectList(query){
    let response = await queryProjects(query);
    if(response.success){
      return response.data;
    }else if(!response.success){
      message.error(response.msg);
      return null
    }else{
      message.warning('服务器连接错误');
      return null
    }
  }

  async queryDevelopers(){
    let response = await getUserList({userType:['developer']});
    if(response.success){
      return response.data;
    }else if(!response.success){
      message.error(response.msg);
      return null
    }else{
      message.warning('服务器连接错误');
      return null
    }
  }

  showMemberModal(project){
    const members = [...project.members||[]];
    this.setState({showAddMemberModal:true, members: members||[],currentPrj:project._id})
  }

  hideMemberModal = () =>{
    this.setState({showAddMemberModal:false});
  }

  editProject(project){
    this.setState({showProjectEditModal:true,editProject: project._id ? project : null})
  }

  projectSavedHandle=async()=>{
    let list =  await this.queryProjectList({$or:[{'projectManager.userid':this.user.userid},{'members.userid':this.user.userid}]});
    this.setState({showProjectEditModal:false,data:list||[]});
  }

  hideProjectEditModal=()=>{
    this.setState({showProjectEditModal:false})
  }

  async saveMember(){
    let response = await saveProjectMember(this.state.currentPrj,this.state.members);
    if(response.success){
      this.state.data.forEach(p=>{
        if(p._id === this.state.currentPrj){
          p.members = this.state.members;
        }
      });
      this.setState({showAddMemberModal:false, data: this.state.data||[]});
    }else if(!response.success){
      message.error(response.msg);
    }else{
      message.warning('保存项目成员失败');
    }
  }

  devChange(tag, checked) {
    if(!this.user.userType.includes('pm')){
      return;
    }
    const members = this.state.members;
    let m = {};
    if(this.state.developers) {
      this.state.developers.forEach(d => {
        if(d.userid === tag){
          m = d;
          return;
        }
      });
    }
    let exists = false;
    let pos = -1;
    if(members){
      members.forEach((m,index) =>{
        if(m.userid === tag){
          exists = true;
          pos = index;
          return;
        }
      });
    }
    if(checked && !exists){
      members.push({userid:m.userid,name:m.name});
    }else{
      members.splice(pos,1);
    }
    this.setState({members: members})
  }

  render(){
    if (this.state.loading) {
      return <span>Loading...</span>;
    }

    const isPm = this.user.userType.includes('pm');

    let rowList = [];
    const rs = Math.ceil((this.state.data.length+1)/4);
    let n = 0;
    for(let i = 0; i < rs; i++){
      let cols = [];
      if(i === 0 && n === 0 && isPm){
        cols.push(
          <Col span={6} key={'r_'+i+'_col_'}>
            <Card style={{textAlign:'center',minHeight:'192px',lineHeight:'130px',fontSize:'80px',padding:'0px',cursor:'pointer'}} onClick={this.editProject.bind(this)}><Icon type="plus"></Icon></Card>
          </Col>
        );
      }

      for(;n<this.state.data.length;n++){
        cols.push(
          <Col span={6} key={'r_'+i+'_col_'+n}>
            <Card title={this.state.data[n].name} extra={isPm?<Icon type="edit" style={{float:'right',fontSize:'15px',color:'#1890ff'}} onClick={this.editProject.bind(this,this.state.data[n])}></Icon>:null}>
              <Row gutter={24}>
                <Col span={8} value={100}>
                  <div>开始时间：</div>
                </Col>
                <Col span={16}>
                  <div>{this.state.data[n].startDate}</div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <div>项目成员：</div>
                </Col>
                <Col span={16}>
                  <div>
                    <span>{this.state.data[n].members?this.state.data[n].members.length:0}</span>
                    <span style={{cursor:'pointer',float:'right',fontSize:'15px',color:isPm?'#1890ff':'#ccc'}}><Icon type={'user-add'} onClick={this.showMemberModal.bind(this,this.state.data[n])}/></span>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <div>实例数量：</div>
                </Col>
                <Col span={16}>
                  <span>16</span>
                  <span style={{cursor:'pointer',float:'right',fontSize:'15px'}}><Link to={'/wiget/list/2d'}><Icon type={'eye-o'}/></Link></span>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <div>项目经理：</div>
                </Col>
                <Col span={16}>
                  <div>{this.state.data[n].projectManager.name}</div>
                </Col>
              </Row>
            </Card>
          </Col>
        );
        if(cols.length === 4){n++;break};
      }

      const row = (<div style={{marginTop:'10px'}} key={'rdiv_'+i}>
                    <Row gutter={24} key={'r_'+i}>
                    {cols}
                    </Row>
                  </div>);
      rowList.push(row);
    }

    //成员列表
    const devs = [];
    if(this.state.developers) {
      this.state.developers.forEach((dev, index) => {
        let mms = [];
        if (this.state.members)
          this.state.members.forEach(m => mms.push(m.userid));
        devs.push(
          <Tag.CheckableTag
            key={'dev_' + index}
            checked={mms.includes(dev.userid)}
            color={'gray'}
            onChange={checked => this.devChange(dev.userid, checked)}
          >
            {dev.name}
          </Tag.CheckableTag>
        );
      });
    }

    const editProject = this.state.editProject;

    return(<React.Fragment>
      {rowList}
        <Modal
        title="添加成员"
        visible={this.state.showAddMemberModal}
        onCancel = {this.hideMemberModal}
        footer={null}
        width={500}
        bodyStyle={{padding:'10px 5px'}}
        style={{top:'30%'}}
      >
        <Card bordered={false} bodyStyle={{padding:'0px'}}>
          <Layout style={{backgroundColor:'#fff'}}>
            <Layout.Content style={{backgroundColor:'#fff',lineHeight:'30px'}}>{devs}</Layout.Content>
            <Layout.Footer style={{backgroundColor:'#fff',height:'70px',lineHeight:'70px',padding:'13px 10px',textAlign:'center'}}>
              <Button type="primary" disabled={!isPm} loading={this.state.loading} icon={'save'} onClick={this.saveMember.bind(this)}>
                保存
              </Button>
            </Layout.Footer>
          </Layout>
        </Card>
      </Modal>

        <Modal
          title="编辑项目信息"
          visible={this.state.showProjectEditModal}
          onCancel = {this.hideProjectEditModal}
          footer={null}
        >
          <Card bordered={false} bodyStyle={{padding:'0px'}}>
            <ProjectEditForm prjId={this.state.currentPrj} savedHandle={this.projectSavedHandle} project={editProject} currentUser={this.user}/>
          </Card>
        </Modal>
      </React.Fragment>
    )
  }
}