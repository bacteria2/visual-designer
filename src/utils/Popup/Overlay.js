export default {
  name: 'mu-overlay',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function
    },
    opacity: {
      type: Number,
      default: 0.4
    },
    color: {
      type: String,
      default: '#000'
    },
    zIndex: {
      type: Number
    }
  },
  render(h){
    if(this.show)
      return h('div',{
        attrs:{
          class:'overlay',
        },
        on:{
          click:this.handleClick,
          touchmove:this.prevent
        },
        style:this.overlayStyle
      })
  },
  computed: {
    overlayStyle () {
      return {
        'opacity': this.opacity,
        'background-color': this.color,
        'position': this.fixed ? 'fixed' : '',
        'z-index': this.zIndex
      }
    }
  },
  methods: {
    prevent (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    handleClick () {
      if (this.onClick) {
        this.onClick()
      }
    }
  }
}
