
/*
 * (c) Copyright 2016 jia ming. All Rights Reserved.
 * 仪表盘
 * id dom的ID
 * width dom的宽
 * height dom的高
 * dataSet 数据
 *      value: 数值
 *      max: 最大值，最好是整数 - 当数值超过最大值，仪表盘指向最大值，显示数值是原值
 *      name: 显示内容文字
 *      sign: 显示单位 - 可选参数
 *      dicimal : 小数点保留位数 - 可选参数
 *      circlePng  :图片地址1
 *      valuePng   :图片地址2
 */
 function createDashBoardChart(id, width, height, dataSet) {
    var publicGraph = {},
      circlePng = dataSet.circlePng?dataSet.circlePng:'/static/widgets/d3/dashboard/image/big-circle.png',
      valuePng = dataSet.valuePng?dataSet.valuePng:'/static/widgets/d3/dashboard/image/big-value.png'

    //------------------------------function begin--------------------------
    function setClipPath(angle) {
        var _x = Math.cos(angle) * circle.radius + circle.cx;
        var _y = Math.sin(angle) * circle.radius + circle.cy;

        var ary = [];
        ary.push('M');
        ary.push(circle.startX);
        ary.push(",");
        ary.push(circle.startY);
        ary.push(' ');

        ary.push('A');
        ary.push(circle.radius);
        ary.push(",");
        ary.push(circle.radius);
        ary.push(' ');

        ary.push('0,1,1');
        ary.push(' ');
        ary.push(_x);
        ary.push(",");
        ary.push(_y);
        ary.push(' ');
        ary.push('L');
        ary.push(circle.cx);
        ary.push(",");
        ary.push(circle.cy);
        ary.push(' ');
        ary.push("Z");

        return ary.join('');
    }

    function getFontColor(val) {
        var colorAngle = {
            r: 0,
            g: 0,
            b: 0
        };
        if(val > initialAngle && val < (initialAngle + (360 * 0.31))) {
            var ratio = (val - initialAngle) / (360 * 0.31);
            colorAngle.r = Math.floor(colorList[0].r + (colorList[1].r - colorList[0].r) * ratio);
            colorAngle.g = Math.floor(colorList[0].g + (colorList[1].g - colorList[0].g) * ratio);
            colorAngle.b = Math.floor(colorList[0].b + (colorList[1].b - colorList[0].b) * ratio);
        } else if(val < (initialAngle + (360 * 0.69))) {
            var ratio = (val - initialAngle - 360 * 0.31) / (360 * 0.38);
            colorAngle.r = Math.floor(colorList[1].r + (colorList[2].r - colorList[1].r) * ratio);
            colorAngle.g = Math.floor(colorList[1].g + (colorList[2].g - colorList[1].g) * ratio);
            colorAngle.b = Math.floor(colorList[1].b + (colorList[2].b - colorList[1].b) * ratio);
        } else if(val < (initialAngle + 360)) {
            var ratio = (val - initialAngle - 360 * 0.69) / (360 * 0.31);

            colorAngle.r = Math.floor(colorList[2].r + (colorList[3].r - colorList[2].r) * ratio);
            colorAngle.g = Math.floor(colorList[2].g + (colorList[3].g - colorList[2].g) * ratio);
            colorAngle.b = Math.floor(colorList[2].b + (colorList[3].b - colorList[2].b) * ratio);
        }

        return "rgb(" + colorAngle.r + "," + colorAngle.g + "," + colorAngle.b + ")";
    }
    //------------------------------function end--------------------------
    //绘制一个svg
    var svg = d3.select("#" + id).append("svg")
        .attr("width", width)
        .attr("height", height);
    if(dataSet.value > dataSet.max) {
        dataSet.disValue = dataSet.max;
    } else {
        dataSet.disValue = dataSet.value;
    }
    var UA = Math.PI / 180;
    var initialAngle = 90;
    var beginAngle = 43 + initialAngle;
    var maxAngle = 47 + 360;
    var endAngle = beginAngle + (maxAngle - beginAngle) * dataSet.disValue / dataSet.max;

    var circle = {
        thetaBegin: beginAngle * UA,
        thetaEnd: endAngle * UA,
        radius: 98,
        cx: 106,
        cy: 106,
        startX: 0,
        startY: 0
    };
    circle.startX = Math.cos(circle.thetaBegin) * circle.radius + circle.cx;
    circle.startY = Math.sin(circle.thetaBegin) * circle.radius + circle.cy;

    //DEFS
    var defs = svg.append("defs");
    var clipPath = defs.append("clipPath")
        .attr("id", "clipPath")
        .append("path")
        .attr("d", setClipPath(circle.thetaBegin));

    var gValue = svg.append("g")
        .attr("transform", "translate(40,40)");
    gValue.append("image")
        .attr("width", function(d) {
            return 212;
        })
        .attr("height", function(d) {
            return 203;
        })
        .attr("xlink:href", function(d) {
            return valuePng;
        });
    gValue.attr("clip-path", "url(#clipPath)");

    var g = svg.append("g")
        .attr("transform", "translate(40,40)");

    g.append("image")
        .attr("width", function(d) {
            return 212;
        })
        .attr("height", function(d) {
            return 203;
        })
        .attr("xlink:href", function(d) {
            return circlePng;
        });
    g.append("text")
        .attr("dx", function(d) {
            return 106;
        })
        .attr("dy", function(d) {
            return 136;
        })
        .attr("font-size", "14px")
        .attr("font-family", "微软雅黑")
        .attr("fill", "#FFFFFF")
        .style("text-anchor", function(d) {
            return "middle";
        })
        .text(dataSet.name);

    var colorList = [{
        r: 0,
        g: 179,
        b: 255
    }, {
        r: 39,
        g: 207,
        b: 162
    }, {
        r: 101,
        g: 108,
        b: 254
    }, {
        r: 0,
        g: 179,
        b: 255
    }];

    var textValue = g.append("text")
        .attr("dy", function(d) {
            return 106;
        })
        .attr("dx", function(d) {
            return 106;
        })
        .attr("font-size", "42px")
        .attr("font-family", "微软雅黑")
        .style("text-anchor", function(d) {
            return "middle";
        })
        .text(0);

    var signText = null;
    if(dataSet.sign != null && dataSet.sign != "") {
        signText = g.append("text")
            .attr("dy", function(d) {
                return 87;
            })
            .attr("font-size", "14px")
            .attr("font-family", "微软雅黑")
            .style("text-anchor", function(d) {
                return "middle";
            })
            .text(dataSet.sign);
    }

    var dataMark = [];
    for(var i = 0; i < 11; i++) {
        var _x = 10 * i;
        var _y = 10 * i;
        switch(i) {
            case 0:
                _x = 10;
                _y = 200;
                break;
            case 1:
                _x = -15;
                _y = 150;
                break;
            case 2:
                _x = -20;
                _y = 90;
                break;
            case 3:
                _x = -5;
                _y = 40;
                break;
            case 4:
                _x = 43;
                _y = 0;
                break;
            case 5:
                _x = 106;
                _y = -10;
                break;
            case 6:
                _x = 172;
                _y = 0;
                break;
            case 7:
                _x = 220;
                _y = 40;
                break;
            case 8:
                _x = 235;
                _y = 90;
                break;
            case 9:
                _x = 225;
                _y = 150;
                break;
            case 10:
                _x = 200;
                _y = 200;
                break;
        }
        dataMark.push({
            val: (dataSet.max / 10) * i,
            xMark: _x,
            yMark: _y
        })
    }
    var gMarks = g.append("g")
        .selectAll("text")
        .data(dataMark)
        .enter()
        .append("text")
        .attr("dx", function(d) {
            return d.xMark;
        })
        .attr("dy", function(d) {
            return d.yMark;
        })
        .attr("font-size", "12px")
        .attr("font-family", "微软雅黑")
        .attr("fill", "#8b9dd2")
        .style("text-anchor", function(d) {
            return "middle";
        })
        .text(function(d) {
            return d.val;
        });

    var o = {
        t: 0
    };
    var c = createjs.Tween.get(o, {
            loop: false,
            onChange: function() {
                var val = (circle.thetaEnd - circle.thetaBegin) * o.t;

                var displayValue = 0;
                if(dataSet.dicimal == null) {
                    displayValue = Math.floor(dataSet.value * o.t);
                } else {
                    displayValue = (dataSet.value * o.t).toFixed(dataSet.dicimal);
                }

                clipPath.attr("d", setClipPath(circle.thetaBegin + val));
                var _c = getFontColor(beginAngle + (endAngle - beginAngle) * o.t);
                textValue.text(displayValue)
                    .attr("fill", _c);
                if(signText != null) {
                    signText.attr("fill", _c)
                        .attr("dx", function(d) {
                            var offset = 150;

                            if(displayValue.length == 4) {
                                offset = 154;
                            } else if(displayValue.length == 5) {
                                offset = 165;
                            }
                            return offset;
                        });
                }

                gMarks.attr("fill", function(d) {
                    if(d.val <= dataSet.disValue * o.t) {
                        return "#FFFFFF";
                    } else {
                        return "#8b9dd2";
                    }
                });
            }
        })
        .to({
            t: 1
        }, 1000);

    return publicGraph;
}
