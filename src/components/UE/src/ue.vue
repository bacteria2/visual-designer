<template>
  <div class="editor-container">
    <script id="ue1" type="text/plain"></script>
  </div>
</template>

<script>
   import '../../../../static/UE/ueditor.config.js'
   import '../../../../static/UE/ueditor.all.min.js'
   import '../../../../static/UE/lang/zh-cn/zh-cn.js'
   import '../../../../static/UE/ueditor.parse.min.js'
  export default {
    name: 'UE',
    data () {
      return {
        val:'',
        isInit:false,
        editor: null,
        defaultMsg:"请在此开始编辑",
        config: {
          toolbars: [[
            'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript','horizontal', 'removeformat', 'formatmatch', '|',
            'paragraph', 'fontfamily', 'fontsize', '|',
            'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', 'anchor', '|',
            'simpleupload', 'insertimage', 'emotion', 'insertvideo', 'map','|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols',
          ]],
          initialFrameWidth: null,
          initialFrameHeight: 300
        }
      }
    },
    props: {
      value: {
        type: String
      }
    },
    watch:{
      value(v){//监听初始化值，如果没有值则设置为“”；
          v=v||'';
          if(this.isInit){
            this.editor.setContent(v)
          }else{
            this.val = v;
          }
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor("ue1", this.config); // 初始化UE
      this.editor.addListener("ready", function () {
          _this.isInit = true;
        if(_this.value){//初始值可以获取到
          _this.editor.setContent(_this.value); //初始信息
        }else if(_this.val){
          _this.editor.setContent(_this.val); // 默认信息。
        }else{
          _this.editor.setContent(_this.defaultMsg); // 默认信息。
        }

      });
      _this.editor.addListener("contentChange", function () {
        let c=_this.editor.getContent();
        _this.$emit("editor",c);
      });
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
