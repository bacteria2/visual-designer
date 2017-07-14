<template>
  <div id="table" class="data-table" style="color: black;height: 100%">
    <hot-table :root="root" :settings="hotSettings" ref="childTable"></hot-table>
  </div>
</template>
<script>
  import { merge } from "@/utils"

  import moment from 'expose-loader?moment!moment';
  import numbro from 'expose-loader?numbro!numbro';
  import pikaday from 'expose-loader?Pikaday!pikaday';
  import ZeroClipboard from 'expose-loader?ZeroClipboard!zeroclipboard';


  function createEmptySpreadsheetData(rows, columns) {
    let data = [];
    let row;
    for (let i = 0; i < rows; i++) {
      row = [];
      for (let j = 0; j < columns; j++) {
        row.push('');
      }
      data.push(row);
    }

    return data;
  }

  export default{
    name: "DataTable",
    props: {
      columns: {
        type: [Array, Boolean],
        default: true,
      },
      rows: Array
    },
    components: {
      'HotTable':()=> import(/* webpackChunkName: "vue-handsontable-official" */ 'vue-handsontable-official')
    },
    watch: {
      columns(val){
        this.hotSettings.colHeaders = val
      },
      rows(val){
        this.hotSettings.data = val;
      }
    },
    mounted(){
      this.hotSettings.width = this.$el.clientWidth - 20;
      this.hotSettings.height = this.$el.clientHeight - 20;
      if (this.rows)
        this.hotSettings.data = this.rows
    },
    data(){
      let colHeaders = this.columns;
      let colNum = 35;
      if (Array.isArray(this.columns))
        colNum = colHeaders.length

      return {
        table: null,
        root: 'test-hot',
        hotSettings: {
          data:createEmptySpreadsheetData(1,colNum),
          colWidths: 80,
          rowHeights: 24,
          minSpareCols: 0,
          minSpareRows: 1,
          colHeaders,
          dropdownMenu: true,
          manualColumnResize: true,
          manualRowResize: true
        }
      }
    }
  }
</script>
