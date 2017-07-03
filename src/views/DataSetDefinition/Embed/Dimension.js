export default{

  props:{
    dataItems:Array,
    show:Boolean
  },
  render(h){
    return (
      <mu-dialog open={this.show} title="维度配置" dialogClass="data-definition-column">
        <div>
          <v-btn onClickNative={this.addNewDimension}>新增</v-btn>
        </div>
        <div style="height: calc(100% - 48px)" id="dimension-table">
          <el-table data={this.dataItems} stripe
                    max-height={columnTableHeight}
                    style={{'max-height': props.columnTableHeight + 'px!important'}}>
            <el-table-column prop="name" label="维度名"/>
            <el-table-column prop="alias" label="别名"/>
            <el-table-column label="列名">
              <template scope="scope">
                {scope.row.columnNames.map(el => el.name).join(',')}
              </template>
            </el-table-column>
            <el-table-column label="控制" width={160}>
              <template scope="scope">
                <el-button size="small" type="info" onClick={listener.dimensionEdit(scope.$index, scope.row)}>编辑</el-button>
                <el-button size="small" type="danger" onClick={listener.dimensionDelete(scope.$index, scope.row)}>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <v-btn slot="actions" primary onClickNative={props.show = false} style="color: white">关闭</v-btn>
      </mu-dialog>
    )
  },
  data(){
    return {
      singleDimension: {name: "维度x", alias: "",columnNames:[{name:"列1",index:0},{name:"lie2",index:1}]},
    }
  },
  methods:{
    addNewDimension(){
      let dimension = {name: "维度x", alias: "",columnNames:[{name:"列1",index:0},{name:"lie2",index:1}]};
      //添加记录
      this.sourceInfo.dataItems.push(dimension);
      this.singleDimension = dimension;
    },
    dimensionEdit(index){
      this.singleDimension = this.sourceInfo.dataItems[index];
      this.showColumnInfo = true
    },
    dimensionDelete(index){
      //删除这一列的记录
      this.sourceInfo.dataItems.splice(index, 1)
    }
  }
}
