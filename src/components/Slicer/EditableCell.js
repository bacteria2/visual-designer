import {  Select, Icon } from 'antd';
import React from 'react'
import styles from './slicer.css'
export default  class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };

    handleChange = (value) => {
        // const value = e.target.value;
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

        const children = [];
        if(this.props.expList){
            this.props.expList.forEach(e=>{
                children.push(<Select.Option key={e.name}>{e.name} ({e.desc})</Select.Option>);
            });
        }

        return (
            <div >
                {
                    editable ?
                        <div className={styles.editableCellItem}>
                            {/*<Input*/}
                                {/*size="small"*/}
                                {/*value={value}*/}
                                {/*onChange={this.handleChange}*/}
                                {/*onPressEnter={this.check}/>*/}
                            <Select
                                mode="combobox"
                                size='small'
                                value={this.state.value}
                                onChange={this.handleChange}
                                style={{flex:'1'}}>
                                {children}
                            </Select>

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