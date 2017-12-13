/**
 * 2017-12-13 lee
 * Canvas工具类，处理过渡属性
 * @constructor
 */
define(function () {
  const CanvasTransition = function (renderFnc) {

    this._store = {};

    this.count = 0;

    if (typeof(this._renderFnc === "function")) {
      this._renderFnc = renderFnc;
    } else {
      throw new Error("参数设置错误");
    }

  };

  CanvasTransition.prototype = {
    constructor: CanvasTransition,
    /**
     *
     * @param key
     * @param value
     * @param speed  单位：秒
     */
    addProp: function (key, value, time) {

      this._store[key] = {
        ordinary: value,
        current: value,
        targetValue: value,
        speed: 1,
        timeLong: time || 1
      }
    },
    setValue: function (key, targetValue) {
      var prop = this._store[key];
      if (prop) {
        prop.current = prop.ordinary;
        prop.targetValue = targetValue;
        this._setSpeed(key);
        if (!this.moveAble) this.startTransition();
      }
    },
    initValue: function (key) {
      var prop = this._store[key];
      if (prop) {
        prop.current = prop.ordinary;
        // this._setSpeed(key);
        if (!this.moveAble) this.startTransition();
      }
    },
    setSpeed: function (key, timeLong) {
      var prop = this._store[key];
      if (prop) {
        prop.timeLong = timeLong || 1;
        this._setSpeed(key);
      }
    },
    _setSpeed: function (key) {
      var prop = this._store[key];
      var total = prop.targetValue - prop.current;
      prop.speed = total / (prop.timeLong * 60);
    },
    getValue: function (key) {
      var prop = this._store[key];
      if (prop) {
        return prop.current;
      }
    },
    /**
     * 计算过渡属性值
     */
    move: function () {
      this.moveAble = false;
      for (var propKey in this._store) {
        var prop = this._store[propKey];
        prop.current += prop.speed;
        if (prop && Math.abs(prop.targetValue - prop.current) > Math.abs(prop.speed)) {
          this.moveAble = true;
        } else if (prop && prop.targetValue !== prop.current) {
          prop.current = prop.targetValue;
        }
      }
    },
    startTransition() {
      this.move();
      this._renderFnc();
      if (this.moveAble) requestAnimationFrame(this.startTransition.bind(this));
    }
  };
  return CanvasTransition
});
