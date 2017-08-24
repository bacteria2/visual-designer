/**
 * Created by lenovo on 2017/7/26.
 */
import ModelRenderMapper from './ModelRenderMapper'

export class RenderProxy {

  constructor (render) {
    this.renderInstance = render
  }

  proxyModelRender (name,...args) {
    if (typeof name === 'string') {

      let RenderClass = ModelRenderMapper[name]
      if (!RenderClass)
        throw new Error(`can't find a render class for ${name}`);
      this.renderInstance=new RenderClass(...args);
      return this;
    }
    else
      throw new Error('render class name must be  string')
  }

  proxy (render) {
    this.renderInstance = render
  }

  load () {
    if (this.renderInstance) {
      this.renderInstance.beforeLoad(...arguments)
      this.renderInstance.load(...arguments)
      this.renderInstance.afterLoad(...arguments)
    }
  }

  render () {
    if (this.renderInstance) {
      this.renderInstance.beforeRender(...arguments)
      this.renderInstance.render(...arguments)
      this.renderInstance.afterRender(...arguments)
    }
  }

  mergeAndRender(){
    if (this.renderInstance) {
      this.renderInstance.beforeRender(...arguments)
      this.renderInstance.mergeAndRender(...arguments)
      this.renderInstance.afterRender(...arguments)
    }
  }

  async init () {
    if (this.renderInstance) {
      this.renderInstance.beforeInit(...arguments)
      let re = await this.renderInstance.init(...arguments)
      this.renderInstance.afterInit(...arguments)
      return re
    }
  }

  destroy () {
    if (this.renderInstance) {
      this.renderInstance.beforeDestroy(...arguments)
      this.renderInstance.destroy(...arguments)
      this.renderInstance.afterDestroy(...arguments)
    }
  }

  resize () {
    if (this.renderInstance) {
      this.renderInstance.resize()
    }
  }

  execute (name, payload) {
    if (this.renderInstance)
      this.renderInstance[name].apply(this.render, payload)
  }
}

export class VueRenderProxy extends RenderProxy {

  render () {
    if (this.renderInstance) {
      this.renderInstance.beforeRender(...arguments)
      this.renderInstance.render(...arguments)
      this.renderInstance.afterRender(...arguments)
    }
  }
}
