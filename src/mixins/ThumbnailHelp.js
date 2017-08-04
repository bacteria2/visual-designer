import domtoimage from 'dom-to-image'
export default {
  data(){
    return{
      thumbnail:'',
      widgetRender:undefined,
      widgetOptions:{}
    }
  },
  computed:{
    isEcharts(){
       return this.widgetOptions.render == 'Echarts'
    },
    vueWrapper(){
      return  this.widgetOptions.vueWrapper
    }
  },
  methods:{
    async thumbnailHandler(){
      let render = this.widgetRender;
      if(this.isEcharts){
        this.thumbnail = render.instance.getDataURL({
          pixelRatio: 0.4,
          backgroundColor: '#fff',
          excludeComponents:['toolbox','legend','dataZoom','visualMap','title']
        });
      }else{
        let node = document.getElementById(render.id);
        //setting = {bgcolor:'#fff',height:'340px',width:'200px',quality:1};
        this.thumbnail = await domtoimage.toPng(node)
      }
      return new Promise(resole =>{resole()})
    }
  }
}
