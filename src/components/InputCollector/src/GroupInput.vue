<template>
  <div class="group">
    <ul class="tabs-head">
      <el-row>
        <el-col v-for="tag in tabs" :span="parseInt(24/tabs.length)" :key="tag.name">
          <li @click="selectTag(tag.name)" class="tabs-item"><span>{{tag.label}}</span><i :class="tag.name==active?'activeItem-b':'item-b'"></i></li>
        </el-col>
      </el-row>
    </ul>
    <div v-for="slotName in soltKeys" class="tabs-content" v-show="slotName == active" :key="slotName">
           <slot :name="slotName"></slot>
    </div>
  </div>
</template>
<script>
  export default{
    name:"Group",
    props: {
      tabs:{
          type:Array,
          default(){return[{label:'页1',name:'page1'},{label:'页2',name:'page2'}]}
      }
    },
    data(){
      return {
        soltKeys:Object.keys(this.$slots),
        active:this.tabs[0].name,
        isYdpGroup:true
      }
    },
    methods:{
        selectTag(name){
            this.active = name
        }
    }
  }
</script>
