export default {
  props:{
    targetObj:Object
  },
  watch:{
    'options.count'(){
      this.targetObj.render();
    }
  }
}
