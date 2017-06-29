<template>
  <div class="chk-btn" :data-index="dataIndex" :class="{active:isActive}" @click="click">
    <i><em></em></i>
    <span>{{text}}</span>
  </div>
</template>
<script>
  export default{
    props: {
      text: {
        default: "button"
      },
      value: {
        required: false
      },
      disabled: {type: Boolean, default: false},
      activated: Boolean,
      dataIndex: Number,
    },
    watch: {
      activated(val){
        this.isActive = val;
      }
    },
    data(){
      return {
        index: this.dataIndex,
        isActive: this.activated,
      }
    },
    methods: {
      click(){
        if(this.disabled)
          return
        this.isActive = !this.isActive;
        this.$emit("input", {activated: this.isActive, index: this.index})
      }
    }
  }
</script>
