export default [
  {name:'echart',
    group:['EchartBar','EchartLine','EchartScatter'],
    async getDependent(){return await import('echarts');}
  },
  {}
  ];
