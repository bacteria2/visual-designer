/**
 * Created by lenovo on 2017/8/7.
 */
import{ RenderProxy } from '../../widgets/RenderProxy'
import{ getWidgetInstanceByID } from '@/services/WidgetInstanceService'

class DataView {
  constructor (el, {host = 'http://visual-server.com', port = 80, apiPrefix = '/ydp-visual-web/ydp/visual', timeout = 1000,}) {
    this.host = host
    this.port = port
    this.apiPrefix = apiPrefix
    this.timeout = timeout
    this.el = el
    this.proxy = new RenderProxy()
    return this
  }

  async render (instanceId) {
    if (instanceId) {
      let resp = await getWidgetInstanceByID({key: instanceId}, {
        baseURL: `${this.host}:${this.port}${this.apiPrefix}`,
        timeout: this.timeout
      })
      if (resp.success&&resp.widgetsInstance) {
        let {fRender, fMergeOption} = resp.widgetsInstance

        this.proxy.proxyModelRender(fRender, this.el)
        await this.proxy.init()
        this.proxy.render(JSON.parse(fMergeOption))
      }
      else{
        throw new Error(`request widgetInstance error,
        baseURL:${this.host}:${this.port}${this.apiPrefix},id:${instanceId},response:${JSON.stringify(resp)}`)
      }
    }
  }


}

window.DataView = DataView
