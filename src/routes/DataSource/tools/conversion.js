//将数据源连接转换成服务所需的参数
export  function conversionConn(conn){
    return  {
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
}

//将CUBE转换成服务所需的参数
export function conversionCube(cube) {

    const cubeName = cube.name;
    const sql = cube.viewSql;
    const viewName = cube.viewName?cube.viewName:cube.name;
    const filterDimension = cube.pivotSchema.dimensions.filter(e=>(!e.disable));
    const filterMeasures = cube.pivotSchema.measures.filter(e=>(!e.disable));
    const dimensions = filterDimension.map(e => ({name:e.tableId + '_' + e.field,alias:e.alias,dataType:e.dataType}));
    let measures = filterMeasures.map(e => ({name:e.tableId + '_' + e.field,
        alias:e.alias,
        dataType:e.dataType
        ,aggregator:e.aggregator}));

    return {cubeName,sql,dimensions,measures,viewName}
}

