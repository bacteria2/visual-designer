import _max from "lodash/max";
import cloneDeep from "lodash/cloneDeep";
import { uuid,message } from '@/utils'
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
          }(activeLayouts);
        activeLayouts.filter(e => {
          if(e.x!== minX){
            e.x = minX;
          }

        });
      }
    },
    alignBottom(){ //底部对齐 必须不能重叠
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){

        let maxY = function(validLayouts){
            let y = validLayouts[0].y + validLayouts[0].height;
              validLayouts.filter(e=>{
                if(e.y + e.height > y) y = e.y + e.height;
              });
            return y;
          }(activeLayouts);
        activeLayouts.filter(e => {
         if(e.y + e.height!== maxY){
           e.y = maxY - e.height;
           //计算被更改Y轴坐标的Layout 在dashboard中的位置
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
          }(activeLayouts);
        activeLayouts.filter(e => {
          if((e.y+ e.height/2)!== middleY){
            e.y = middleY - e.height/2;
            //计算被更改Y轴坐标的Layout 在dashboard中的位置
          }
        });
      }
    },
    alignMiddle(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      if(activeLayouts&&activeLayouts.length>1){
        let middleX = function(validLayouts){
            let width = validLayouts[0].width;
            let x = validLayouts[0].x;
            validLayouts.filter(e=>{
              if(e.width > width) {
                x = e.x;
                width = e.width;
              }
            });
            return x + width/2;
          }(activeLayouts);
        activeLayouts.filter(e => {
          if((e.x+ e.width/2)!== middleX){
            e.x = middleX - e.width/2;
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
          }(activeLayouts);
        activeLayouts.filter(e => {
          if(e.x + e.width!== maxX){
            e.x = maxX - e.width;
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
          }(activeLayouts);
        activeLayouts.filter(e => {
          if(e.y!== minY){
            e.y = minY;
          }

        });
      }
    },
    averageX(){

      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      function getIndexByContainerId(containerId){
        let tempId ;
        for(let i = activeLayouts.length-1;i>=0;i--){
          if(activeLayouts[i].containerId===containerId){
            tempId = i;
            break
          }
        }
        return tempId;
      }

      if(activeLayouts&&activeLayouts.length>2){
        //标记最小和最大值索引
        let minX  = activeLayouts[0].x,
          minXContainerID = activeLayouts[0].containerId,
          maxX = activeLayouts[0].x + activeLayouts[0].width,
          maxXContainerID = activeLayouts[0].containerId,
          sumWidth = 0;

        //计算平均水平距离
        let _averageX = function(validLayouts){
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


        activeLayouts.sort((a,b)=>a.x-b.x);
        let indexMinX = getIndexByContainerId(minXContainerID);

        // console.log("indexMaxX=",indexMaxX);
        //将最小的提到最前面，将最大的放置到最后
        activeLayouts.splice(0,0,activeLayouts.splice(indexMinX,1)[0]);
        let indexMaxX = getIndexByContainerId(maxXContainerID);
        activeLayouts.splice(activeLayouts.length-1,0,activeLayouts.splice(indexMaxX,1)[0]);

        // activeLayouts.sort((a,b)=>a.x-b.x);

        for(let i = 1;i<activeLayouts.length-1;i++){
          let layout = activeLayouts[i];
          let FrontX = activeLayouts[i-1].x + activeLayouts[i-1].width;
          layout.x = FrontX + _averageX;
        }
      }
    },
    averageY(){
      let activeLayouts = this.dashboard.layouts.filter(e=>e.active===true);
      function getIndexByContainerId(containerId){
        let tempId ;
        for(let i = activeLayouts.length-1;i>=0;i--){
          if(activeLayouts[i].containerId===containerId){
            tempId = i;
            break
          }
        }
        return tempId;
      }

      if(activeLayouts&&activeLayouts.length>2){
        //计算平均垂直距离
        let minY  = activeLayouts[0].y,
          minYContainerID  = activeLayouts[0].containerId,
          maxY = activeLayouts[0].y + activeLayouts[0].height,
          maxYContainerID = activeLayouts[0].containerId,
          sumHeight = 0;

        let _averageY = function(validLayouts){
          validLayouts.filter(e=>{
            if(e.y < minY) {
              minY = e.y;
              minYContainerID = e.containerId;
            }

            if(e.y + e.height > maxY) {
              maxY = e.y + e.height;
              maxYContainerID = e.containerId;
            }
            sumHeight += e.height;
          });
          return (maxY - minY - sumHeight)/(validLayouts.length-1);
        }(activeLayouts);

        activeLayouts.sort((a,b)=>a.y-b.y);

        let minYIndex = getIndexByContainerId(minYContainerID);

        //将最小的提到最前面，将最大的放置到最后
        activeLayouts.splice(0,0,activeLayouts.splice(minYIndex,1)[0]);
        let maxYIndex = getIndexByContainerId(maxYContainerID);

        activeLayouts.splice(activeLayouts.length-1,0,activeLayouts.splice(maxYIndex,1)[0]);

        for(let i = 1;i<activeLayouts.length-1;i++){
          let layout = activeLayouts[i];
          let FrontY = activeLayouts[i-1].y + activeLayouts[i-1].height;
          layout.y = FrontY + _averageY;
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
