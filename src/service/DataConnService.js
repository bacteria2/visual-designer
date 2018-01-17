// import {requestJSON} from './index'
import dbConnList from '../routes/DataSource/DataConn/demoData/dataConnList.json'
import tableData from '../routes/DataSource/DataConn/demoData/tableData.json'
import tableFields from '../routes/DataSource/DataConn/demoData/tableFields.json'


/**
 * 查询数据连接
 * @returns {Promise.<void>}
 */
export  async  function queryDataConnList() {
    // return  requestJSON('/visual/api/dbConnList');
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve({ success: true, data: dbConnList, msg: '连接成功' })
        }, 500)
    });
}
/**
 * 测试数据连接是否可以连接
 * @param option
 * @returns {Promise.<void>}
 */
export async function textConn(option){
    console.log("连接参数:",option);
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'连接成功'})
        },500);
    })
}

/**
 * 添加数据连接
 * @param option
 * @returns {Promise}
 */
export async function saveConn(option){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'保存成功'})
        },500);
    })
}

/**
 * 编辑数据连接
 * @param option
 * @returns {Promise}
 */
export async function updateConn(option){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'修改成功'})
        },500);
    })
}

/**
 * 删除数据连接
 * @param option
 * @returns {Promise}
 */
export async function deleteConn(id){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,msg:'删除成功'})
        },500);
    })
}


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
 * 通过数据库连接信息查询
 * @param dbConn
 * @returns {Promise}
 */
export async function queryTableListByDbConnAndDbName(dbConn,db){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:["userInfo","role","orgInfo","right"]})
        },500);
    })
}


/**
 * 通过数据连接信息 和表名查询表字段信息
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function queryFieldsByDBConnAndTablename(dbConn,table){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:tableFields})
        },500);
    })
}

/**
 * 通过数据连接信息 和表名查询表数据
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function queryDataByDBConnAndTablename(dbConn,table){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:tableData})
        },500);
    })
}

/**
 * 通过数据连接信息 和表名查询表数据
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function getDBConnById(dbConnId){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:dbConnList.filter(e => e.id === dbConnId)[0]})
        },500);
    })
}


/**
 * 通过SQL语句，查询数据源的字段信息 (服务)
 * @param dbConn
 * @param table
 * @returns {Promise}
 */
export async function queryFieldsByConnAndSql(conn,sql){
    return new Promise(function (resolve,reject) {
        setTimeout(()=>{
            resolve({success:true,data:tableFields})
        },500);
    })
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