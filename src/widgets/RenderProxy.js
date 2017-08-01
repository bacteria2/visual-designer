/**
 * Created by lenovo on 2017/7/26.
 */
export class RenderProxy{

  constructor (render){
    this.renderInstance=render;
  }

  newInstance(name){

  }

  proxy(render){
    this.renderInstance=render;
  }

  load(){
    if(this.renderInstance){
      this.renderInstance.beforeLoad(...arguments);
      this.renderInstance.load(...arguments);
      this.renderInstance.afterLoad(...arguments);
    }
  }

  render(){
    if(this.renderInstance){
      this.renderInstance.beforeRender(...arguments);
      this.renderInstance.render(...arguments);
      this.renderInstance.afterRender(...arguments);
    }
  }

  async init(){
    if(this.renderInstance){
      this.renderInstance.beforeInit(...arguments);
      await this.renderInstance.init(...arguments);
      this.renderInstance.afterInit(...arguments);
    }
  }

  destroy(){
    if(this.renderInstance){
      this.renderInstance.beforeDestroy(...arguments);
      this.renderInstance.destroy(...arguments);
      this.renderInstance.afterDestroy(...arguments);
    }
  }

  execute(name,payload){
    if(this.renderInstance)
      this.renderInstance[name].apply(this.render,payload)
  }
}

export class VueRenderProxy extends RenderProxy{

  render(){
    if(this.renderInstance){
      this.renderInstance.beforeRender(...arguments);
      this.renderInstance.render(...arguments);
      this.renderInstance.afterRender(...arguments);

    }
  }
}
