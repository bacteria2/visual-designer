import {requestJSON,apiPrefix,serverPrefix,requestForm} from './index'
import {conversionConn} from '../routes/DataSource/tools/conversion'
/**
 * 通过ID查找MDX
 * @param id
 * @returns {Object}
 */
export function getMdxById(id){
    return  requestJSON(apiPrefix + '/mdx/getById/' + id);
}

/**
 * 添加MDX
 * @param mdx
 * @returns {Object}
 */
export  function addMdx(mdx){
    return  requestJSON(apiPrefix + '/mdx/insert/' ,{method:'POST',body:mdx});
}

/**
 * 更新MDX
 * @param mdx
 * @returns {Object}
 */
export async function updateMdx(mdx){
    return  requestJSON(apiPrefix + '/mdx/update/' ,{method:'POST',body:mdx});
}

/**
 * 删除MDX
 * @param id
 * @returns {Object}
 */
export function deleteMdx(id){
    return  requestJSON(apiPrefix + '/mdx/deleteById/' + id);
}

/**
 * 查看宽表
 * @param conn
 * @param sql
 */
export async function wideTable(conn,sql){
    const connParam = conversionConn(conn);
    connParam.sql = sql;
    let rep = await requestForm( serverPrefix + '/ds/wideTable',{connectInfo:connParam});
    if(rep.data){
        return {success:true,data:rep.data}
    }else{
        return {success:false,msg:'宽表查询失败'}
    }
}

export async function loadDataSet(params){
    let rep = await requestForm( serverPrefix + '/cube/execute',params);
    if(rep.data){
        return {success:true,data:rep.data}
    }else{
        return {success:false,msg:'获取dataSet失败'}
    }
}