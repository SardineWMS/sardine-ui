import { Table, DatePicker, Popconfirm } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class RowEditCellDatePicker extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable,
        }
    }
    handleChange(e) {
        const value = e;
        this.setState({ value });
        this.props.onChange(value);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value,
            editable: newProps.editable,
        })
    }
    render() {
        const { value, editable } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <DatePicker
                            defaultValue={value == null ? null : moment(value, 'YYYY-MM-DD')}
                            onChange={(e) => this.handleChange(e)}
                            autoFocus={this.props.autoFocus}
                        />
                    </div>
                    :
                    <div className={styles.editable_row_text}>
                        {value === undefined ? ' ' : value.toString() || ' '}
                    </div>
            }
        </div>);
    }
}

export default RowEditCellDatePicker;