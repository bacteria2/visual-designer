import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Box from './Box'

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

const dustbinTarget = {
    drop(props, monitor) {
        props.onDrop(monitor.getItem())
    },
};

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
    // static propTypes = {
    //     connectDropTarget: PropTypes.func.isRequired,
    //     isOver: PropTypes.bool.isRequired,
    //     canDrop: PropTypes.bool.isRequired,
    //     accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    //     lastDroppedItem: PropTypes.object,
    //     onDrop: PropTypes.func.isRequired,
    // }

    render() {
        const {
            isOver,
            canDrop,
            connectDropTarget,
        } = this.props;
        const isActive = isOver && canDrop;

        let backgroundColor = '#222';
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                <Box
                    name='asd'
                    type='food'
                    isDropped={false}
                    key={1}
                />
            </div>,
        )
    }
}