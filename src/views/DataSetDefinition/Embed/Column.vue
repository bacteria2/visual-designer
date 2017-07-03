<template>
  <mu-dialog :open="showColumnInfo" title="新增列" dialogClass="data-definition-column">
    <v-text-field v-model="singleColumn.name" label="列名(英文)"></v-text-field>
    <mu-select-field v-model="singleColumn.type" labelFloat label="列类型" style="width: 100%">
      <mu-menu-item value="number" title="number"></mu-menu-item>
      <mu-menu-item value="string" title="string"></mu-menu-item>
    </mu-select-field>
    <v-btn slot="actions" primary @click.native="saveAndAdd()">新增新记录</v-btn>
    <v-btn slot="actions" primary @click.native="showColumnInfo=false" style="color: white">关闭</v-btn>
  </mu-dialog>
</template>
<style>

</style>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
