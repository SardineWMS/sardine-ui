import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import styles from '../less/EditTable.less';
import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'dva';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable
    };
  };

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ value });
  };
  check = (e) => {
    e.preventDefault();
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    };
  };
  edit = () => {
    const { editable } = this.state;
    this.setState({ editable: true });
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.value,
      editable: newProps.editable
    });
  };
  render() {
    const { value, editable } = this.state;
    return (<div className={styles.editable_cell}>
      {
        editable ?
          <div className={styles.editable_cell_input_wrapper}>
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              onBlur={this.check}
              autoFocus
            />
            <Icon
              type="check"
              className={styles.editable_cell_icon_check}
              onClick={this.check}
            />
          </div>
          :
          <div className={styles.editable_cell_text_wrapper} onClick={this.edit}>
            {value || ' '}
            <Icon
              type="edit"
              className={styles.editable_cell_icon}
              onClick={this.edit}
            />
          </div>
      }
    </div>);
  };
};

export default EditableCell;