import { Table, Input, Popconfirm } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './EditTable.less';

class RowEditCell extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable,
    }
  }
  handleChange(e) {
    const value = e.target.value;
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
            <Input
              value={value}
              onChange={e => this.handleChange(e)}
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

export default RowEditCell;