<template>
  <div class="code-container">
    <div class="control-panel">
      <div id="code-info">
        <span class="code-info-time">{{logTime}}</span>
        <span :class="'code-info-type-'+logType">{{logText}}</span>
      </div>
      <el-button type="primary" size="small" @click="debounceRun">运行</el-button>
      <el-button type="primary" size="small">保存</el-button>
    </div>
    <div id="code-panel">
      {{script}}
    </div>
  </div>
</template>
<style scoped lang="scss">
  .control-panel {
    height: 28px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 20;
    padding: 0;
    -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    .el-button {
      border-radius: 0;
      margin-left: 25px;
      float: right;
    }
  }

  .code-container {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
  }

  #code-info {
    position: absolute;
    bottom: 0;
    overflow: hidden;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    font-size: 0.9rem;

    .code-info-time {
      color: #333;
      display: inline-block;
      margin-right: 10px;
    }
    .code-info-type-info {
      color: #333;
    }
    .code-info-type-error, .code-info-type-warn {
      color: #e43c59;
    }
  }

  #code-panel {
    position: absolute;
    top: 28px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }
</style>
<script>
  import { formatTime, beautifyJs } from '@/utils'
  import { initBraceEditor } from './helper'
  import debounce from 'lodash/debounce'

  export default{
    name: "Ace",
    props: {
      script: {
        type: String,
        default: ""
      },
      fontSize: {
        type: String,
        default: "16px"
      },
      theme: {
        type: String,
      }
    },
    watch: {
      script(newVal){
        this.editor.setValue(beautifyJs(newVal));
      }
    },
    mounted(){
      let editConfig = {id: "code-panel", fontSize: this.fontSize}
      this.editor = initBraceEditor(editConfig)
    },
    data(){
      return {
        editor: null,
        date: new Date(),
        logTime: "",
        logType: "info",
        logText: "",
        hasError: false
      }
    },
    methods: {
      hasEditorError() {
        let annotations = this.editor.getSession().getAnnotations();
        for (let aid = 0, alen = annotations.length; aid < alen; ++aid) {
          if (annotations[aid].type === 'error') {
            return true;
          }
        }
        return false;
      },
      log(text, type) {
        // log time
        this.logTime = formatTime(new Date())
        if (type !== 'warn' && type !== 'error') {
          type = 'info'
        }
        this.logType = type;
        this.logText = text;

      },
      debounceRun: debounce(function () {
        this.hasError = this.hasEditorError();
        if (this.hasError) {
          this.log('编辑器内容有误！', 'error');
        }
        else {
          this.$emit('update:script',this.editor.getValue())
        }
      },2000,{
        'leading': true,
        'trailing': false
      })

    }
  }
</script>
