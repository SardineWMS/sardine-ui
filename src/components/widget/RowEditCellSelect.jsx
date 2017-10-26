import { Table, Select, Popconfirm } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './EditTable.less';

class RowEditCellSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            value: this.props.value,
            editable: this.props.editable,
            options: this.props.options,
            defaultValue: this.props.defaultValue
        };
    };
    handleChange(e) {
        const value = e;
        this.setState({ value });
        this.state.onChange(value);
    };
    handleFocus() {
        this.props.onFocus();
    };
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps
        });
    };
    render() {
        const { options, editable, value, defaultValue } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <Select className={styles.selectWidth} onChange={e => this.handleChange(e)} onFocus={()=>this.handleFocus()} 
                            value={value}>
                            {options}
                        </Select>
                    </div>
                    :
                    <div className={styles.editable_row_text}>
                        {value === undefined ? ' ' : value.toString() || ' '}
                    </div>
            }
        </div>);
    };
};

export default RowEditCellSelect;