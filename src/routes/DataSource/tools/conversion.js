import find from 'lodash/find'
//将数据源连接转换成服务所需的参数
export  function conversionConn(conn){
    if(conn.type === 'mysql' || conn.type === 'oracle'){
        return {
            type:conn.type.toUpperCase(),
            ip:conn.server,
            user:conn.account,
            password:conn.pwd,
            port:conn.port,
            database:conn.database,
            owner:conn.account,
            filePath:conn.file,
            beanId:conn.beanId,
        };
    }else{
        return conn
    }
}

//将CUBE转换成服务所需的参数
export function conversionCube(cube) {

    const {name:cubeName,viewSql:sql,viewName,schemaId} = cube;
    // const sql = cube.viewSql;
    // const viewName = cube.viewName;
    //分组
    let fieldInGroup=[];


    const groups = cube.pivotSchema.levels.map(e => {
        const name = e.name;

        let levels;
        if(cube.connType === 'bean'){
            levels= e.fields.map(fieldId => {
                fieldInGroup.push(fieldId);
                const field = cube.pivotSchema.dimensions.filter(e=>e.fieldId === fieldId)[0];
                const {alias,dataType } = field;
                return {name: field.field,alias,dataType}
            });
        }else{
            levels= e.fields.map(fieldId => {
                fieldInGroup.push(fieldId);
                const field = cube.pivotSchema.dimensions.filter(e=>e.fieldId === fieldId)[0];
                const {alias,dataType } = field;
                return {name:field.tableId + '_' + field.field,alias,dataType}
            });
        }


        return {name,levels}
    });


    const filterDimension = cube.pivotSchema.dimensions.filter(e=>{
        const fieldNotInGroup = (find(fieldInGroup,(field)=>(field===e.fieldId)) === undefined);
        return !e.disable && fieldNotInGroup
    });
    const filterMeasures = cube.pivotSchema.measures.filter(e=>{
        const fieldNotInGroup = (find(fieldInGroup,(field)=>(field===e.fieldId)) === undefined);
        return !e.disable && fieldNotInGroup
    });
    let dimensions;
    if(cube.connType === 'bean'){
        dimensions = filterDimension.map(e => ({name:e.field,alias:e.alias,dataType:e.dataType}));
    }else{
        dimensions = filterDimension.map(e => ({name:e.tableId + '_' + e.field,alias:e.alias,dataType:e.dataType}));
    }

    let measures;
    if(cube.connType === 'bean'){
        measures = filterMeasures.map(e => ({name:e.field,
            alias:e.alias,
            dataType:e.dataType
            ,aggregator:e.aggregator}));
    }else{
        measures = filterMeasures.map(e => ({name:e.tableId + '_' + e.field,
            alias:e.alias,
            dataType:e.dataType
            ,aggregator:e.aggregator}));
    }


    return {cubeName,sql,dimensions,measures,viewName,groups,schemaId}
}

