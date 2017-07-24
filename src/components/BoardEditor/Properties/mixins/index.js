export default {
  props:{
    propName:String,
    model:Object,
    name:String
  },
  data(){
    return{
      value:undefined
    }
  },
  watch:{
    value(e){
      if(this.model&&this.propName){
        this.model[this.propName] = e;
        this.model.count++;
      }
    },
    model(){
      this.initValue();
    }
  },
  mounted(){
    this.initValue();
  },
  methods:{
    setValue(e){
      if(this.model&&this.propName){
        this.model[this.propName] = e;
        this.model.count++;
      }
    },
    initValue(){
      if(this.model&&this.propName){
        this.value = this.model[this.propName];
      }
    }
  }
}
