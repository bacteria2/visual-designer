/**
 * Created by lenovo on 2017/7/7.
 */
export default {
  watch:{
    //usedIndex更新的时候，重新计算nextIndex
    usedIndex(){
      this.updateIndex();
    }
  },
 /* computed:{
    /!**
     * 返回一个默认排序的列表
     * *!/
    usedIndex(){
      return  this.list.map(el=>el.id).sort()
    }
  },*/
  data(){
    return {
      list:[],
      nextIndex:0,
    }
  },
  methods:{
    /**
     * 更新nextIndex
     * */
    updateIndex(){
      if(this.usedIndex.length===0)
        this.nextIndex=0
      else {
        let mid=0;
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
