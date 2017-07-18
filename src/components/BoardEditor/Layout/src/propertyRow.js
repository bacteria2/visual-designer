export default{
  functional: true,
  name: "propertyRow",
  render(h, {props,children}){
    return ( <el-form-item label={props.name}>{children}</el-form-item>);
  }
}
