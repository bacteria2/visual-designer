<template>
  <dashboard-tool  iconPath="/static/image/dashboardToolsIcon/brush.png" @dblclick.native="dblclick"  @click.native="click" :status="active" title="格式刷" ></dashboard-tool>
</template>

<script>
  import {clone} from '@/utils'
  export default {
    name: 'FormatBrush',
    props:{
      activeContainer:Object,
      status:Boolean
    },
    watch:{
      active(e){
        if(!e){
          if(window.FormatBrush)
            delete window.FormatBrush ;
        }
      },
      status(e){
        console.log('status',e);
        this.active = e;
      }
    },
    data() {
      return{
        active:false
      }
    },
    methods:{
      dblclick(){
        if(!this.activeContainer) {this.active = false ; return}
        this.active = true;
        this.$emit('active');
        this.setFrametBrush(1);
      },
      click(){
        if(!this.activeContainer) {this.active = false ; return}
        this.active = !this.active;
        if(this.active) this.$emit('active');
        this.setFrametBrush(0);
      },
      setFrametBrush(model){
        let activeContainerCopy = clone(this.activeContainer);
        window.FormatBrush = {};
        if(this.active){
          window.FormatBrush.model = model;

          if(activeContainerCopy.style){
            window.FormatBrush.style = activeContainerCopy.style;
          }

          if(activeContainerCopy.footer.style) {
            window.FormatBrush.footer = {};
            window.FormatBrush.footer.style = activeContainerCopy.footer.style;
          }

          if(activeContainerCopy.title.style){
            window.FormatBrush.title = {};
            window.FormatBrush.title.style = activeContainerCopy.title.style;
          }

          if(activeContainerCopy.extendWidget&&activeContainerCopy.extendWidget.style){
            window.FormatBrush.extendWidget = {};
            window.FormatBrush.extendWidget.style = activeContainerCopy.extendWidget.style;
          }

        }
      }
    }
  }
</script>
