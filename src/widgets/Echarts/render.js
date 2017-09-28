/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'


export default class EchartsRender extends Render {

  constructor (el) {
    super(el);
    this.wordCloudLoaded = false
  }

  //load方法加载依赖
  load(){
    return import(/* webpackChunkName:'echarts' */ 'echarts')
  }

  async init () {
    let echarts = await this.load();
    window.echarts=echarts;

    //加载词云插件
    if (!this.wordCloudLoaded) {
      this.loadWordCloud();
      this.wordCloudLoaded=true;
    }

    let element = this.el;
    if (typeof this.el === 'string') {
      element = document.getElementById(this.el)
    }
    if(window.cur_ydp_theme){
      let theme = window.cur_ydp_theme
      echarts.registerTheme(theme.name,theme.obj)
      this.widget= echarts.init(element,theme.name);
    }else{
      this.widget= echarts.init(element);
    }
    return  this.widget ;
  }

  afterInit(vueInstance,registry){
    window.addEventListener('resize', debounce(()=>{
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000));

    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
    super.afterInit();
  }

  //render用于组件渲染
  render (option) {
    if (this.widget) {
      try {
        this.widget.setOption(option, true)
      } catch (e) {
        console.log(e,this.widget)
        if (e.message.startsWith('`setOption` should not be called during main process')) {
          console.log('charts 实例错误，正在重建')
          this.widget.dispose();
          this.init();
          console.log('charts 实例错误，重建完成')
        }
      }
    }
  }

  destroy () {
    window.removeEventListener('resize', debounce(() => {
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000))
  }

  resize () {
    if (this.widget) {
      this.widget.resize()
    }
  }

  /**&
   * @echats-cloud 1.11
   * 在异步加载的情况下，直接使用import或者require无法渲染词云,
   * 原因是词云代码自己有一套require Echarts的逻辑,使得异步加载的Echarts和词云注册的Echarts不是同一个,
   * 这里采用复制全部词云代码的方式来加载
   * */
  loadWordCloud () {
    let layoutUtil = require('echarts/lib/util/layout')
    let wordCloudLayoutHelper = require('echarts-wordcloud/src/layout')
    let completeDimensions = require('echarts/lib/data/helper/completeDimensions')

    if (!wordCloudLayoutHelper.isSupported) {
      throw new Error('Sorry your browser not support wordCloud')
    }

    // https://github.com/timdream/wordcloud2.js/blob/c236bee60436e048949f9becc4f0f67bd832dc5c/index.js#L233
    function updateCanvasMask (maskCanvas) {
      var ctx = maskCanvas.getContext('2d')
      var imageData = ctx.getImageData(
        0, 0, maskCanvas.width, maskCanvas.height)
      var newImageData = ctx.createImageData(imageData)

      var toneSum = 0
      var toneCnt = 0
      for (var i = 0; i < imageData.data.length; i += 4) {
        var alpha = imageData.data[i + 3]
        if (alpha > 128) {
          var tone = imageData.data[i]
            + imageData.data[i + 1]
            + imageData.data[i + 2]
          toneSum += tone
          ++toneCnt
        }
      }
      var threshold = toneSum / toneCnt

      for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i]
          + imageData.data[i + 1]
          + imageData.data[i + 2]
        var alpha = imageData.data[i + 3]

        if (alpha < 128 || tone > threshold) {
          // Area not to draw
          newImageData.data[i] = 0
          newImageData.data[i + 1] = 0
          newImageData.data[i + 2] = 0
          newImageData.data[i + 3] = 0
        }
        else {
          // Area to draw
          // The color must be same with backgroundColor
          newImageData.data[i] = 255
          newImageData.data[i + 1] = 255
          newImageData.data[i + 2] = 255
          newImageData.data[i + 3] = 255
        }
      }

      ctx.putImageData(newImageData, 0, 0)
      console.log(maskCanvas.toDataURL())
    }

    echarts.registerLayout(function (ecModel, api) {
      ecModel.eachSeriesByType('wordCloud', function (seriesModel) {
        var gridRect = layoutUtil.getLayoutRect(
          seriesModel.getBoxLayoutParams(), {
            width: api.getWidth(),
            height: api.getHeight()
          }
        )
        var data = seriesModel.getData()

        var canvas = document.createElement('canvas')
        canvas.width = gridRect.width
        canvas.height = gridRect.height

        var ctx = canvas.getContext('2d')
        var maskImage = seriesModel.get('maskImage')
        if (maskImage) {
          try {
            ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height)
            updateCanvasMask(canvas)
          }
          catch (e) {
            console.error('Invalid mask image')
            console.error(e.toString())
          }
        }

        var sizeRange = seriesModel.get('sizeRange')
        var rotationRange = seriesModel.get('rotationRange')
        var valueExtent = data.getDataExtent('value')

        var DEGREE_TO_RAD = Math.PI / 180
        var gridSize = seriesModel.get('gridSize')
        wordCloudLayoutHelper(canvas, {
          list: data.mapArray('value', function (value, idx) {
            var itemModel = data.getItemModel(idx)
            return [
              data.getName(idx),
              itemModel.get('textStyle.normal.textSize', true)
              || echarts.number.linearMap(value, valueExtent, sizeRange),
              idx
            ]
          }).sort(function (a, b) {
            // Sort from large to small in case there is no more room for more words
            return b[1] - a[1]
          }),
          fontFamily: seriesModel.get('textStyle.normal.fontFamily')
          || seriesModel.get('textStyle.emphasis.fontFamily')
          || ecModel.get('textStyle.fontFamily'),
          fontWeight: seriesModel.get('textStyle.normal.fontWeight')
          || seriesModel.get('textStyle.emphasis.fontWeight')
          || ecModel.get('textStyle.fontWeight'),
          gridSize: gridSize,

          ellipticity: gridRect.height / gridRect.width,

          minRotation: rotationRange[0] * DEGREE_TO_RAD,
          maxRotation: rotationRange[1] * DEGREE_TO_RAD,

          clearCanvas: !maskImage,

          rotateRatio: 1,

          rotationStep: seriesModel.get('rotationStep') * DEGREE_TO_RAD,

          drawOutOfBound: seriesModel.get('drawOutOfBound'),

          shuffle: false,

          shape: seriesModel.get('shape')
        })

        function onWordCloudDrawn (e) {
          var item = e.detail.item
          if (e.detail.drawn && seriesModel.layoutInstance.ondraw) {
            e.detail.drawn.gx += gridRect.x / gridSize
            e.detail.drawn.gy += gridRect.y / gridSize
            seriesModel.layoutInstance.ondraw(
              item[0], item[1], item[2], e.detail.drawn
            )
          }
        }

        canvas.addEventListener('wordclouddrawn', onWordCloudDrawn)

        if (seriesModel.layoutInstance) {
          // Dispose previous
          seriesModel.layoutInstance.dispose()
        }

        seriesModel.layoutInstance = {
          ondraw: null,

          dispose: function () {
            canvas.removeEventListener('wordclouddrawn', onWordCloudDrawn)
            // Abort
            canvas.addEventListener('wordclouddrawn', function (e) {
              // Prevent default to cancle the event and stop the loop
              e.preventDefault()
            })
          }
        }
      })
    })

    echarts.registerPreprocessor(function (option) {
      var series = (option || {}).series
      !echarts.util.isArray(series) && (series = series ? [series] : [])

      var compats = ['shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY']

      echarts.util.each(series, function (seriesItem) {
        if (seriesItem && seriesItem.type === 'wordCloud') {
          var textStyle = seriesItem.textStyle || {}

          compatTextStyle(textStyle.normal)
          compatTextStyle(textStyle.emphasis)
        }
      })

      function compatTextStyle (textStyle) {
        textStyle && echarts.util.each(compats, function (key) {
          if (textStyle.hasOwnProperty(key)) {
            textStyle['text' + echarts.format.capitalFirst(key)] = textStyle[key]
          }
        })
      }
    })

    function getShallow (model, path) {
      return model && model.getShallow(path)
    }

    echarts.extendChartView({

      type: 'wordCloud',

      render: function (seriesModel, ecModel, api) {
        var group = this.group
        group.removeAll()

        var data = seriesModel.getData()

        var gridSize = seriesModel.get('gridSize')

        seriesModel.layoutInstance.ondraw = function (text, size, dataIdx, drawn) {
          var itemModel = data.getItemModel(dataIdx)
          var textStyleModel = itemModel.getModel('textStyle.normal')
          var emphasisTextStyleModel = itemModel.getModel('textStyle.emphasis')

          var textEl = new echarts.graphic.Text({
            style: echarts.graphic.setTextStyle({}, textStyleModel, {
              x: drawn.info.fillTextOffsetX,
              y: drawn.info.fillTextOffsetY + size * 0.5,
              text: text,
              textFill: data.getItemVisual(dataIdx, 'color'),
              fontSize: size
            }),
            scale: [1 / drawn.info.mu, 1 / drawn.info.mu],
            position: [
              (drawn.gx + drawn.info.gw / 2) * gridSize,
              (drawn.gy + drawn.info.gh / 2) * gridSize
            ],
            rotation: drawn.rot
          })

          group.add(textEl)

          data.setItemGraphicEl(dataIdx, textEl)

          echarts.graphic.setHoverStyle(
            textEl,
            echarts.graphic.setTextStyle({}, emphasisTextStyleModel, null, {forMerge: true})
          )
        }

        this._model = seriesModel
      },

      remove: function () {
        this.group.removeAll()

        this._model.layoutInstance.dispose()
      },

      dispose: function () {
        this._model.layoutInstance.dispose()
      }
    })

    echarts.extendSeriesModel({

      type: 'series.wordCloud',

      visualColorAccessPath: 'textStyle.normal.color',

      optionUpdated: function () {
        var option = this.option
        option.gridSize = Math.max(Math.floor(option.gridSize), 4)
      },

      getInitialData: function (option, ecModel) {
        var dimensions = completeDimensions(['value'], option.data)
        var list = new echarts.List(dimensions, this)
        list.initData(option.data)
        return list
      },

      // Most of options are from https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md
      defaultOption: {

        maskImage: null,

        // Shape can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        shape: 'circle',

        left: 'center',

        top: 'center',

        width: '70%',

        height: '80%',

        sizeRange: [12, 60],

        rotationRange: [-90, 90],

        rotationStep: 45,

        gridSize: 8,

        drawOutOfBound: false,

        textStyle: {
          normal: {
            fontWeight: 'normal'
          }
        }
      }
    })

  }
}
