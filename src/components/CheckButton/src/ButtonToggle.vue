<template>
  <div class="btn-group">
    <chk-btn v-for="(option, index) in inputOptions"
             :key="index"
             :data-index="index"
             :activated="option.activated"
             :text="option.text" @input="updateSelected"></chk-btn>
  </div>
</template>
<script>
  import ChkBtn from './CheckButton.vue'
  export default{
    name:"CheckGroup",

    components: {
      ChkBtn
    },
    props: {
      options: {
        type: Array,
        default(){return []}
      },
      //多选开关
      multiple: Boolean,
      value: {
        required: false
      }
    },
    computed: {
      inputOptions(){
        let opt = Array.of(...this.options)
        opt.forEach(optEl => {
          optEl.activated = false
          this.inputValue.forEach(el => {
            if (el === optEl.value)
              optEl.activated = true
          })
        })
        return opt
      }
    },
    watch: {
      inputValue(val){
        if (this.multiple)
          this.$emit("input", val)
        else
          this.$emit("input", val[0])
      }
    },
    data(){
      let inputValue, multiSelectSet = new Set();

      //初始化index为数组
      if (Array.isArray(this.value))
        inputValue = this.value
      else
        inputValue = [this.value];

      //将已经选中的内容放入set
      ((inputValue, options,set) => {
        inputValue.forEach(el=>{
          options.forEach((opt,index)=>{
            if(opt.value===el)
              set.add(index)
          })
        })
      })(inputValue,this.options,multiSelectSet);

      return {
        inputValue,
        multiSelectSet,
      }
    },
    methods: {

      updateSelected({activated: active, index}){
        let multi = this.multiple, tempValue = [], set = this.multiSelectSet, opt = this.options;
        //单选择的情况下数据更新
        if (!multi) {
          if (active) {
            tempValue = [opt[index].value]
          }
        }
        //多选情况下的数据更新
        else {
          if (active)
            set.add(index)
          else
            set.delete(index)
          set.forEach(el => {tempValue.push(opt[el].value)})
        }
        this.inputValue = tempValue;
      }
    }
  }
</script>
