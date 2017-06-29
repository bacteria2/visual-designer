<template >
  <div class="demo_dsList_container">
    <transition-group  name="fade" >
      <v-card v-for="(item,index) in items"  v-bind:key="item" class="dsCard">
        <v-card-title class="dsTitle">
          <span >{{item.className}}</span>
        </v-card-title>
        <v-card-text class="dsBlock">
          <v-card-row height="45px">
            <v-icon large class="green--text mr-5">widgets</v-icon>
            <div>
              <strong >{{item.name}}</strong>
              <div class="ds_des">{{item.des}}</div>
            </div>
          </v-card-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-row actions class="tool_row">
          <v-btn  icon @click.native="del(index)" class="green--text" >
            <v-icon class="green--text">remove</v-icon></v-btn>
          <v-btn  icon ><v-icon class="green--text">edit</v-icon></v-btn>
        </v-card-row>
      </v-card>
    </transition-group>
  </div>
</template>

<style scoped>
  .demo_dsList_container{padding: 10px; width: 800px}
  .dsBlock{padding:10px 10px 0 10px}
  .dsCard{margin:20px;}
  .tool_row{padding-top: 0}
  .dsTitle{font-size: 15px; }
  .ds_des{color: #999; font-size: 12px;}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .fade-move {
    transition: transform 1s;
  }
</style>

<script>
  import loadDsInfo from '../services/demoService'
//  console.log(testData.dsList)
  export default {
    data () {
        let data;
        let dataArr = [];
        loadDsInfo().then(resolve=>{
            data=resolve;
          for(let key in data){
              var beanObj = data[key];
              if(typeof(beanObj)=='object'){
                dataArr.push(data[key]);
              }
          }
        });

      return {
        items: dataArr
      }
    },
    methods:{
        del:function(index){
            this.items.splice(index,1);
        }
    }
  }
</script>
