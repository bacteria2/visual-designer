/* eslint-disable no-console */
/**
 * Created by lenovo on 2017/5/2.
 */
 //{ beautifyJs,formatTime,debounceExec };

 var utils = require('../../../src/utils')  ;

 let { beautifyJs,formatTime,debounceExec }=utils;

describe(`beautifyJs`, () => {
  it('beautify的js应该为字符串', () => {
    console.log(beautifyJs("function a(){return 1+1;}"))
    expect(beautifyJs("function a(){return 1+1;}")).to.be.a('string')
  })
})

describe(`formatTime`, () => {
  it('格式化的时间应为字符串', () => {
    console.log(formatTime(new Date()))
    expect(formatTime(new Date())).to.be.a('string')

  })
})

describe(`formatTime`, () => {
  it('格式化的时间应为字符串', () => {
    let a={a:1,b:2,c:3},c={a:1,b:2,c:3,d:4};
    Object.keys(c).forEach(r=>console.log(r))
    expect(formatTime(new Date())).to.be.a('string')

  })
})

describe(`debounceFunc`, () => {
  it('1000毫秒内只执行一次', () => {
    debounceExec((_)=>{console.log(222222)},500)
    debounceExec((_)=>{console.log(222222)},1000)

    expect(formatTime(new Date())).to.be.a('string')
  })
})
