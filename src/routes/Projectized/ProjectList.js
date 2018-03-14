import React, { Component } from 'react'
import { Icon, Modal, Button, List } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { message } from 'antd/lib/index'
import { saveProject, saveProjectMember ,deleteProject } from '../../service/ProjectizedService'
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
    editProject:{},
  }

  componentDidMount () {
    this.props.dispatch(fetchProject())
    getUserList({userType: ['pm']}).then(({success, data}) => success && this.setState({pmList: data}))
  }

  showMemberModal (index) {
    this.setState({showAddMemberModal: true, editIndex: index})
  }

  showProjectFormModal (index) {
     // 把项目对象从 REDUX 中获取出来
      if(index-1>=0){
          let list = this.props.list;
          this.setState({editProject:list.get(index-1).toJS()});
      }
      // 把dbOption 属性提取出来
      this.setState({showProjectEditModal: true, editIndex: index-1})
  }

  //打开新项目编辑窗口
  handleProjectAdd = () => {
    // this.props.dispatch({type: ChangeProjectList, payload: this.props.list.unshift(Immutable.fromJS({}))})
    this.setState({editProject:{}});
    this.showProjectFormModal(0)
  }
  //表单字段改变时保存值
  handleFieldsChange= (value) => {
    this.setState({projectNeedSave: true});
    const oldData=this.state.editProject;
    if(value.name){
        oldData.name=value.name.value;
        this.setState({editProject:oldData});
    }
    if(value.startDate&&value.startDate.value){
        oldData.startDate=value.startDate.value.format('YYYY-MM-DD');
        this.setState({editProject:oldData});
    }
  }

  //选中某个项目后,跳转到实例页,并且将当前项目提交到redux
  handleProjectSelect = (projectInfo) => {
    this.props.dispatch({type: ChangeCurrentProject, payload:Map({id: projectInfo._id, name: projectInfo.name,projectUrl:projectInfo.projectUrl})});
    sessionStorage.setItem('currentProject',JSON.stringify({id: projectInfo._id, name: projectInfo.name,projectUrl:projectInfo.projectUrl}));
    this.props.history.push('/widget/list/2d')
  }
  //删除项目
  deleteProject = async (index) => {
      this.setState({loading: true});
      const project = this.props.list.get(index - 1);
      const id = project.get('_id');
      const {success} = await deleteProject(id);
      if(success){
          message.info('已保存修改的数据');
          this.props.dispatch(fetchProject())
      }
      this.setState({memberNeedSave: false, loading: false, showAddMemberModal: false})
  }
  //保存项目
  handleProjectSave = async () => {
    this.setState({loading: true})
    if(!this.state.editProject.name){
        message.error('项目名称必填，请确认！');
        this.setState({loading: false});
        return false;
    }
    //获取当前编辑项目
    if(this.state.projectNeedSave){
      const time=new moment(new Date()).format("YYYY-MM-DD");
      const saveData = this.state.editProject;
      if(!this.state.editProject.startDate){
          saveData.startDate=time;
      }
      const {success} = await saveProject(saveData);
      if(success){
        message.info('已保存修改的数据');
        this.props.dispatch(fetchProject())
      }
    }
    this.setState({projectNeedSave: false, loading: false, showProjectEditModal: false})
  }

  handleMemberSave = async () => {
    this.setState({loading: true})
    const project = this.props.list.get(this.state.editIndex - 1)
    const id = project.get('_id'), memberList = project.get('members').toJS();
    if (this.state.memberNeedSave) {
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

  render () {
    const {loading:listLoading, list: projectList, memberList, hasAuth} = this.props
    const dataSource = projectList.toJS()
    const {showProjectEditModal,showAddMemberModal,loading,editIndex}=this.state;

    //权限检查
    hasAuth('add.project') && dataSource.unshift('');
    const memberModalProp = {
      title: '添加成员',
      visible: showAddMemberModal,
      onCancel: () => this.state.memberNeedSave ? message.warning('member not save') : this.setState({showAddMemberModal: false}),
      footer: hasAuth('edit.project') ? <Button type='primary'
                                                onClick={this.handleMemberSave.bind(this)}
                                                loading={loading} icon='save'>保存</Button> : null,
    }, projModalProp = {
      title: '编辑项目信息',
      okText: '保存项目信息',
      visible: showProjectEditModal,
      closable: false,
      onCancel: () => this.setState({showProjectEditModal: false}),
      footer: <Button type='primary'
                      onClick={this.handleProjectSave.bind(this)}
                      loading={loading} icon='save'>保存</Button>,
    }

    const {members: editMembers} = dataSource[editIndex] || {};
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
                  editable={hasAuth('edit.project')}
                  deleteable={hasAuth('delete.project')}
                  onMemberAddClick={() => this.showMemberModal(index)}
                  onEditClick={() => this.showProjectFormModal(index)}
                  onDeleteClick={() => this.deleteProject(index)}
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
            project={this.state.editProject}
            onSave={this.handleFieldsChange}
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