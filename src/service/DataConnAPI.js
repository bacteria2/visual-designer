import requestJSON from './index'

/**
 * 所有查询数据连接
 * @returns {Promise.<void>}
 */
export async  function queryDataConnList(){
    return requestJSON('src/routes/DataSource/demoData/dataConnList.json');
}