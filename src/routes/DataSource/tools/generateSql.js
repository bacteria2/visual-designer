export function generateSql(tables,hideDisable) {

    return main(tables);

    //拼凑表关系SQL
    function main(tables){

        const currentFields = concatIdnFields(tables.fields,tables);

        let joinFields = "";
        let joinViewFields = "";
        let joinSql = "";
        let joinFieldsDic = [];

        if(tables.children && tables.children.length>0){
            tables.children.forEach((e,i)=>{

                const result = recursion(e);

                if(i >0 ) {
                    // joinFields+=" , ";
                    // joinSql+="  ";
                    joinFields+=" , \r\n";
                    joinSql+="  \r\n";
                }

                joinFields += result.fields;
                joinViewFields += result.viewFields;
                joinSql += result.joinSql;
                joinFieldsDic = joinFieldsDic.concat(result.fieldsDic);
            });
        }

        // const prefix = "select " + currentFields.sqlFields + (joinFields?", " + joinFields:' ') + " from " + tables.name + "  " + tables._id;
        const prefix = "select " + currentFields.sqlFields + (joinFields?",\r\n" + joinFields:' ') + "\r\n from " + tables.name + "  " + tables._id;

        return {
            sql:prefix + joinSql,
            fields:currentFields.viewFields + ",\r\n" + joinViewFields,
            // fields:currentFields.viewFields + ", " + joinViewFields,
            fieldsDic:currentFields.fieldsDic.concat(joinFieldsDic),
        }

    }

    //递归表格拼凑JOIN视图SQL
    function recursion(table){

        // let joinSql = ' ' +table.join.method.toUpperCase() + ' JOIN ' ;
        let joinSql = '\r\n ' +table.join.method.toUpperCase() + ' JOIN ' ;

        const concatFields = concatIdnFields(table.fields,table);

        let subFieldsDic = [];

        let childFieldsStr = concatFields.sqlFields;

        // let condition = " on ";
        let condition = "\r\n on ";

        if(table.children && table.children.length>0){
            const subQuery = true;
            const result = main(table,subQuery);

            subFieldsDic = subFieldsDic.concat(result.fieldsDic);
            //生成子查询
            joinSql += '(' + result.sql + ")";
            childFieldsStr = result.fields;

            //生成连接条件
            condition += generateCond(table.join,table._id,true);
        }else{
            condition += generateCond(table.join,table._id,false);
            joinSql +=  table.name ;

        }

        joinSql  += '  ' + table._id;

        joinSql  += condition;

        return {fields:childFieldsStr
            ,joinSql
            ,viewFields:concatFields.viewFields
            ,fieldsDic:concatFields.fieldsDic.concat(subFieldsDic)}

    }

    function concatIdnFields(fields,table){

        let sqlFields = "",viewFields = "",fieldsDic=[];

        fields.forEach((e,i)=>{
            if(!hideDisable || !e.disable) {
                // sqlFields += " ,  " + table._id + "." + e.name + " as " + table._id + "_" + e.name;
                sqlFields += " , \r\n " + table._id + "." + e.name + " as " + table._id + "_" + e.name;
                // viewFields += " ,  " + table._id + "_" + e.name;
                viewFields += " , \r\n "+ table._id + "_" + e.name;
                fieldsDic.push({
                    alias:e.name,
                    table:table.name,
                    generateField:table._id + "_" + e.name})
            }
        });
        sqlFields = sqlFields.replace(',','');
        viewFields = viewFields.replace(',','');

        return {sqlFields,viewFields,fieldsDic}
    }

    function generateCond(join,tableId,Subquery){
        const parentId = join.parentId;
        const conditions = join.conditions;
        if(conditions.length > 1){
            return conditions.reduce((a,b,i) => {
                if(i===1) {
                    a = parentId + "." + a.left + "=" + (Subquery ? tableId + "_" + a.right : tableId + "." + a.right);
                }
                return a + " and " + parentId + "." + b.left + "=" + (Subquery ? tableId + "_" + b.right : tableId + "." + b.right);
            });
        }else{
            return  parentId + "." + conditions[0].left + "=" + (Subquery ? tableId + "_" + conditions[0].right : tableId + "." + conditions[0].right);
        }
    }
};