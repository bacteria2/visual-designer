/**
 * Created by lenovo on 2017/7/11.
 */
export default {
  functional: true,
  name: 'FormInputCommon',
  render(h, {props, children}){
    return (
      <el-form ref="style-input" class="style-input" label-width="120px">
        <h2 class="header">{props.title}</h2>
        {children}
      </el-form>)
  }
}
