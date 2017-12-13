
define(function (require) {

  var CanvasTransition = require('./CanvasTransition');

  class HyPie {

    REG = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/ ; //十六进制颜色
    PADDING = 20;
    static  MAXOFFSET = 20;

    /**
     * 图例属性
     */
    LEGEND_BORDER_WIDTH = 1; //图例边框线宽度
    LEGEND_POS_TOP = "top";
    LEGEND_POS_LEFT = "left";
    LEGEND_POS_BOTTOM = "bottom";
    // LEGEND_POS_RIGHT = "right";
    LEGEND_ITEM_WIDTH = 30; //每个图例的宽度
    LEGEND_ITEM_HEIGHT = 16;
    LEGEND_V_INTERVAL = 10;//垂直间隔宽度
    LEGEND_L_INTERVAL =20;//水平间隔宽度
    // LEGEND_L_INTERVAL = 5;//水平间隔宽度
    LEGEND_BLOCK_TEX_INTERVAL = 5;//图例色块到数字间隔宽度
    LEGEND_TEX_NUM_INTERVAL = 30;//标题到数字间隔宽度
    LEGEND_NUM_UNIT_INTERVAL = 5;//数字到单位间隔宽度

    constructor(parent){

      //父容器
      if(parent instanceof Node){
        this._parent = parent;
      }else{
        this._parent = document.getElementById(parent)
      }

      if(this._parent){
        this._canvas = HyPie._createCanvas(this._parent);
        this._ctx = this._canvas.getContext("2d");

      }else{
        throw new Error("容器获取异常！");
      }

      this._activedIndex = 2;
      // this.offsetRingWidth = 20;

      this._eventDataStore = {};  // 事件数据储存 环形 ring 和 图例 legend
      this._mousePos = null;
    }

    setOption(option){
      option = option||{};
      this._ringColors = option.color||["#d9da13","#4fc0bd","#3cca5d"];
      this._padding = option.padding; // top/right/bottom/left
      this._datas = option.datas||[{data:10,name:"未建"},{data:30,name:"已建"},{data:20,name:"拟建"}]; //数据
      this._ringWidth = option.ringWidth||0.35;  // 环形宽度 0 ~ 1
      this._title = option.title||{show:true,name:"海岸风电与海上风电占比",fontSize:18,color:"#000000",}; // 标题属性
      this._legend = option.legend||{show:true,pos:"right",margin:["auto",0,"auto",0],unit:"个",color:"#e4e93a",unitColor:"#4fc0bd",fontSize:18};



      //默认选择
      this._defaultActive = -1;
      let self = this;

      this._datas.forEach((e,i)=>{
        if(e.active) self._defaultActive = i;
      });
      this._activedIndex = this._defaultActive;

      try{
        this._init();
      }catch(e) {
        let msg = e.message;
        console&&console.error(msg)&&alert(msg);
      }

      // try{
      this._render();
      // }catch(e) {
      //     let msg = e.message;
      //     console&&console.error(msg)&&alert(msg);
      // }

    }

    _init(){
      let total = 0,self = this;
      this._percentData = []; //计算百分比以后的数值
      this._ousterRadius = 0;
      this._innerRadius = 0;

      // this.transition = {
      //     ringWidth:{start:0,end:0,speed:1}
      // };
      this.transition = new CanvasTransition(this._render.bind(this));

      //设置圆环的宽度为过渡属性
      this.transition.addProp("offsetRingWidth",0,0.5);


      /**
       *
       * 计算总数值
       *
       */
      total = this._datas.reduce((a,b,i) => {
        let preData  = 0;
        if(i === 1){
          preData = a.data;
        }else{
          preData = a;
        }

        if(typeof preData === "number" && typeof b.data === "number"){
          return preData + b.data;
        }else{
          throw new Error("狗日的数据设置错误");
        }
      });

      /**
       *
       * 将颜色变成RGB数值 [[255,255,255],...]
       *
       */
      this._ringColors = this._ringColors.map(e=>{
        if(this.REG.test(e)){
          return this._colorRgb(e);
        }else if(typeof e === "string" && e.match(/rgba/).length > 0){
          let num = e.match(/rgba\(([\s\S]+)\)/)[1];
          let numArr = num.split(",");
          numArr = numArr.map(e=>parseInt(e));
          numArr.splice(3,1);
          return numArr;
        }
        return e;
      });

      /**
       *
       * 计算每个数字的百分比、颜色、角度
       *
       */
      this._eventDataStore.ring = [];
      let degInterval = 0.05;
      this._datas.forEach((t,i)=>{
        //转动的角度
        let deg = (Math.PI*2 - self._datas.length*degInterval)*t.data/total;

        //开始旋转的角度
        let startDeg = i>0?self._percentData[i-1].startDeg + self._percentData[i-1].deg+degInterval:0;

        let color = self._ringColors[i]||HyPie._renderColor();

        //计算tips位置
        let tipsDeg = startDeg + deg/2 ;
        // let tipsPos = {};
        // tipsPos.x = self._ousterRadius * Math.sin(tipsDeg);
        // tipsPos.y = self._ousterRadius * Math.cos(tipsDeg);

        //保存角度
        self._percentData.push({
          percent:t.data/total,
          startDeg,
          deg,
          color,
          tipsDeg,
          ...t
        });


        //保存事件属性
        this._eventDataStore.ring.push({
          range:[startDeg,startDeg + deg],    //范围
          index:i                             //索引
        });
      });

      /**
       *
       * 计算最小的宽度
       *
       */
      let minWidth , xWidth =  this._canvas.width - this.PADDING*2 - this._padding[1] - this._padding[3],
        yWidth =  this._canvas.height - this.PADDING*2 - this._padding[0] - this._padding[2];
      minWidth = xWidth;
      if(yWidth < minWidth) minWidth = yWidth;
      this._ousterRadius = Math.floor(minWidth/2);

      this._innerRadius = Math.floor((minWidth - (this._ringWidth*this._ousterRadius)*2)/2);

      /**
       *
       * 计算圆心位置
       *
       */
      this.coa = {};
      //如果没有设置左右Padding,则水平居中
      if(this._padding[3] > 0 ){
        this.coa.x =  this._padding[3] + this.PADDING + this._ousterRadius ;
      }else if(this._padding[1] > 0){
        this.coa.x = Math.floor((this._canvas.width - this._padding[1])/2);
      }else{
        this.coa.x = Math.floor(xWidth/2);
      }
      this.coa.y = this.PADDING;

      if(this._padding[0] > 0 ){
        this.coa.y +=  this._padding[0]  + this._ousterRadius;
      }else{
        this.coa.y += Math.floor(yWidth/2);
      }

      /**
       *
       * this._titleAttr
       * 计算标题属性
       * font          - 文字样式
       * color         - 文字颜色
       * layerAttr     - 每行文字属性
       *
       */
      this._titleAttr = null;
      if(typeof this._title.name === "string" && this._title.show !== false){
        this._titleAttr = {};
        this._title.fontSize = this._title.fontSize||18;
        this._title.fontFamily = this._title.fontFamily||"微软雅黑";
        this._titleAttr.fontColor = this._title.color||"#333";
        this._titleAttr.font = this._title.fontSize + "px "+ this._title.fontFamily;
        this._ctx.font = this._titleAttr.font;


        let textArr = this._title.name.split(""),
          measureTex = this._ctx.measureText(this._title.name),
          textWidth = measureTex.width,   //文字宽度
          maxWidth  = this._innerRadius*2 - 10, //文字最大宽度
          LineNum = Math.ceil(textWidth/maxWidth), //文字行数
          LineHeight =  this._title.fontSize * 1.2, //行高度
          startPosY  = this.coa.y - Math.floor((LineHeight*LineNum)/2); //文字垂直方向的起始位置

        for (let i = 0;i< LineNum;i++){

          //文字个数
          let layerFontNumber = 0 ,fontStr = null;
          if(i < LineNum-1) {
            layerFontNumber = textArr.length%LineNum === 0 ? textArr.length/LineNum :getFontNum(textArr.length,LineNum);
            let sliceTextArr = textArr.slice(i*layerFontNumber,i*layerFontNumber + layerFontNumber );
            fontStr = sliceTextArr.reduce((a,b)=>a+b);
          }else if(i === LineNum - 1) {
            layerFontNumber = textArr.length%LineNum === 0 ? textArr.length/LineNum : getFontNum(textArr.length,LineNum,true) ;
            let sliceTextArr = textArr.slice(textArr.length - layerFontNumber,textArr.length);
            fontStr = sliceTextArr.reduce((a,b)=>a+b);
          }

          let sliceTextWidth = this._ctx.measureText(fontStr).width;
          this._titleAttr.layerAttr = [];
          //文字位置
          let posX = Math.floor(this.coa.x - sliceTextWidth/2);
          this._titleAttr.layerAttr.push({
            fontNumber:layerFontNumber,
            posY:startPosY + LineHeight*i,
            posX,fontStr
          });
        }
      }

      /**
       *
       * this._legendAttr
       * 计算图例
       * font           - 图例的文字样式
       * itemAttr[]     - 每个图例的属性
       *
       */
      this._legendAttr = null;
      if(this._legend.show !== false) {
        this._legendAttr = {};
        this._eventDataStore.legend = []; //储存图例的位置属性
        this._legend.pos = this._legend.pos||"right";
        this._legend.fontSize = this._legend.fontSize||18;
        this._legend.fontFamily = this._legend.fontFamily||"微软雅黑";
        this._legend.color = this._legend.color||"yellow";
        this._legend.unitColor = this._legend.unitColor||"4fc0bd";

        this._legendAttr.font = this._legend.fontSize + "px " + this._legend.fontFamily;
        this._ctx.font = this._legendAttr.style;

        //计算图例文字的最大长度
        // LEGEND_TEX_NUM_INTERVAL
        let maxTileWidth = 0;
        let maxDataWidth = 0;
        let unitWidth = this._legend.unit?this._ctx.measureText(this._legend.unit).width:0;
        this._datas.forEach(e=>{
          //标题宽度
          let titleWidth = e.name?this._ctx.measureText(e.name).width:0;
          if(titleWidth > maxTileWidth) maxTileWidth = titleWidth;

          //数值宽度
          let numWidth = this._ctx.measureText(e.data).width;
          if(numWidth > maxDataWidth) maxDataWidth = numWidth;
        });

        //每个图例的总宽度
        let itemLegendWidth = this.LEGEND_ITEM_WIDTH +  this.LEGEND_BLOCK_TEX_INTERVAL +　maxTileWidth + this.LEGEND_TEX_NUM_INTERVAL + maxDataWidth + this.LEGEND_NUM_UNIT_INTERVAL + unitWidth;

        //居左 或 居右
        if(this._legend.pos.toLowerCase() === this.LEGEND_POS_TOP ||this._legend.pos.toLowerCase() === this.LEGEND_POS_BOTTOM){
          let top = false;
          if(this._legend.pos.toLowerCase() === this.LEGEND_POS_TOP) top = true;
          computeLegendL.call(this,top);
        }else {
          let left = false;
          if(this._legend.pos.toLowerCase() === this.LEGEND_POS_LEFT) left = true;
          computeLegendV.call(this,left);
        }


        /**
         * 计算 垂直摆放图例的属性
         */
        function computeLegendV(left){

          //计算X轴和Y轴开始的距离
          let startX = 0,startY = 0;
          if(left) {
            startX = this.PADDING + this._padding[3] + this._legend.margin[3];
          }else{
            startX = this._canvas.width - this.PADDING - this._padding[1] - this._legend.margin[1] - itemLegendWidth;
          }
          let total = this._datas.length;
          let totalHeight = total*this.LEGEND_ITEM_HEIGHT + total*(this.LEGEND_V_INTERVAL-1);
          if(typeof this._legend.margin[0]>0){
            startY = this.PADDING + this._padding[0] + this._legend.margin[0];
          }else if(typeof this._legend.margin[2]>0){
            startY = this._canvas.height - this.PADDING - this._padding[2] - this._legend.margin[2];
          }else{
            startY = Math.floor(this._canvas.height/2 - totalHeight/2);
          }

          //计算图例每个元素的详细信息
          //blockPos : 色块的位置
          //namePos  : 名称的位置
          //numPos   : 数值的位置
          //unitPos  : 单位的位置
          this._legendAttr.itemAttr = [];
          for(let i = 0; i < this._datas.length;i++){
            let y = startY + i*(this.LEGEND_V_INTERVAL + this.LEGEND_ITEM_HEIGHT),blockPos={y},namePos={y},numPos={y},unitPos={y};
            blockPos.x = startX;
            namePos.x = startX + this.LEGEND_ITEM_WIDTH + this.LEGEND_BLOCK_TEX_INTERVAL;
            numPos.x = namePos.x + maxTileWidth　 + this.LEGEND_TEX_NUM_INTERVAL ;
            unitPos.x = numPos.x + maxDataWidth + this.LEGEND_NUM_UNIT_INTERVAL;
            this._legendAttr.itemAttr.push({blockPos,namePos,numPos,unitPos});

            //储存图例的属性
            this._eventDataStore.legend.push({
              rangeX:[startX,startX + this.LEGEND_ITEM_WIDTH],
              rangeY:[y,y + this.LEGEND_ITEM_HEIGHT],
              index:i
            });
          }
        }

        /**
         * 计算 水平摆放图例的属性
         */
        function computeLegendL(top){
          //计算X轴和Y轴开始的距离
          let startX = 0,startY = 0;
          if(top) {
            startY =  this._legend.margin[0];
          }else{
            startY = this._canvas.height   - this._legend.margin[2] - this.LEGEND_ITEM_HEIGHT;
          }
          let total = this._datas.length;

          let totalWidth = total*itemLegendWidth + total*(this.LEGEND_L_INTERVAL-1);

          if(typeof this._legend.margin[3]>0){
            startX = this.PADDING + this._padding[3] + this._legend.margin[3];
          }else if(typeof this._legend.margin[1]>0){
            startX = this._canvas.height - this.PADDING - this._padding[1] - this._legend.margin[1];
          }else{
            startX = Math.floor(this._canvas.width/2 - totalWidth/2);
          }

          //计算图例每个元素的详细信息
          //blockPos : 色块的位置
          //namePos  : 名称的位置
          //numPos   : 数值的位置
          //unitPos  : 单位的位置
          this._legendAttr.itemAttr = [];
          for(let i = 0; i < this._datas.length;i++){
            let y = startY ,
              blockPos={y},
              namePos={y},
              numPos={y},
              unitPos={y};
            blockPos.x = startX + i*(this.LEGEND_L_INTERVAL + itemLegendWidth);
            namePos.x = blockPos.x + this.LEGEND_ITEM_WIDTH + this.LEGEND_BLOCK_TEX_INTERVAL;
            numPos.x = namePos.x + maxTileWidth　 + this.LEGEND_TEX_NUM_INTERVAL ;
            unitPos.x = numPos.x + maxDataWidth + this.LEGEND_NUM_UNIT_INTERVAL;
            this._legendAttr.itemAttr.push({blockPos,namePos,numPos,unitPos});

            //储存图例的属性
            this._eventDataStore.legend.push({
              rangeX:[blockPos.x,blockPos.x + this.LEGEND_ITEM_WIDTH],
              rangeY:[y,y + this.LEGEND_ITEM_HEIGHT],
              index:i
            });

          }

        }

      }


      /**
       * 计算文字的个数
       * @param divisor
       * @param dividend
       * @param lastLine
       * @returns {number}
       */
      function getFontNum(divisor,dividend,lastLine){
        let weighting = dividend - divisor%dividend;
        let newDivisor = divisor + weighting;
        if(lastLine){
          return newDivisor/dividend - weighting;
        }else{
          return newDivisor/dividend;
        }

      }

    }

    _render(){
      let ctx = this._ctx,self = this;

      ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
      ctx.save();
      ctx.translate(this.coa.x,this.coa.y);
      // ctx.rotate(-60*Math.PI/180);
      // let newData = _copyArray(this._percentData);
      // newData.splice(newData.length,1,newData.splice(self._activedIndex,1)[0]);
      //绘制环形
      this._percentData.forEach((e,i)=>{
        let offsetWidth = 0;
        ctx.save();
        ctx.fillStyle = self._createRadialGradient(ctx,e.color);
        ctx.strokeStyle = "rgba("+e.color[0]+","+e.color[1]+","+e.color[2]+",1)";
        //过渡动画
        if(i === self._activedIndex ){
          offsetWidth = this.transition.getValue("offsetRingWidth") ;
          // self.transition.ringWidth.start += this.transition.ringWidth.speed;
          //绘制阴影
          drawShardow(e,offsetWidth);
          //绘制弹出信息
          drawPopInfo(e);
        }
        ctx.beginPath();
        ctx.arc(0,0,self._innerRadius,e.startDeg,e.startDeg + e.deg,false);
        ctx.arc(0,0,self._ousterRadius + offsetWidth,e.startDeg + e.deg,e.startDeg,true);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      function drawShardow(data,offsetWidth){
        ctx.save();
        ctx.shadowBlur=20;
        ctx.shadowColor="black";
        ctx.beginPath();
        // ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.arc(0,0,self._innerRadius,data.startDeg,data.startDeg + data.deg,false);
        ctx.arc(0,0,self._ousterRadius + offsetWidth,data.startDeg + data.deg,data.startDeg,true);
        ctx.closePath();
        // ctx.stroke();
        ctx.fill();
        ctx.restore();
      }

      function drawPopInfo(data){
        ctx.save();
        let xieXianLong = 40;
        let textPadding = 10;
        let text = (data.percent*100).toFixed(1) + "%";
        let texLineLong = ctx.measureText(text).width + textPadding*2;
        let x = self._ousterRadius*Math.cos(data.tipsDeg);
        let y = self._ousterRadius*Math.sin(data.tipsDeg);
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x + xieXianLong*Math.cos(data.tipsDeg) ,y + xieXianLong*Math.sin(data.tipsDeg));
        ctx.lineTo(x + xieXianLong*Math.cos(data.tipsDeg) + texLineLong*(Math.cos(data.tipsDeg)/Math.abs(Math.cos(data.tipsDeg))),y + xieXianLong*Math.sin(data.tipsDeg));
        ctx.lineWidth = 2;

        if(Math.cos(data.tipsDeg)>0){
          ctx.fillText(text,x + xieXianLong*Math.cos(data.tipsDeg) + textPadding ,y + xieXianLong*Math.sin(data.tipsDeg) - 5);
        }else{
          ctx.fillText(text,x + xieXianLong*Math.cos(data.tipsDeg) - ctx.measureText(text).width - textPadding ,y + xieXianLong*Math.sin(data.tipsDeg) - 5);
        }

        ctx.stroke();
        ctx.restore();
      }



      //绘制标题
      if(this._titleAttr){
        ctx.save();
        ctx.textBaseline = "top";
        ctx.fillStyle = this._titleAttr.fontColor;
        ctx.font = this._titleAttr.font;
        this._titleAttr.layerAttr.forEach(e=>{
          ctx.fillText(e.fontStr,e.posX ,e.posY);
        });
        ctx.restore();
      }

      //绘制图例
      if(this._legendAttr){
        ctx.save();
        // ctx.shadowBlur=0;
        ctx.textBaseline = "hanging";
        ctx.font = this._legendAttr.font;
        let self = this;
        this._datas.forEach((e,i)=>{
          let legend = self._legendAttr.itemAttr[i];
          let rgbArr = self._percentData[i].color;
          //色块和名称
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = 'rgba('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+',0.6)';
          ctx.strokeStyle = 'rgba('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+',1)';
          ctx.lineWidth = self.LEGEND_BORDER_WIDTH;
          ctx.rect(legend.blockPos.x,legend.blockPos.y,self.LEGEND_ITEM_WIDTH,self.LEGEND_ITEM_HEIGHT);
          ctx.fill();
          ctx.stroke();
          ctx.fillText(e.name,legend.namePos.x,legend.namePos.y);
          ctx.restore();

          //数值
          // ctx.shadowBlur=1;
          ctx.fillStyle = self._legend.color;
          ctx.fillText(e.data,legend.numPos.x,legend.numPos.y);

          //单位
          ctx.fillStyle = self._legend.unitColor;
          ctx.fillText(self._legend.unit,legend.unitPos.x,legend.unitPos.y);

        });
        ctx.restore();
      }



      //注册事件
      this._addEvent();

    }

    /**
     * 添加鼠标事件
     * @private
     */
    _addEvent(){
      let mouse = this._mousePos = this._captureMouse(this._canvas),self = this;
      this._canvas.onmousemove = mouseMoveHandler;

      /**
       * 鼠标移动事件
       */
      function mouseMoveHandler(){
        let index = mouseOnRing();
        if(index === false){
          index = mouseOnLegend();
        }
        if(index !== false){ //
          if(!self._mouse){
            self._canvas.style.cursor = "pointer";
            self._mouse = true;
            self._activedIndex = index;
            self.transition.setValue("offsetRingWidth",HyPie.MAXOFFSET)
            // self.aniData.ringWidth = HyPie.MAXOFFSET;
            // if(self.aniStop) self._startAni();
          }else if(index !== self._activedIndex){
            self._canvas.style.cursor = "pointer";
            // self.offsetRingWidth = 0;
            self._activedIndex = index;
            self.transition.setValue("offsetRingWidth",HyPie.MAXOFFSET)
            // self.aniData.ringWidth = HyPie.MAXOFFSET;
            // if(self.aniStop) self._startAni();
          }

        }else{
          if(self._mouse && self._activedIndex !== self._defaultActive){
            self.transition.initValue("offsetRingWidth");
            self._activedIndex = self._defaultActive;
            self._mouse = false;
          }
          self._canvas.style.cursor = "default";
        }
      }

      /**
       * 计算鼠标在哪个圆环中
       * @returns {*}
       */
      function mouseOnRing(){
        let distance = Math.sqrt(Math.pow(mouse.x-self.coa.x,2) + Math.pow(mouse.y-self.coa.y,2));
        if(distance > self._innerRadius && distance < self._ousterRadius){ //鼠标在圆环中
          let y = mouse.y - self.coa.y;
          let x = mouse.x - self.coa.x;
          //计算鼠标的角度
          let radian = Math.atan2(y,x);
          if(radian<0) radian += Math.PI*2 ;
          //计算鼠标在哪个环上面
          let hoverRing = self._eventDataStore.ring.filter(e=>{
            return radian>e.range[0] &&radian<e.range[1]
          });

          if(hoverRing.length===1){
            return hoverRing[0].index;
          }
          return false
        }else if(self._mouse&&self._activedIndex>-1){
          let activedRing = self._eventDataStore.ring[self._activedIndex];
          //计算鼠标的角度
          let y = mouse.y - self.coa.y;
          let x = mouse.x - self.coa.x;
          let radian = Math.atan2(y,x);
          if(radian<0) radian += Math.PI*2 ;
          if(radian>activedRing.range[0] &&radian<activedRing.range[1]) {
            let distance = Math.sqrt(Math.pow(mouse.x - self.coa.x, 2) + Math.pow(mouse.y - self.coa.y, 2));
            if (distance > self._innerRadius && distance < (self._ousterRadius + self.offsetRingWidth)) {
              return self._activedIndex;
            }
          }
          return false;
        }
        else{
          return false
        }
      }

      /**
       * 计算鼠标在哪个图例中
       */
      function mouseOnLegend(){
        if(self._eventDataStore.legend&&self._eventDataStore.legend.length>0){
          let hoverRagend = self._eventDataStore.legend.filter(e=>{
            return mouse.x > e.rangeX[0] && mouse.x < e.rangeX[1] && mouse.y < e.rangeY[1] && mouse.y > e.rangeY[0]
          });
          if(hoverRagend.length===1){
            return hoverRagend[0].index;
          }
          return false
        }else{
          return false
        }
      }
    }


    resize(){
      clearTimeout(this.timer);

      this.timer = setTimeout( () => {
        this._canvas.width = this._parent.clientWidth;
        this._canvas.height = this._parent.clientHeight;
        this._canvas.style.width = this._parent.clientWidth + 'px';
        this._canvas.style.height = this._parent.clientHeight + 'px';
        this._init();
        this._render();
      },200);

    }

    destroy(){
      let parentEl = this._canvas.parentNode;
      parentEl.removeChild(this._canvas);
    }
    // _activedRing(){
    //
    //     if(this.offsetRingWidth < this.MAXOFFSET && this._mouse){
    //         this.offsetRingWidth += this._dv;
    //         this._render();
    //         this._activedAniId =  requestAnimationFrame(this._activedRing.bind(this));
    //     }
    // }
    //
    // _unActivedRing(){
    //     if(this.offsetRingWidth > 0 && !this._mouse){
    //         this.offsetRingWidth -= this._dv;
    //         this._render();
    //         this._unActivedAniId =  requestAnimationFrame(this._unActivedRing.bind(this));
    //     }
    // }

    /**
     * 创建canvas
     */

    static _createCanvas(parentEl){
      let canvas = document.createElement("canvas");
      canvas.width = parentEl.clientWidth;
      canvas.height = parentEl.clientHeight;
      let domStyle = canvas.style;
      if (domStyle) { // Not in node
        domStyle.position = 'absolute';
        domStyle.left = 0;
        domStyle.top = 0;
        domStyle.width = parentEl.clientWidth + 'px';
        domStyle.height = parentEl.clientHeight + 'px';
        canvas.onselectstart = function(){return false}; // 避免页面选中的尴尬
        domStyle['-webkit-user-select'] = 'none';
        domStyle['user-select'] = 'none';
        domStyle['-webkit-touch-callout'] = 'none';
        domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
        domStyle['padding'] = 0;
        domStyle['margin'] = 0;
        domStyle['border-width'] = 0;
      }
      parentEl.appendChild(canvas);
      return canvas;
    }

    /**
     * 径向渐变
     * @param ctx
     * @param rgbArr
     * @returns {CanvasGradient}
     * @private
     */
    _createRadialGradient(ctx,rgbArr){
      let radgrad = ctx.createRadialGradient(0,0,0,0,0,this._ousterRadius);
      radgrad.addColorStop(0,'rgba('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+',0.2)');
      radgrad.addColorStop(this._innerRadius/this._ousterRadius, 'rgba('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+',0.5)');
      radgrad.addColorStop(1, 'rgba('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+',1)');
      return radgrad;
    }

    /**
     * 创建阴影径向
     * @param ctx
     * @param rgbArr
     * @returns {CanvasGradient}
     * @private
     */
    _createShaderRadialGradient(ctx){
      let radgrad = ctx.createRadialGradient(0,0,0,0,0,this._ousterRadius + this.offsetRingWidth + 5);
      radgrad.addColorStop(0,'rgba(0,0,0,0)');
      radgrad.addColorStop(this._innerRadius/this._ousterRadius, 'rgba(0,0,0,0.1)');
      radgrad.addColorStop(this._innerRadius/this._ousterRadius + (1- this._innerRadius/this._ousterRadius)/2, 'rgba(0,0,0,0.5)');
      radgrad.addColorStop(1, 'rgba(0,0,0,0)');
      return radgrad;
    }

    /**
     * 随机颜色
     * @returns
     * @private
     */
    static _renderColor(){
      return [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
    }

    /*16进制颜色转为RGB格式*/
    _colorRgb(color){
      let sColor = color.toLowerCase();
      if(sColor&&this.REG.test(color)){
        if(sColor.length === 4){
          let sColorNew = "#";
          for(let i=1; i<4; i+=1){
            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for(let i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return sColorChange;
      }else{
        return sColor;
      }
    }

    /**
     * 转换鼠标位置
     * @param element
     * @returns {{x: number, y: number}}
     * @private
     */

    _captureMouse(element){
      //定义一个名为mouse的对象
      let mouse = {x:0,y:0};
      //为元素绑定mousemove事件
      element.addEventListener('mousemove',function(event){
        let x,y;
        // 获取鼠标位于当前屏幕的位置， 并作兼容处理
        if(event.pageX||event.pageY){
          x = event.pageX;
          y = event.pageY;
        }else{
          x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }
        let bBox = element.getBoundingClientRect();
        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= bBox.left;
        y -= bBox.top;
        let scale = element.width/bBox.width;
        mouse.x = x*scale;
        mouse.y = y*scale;
      },false);
      //返回值为mouse对象
      return mouse;
    }
  }

  return HyPie
});
