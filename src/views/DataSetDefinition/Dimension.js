import AutoIncrementIndex from './AutoIncrementIndex'

export default {
  mixins:[AutoIncrementIndex],
  computed:{

  },
  data(){
    return {
      singleDimension: {id:1,name: "", alias: "",columnNames:[],transferToObject:false,toValue:false},
      autoGeneration:false,
      showDimensionInfo:false,
      showDimensionEdit:false,
      dimensionHeight: 600,
      editCustomDataItemIndex:0
    }
  },
  methods:{
    /**
     * 内置数据集自动生成的维度类型为1，名称固定为维度+列index
     * */
    dimensionGenerated(columns){
      return columns.map((el,index)=>({id:index,name:"维度"+(index+1),alias:el.name,columnNames:[index],type:1,transferToObject:false,toValue:false}))
    },
    /**
     *
     *
     * */

    /**
     * 新增的维度为自定义维度,该维度的类型为2，且包含id记录
     * */
    addEmbedDimension(){
      let dimension = {name: "自定义维度", alias: "自定义维度",columnNames:[],type:2,transferToObject:false,toValue:false};
      this.dimensionAdd(dimension)
    },
    addServerSideDimension(){
      //接口维度默认为取列值，所以type为0
      //type:0:取列的值 1:函数,2:合并成数组列表,3：合并成对象数组 4 key-value映射 5 自定义公式
      let dimension = {
        name: "自定义接口维度", alias: "自定义维度",type:1
       /* dataFilter:[],formatter:[]*/
        };
      this.dimensionAdd(dimension)
    },
    dimensionAdd(dimension){
      let id=this.nextIndex;
      dimension.id=id;dimension.name+=id;
      this.sourceInfo.dataItems.push(dimension);
      this.singleDimension = dimension;
      this.updateIndex();
    },
    dimensionEdit(index){
      this.editCustomDataItemIndex = index;
      this.singleDimension = this.sourceInfo.dataItems[index];
      this.showDimensionEdit = true
    },
    dimensionDelete(index){
      //删除这一列的记录
      this.sourceInfo.dataItems.splice(index, 1)
    },
  }

}
