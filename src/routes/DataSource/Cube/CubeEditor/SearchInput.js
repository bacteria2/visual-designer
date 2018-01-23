import React from 'react';
import { Select } from 'antd';

export default class SearchInput extends React.Component {
    state = {
        data: this.props.data,
        value: '',
    };
    handleChange = (value) => {
        this.setState({ value });
        const reg = new RegExp(value,'i');
        this.setState({ data:this.props.data.filter(e => reg.test(e) ) });
        this.props.onSearch(this.state.data);
    };
    render() {
        const options = this.state.data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>);
        return (
            <Select
                mode="combobox"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onChange={this.handleChange}
            >
                {options}
            </Select>
        );
    }
}

