import { Table, Input, Popconfirm } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from '../less/EditTable.less';

class RowEditCell extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable,
    };
  };
  handleChange(e) {
    let newValue = e.target.value;
    this.setState({ value: newValue });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    };
  };
  handleBlur(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
    if (this.props.onBlur)
      this.props.onBlur(e.target.value);
  };
  render() {
    const { value, editable } = this.state;
    return (<div>
      {
        editable ?
          <div>
            <Input
              value={value}
              onChange={e => this.handleChange(e)}
              onBlur={e => this.handleBlur(e)}
            />
          </div>
          :
          <div className={styles.editable_row_text}>
            {value === undefined ? ' ' : value.toString() || ' '}
          </div>
      }
    </div>);
  };
};

export default RowEditCell;