import {requestJSON,apiPrefix} from './index'

/**
 * @returns {Promise}
 */
export  function queryTableSchemaList(projectId){
    return  requestJSON(apiPrefix + '/tableSchema/list/' + projectId);
}

/**
 * 通过ID查找
 * @param id
 * @returns {Object}
 */
export function getTableSchemaById(id){
    return  requestJSON(apiPrefix + '/tableSchema/getById/' + id);
}

/**
 * @param TableSchema
 * @returns {Object}
 */
export  function addTableSchema(TableSchema){
    return  requestJSON(apiPrefix + '/tableSchema/insert/' ,{method:'POST',body:TableSchema});
}

/**
 * @param TableSchema
 * @returns {Object}
 */
export async function updateTableSchema(TableSchema){
    return  requestJSON(apiPrefix + '/tableSchema/update/' ,{method:'POST',body:TableSchema});
}

/**
 * @param id
 * @returns {Object}
 */
export function deleteTableSchema(id){
    return  requestJSON(apiPrefix + '/tableSchema/deleteById/' + id);
}

