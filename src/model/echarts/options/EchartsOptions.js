/**
 * Created by lenovo on 2017/5/15.
 */

const options={
  axis:{
    //坐标轴名称显示位置
    location:[{name:"头部",value:"start"},{name:"居中",value:"middle"},{name:"尾部",value:"end"}],
    //轴的位置。
    position:[{name:"左",value:""},{name:"右",value:"right"}],
    //坐标轴类型
    type:[{name:"数值",value:"value"},{name:"类目",value:"category"},{name:"时间",value:"time"},{name:"对数",value:"log"}]
  },
  line:{
    type:[{name:"实现",value:"solid"},{name:"虚线",value:"dashed"},{name:"点",value:"dotted"}]
  }

}

export default options
