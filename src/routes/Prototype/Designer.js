/**
 * Created by lenovo on 2018/1/3.
 */
import React from 'react'
import PropTypes from 'prop-types'

class Designer  extends React.PureComponent{
  constructor(props){
    super(props)
  }

  render(){
    return <div>1</div>
  }
}
Designer.propTypes = {
  text:PropTypes.string
}

export default Designer