/**
 * Created by lenovo on 2017/5/9.
 */
//import 'brace/ext/language_tools'
//import 'brace/snippets/javascript'
//import 'brace/snippets/text'
//import 'brace/mode/javascript'
//import 'brace/theme/monokai'
//import 'brace/theme/chrome'
//
import { formatTime } from '@/utils'

export async function initBraceEditor (obj) {
  let brace=await import(/*webpackChunkName:"brace"*/ 'brace')
  require('brace/ext/language_tools')
  require( 'brace/snippets/javascript')
  require( 'brace/snippets/text')
  require( 'brace/mode/javascript')
  require( 'brace/theme/monokai')
  require( 'brace/theme/chrome')


  let {
    id, theme, fontSize = '16px', mode = 'ace/mode/javascript',
    enableBasicAutocompletion = true,
    enableSnippets = true,
    enableLiveAutocompletion = true
  } = obj
  let editor = brace.edit(id)
  //设置主题
  if (theme) {
    //this.editor.setTheme("ace/theme/chrome");
    editor.setTheme(theme)
 }
  //设置语言类型
  editor.getSession().setMode(mode)
  //设置字体
  document.getElementById(id).style.fontSize = fontSize
  editor.setOptions({
    enableBasicAutocompletion: enableBasicAutocompletion,
    enableSnippets: enableSnippets,
    enableLiveAutocompletion: enableLiveAutocompletion
  })
  editor.$blockScrolling = Infinity
  return editor
}
