/**
 * Created by lenovo on 2017/5/5.
 */
import Editor from './src/CodeEditor.vue';

Editor.install = function(Vue) {
  Vue.component(Editor.name, Editor);
};

export default Editor;
