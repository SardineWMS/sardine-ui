import React, { PropTypes } from 'react';
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class RoleAssignTree extends React.Component {
    constructor(props) {
        super(props);
        const values = [];
        for (var data of props.treeData) {
            values.push(data.value);
        };

        this.state = {
            ...props,
            value: values
        };
    }
    onChange = (value, label, extra) => {
        this.setState({ value: value });
    };
    // onSelect = (value, node) => {
    //     console.log('onSelect', value, node);
    //     this.setState({ value });
    // }
    componentWillReceiveProps(newProps) {
        const values = [];
        for (var data of newProps.treeData) {
            values.push(data.value);
        };
        this.setState({
            ...newProps,
            value: values
        });
    };
    render() {
        const tProps = {
            treeData: this.state.treeData,
            value: this.state.value,
            key: this.state.value,
            onChange: this.onChange,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300
            }
        };
        return (<TreeSelect {...tProps} />);
    };
};

export default RoleAssignTree;