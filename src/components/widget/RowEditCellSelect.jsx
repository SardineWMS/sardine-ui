import { Table, Select, Popconfirm } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './EditTable.less';

class RowEditCellSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable,
            options: this.props.options,
            defaultValue: this.props.defaultValue,
        }
    }
    handleChange(e) {
        const value = e;
        this.setState({ value });
        this.props.onChange(value);
    }
    handleFocus(e) {
        const value = e;
        this.setState({ value });
        this.props.onFocus(value);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value,
            editable: newProps.editable,
            options: newProps.options,
            defaultValue: newProps.defaultValue,

        })
    }
    render() {
        const { options, editable, value, defaultValue } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <Select className={styles.selectWidth} onChange={e => this.handleChange(e)} onFocus={e => this.handleFocus(e)}  value
                            ={value}>
                            {options}
                        </Select>
                    </div>
                    :
                    <div className={styles.editable_row_text}>
                        {value === undefined ? ' ' : value.toString() || ' '}
                    </div>
            }
        </div>);
    }
}

export default RowEditCellSelect;