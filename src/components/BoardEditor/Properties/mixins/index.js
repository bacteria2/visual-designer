import store from "@/store"
import debounce from 'lodash/debounce'
export default {
  props:{
    propName:String,
    model:Object,
    name:String,
    binding:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      value:undefined
    }
  },
  watch:{
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
        if(this.binding)
          this.render();
      }
    },
    initValue(){
      if(this.model&&this.propName){
        this.value = this.model[this.propName];
      }
    },
    render:debounce(()=>{
      let editExtendObj = null;
      store.dispatch("getEditExtendObj").then(data=>{
        if(data){
          data.render();
        }
      });
    },1000,{leading: true})
  }
}
