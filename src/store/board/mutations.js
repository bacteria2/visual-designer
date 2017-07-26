export default {
  /**
   * 修改当前编辑的对象
   * */
  updateEditExtendObj(state,e){
    delete state.editExtendObj;
    state.editExtendObj = e;
  },
  clearEditExtendObj(state){
    delete state.editExtendObj;
  }
}
