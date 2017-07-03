<template>
  <div id="table" class="data-table" style="color: black;">
    <hot-table :root="root" :settings="hotSettings" ref="childTable"></hot-table>
  </div>
</template>
<script>
  import moment from 'expose-loader?moment!moment';
  import numbro from 'expose-loader?numbro!numbro';
  import pikaday from 'expose-loader?Pikaday!pikaday';
  import ZeroClipboard from 'expose-loader?ZeroClipboard!zeroclipboard';
  import Handsontable from 'handsontable';
  import HotTable from 'vue-handsontable-official';
  import {merge} from "@/utils"


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
      HotTable
    },
    watch: {
      columns(val){
        this.hotSettings.colHeaders = val
      },
      rows(val){
        this.hotSettings.data=val;
      }
    },
    mounted(){
      this.hotSettings.width = this.$el.clientWidth - 20;
      this.hotSettings.height = this.$el.clientHeight - 20;
      if (this.rows)
       this.hotSettings.data =this.rows
    },
    data(){
      let colHeaders = this.columns;
      let colNum = 35;
      if (Array.isArray(this.columns))
        colNum = colHeaders.length
      let data = Handsontable.helper.createEmptySpreadsheetData(1, colNum);

      return {
        table: null,
        root: 'test-hot',
        hotSettings: {
          data,
          colWidths: 47,
          rowHeights: 23,
          minSpareCols: 0,
          minSpareRows: 1,
          colHeaders,
          dropdownMenu: true,
        }
      }
    }
  }
</script>
