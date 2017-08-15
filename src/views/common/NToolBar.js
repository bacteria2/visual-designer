export default {
  name: 'NToolBar',
  props: {
    title: {
      default: '默认标题'
    }
  },
  render(h){
    return ( <nav class="n-toolbar">
         <div class="n-toolbar__title">{this.title}</div>
         <div class="n-spacer"/>
        {this.$slots.default}
       </nav>
    )
  }
}
