import cubeList from '../routes/DataSource/Cube/CubeList/demoData/cubeList.json'
import {requestJSON, apiPrefix, requestForm,serverPrefix} from './index'
import {conversionConn,conversionCube} from '../routes/DataSource/tools/conversion'
/**
 * 查询所有Cube
 * @returns {Promise}
 */
export  function queryCubeList(projectId){
    return  requestJSON(apiPrefix + '/cube/list/' + projectId);
}

/**
 * 创建MDX 和 视图
 * @returns {Promise}
 */
export  function creatViewAndMdx(dbConn,cube){
    const connParam = conversionConn(dbConn);
    const cubeInfo = conversionCube(cube);
    return requestForm(serverPrefix + '/cube/createCube',{json:{connect:connParam,cubeInfo}});
}

/**
 *
 * @param conn
 * @param viewName
 * @returns {Promise.<*>}
 */
export async function deleteView(conn,viewName){
    const connParam = conversionConn(conn);
    connParam.viewName = viewName;
    let tableFieldsRep = await requestForm( serverPrefix + '/ds/deleteView',{connectInfo:connParam});
    if(tableFieldsRep.ok){
        return {success:true,msg:'视图删除成功'}
    }else{
        return {success:false,msg:tableFieldsRep.msg}
    }
}

/**
 * 通过分类ID查询CUBE
 * @returns {Promise}
 */
export function queryCubesByCategory(categoryId){
    return  requestJSON(apiPrefix + '/cube/queryByCategoryId/'+categoryId);
}
/**
 * 添加Cube
 * @returns {Promise}
 */
export function addCube(cube){
    return  requestJSON(apiPrefix + '/cube/insert',{method:'POST',body:cube});
}

/**
 * 修改Cube
 * @returns {Promise}
 */
export async function updateCube(cube){
    return  requestJSON(apiPrefix + '/cube/update',{method:'POST',body:cube});
}

/**
 * 删除Cube
 * @returns {Promise}
 */
export async function deleteCubeById(cubeId){
    return  requestJSON(apiPrefix + '/cube/deleteById/' + cubeId);
}

/**
 * 根据ID查找Cube
 * @returns {Promise}
 */
export async function seleteCubeById(cubeId){
    return  requestJSON(apiPrefix + '/cube/getById/' + cubeId);
}

/**
 * 通过CUBE id查找 数据连接
 * @returns {Promise}
 */
export async function seleteConnByCubeId(cubeId){
    return  requestJSON(apiPrefix + '/cube/getDBbyCubeId/' + cubeId);

}

/**
 * 重命名Cube
 * @returns {Promise}
 */
export async function renameCubeById(cubeId,name){
    return  requestJSON(apiPrefix + '/cube/update',{method:'POST',body:{_id:cubeId,name}});
}

/**
 * 查询Cube分类
 * @returns {Promise}
 */
export async function queryCubeCategory(projectId){
    return  requestJSON(apiPrefix + '/cubeCategory/list/' + projectId );
}

/**
 * 添加Cube分类
 * @returns {Promise}
 */
export async function addCubeCategory(category){
    return  requestJSON(apiPrefix + '/cubeCategory/insert',{method:'POST',body:category});
}

/**
 * 修改Cube分类
 * @returns {Promise}
 */
export async function updateCubeCategory(category){
    return  requestJSON(apiPrefix + '/cubeCategory/update',{method:'POST',body:category});
}

/**
 * 删除Cube分类
 * @returns {Promise}
 */
export async function deleteCubeCategory(categoryId){
    return  requestJSON(apiPrefix + '/cubeCategory/deleteById/'+categoryId);
}

/**
 * 通过表格ID，查询表格是否被应用于CUBE
 * @returns {Promise}
 */
export async function tableHasUsedByCube(tableId){

    function recursionTables(table){
        if(table.id === tableId) return true;
        if(table.children && table.children.length >0){
            let flag = false;
            table.children.forEach((e,i)=>{
                flag =  recursionTables(e);
            });
            return flag
        }
    }

    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            let data = cubeList.filter(e => {
                const tables = e.tables;
                if(tables){
                    return recursionTables(tables);
                }else{
                    return false
                }

            });
            resolve({success:true,data})
        },500);
    })
}



