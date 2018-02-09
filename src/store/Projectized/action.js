import { getUserList } from '../../service/user';
import { queryProjects } from '../../service/ProjectizedService';
import Immutable from 'immutable';

export const ChangeLoading='PROJECTIZED_CHANGE_LOADING';
export const ChangeMemberList='PROJECTIZED_CHANGE_MEMBER_LIST';
export const ChangeProjectList='PROJECTIZED_CHANGE_PROJECT_LIST';
export const ChangeCurrentProject='PROJECTIZED_CHANGE_CURRENT_PROJECT';


export function fetchProject(userId){
  return async dispatch=>{
    const {success:projSuccess,data:list}= await queryProjects()
    const  {success:memberSuccess,data:memberList}=await getUserList({userType: ['developer']})
    if(projSuccess&&memberSuccess){
      dispatch({type:ChangeProjectList,payload:Immutable.fromJS(list)})
      dispatch({type:ChangeMemberList,payload:Immutable.fromJS(memberList)})
      dispatch({type:ChangeLoading,payload:false})
    }
  }
}