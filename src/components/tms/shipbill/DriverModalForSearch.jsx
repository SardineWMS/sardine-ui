import React, { PropTypes } from 'react';
import { Input, Icon } from 'antd';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import DriverSelectGrid from '../vehicle/DriverSelectGrid';

class DriverModalForSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            loading: false,
            showSelectModal: false,
            value: '',
        };
        this.handleShowSelect = this.handleShowSelect.bind(this);
        this.handleSelectGridCancel = this.handleSelectGridCancel.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps
        })
    };

    handleShowSelect() {
        this.setState({
            showSelectModal: true,
        })
    };

    handleSelectGridCancel() {
        this.setState({
            showSelectModal: false
        })
    };

    handleOnSelect(data) {
        this.setState({
            value: data.code,
            showSelectModal: false
        });
        const e = {};
        e.target = {};
        e.target.value = data.code;
        this.handleChange(e);
    };

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange(e.target.value);
    };

    render() {
        const props = {
            visible: this.state.showSelectModal,
            onCancel: this.handleSelectGridCancel,
            onSelect: this.handleOnSelect,
        }
        return (
            <div>
                <Input placeholder="请选择：" suffix={<Icon type="ellipsis" onClick={this.handleShowSelect} />} value={this.state.value} onChange={this.handleChange} />
                <DriverSelectGrid {...props} />
            </div>
        )
    };
};

export default DriverModalForSearch;