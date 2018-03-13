import React, { Component } from 'react'
import { Icon, Modal, Button, List } from 'antd'
import { connect } from 'react-redux'
import { message } from 'antd/lib/index'
import { saveProject, saveProjectMember } from '../../service/ProjectizedService'
import { ProjectEditForm, MemberList, ProjectItem } from '../../components/Projectized'
import { fetchProject, ChangeProjectList, ChangeCurrentProject } from '../../store/Projectized/action'
import styles from './ProjectList.css'
import { authConnect } from '../../utils'
import { getUserList } from '../../service/user'
import Immutable, { List as ImmutableList, Map } from 'immutable'

/**
 * 当前用户的项目列表
 * userType:pm 可新建项目，可调整参与人员
 * 其他
 *  只可查看
 * */

class ProjectList extends React.PureComponent {

  state = {
    showAddMemberModal: false,
    showProjectEditModal: false,
    memberNeedSave: false,
    projectNeedSave: false,
    loading: false,
    editIndex: undefined,
    pmList: [],
  }

  componentDidMount () {
    this.props.dispatch(fetchProject())
    getUserList({userType: ['pm']}).then(({success, data}) => success && this.setState({pmList: data}))
  }

  showMemberModal (index) {
    this.setState({showAddMemberModal: true, editIndex: index})
  }

  showProjectFormModal (index) {
    this.setState({showProjectEditModal: true, editIndex: index})
  }

  //打开新项目编辑窗口
  handleProjectAdd = () => {
    this.props.dispatch({type: ChangeProjectList, payload: this.props.list.unshift(Immutable.fromJS({}))})
    this.showProjectFormModal(1)
  }

  //选中某个项目后,跳转到实例页,并且将当前项目提交到redux
  handleProjectSelect = (projectInfo) => {
    this.props.dispatch({type: ChangeCurrentProject, payload:Map({id: projectInfo._id, name: projectInfo.name,projectUrl:projectInfo.projectUrl})});
    sessionStorage.setItem('currentProject',JSON.stringify({id: projectInfo._id, name: projectInfo.name,projectUrl:projectInfo.projectUrl}));
    this.props.history.push('/widget/list/2d')
  }

  handleProjectSave = async () => {
    this.setState({loading: true})
    const list=this.props.list,index=this.state.editIndex - 1;
    const {name,projectManager,startDate,dbType,sever,dbPort,dbUser,dbPwd,db} = list.get(index).toJS();
    if(!name||!projectManager||!startDate||!dbType||!sever||!dbPort||!dbUser||!dbPwd||!db){
        message.error('所有信息必填，请确认！')
        this.setState({loading: false});
        return false;
    }
    //获取当前编辑项目
    if(this.state.projectNeedSave){
      const {success,data} = await saveProject(list.get(index).toJS());
      if(success){
        message.info('已保存修改的数据')
        //如果projectId为空添加id
        if(!list.getIn([index,'_id'])){
          this.props.dispatch({type:ChangeProjectList,payload:list.setIn([index,'_id'],data)})
        }
      }
    }
    this.setState({projectNeedSave: false, loading: false, showProjectEditModal: false})
  }

  handleMemberSave = async () => {
    this.setState({loading: true})
    const project = this.props.list.get(this.state.editIndex - 1)
    const id = project.get('_id'), memberList = project.get('members').toJS();
    if (this.state.memberNeedSave) {
      return false;
      const {success} = await saveProjectMember(id, memberList)
      success && message.info('已保存修改的数据')
    }
    this.setState({memberNeedSave: false, loading: false, showAddMemberModal: false})
  }
  /**
   * @param member {immutable.Map}
   * @param checked {boolean}
   * */
  handleMemberClick = (member, checked) => {
    member = member.filter((value, key) => key === 'userid' || key === 'name')
    //启用,推送member到memberInProject
    //可编辑状态下index会比原始index多1
    let state
    if (checked) {
      state = this.props.list.updateIn([this.state.editIndex - 1, 'members'], (list = ImmutableList()) => list.push(member))
    }
    //禁用 移除memberInProject
    else {
      state = this.props.list.updateIn([this.state.editIndex - 1, 'members'], (list = ImmutableList()) => list.filter(el => el.get('userid') !== member.get('userid')))
    }
    if (!this.state.memberNeedSave)
      this.setState({memberNeedSave: true})
    this.props.dispatch({type: ChangeProjectList, payload: state})
  }
  textFormDispatch=(fieldInfo)=>{
    if(fieldInfo&&!fieldInfo.error&&!fieldInfo.dirty){
      let payload=this.props.list,index=this.state.editIndex - 1;
      payload=payload.update(index,map=>map.set(fieldInfo.name,fieldInfo.value))
      this.props.dispatch({type: ChangeProjectList, payload})
    }
  }

  dateFormDispatch=({value,...rest}={})=>{
    if(value&&rest&&!rest.error&&!rest.dirty){
      this.textFormDispatch({value:value.format('YYYY-MM-DD'),...rest})
    }
  }


  handleFormFieldsChange = (projectInfo) => {
    if (!this.state.projectNeedSave)
      this.setState({projectNeedSave: true});
    projectInfo.projectManager&&this.textFormDispatch(projectInfo.projectManager);
    projectInfo.name&&this.textFormDispatch(projectInfo.name);
    projectInfo.startDate&&this.dateFormDispatch(projectInfo.startDate);
    projectInfo.dbType&&this.textFormDispatch(projectInfo.dbType);
    projectInfo.sever&&this.textFormDispatch(projectInfo.sever);
    projectInfo.dbPort&&this.textFormDispatch(projectInfo.dbPort);
    projectInfo.dbUser&&this.textFormDispatch(projectInfo.dbUser);
    projectInfo.dbPwd&&this.textFormDispatch(projectInfo.dbPwd);
    projectInfo.db&&this.textFormDispatch(projectInfo.db);
  };

  render () {
    const {loading:listLoading, list: projectList, memberList, hasAuth} = this.props
    const dataSource = projectList.toJS()
    const {showProjectEditModal,showAddMemberModal,loading,editIndex,pmList}=this.state;

    //权限检查
    hasAuth('add.project') && dataSource.unshift('')
    const memberModalProp = {
      title: '添加成员',
      visible: showAddMemberModal,
      onCancel: () => this.state.memberNeedSave ? message.warning('member not save') : this.setState({showAddMemberModal: false}),
      footer: hasAuth('edit.project') ? <Button type='primary'
                                                onClick={this.handleMemberSave}
                                                loading={loading} icon='save'>保存</Button> : null,
    }, projModalProp = {
      title: '编辑项目信息',
      okText: '保存项目信息',
      visible: showProjectEditModal,
      closable: false,
      onCancel: () => this.setState({showProjectEditModal: false}),
      footer: <Button type='primary'
                      onClick={this.handleProjectSave}
                      loading={loading} icon='save'>保存</Button>,
    }

    const {members: editMembers, ...editProject} = dataSource[editIndex] || {}
    return (<React.Fragment>
        <List
          loading={listLoading}
          rowKey="_id"
          grid={{gutter: 18, lg: 4, md: 3, sm: 2, xs: 1}}
          dataSource={dataSource}
          renderItem={(item, index) => (item ? (
              <List.Item key={item._id}>
                <ProjectItem
                  data={item}
                  pmList={pmList}
                  editable={hasAuth('edit.project')}
                  onMemberAddClick={() => this.showMemberModal(index)}
                  onEditClick={() => this.showProjectFormModal(index)}
                  onViewClick={this.handleProjectSelect}/>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton} onClick={this.handleProjectAdd}>
                  <Icon type="plus"/> 新增项目
                </Button>
              </List.Item>
            )
          )}
        />
        <Modal {...memberModalProp}>
          <MemberList
            memberList={memberList}
            memberInProject={editMembers}
            onMemberClick={this.handleMemberClick}
            editable={hasAuth('edit.member')}
          />
        </Modal>
        <Modal  {...projModalProp}  bodyStyle={{padding:'12px 24px'}}>
          <ProjectEditForm
            project={editProject}
            onFormFieldsChange={this.handleFormFieldsChange}
            pmList={this.state.pmList}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(state => {
  const projectized = state.get('projectized').toObject()
  return {
    hasAuth: authConnect(state, 'projectized'),
    ...projectized,
  }
})(ProjectList)