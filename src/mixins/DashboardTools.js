import _max from "lodash/max";
import cloneDeep from "lodash/cloneDeep";
import { uuid } from '@/utils'
export default{
  methods:{
    alignLeft(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        let minX = function(validLayouts){
            let x = validLayouts[0].x;
            validLayouts.filter(e=>{
              if(e.x < x) x = e.x;
            });
            return x;
          }(activeLayouts),
          _self = this;
        activeLayouts.filter(e => {
          if(e.x!== minX){
            e.x = minX;
            //计算被更改Y轴坐标的Layout 在dashboard中的位置
            let index = function(containerId){
              let tempId ;
              for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
                if(_self.dashboard.layouts[i].containerId===containerId){
                  tempId = i;
                  break
                }
              }
              return tempId;
            }(e.containerId);

            if(typeof  index ==='number'){
              _self.dashboard.layouts.splice(index,1);
              setTimeout(()=>_self.dashboard.layouts.splice(index,0,e),0);
            }
          }

        });
      }
    },
    alignBottom(){ //底部对齐 必须不能重叠
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        // let validLayouts = activeLayouts.filter(e=>{
        //   return function(layout){
        //       let overlay = activeLayouts.filter(e=>{
        //         if(e.containerId!==layout.containerId){ //首先不是自己
        //             if(e.x>=layout.x){//其次判断下边是否会重复
        //               if( (e.x - layout.x) > layout.width) return true;
        //             }else{
        //               if( (layout.x - e.x) > layout.width) return true;
        //             }
        //         }
        //       });
        //       if(overlay&&overlay.length>0) return true;
        //   }(e);
        // });

        let maxY = function(validLayouts){
            let y = validLayouts[0].y + validLayouts[0].height;
              validLayouts.filter(e=>{
                if(e.y + e.height > y) y = e.y + e.height;
              });
            return y;
          }(activeLayouts),

         _self = this;
        activeLayouts.filter(e => {
         if(e.y + e.height!== maxY){
           e.y = maxY - e.height;
           //计算被更改Y轴坐标的Layout 在dashboard中的位置
           let index = function(containerId){
             let tempId ;
             for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
               if(_self.dashboard.layouts[i].containerId===containerId){
                 tempId = i;
                 break
               }
             }
             return tempId;
           }(e.containerId);

           if(typeof  index ==='number'){
             _self.dashboard.layouts.splice(index,1);
             setTimeout(()=>_self.dashboard.layouts.splice(index,0,e),0);
           }
         }

       });
      }
    },
    alignCenter(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        let middleY = function(validLayouts){
            let height = validLayouts[0].height;
            let y = validLayouts[0].y;
            validLayouts.filter(e=>{
              if(e.height > height) {
                y = e.y;
                height = e.height;
              }
            });
            return y + height/2;
          }(activeLayouts),

          _self = this;
        activeLayouts.filter(e => {
          if((e.y+ e.height/2)!== middleY){
            e.y = middleY - e.height/2;
            //计算被更改Y轴坐标的Layout 在dashboard中的位置
            let index = function(containerId){
              let tempId ;
              for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
                if(_self.dashboard.layouts[i].containerId===containerId){
                  tempId = i;
                  break
                }
              }
              return tempId;
            }(e.containerId);
            if(typeof  index ==='number'){
              _self.dashboard.layouts.splice(index,1);
              setTimeout(()=>_self.dashboard.layouts.splice(index,0,e),0);
            }
          }
        });
      }
    },
    alignRight(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        let maxX = function(validLayouts){
            let x = validLayouts[0].x + validLayouts[0].width;
            validLayouts.filter(e=>{
              if(e.x + e.width > x) x = e.x + e.width;
            });
            return x;
          }(activeLayouts),
          _self = this;
        activeLayouts.filter(e => {
          if(e.x + e.width!== maxX){
            e.x = maxX - e.width;
            //计算被更改Y轴坐标的Layout 在dashboard中的位置
            let index = function(containerId){
              let tempId ;
              for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
                if(_self.dashboard.layouts[i].containerId===containerId){
                  tempId = i;
                  break
                }
              }
              return tempId;
            }(e.containerId);

            if(typeof  index ==='number'){
              _self.dashboard.layouts.splice(index,1);
              setTimeout(()=>_self.dashboard.layouts.splice(index,0,e),0);
            }
          }

        });
      }
    },
    alignTop(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        let minY = function(validLayouts){
            let y = validLayouts[0].y;
            validLayouts.filter(e=>{
              if(e.y < y) y = e.y;
            });
            return y;
          }(activeLayouts),

          _self = this;
        activeLayouts.filter(e => {
          if(e.y!== minY){
            e.y = minY;
            //计算被更改Y轴坐标的Layout 在dashboard中的位置
            let index = function(containerId){
              let tempId ;
              for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
                if(_self.dashboard.layouts[i].containerId===containerId){
                  tempId = i;
                  break
                }
              }
              return tempId;
            }(e.containerId);

            if(typeof  index ==='number'){
              _self.dashboard.layouts.splice(index,1);
              setTimeout(()=>_self.dashboard.layouts.splice(index,0,e),0);
            }
          }

        });
      }
    },
    averageX(){

      let _self = this;
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);

      function getIndexByContainerId(containerId){
        let tempId ;
        for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
          if(_self.dashboard.layouts[i].containerId===containerId){
            tempId = i;
            break
          }
        }
        return tempId;
      }

      if(activeLayouts&&activeLayouts.length>2){
        //标记最小和最大值索引
        let minXContainerID = 0,maxXContainerID = 0;
        //计算平均水平距离
        let _averageX = function(validLayouts){
          let minX  = validLayouts[0].x,maxX = validLayouts[0].x + validLayouts[0].width,
            sumWidth = 0;
          validLayouts.filter(e=>{
            if(e.x < minX) {
              minX = e.x;
              minXContainerID = e.containerId;
            }
            if(e.x + e.width > maxX) {
              maxX = e.x + e.width;
              maxXContainerID = e.containerId;
            }
            sumWidth += e.width;
          });

          return (maxX - minX - sumWidth)/(validLayouts.length-1);
        }(activeLayouts);

        console.log("_averageX=",_averageX);

        let indexMinX = getIndexByContainerId(minXContainerID);
        let indexMaxX = getIndexByContainerId(maxXContainerID);

        console.log("minYContainerID=",minXContainerID);
        console.log("maxYContainerID=",maxXContainerID);

        //将最小的提到最前面，将最大的放置到最后
        activeLayouts.splice(0,0,activeLayouts.splice(indexMinX,1)[0]);
        activeLayouts.splice(activeLayouts.length-1,0,activeLayouts.splice(indexMaxX,1)[0]);

        // activeLayouts.sort((a,b)=>a.x-b.x);

        for(let i = 1;i<activeLayouts.length-1;i++){
          let layout = activeLayouts[i];
          let FrontX = activeLayouts[i-1].x + activeLayouts[i-1].width;
          layout.x = FrontX + _averageX;
          let index = function(containerId){
            let tempId ;
            for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
              if(_self.dashboard.layouts[i].containerId===containerId){
                tempId = i;
                break
              }
            }
            return tempId;
          }(layout.containerId);
          if(typeof  index ==='number'){
            _self.dashboard.layouts.splice(index,1);
            setTimeout(()=>_self.dashboard.layouts.splice(index,0,layout),0);
          }
        }
      }
    },
    averageY(){
      let _self = this;
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);


      function getIndexByContainerId(containerId){
        let tempId ;
        for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
          if(_self.dashboard.layouts[i].containerId===containerId){
            tempId = i;
            break
          }
        }
        return tempId;
      }

      if(activeLayouts&&activeLayouts.length>2){
        let minYContainerID = 0,maxYContainerID = 0;
        //计算平均垂直距离
        let _averageY = function(validLayouts){
          let minY  = validLayouts[0].y,maxY = validLayouts[0].y + validLayouts[0].height,
            sumHeight = 0;
          validLayouts.filter(e=>{
            if(e.y < minY) {
              minY = e.y;
              minYContainerID = e.containerId;
            }

            if(e.y + e.width > maxY) {
              maxY = e.y + e.height;
              maxYContainerID = e.containerId;
            }
            sumHeight += e.height;
          });
          return (maxY - minY - sumHeight)/(validLayouts.length-1);
        }(activeLayouts);

        let minYIndex = getIndexByContainerId(minYContainerID);
        let maxYIndex = getIndexByContainerId(maxYContainerID);



        //将最小的提到最前面，将最大的放置到最后
        activeLayouts.splice(0,0,activeLayouts.splice(minYIndex,1)[0]);
        activeLayouts.splice(activeLayouts.length-1,0,activeLayouts.splice(maxYIndex,1)[0]);

        for(let i = 1;i<activeLayouts.length-1;i++){
          let layout = activeLayouts[i];
          let FrontY = activeLayouts[i-1].y + activeLayouts[i-1].height;
          layout.y = FrontY + _averageY;

          let index = function(containerId){
            let tempId ;
            for(let i = _self.dashboard.layouts.length-1;i>=0;i--){
              if(_self.dashboard.layouts[i].containerId===containerId){
                tempId = i;
                break
              }
            }
            return tempId;
          }(layout.containerId);

          if(typeof index ==='number'){
            _self.dashboard.layouts.splice(index,1);
            setTimeout(()=>_self.dashboard.layouts.splice(index,0,layout),0);
          }
        }
      }
    },
    //复制
    copyLayout(){
      //复制layout
      let activeLayouts = this.dashboard.layouts.filter(el => el.active);
      if (Array.isArray(activeLayouts) && activeLayouts.length > 0) {
        let currentLayout = activeLayouts[0];
        let sourceContainerId = currentLayout.containerId;

        let copyLayout = cloneDeep(currentLayout);
        let newContainerId = uuid();
        copyLayout.containerId = newContainerId;
        copyLayout.y = copyLayout.y + 50;
        copyLayout.x = copyLayout.x + 50;
        copyLayout.id = this.nextIndex;
        copyLayout.active = false;
        this.updateIndex();
        this.dashboard.layouts.push(copyLayout);
        //复制container
        let typeFlag = 0; // 0:图表容器  1：扩展容器
        let container = this.dashboard.containers[sourceContainerId];
        if(!container){
          typeFlag = 1;
          container = this.dashboard.extendContainers[sourceContainerId];
        }
        let copyContainer = cloneDeep(container);
        copyContainer.id = newContainerId;

        if(typeFlag === 0){
          this.dashboard.containers[newContainerId] = copyContainer;
        }else{
          this.dashboard.extendContainers[newContainerId] = copyContainer;
        }

      }else{
        message.warning('请选择一个目标组件')
      }
    },
    //
  }

}
