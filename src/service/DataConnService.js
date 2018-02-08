// import {requestJSON} from './index'
import dbConnList from '../routes/DataSource/DataConn/demoData/dataConnList.json'
import {requestJSON,apiPrefix,serverPrefix,requestForm} from './index'
import isArray from 'lodash/isArray'
import {conversionConn} from '../routes/DataSource/tools/conversion'

/**
 * 查询数据库类型
 * @returns {Promise}
 */
export  async  function queryDSTypeList() {
    return  requestJSON(apiPrefix + '/database/typeList');
}

/**
 * 查询数据连接
 * @returns {Promise}
 */
export  async  function queryDataConnList() {
    return  requestJSON(apiPrefix+'/database/list');
}

/**
 * 测试数据连接是否可以连接
 * @param option
 * @returns {Promise.<void>}
 */
export async function textConn(conn){
    const connParam = conversionConn(conn);
    return await requestForm( serverPrefix + '/ds/test',{connectInfo:connParam});
}

/**
 * 添加数据连接
 * @param option
 * @returns {Promise}
 */
export async function saveConn(option){

    return  requestJSON(apiPrefix+'/database/insert',{method:'POST',body:option});

}

/**
 * 编辑数据连接
 * @param option
 * @returns {Promise}
 */
export async function updateConn(options){
    return  requestJSON(apiPrefix+'/database/update',{method:'POST',body:options});
}

/**
 * 删除数据连接
 * @param option
 * @returns {Promise}
 */
export async function deleteConn(id){
    return  requestJSON(apiPrefix+'/database/deleteById/'+id);
}


//     return new Promise(function (resolve,reject) {
//         setTimeout(()=>{
//             resolve({success:true,msg:'删除成功'})
//         },500);
//     })
// }


/**
 * 通过数据库连接信息查询
 * @param dbConn
 * @returns {Promise}
 */
export async function queryDbListByDbConn(dbConn){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:["ydp-test","ydp-demo","ydp-api","ydp-prototype"]})
        },500);
    })
}

/**
 * 通过数据库连接信息查询所有表
 * @param dbConn
 * @returns {Promise}
 */
export async function queryTableListByDbConn(conn){

    return  requestForm(serverPrefix + '/ds/loadTables',{connectInfo:conversionConn(conn)});
}


/**
 * 通过数据连接信息 和表名查询表字段信息
 * @param dbConn
 * @param tableName
 * @returns {Promise}
 */
export async function queryFieldsByDBConnAndTablename(dbConn,tableName){
    const connParam = conversionConn(dbConn);
    let param = {...connParam,tableName:[tableName]};
    let tablesField = await  requestForm( serverPrefix + '/ds/desc',{connectInfo:param});
    // "COLUMN_NAME":"ID","DATA_TYPE":"VARCHAR","COMMENTS":""
    let tableFields = tablesField[tableName.toUpperCase()];
    if(isArray(tableFields) && tableFields.length > 0){
         tableFields = tableFields.map(e=>({name:e.COLUMN_NAME,type:e.DATA_TYPE,comments:e.COMMENTS}));
        return {success:true,data:tableFields}
    }else{
        return {success:false,msg:tableName + "表未查询到字段"}
    }

}

/**
 * 通过数据连接信息 和表名查询表数据
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function queryDataByDBConnAndTablename(dbConn,table){

    const connParam = conversionConn(dbConn);
    connParam.tableName = table;
    try{
        let tablesField = await  requestForm( serverPrefix + '/ds/list',{connectInfo:connParam});
        return {success:true,data:tablesField.data}
    }catch (e){
        return {success:false,msg:'获取数据失败'}
    }

    // return new Promise(function (resolve,reject) {
    //     setTimeout(()=>{
    //         resolve({success:true,data:tableData})
    //     },500);
    // })
}

/**
 * 通过数据连接信息 和表名查询表数据
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function getDBConnById(dbConnId){
    return  requestJSON(apiPrefix +'/database/getById/' + dbConnId);
}


/**
 * 创建SQL视图，并且返回视图字段信息
 * @param conn
 * @param viewName
 * @param sql
 * @returns {Promise}
 */
export async function createView(conn,viewName,sql){
    const connParam = conversionConn(conn);
    connParam.viewName = viewName;
    let tableFieldsRep = await requestForm( serverPrefix + '/ds/createView',{connectInfo:connParam,sql});
    if(tableFieldsRep.ok){
       return {success:true,data:tableFieldsRep.other[viewName.toUpperCase()]}
    }else{
        return {success:false,msg:tableFieldsRep.msg}
    }
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
 * 通过连接ID查询Cube
 * @param dbConnId
 * @returns {Promise}
 */
// export async function queryCubeByDbConnId(dbConnId){
//     return new Promise(function (resolve,reject) {
//         setTimeout(()=>{
//             resolve({success:true,data:cubeList})
//         },500);
//     })
// }

/**
 * 通过数据连接ID 和 SQL视图ID，查找视图的字段信息
 * @param connId
 * @param sqlId
 * @returns {Promise}
 */
export async function queryFieldsByConnIDAndSqlID(connId,sqlId){
    return new Promise(function (resolve,reject) {
        const conn = dbConnList.filter(e => e.id === connId)[0];
        const sqlTable = conn.sqlTables.filter(e => e.id === sqlId)[0];
        setTimeout(()=>{
            resolve({success:true,data:sqlTable.fields})
        },500);
    })
}