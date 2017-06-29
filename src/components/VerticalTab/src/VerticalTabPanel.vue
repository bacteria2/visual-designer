<template>
  <div class="vertical-tab__container">
    <ul class="vertical-tab">
      <li class="vertical-tab__item"
          v-for="(tab,index) in tabs" @click.prevent="changeTab(tab.tabName)"
          :class="{indicator:isIndicator,select_color:isSelectColor,active:tab.isActivate}"
          :key="index">
        {{tab.title}}

      </li>
    </ul>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default{
    name: "VerticalTabPanel",
    props: {
      isIndicator: {type: Boolean, default: true},
      isSelectColor: Boolean,
      contentClasses: {type: String, default: 'vertical-tab__content blue-grey'},
      activeColor: String,
      startIndex: {
        type: Number,
        default: 0
      },
      value: String
    },
    mounted(){

      this.tabs=this.$children;
    },
    computed: {
      tabsc(){
        return this.$children.filter(el => el.$options.name === "VerticalTab");
      }
    },
    watch: {
      activeName(val){
        this.$emit("input", val);
      },
      value(val){
          this.activeName = val;
      }

    },
    data(){
      return {
        tabs: [],
        activeName: this.value
      }
    },
    methods: {
      changeTab(name){
        this.activeName = name;
      }
    }
  }
</script>
