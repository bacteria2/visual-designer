<template>
  <div id="table" class="data-table" style="height: 100%">
  </div>
</template>
<style>
  @import "../../../../node_modules/handsontable/dist/handsontable.full.css";

  .data-table {
    color: black;
 /*   position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;*/
  }
</style>
<script>
  import Handsontable from 'handsontable'

  export default{
    name: "DataTable",
    mounted(){
      let container = this.$el;
      this.table= new Handsontable(container, {
        data:this.data,
        minSpareCols: 1,
        minSpareRows: 1,
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        dropdownMenu: true
      });
    },
    data(){
      return {
        data: [
          ["year", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ],
        table:null
      }
    }
  }
</script>
