/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'

export default class  extends Render {

  constructor (el) {
    super(el)
    this.wordCloudLoaded = false
  }

  //load方法加载依赖
  load () {
  }

  async init () {
    let mapv = await import(/* webpackChunkName:'echarts' */ 'mapv');
    let element = this.el
    if (typeof this.el === 'string') {
      element = document.getElementById(this.el)
    }
    let map = new BMap.Map(element, {
      enableMapClick: false
    })    // 创建Map实例
    map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5)  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

    // 地图自定义样式
    map.setMapStyle({
      styleJson: [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#044161'
        }
      }, {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
          'color': '#091934'
        }
      }, {
        'featureType': 'boundary',
        'elementType': 'geometry',
        'stylers': {
          'color': '#064f85'
        }
      }, {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'highway',
        'elementType': 'geometry',
        'stylers': {
          'color': '#004981'
        }
      }, {
        'featureType': 'highway',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#005b96',
          'lightness': 1
        }
      }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'on'
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
          'color': '#004981',
          'lightness': -39
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#00508b'
        }
      }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
          'color': '#056197',
          'visibility': 'off'
        }
      }, {
        'featureType': 'subway',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'local',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'boundary',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#029fd4'
        }
      }, {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
          'color': '#1a5787'
        }
      }, {
        'featureType': 'label',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#ffffff'
        }
      }, {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#1e1c1c'
        }
      }, {
        'featureType': 'administrative',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'on'
        }
      }, {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }]
    })

    let data = []
    let rs = [[{'geoCoord': [98.53, 39.775]}, {'geoCoord': [99.058, 39.876]}, {'geoCoord': [99.102, 39.876]}, {'geoCoord': [99.233, 41.212]}, {'geoCoord': [99.277, 37.195]}, {'geoCoord': [99.673, 31.466]}, {'geoCoord': [99.717, 41.607]}, {'geoCoord': [79.717, 37.265]}, {'geoCoord': [79.717, 33.395]}, {'geoCoord': [79.761, 37.265]}, {'geoCoord': [79.761, 31.579]}, {'geoCoord': [79.805, 31.466]}, {'geoCoord': [99.893, 40.681]}, {'geoCoord': [91.893, 37.125]}, {'geoCoord': [99.893, 37.09]}, {'geoCoord': [98.937, 37.09]}, {'geoCoord': [80.112, 32.51]}, {'geoCoord': [80.2, 37.09]}, {'geoCoord': [80.244, 41.278]}, {'geoCoord': [80.244, 41.146]}, {'geoCoord': [80.376, 40.647]}, {'geoCoord': [80.464, 44.151]}, {'geoCoord': [80.508, 44.182]}, {'geoCoord': [80.64, 44.119]}, {'geoCoord': [80.728, 44.182]}, {'geoCoord': [80.771, 44.182]}, {'geoCoord': [80.859, 44.277]}, {'geoCoord': [80.859, 44.056]}, {'geoCoord': [80.903, 43.993]}, {'geoCoord': [80.991, 43.993]}, {'geoCoord': [81.035, 44.996]}, {'geoCoord': [81.035, 44.965]}, {'geoCoord': [81.035, 43.961]}, {'geoCoord': [81.079, 44.465]}, {'geoCoord': [81.079, 43.835]}, {'geoCoord': [81.123, 44.497]}, {'geoCoord': [81.123, 43.835]}, {'geoCoord': [81.123, 32.399]}, {'geoCoord': [81.167, 44.497]}, {'geoCoord': [81.167, 40.313]}, {'geoCoord': [81.167, 30.297]}, {'geoCoord': [81.211, 44.056]}, {'geoCoord': [81.211, 30.789]}, {'geoCoord': [81.255, 43.961]}, {'geoCoord': [81.255, 43.898]}, {'geoCoord': [81.255, 40.547]}, {'geoCoord': [81.299, 31.091]}, {'geoCoord': [81.299, 30.978]}, {'geoCoord': [81.343, 44.559]}, {'geoCoord': [81.343, 43.898]}, {'geoCoord': [81.387, 44.59]}, {'geoCoord': [81.387, 30.751]}, {'geoCoord': [81.519, 43.993]}, {'geoCoord': [81.519, 43.961]}, {'geoCoord': [81.563, 43.866]}, {'geoCoord': [81.563, 40.614]}, {'geoCoord': [81.606, 44.996]}, {'geoCoord': [81.65, 36.844]}, {'geoCoord': [81.694, 43.993]}, {'geoCoord': [81.694, 36.844]}, {'geoCoord': [81.738, 41.837]}, {'geoCoord': [81.87, 44.934]}, {'geoCoord': [81.87, 43.835]}, {'geoCoord': [81.87, 41.804]}, {'geoCoord': [82.046, 44.84]}, {'geoCoord': [82.09, 44.622]}, {'geoCoord': [82.222, 43.485]}, {'geoCoord': [82.31, 44.903]}, {'geoCoord': [82.354, 44.84]}, {'geoCoord': [82.485, 44.778]}, {'geoCoord': [82.485, 43.803]}, {'geoCoord': [82.485, 43.771]}, {'geoCoord': [82.485, 41.771]}, {'geoCoord': [82.529, 43.803]}, {'geoCoord': [82.573, 45.151]}]];
    (function (rs) {
      for (var i = 0; i < rs[0].length; i++) {
        var geoCoord = rs[0][i].geoCoord
        data.push({
          geometry: {
            type: 'Point',
            coordinates: geoCoord
          },
          time: Math.random() * 10
        })
      }

      var dataSet = new mapv.DataSet(data)
      var options = {
        fillStyle: 'rgba(255, 250, 50, 0.6)',
        //shadowColor: 'rgba(255, 250, 50, 0.5)',
        //shadowBlur: 3,
        updateCallback: function (time) {
          time = time.toFixed(2)
      //    $('#time').html('时间' + time)
        },
        size: 3,
        draw: 'simple',
        animation: {
          type: 'time',
          stepsRange: {
            start: 0,
            end: 10
          },
          trails: 1,
          duration: 6,
        }
      }
      var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
    })(rs)
  }

  afterInit (vueInstance, registry) {
    if (registry && vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }

  //render用于组件渲染
  render (option) {
    // 百度地图API功能

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
}
