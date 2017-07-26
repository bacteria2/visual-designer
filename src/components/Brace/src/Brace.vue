<template>
  <div class="brace-container" :style="braceStyle">
    <div class="brace-control" v-if="showToolbar">
      <div class="brace-control__info">
        <span class="brace-control__time">{{logTime}}</span>
        <span :class="'brace-control__type-'+logType">{{logText}}</span>
      </div>
      <div>
        <el-button type="primary" size="small" @click="debounceRun">确定</el-button>
      </div>
    </div>
    <div :id="id" :class="showToolbar?'brace-panel-hasToolbar':'brace-panel-only'">
      {{script}}

    </div>
  </div>
</template>
<script>
  import {formatTime, beautifyJs} from '@/utils'
  import {initBraceEditor} from './brace'
  import debounce from 'lodash/debounce'

  export default{
    name: "Brace",
    props: {
      script: {
        type: String,
        default: ""
      },
      fontSize: {
        type: String,
        default: "16px"
      },
      braceStyle: Object,
      theme: String,
      id: String,
      showToolbar: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      script(newVal){
        if (this.editor)
          this.editor.setValue(beautifyJs(newVal));
      }
    },
    async mounted(){
      let editConfig = {id: this.id, fontSize: this.fontSize}
      this.editor = await initBraceEditor(editConfig)
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
          this.$emit('update:script', this.editor.getValue())
        }
      }, 2000, {
        'leading': true,
        'trailing': false
      }),
      submitText(){
        this.$emit('update:script', this.editor.getValue())
      }

    }
  }
</script>
