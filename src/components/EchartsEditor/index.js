/**
 * Created by lenovo on 2017/5/5.
 */
import Editor from './src/CodeEditor.vue';
import EchartsPanel from './src/EchartsPanel.vue';

EchartsPanel.install = function(Vue) {
  Vue.component(EchartsPanel.name, EchartsPanel);
};
Editor.install = function(Vue) {
  Vue.component(Editor.name, Editor);
};

export {Editor,EchartsPanel} ;
