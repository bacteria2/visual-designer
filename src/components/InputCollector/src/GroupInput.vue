<template>
  <div class="group">
    <ul class="tabs-head">
      <el-row>
        <el-col v-for="tag in inputTabs" :key="tag.name" :span="parseInt(24/inputTabs.length)">
          <li @click="selectTag(tag.name)" class="tabs-item"><span>{{tag.label}}</span><i :class="tag.name==active?'activeItem-b':'item-b'"></i></li>
        </el-col>
      </el-row>
    </ul>
    <div v-for="slotName in soltKeys" class="tabs-content" v-show="slotName == active">
           <slot :name="slotName"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name:"Group",
    mounted(){
      console.log(this.soltKeys)
    },
    props: {
      tabs:{
          type:Array,
          default(){return[{label:'页1',name:'page1'},{label:'页2',name:'page2'}]}
      }
    },
    data(){
      return {
        inputTabs: this.tabs,
        soltKeys:Object.keys(this.$slots),
        active:this.tabs[0].name
      }
    },
    methods:{
        selectTag(name){
            this.active = name
        }
    }
  }
</script>
