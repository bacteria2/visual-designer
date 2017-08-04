export default{
  name: 'ViewHeader',
  render(h){
    return (
      <nav class="page_top">
        <div class={this.collapse?'logo_area collapse':'logo_area'} >
          <img src="/static/image/themeBlue/ydp_logo.png"/>
          <h2>{this.title}</h2>
          {this.$slots.logo}
        </div>
        <div class="quick_area">
          <div class="pull_left">
            {this.$slots.default}
          </div>
          <div class="pull_right">
            {this.$slots.rightEnd}
          </div>
        </div>
      </nav>
    )
  },
  props: {
    title: {type: String, default: '粤数可视化平台'},
    collapse: {
      type: Boolean,
      default: false
    }
  }

}
