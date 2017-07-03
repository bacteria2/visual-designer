import AutoIncrementIndex from './AutoIncrementIndex'

export default {
  mixins:[AutoIncrementIndex],
  computed:{
    /**
     * 返回一个默认排序的列表
     * */
    usedIndex(){
      return  this.sourceInfo.dataItems.filter(el=>el.type===2).map(el=>el.id).sort()
    }
  },
  data(){
    return {
      singleDimension: {id:1,name: "", alias: "",columnNames:[],transferToObject:false},
      showDimensionInfo:false,
      showDimensionEdit:false,
    }
  },
  methods:{
    /**
     * 自动生成的维度类型为1，名称固定为维度+列index
     * */
    dimensionGenerated(columns){
      return columns.map((el,index)=>({id:index,name:"维度"+(index+1),alias:el.name,columnNames:[index],type:1,transferToObject:false}))
    },
    /**
     * 新增的维度为自定义维度,该维度的类型为2，且包含id记录
     * */
    addNewDimension(){
      let id=this.nextIndex;
      let dimension = {name: "自定义维度"+id, alias: "自定义维度",columnNames:[],type:2,id,transferToObject:false};
      //添加记录
      this.sourceInfo.dataItems.push(dimension);
      this.singleDimension = dimension;
      this.updateIndex();
    },
    dimensionEdit(index){
      this.singleDimension = this.sourceInfo.dataItems[index];
      this.showDimensionEdit = true
    },
    dimensionDelete(index){
      //删除这一列的记录
      this.sourceInfo.dataItems.splice(index, 1)
    },
  }

}
