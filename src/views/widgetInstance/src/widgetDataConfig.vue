<template>
  <v-app class="widgetDataConfig">

  </v-app>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'


  export default{
    components: {},
    mounted(){

    },
    watch:{

    },
    computed:{

    },

    data(){
      return {
       show:false
      }
    },
    methods: {
      close(){
          this.$emit('close')
      },
      save(){

      }
    }
  }
</script>

