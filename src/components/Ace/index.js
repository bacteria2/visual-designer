/**
 * Created by lenovo on 2017/5/5.
 */
import Ace from '../EchartsEditor/src/Ace.vue';

Ace.install = function(Vue) {
  Vue.component(Ace.name, Ace);
};

export default Ace;
