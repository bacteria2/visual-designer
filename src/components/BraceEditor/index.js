import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styles from './index.css';
import brace from 'brace';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import 'brace/ext/language_tools';
import 'brace/snippets/javascript';
import 'brace/snippets/text';
import 'brace/snippets/json';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/chrome';

function initBraceEditor (id,obj={}) {
  let {
    theme, fontSize = '16px', mode = 'ace/mode/javascript',
    enableBasicAutocompletion = true,
    enableSnippets = true,
    enableLiveAutocompletion = true
  } = obj
  let editor = brace.edit(id)
  //设置主题
  if (theme) {
    editor.setTheme(theme)
  }
  //设置语言类型
  editor.getSession().setMode(mode)
  //设置字体
  // document.getElementById(id).style.fontSize = fontSize
  editor.setOptions({
    enableBasicAutocompletion: enableBasicAutocompletion,
    enableSnippets: enableSnippets,
    enableLiveAutocompletion: enableLiveAutocompletion
  })
  editor.$blockScrolling = Infinity
  return editor
}


export default class ReactBrace extends PureComponent{
    constructor(props){
        super(props);
        this.id='b'+uuid();
    }

    componentDidMount(){
      this.editor=initBraceEditor(this.id);
      this.editor.on('blur',this.handleScriptUpdate)
      this.editor.setValue(this.props.children)
    }

    componentWillUnmount(){
      this.editor=null;
    }

    @Bind()
    @Debounce(1000)
    handleScriptUpdate=()=>{
      this.props.onScriptChange(this.editor.getValue())
    }

    render(){
        if(this.editor)
          this.editor.setValue(this.props.children)

        return   <div style={Object.assign({},{height: '100%'},this.props.style)}>
                     <div className={styles.control}>
                      <a href="#">beautify</a>
                      <div className="control__info">
                       <span className="control__time">Script</span>
                       <span className="control__type-error"> Editor</span>
                      </div>
                      <div style={{width:80}}/>
                   </div>
                   <div id={this.id} className={styles.panel} style={{height:this.props.panelHeight,fontSize :16}}/>
                </div>
    }

    static defaultProps={
      panelHeight:400
    }
    static propTypes={
        panelHeight:PropTypes.number,
        onOk:PropTypes.func,
        style:PropTypes.object,
        children:PropTypes.string,
        onScriptChange:PropTypes.func
    }
} 


