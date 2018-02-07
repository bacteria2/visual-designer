import { accountLogin,getLoginUser, userLogout } from '../../service/user'


export const ChangeSubmitting = 'LOGIN_LOGIN_SUBMITTING'
export const ChangeStatus = 'LOGIN_CHANGE_LOGIN_STATUS'


const changeSubmit=(sumit)=>({type:ChangeSubmitting,payload:sumit})

export const saveStatus=(status=4,redirectTarget='/')=>({type:ChangeStatus,payload:{status,redirectTarget}})

//userType中有admin的跳转到userlist 其他跳转myproject
export const saveStatusWithUser=(user)=>saveStatus(user.status===1?1:4,user.userType.some(type=>type==='admin')?'/designer/userlist':'/designer/myproject')



export function userAccountLogin (user) {
  return async dispatch => {
    dispatch(changeSubmit(true))
    //首次登陆则请求登陆接口
    let {success=false,data:loginUser} = await accountLogin(user)
    success?dispatch(saveStatusWithUser(loginUser)):dispatch(saveStatus())
    dispatch(changeSubmit(false))
  }
}

export function logout () {
  return async dispatch=>{
    let {success}=await userLogout()
    if(success)
      dispatch(saveStatus(2))
  }
}