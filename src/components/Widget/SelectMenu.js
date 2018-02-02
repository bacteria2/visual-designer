import React from 'react'
import PropTypes from 'prop-types'
import { Card, Divider, Button } from 'antd'
import styles from './index.css'
import { List } from 'immutable'
import classnames from 'classnames/bind'

const cz = classnames.bind(styles)

const SubMenu = (props) => (<div className={cz({subMenu: true, active: props.activated})}><span>{props.label}</span><a
  onClick={props.onClick}>{props.text}</a></div>)

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
    let {label} = this.props
    let {activate, array} = this.state

    return (<div style={{border: '1px solid rgb(218, 218, 218)', padding: 8, margin: 8}}>
      <div style={{display: 'flex', justifyContent: 'space-around', lineHeight: '36px'}}>
        <Button icon='plus' onClick={this.handlAddClick}/>
        <span>{label}</span>
        <Button type="danger" icon='delete' onClick={this.handlDeleteClick} disabled={activate < 0}/>
      </div>
      <Divider style={{margin: '8px 0'}}/>
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
    let {activeElementIndex, activeAddableIndex, secondMenu, secondMenuLabel, activeSecondMenuIndex} = this.state

    return (<React.Fragment>
      {normalList.map(
        (normal, index) => (<Card.Grid className={cz({gridMenu: true, active: index === activeElementIndex})}
                                      key={normal.key}
                                      onClick={() => this.handleFirstMenuClick(index, normal)}>{normal.label}</Card.Grid>))}

      <Divider className={styles.divider}>可变属性</Divider>
      {addableList.map((addable, index) => (<ArrayMenu
        label={addable.label}
        key={addable.key}
        value={rawOption.getIn(addable.key.split('.'), [])}
        optionKey={addable.key}
        activated={index === activeAddableIndex}
        onAddClick={this.props.onAddableAdd}
        onDeleteClick={this.onAddableDelete}
        onActiveClick={(index) => this.handleAddableClick(index, addable)}/>))}

      <Divider className={styles.divider}>二级属性</Divider>
      {secondMenu && secondMenu.map(({name, label}, index) => (<SubMenu
        label={secondMenuLabel}
        text={label}
        activated={index === activeSecondMenuIndex}
        onClick={() => this.handleSecondMenuClick(name, index)}
        key={name}
      />))}
    </React.Fragment>)
  }

}

