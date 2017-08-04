import {showProperty,isShowSetting} from "../../InputCollector/InputCommon"

export default{
  functional: true,
  name: "PropertyLayout",
  render(h, {data, props, children, listeners}){
    if (showProperty(data.optionKey, data.componentType)){
      if(isShowSetting()){
        return (
          <div class="property">
            <el-row>
              <el-col span={24}>
                <div class="label caption">
                  <property-title seriesIndex={data.seriesIndex} componentType={data.componentType} disabled={props.disabled}
                                  optionKey={data.optionKey} label={data.label} onUpdateDisabled={listeners.disabled}></property-title>
                </div>
              </el-col>
            </el-row>
        </div> );
      }else{
        return ( <div class="property">
          <el-row>
            <el-col span={13}>
            <div class="label caption">
              <property-title seriesIndex={data.seriesIndex} componentType={data.componentType}
                              optionKey={data.optionKey} label={data.label} onUpdateDisabled={listeners.disabled}></property-title>
            </div>
            </el-col>
            <el-col span={10}>
              <div class={props.className ? props.className : ""}>
                {children}
              </div>
            </el-col>
          </el-row>
        </div>);
      }
    }
  }}
