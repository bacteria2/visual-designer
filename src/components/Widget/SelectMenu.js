import React from 'react'
import PropTypes from 'prop-types'
import { Card, Divider, Button ,Icon} from 'antd'
import styles from './index.css'
import { List } from 'immutable'
import classnames from 'classnames/bind'

const cz = classnames.bind(styles)

const SubMenu = (props) => (<div className={cz({subMenu: true, active: props.activated})}><span>{props.label}</span><a
  onClick={props.onClick}>{props.text}</a></div>)

const SubMenu2 = (props) => (
    <div className={styles.subMenuBox}>
      <div>
      <Icon type="appstore-o" style={{width:'23%',lineHeight:'32px'}}/>
      <span style={{width:'77%'}}>{props.menuLabel}</span>
      </div>
      <ul>
          {props.menu.map(({name,label},i)=><li key={i} className={cz({'subMenuBox ul li':true,active:props.activatedIndex === i})}><a onClick={()=>props.onClick(name,i)}>{label}</a></li>)}
      </ul>
    </div>
)

class ArrayMenu extends React.PureComponent {

  state = {
    array: List(this.props.value),
    activate: -1,
  }

  handlAddClick = () => {
    this.setState({array: this.state.array.push(new Date().getTime())})
    this.props.onAddClick(this.props.optionKey)
  }

  handlDeleteClick = () => {
    let {array, activate} = this.state
    this.setState({array: array.delete(activate), activate: -1})
    this.props.onDeleteClick(`${this.props.optionKey}.${activate}`)
  }

  handleActive = (index) => {
    this.setState({activate: index})
    this.props.onActiveClick(index)
  }

  render () {
    let {label,activeIndex} = this.props
    let {activate, array,addableIndex} = this.state
    if(label !== this.props.curSecondMenuLabel){
      // 如果不是当前面板取消激活
        activate = -1
    }
    return (<div style={{border: '1px solid #eee',marginBottom:24}}>
      <div style={{display: 'flex', justifyContent: 'space-around', lineHeight: '32px',backgroundColor:'#eee'}}>
        <span className={styles.arrayItemLabel}>{label}</span>
        <span className={styles.arrayItemAction}>
        <Button icon='plus' onClick={this.handlAddClick}/>
        <Button type="danger" icon='delete' onClick={this.handlDeleteClick} disabled={activate < 0}/>
        </span>
      </div>
      <div className={styles.arrayBox}>
        {array.map((timestamp, index) => (<div key={timestamp}
                                              className={activate === index ? 'active' : ''}
                                              onClick={e => this.handleActive(index)}>{index}</div>))}
      </div>
    </div>)
  }
}

export default class SelectMenu extends React.PureComponent {

  /**
   * activeElementIndex: 目前选中的 normal 菜单
   * activeAddableIndex: 目前选中的 addable 菜单
   * secondMenu: 二级菜单列表
   * secondMenuLabel: 二级菜单的标签名
   * activeSecondMenuIndex: 目前选中的二级菜单
   * */
  state = {
    activeElementIndex: -1,
    activeAddableIndex: -1,
    secondMenu: null,
    secondMenuLabel: null,
    activeSecondMenuIndex: -1,
  }

  componentDidMount(){
      let {optionMeta} = this.props
      let {normal: normalList = []} = optionMeta.toJS();
      if(normalList[0]){
        this.handleFirstMenuClick(0,normalList[0])
      }
  }

  handleFirstMenuClick = (index, {children, label}) => {
    this.setState({
      activeElementIndex: index,
      activeAddableIndex: -1,
      secondMenu: children,
      secondMenuLabel: label,
      activeSecondMenuIndex: 0,
    })
    let {name} = children[0]
    if (name) this.props.onPropertySpecified(name)
  }

  handleAddableClick = (index, {label, children}) => {
    this.setState({
      activeElementIndex: -1,
      activeAddableIndex: index,
      secondMenu: children,
      secondMenuLabel: label,
      activeSecondMenuIndex: 0,
    })
    let {name} = children[0]
    if (name) this.props.onPropertySpecified(name, index)
  }

  onAddableDelete = (optionKey) => {
    //clear active
    this.setState({
      activeAddableIndex: -1,
      secondMenu: null,
      secondMenuLabel: null,
      activeSecondMenuIndex: -1,
    })
    //hide property
    this.props.onPropertySpecified(null)
    //do event
    this.props.onAddableDelete(optionKey)
  }

  handleSecondMenuClick = (name, index) => {
    this.setState({
      activeSecondMenuIndex: index,
    })
    this.props.onPropertySpecified(name, this.state.activeAddableIndex)
  }
  static defaultProps = {
    optionMeta: {},
    rawOption: {},
  }
  static propTypes = {
    optionMeta: PropTypes.object,
    onMenuClick: PropTypes.func,
    menu: PropTypes.object,
    onPropertySpecified: PropTypes.func,
    onAddableAdd: PropTypes.func,
  }

  render () {
    let {optionMeta, rawOption} = this.props
    let {normal: normalList = [], addable: addableList = []} = optionMeta.toJS();
    let {activeElementIndex, activeAddableIndex, secondMenu, secondMenuLabel, activeSecondMenuIndex,activeAddablePanelIndex} = this.state


    return (<React.Fragment>
      <div style={{display:'flex',margin:'25px 0',flexWrap:'wrap'}}>
      {normalList.map(
        (normal, index) => (<Card.Grid className={cz({gridMenu: true, active: index === activeElementIndex})}
                                      key={normal.key}
                                      onClick={() => this.handleFirstMenuClick(index, normal)}>{normal.label}</Card.Grid>))}
      </div>
      {addableList.map((addable, index) => (<ArrayMenu
        label={addable.label}
        key={addable.key}
        curSecondMenuLabel={secondMenuLabel}
        activeAddableIndex ={index}
        value={rawOption.getIn(addable.key.split('.'), [])}
        optionKey={addable.key}
        activated={index === activeAddableIndex}
        onAddClick={this.props.onAddableAdd}
        onDeleteClick={this.onAddableDelete}
        onActiveClick={(index) => this.handleAddableClick(index, addable)}/>))}

      {/*{secondMenu && secondMenu.map(({name, label}, index) => (<SubMenu
        label={secondMenuLabel}
        text={label}
        activated={index === activeSecondMenuIndex}
        onClick={() => this.handleSecondMenuClick(name, index)}
        key={name}
    />))}*/}
        {secondMenu&&<SubMenu2 menuLabel={secondMenuLabel} activatedIndex={activeSecondMenuIndex} menu={secondMenu} onClick={this.handleSecondMenuClick}/>}

    </React.Fragment>)
  }

}

