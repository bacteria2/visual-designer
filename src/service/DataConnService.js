// import {requestJSON} from './index'
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

export async function getDimensionAndDataSetByUrl({url}){
    return new Promise(function (resolve,reject) {
            const dimension = ['product', '2012', '2013', '2014', '2015', '2016', '2017'];
            const dataSet =  [['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]];
            resolve({success:true,dimension,data:isArray(dataSet)?dataSet:[]})})
}
