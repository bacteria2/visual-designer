import {  Input, Icon } from 'antd';
import React from 'react'
import styles from './dynamicSeries.css'
export default  class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };

    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };

    edit = () => {
        this.setState({ editable: true });
    };

    render() {
        const { value, editable } = this.state;
        return (
            <div >
                {
                    editable ?
                        <div className={styles.editableCellItem}>
                            <Input
                                size="small"
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}/>
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div >
                            {value || ' '}
                            <Icon
                                type="edit"
                                className={styles.editable_cell_icon}
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}