import propertyRow from './src/propertyRow'

propertyRow.install = function(Vue) {
  Vue.component(propertyRow.name, propertyRow);
};

export default propertyRow;
