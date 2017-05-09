import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EchartsEditor from '@/components/EchartsEditor'
import { base } from '@/utils/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes: [{
      path: '/',
      name: 'Home',
      component: EchartsEditor,
    },
    {
      path: '/hello',
      component: Hello,
      children: [
        {
          path: 'bar',
          component: Vue.component('bar', {
            render(h){
              return h(
                'h1', [
                  'this is bar',
                  h('a', {attrs: {href: '/hello'}}, 'return  to hello')
                ]
              )
            }
          })
        },
        {
          path: 'tex',
          component: Vue.component('', {
            render(h){
              return h(
                'h1', [
                  'this is tex',
                  h('a', {attrs: {href: '/hello'}}, 'return  to hello')
                ]
              )
            }
          })
        }
      ]
    }
  ]
})
