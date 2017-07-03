/**
 * Created by lenovo on 2017/7/3.
 */
export default {
  watch:{
    //usedIndex更新的时候，重新计算nextIndex,只适用自定义维度
    usedIndex(){
      this.updateIndex();
    }
  },
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
      nextIndex:1,
    }
  },
  methods:{
    /**
     * 更新nextIndex
     * */
    updateIndex(){
      if(this.usedIndex.length===0)
        this.nextIndex=1
      else {
        let mid=1;
        for(let val of this.usedIndex ){
          if(mid<=val&&mid+1>=val)
            mid=val;
          else
            break
        }
        this.nextIndex=mid+1;
      }
    },

  }

}
