/**
 * Created by lenovo on 2017/7/26.
 */
export default class WidgetRender {
  constructor (el) {
    this.widget=null;
    this.el=el;
  }

  load() {
    console.log('beforeLoad')
  }

  beforeLoad () {
    console.log('beforeLoad')
  }

  afterLoad () {
    console.log('afterLoad')
  }

  async init(){
    console.log('init')
  }

  beforeInit(){
    console.log('beforeInit')
  }

  afterInit(){
    console.log('afterInit')
  }


  beforeRender () {
    console.log('beforeRender')
  }

  afterRender () {
    console.log('afterRender')
  }

  render () {
    console.log('render')
  }

  beforeDestroy(){
    console.log('beforeDestroy')
  }

  destroy(){
    console.log('destroy')
  }

  afterDestroy(){
    console.log('afterDestroy')
  }
}
