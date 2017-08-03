<template>
  <dashboard-tool icon="close"  @click.native="$emit('close')"  title="关闭工具栏" ></dashboard-tool>
</template>

<script>
  import {clone} from '@/utils'
  export default {
    name: 'toolsClose',
    props:{
      activeContainer:Object,
    }
  }
</script>
