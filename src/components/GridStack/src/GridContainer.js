import $ from 'jquery'
import 'gridstack/dist/gridstack.all'
import 'gridstack/dist/gridstack.css'
import 'gridstack/dist/gridstack-extra.css'
import each from 'lodash/each'
import defaults from 'lodash/defaults'

export default{
  name: 'VStackContainer',
  mounted(){
    let items = this.items
    let options = this.options
    $('#grid1').gridstack(options)
    $('#grid2').gridstack(defaults({
      float: true
    }, options))

    $('.grid-stack').each(function () {
      let grid = $(this).data('gridstack')
      each(items, node => {
        grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
          node.x, node.y, node.width, node.height)
      }, this)
    })

    $('.sidebar .grid-stack-item').draggable({
      revert: 'invalid',
      handle: '.grid-stack-item-content',
      scroll: false,
      appendTo: 'body'
    })
  },

  data(){
    return {
      options: {
        width: 6,
        float: false,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
      },
      items: [
        {x: 0, y: 0, width: 2, height: 2},
        {x: 3, y: 1, width: 1, height: 2},
        {x: 4, y: 1, width: 1, height: 1},
        {x: 2, y: 3, width: 3, height: 1},
        {x: 2, y: 5, width: 1, height: 1}
      ]
    }
  },
  render(h){
    return (
      <div class="grid-container-fluid">
        <button>add new block</button>
        <h1>Two grids demo</h1>
        <div class="row">
          <div class="col-md-3">
            <div class="sidebar">
              <div class="grid-stack-item">
                <div class="grid-stack-item-content">Drag me</div>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="trash">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="grid-stack grid-stack-6" id="grid1">
            </div>
          </div>
          <div class="col-md-6">
            <div class="grid-stack grid-stack-6" id="grid2">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
