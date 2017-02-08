import { Table, Input, Popconfirm, Button } from 'antd';
import styles from '../../Widget/EditTable.less';
import React, { Component, PropTypes } from 'react';

const RowEditableCell = require('../../Widget/RowEditCell');
const ArticleEditableQpcStr = ({
      dataSource,
      articleUuid,
      count,
      onSaveQpcStr,
      onAdd,
      onDelete,
      onEdit,
      onCancel,
      onSetDefaultQpcStr
}) => {
  const columns = [{
      title: '规格',
      dataIndex: 'qpcStr',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "qpcStr", text),
    }, {
      title: '单位',
      dataIndex: 'munit',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "munit", text),
    }, {
      title: '长（cm）',
      dataIndex: 'length',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "length", text),
    }, {
      title: '宽（cm）',
      dataIndex: 'width',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "width", text),
    }, {
      title: '高（cm）',
      dataIndex: 'height',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "height", text),
    }, {
      title: '重量（g）',
      dataIndex: 'weight',
      width: '12%',
      render: (text, record, index) => renderColumns(dataSource, index, "weight", text),
    }, {
      title: '默认',
      dataIndex: 'default_',
      width: '10%',
      render: text => (text ? "是" : "否"),
    }, {
      title: '操作',
      dataIndex: 'operation', 
      render: (text, record, index) => {
        return (<div className={styles.editable_row_operations}>
          {
            record.editable ?
            <span>
              <a onClick={() => onSaveQpcStr(dataSource,articleUuid, index)}>保存</a>
              <Popconfirm title="确定要取消编辑吗？" onConfirm={() => onCancel(index)}>
                <a>取消</a>
              </Popconfirm>
            </span>
            :
            <span>
              <Popconfirm title="确定要将当前规格设为默认规格吗?" onConfirm={() => onSetDefaultQpcStr(articleUuid, record.uuid)}>
                <a>{record.qpcStr ? "设为默认" : ""}</a>
              </Popconfirm>
              <a onClick={() => onEdit(dataSource, index)}>编辑</a>
              <Popconfirm title="确定要删除吗?" onConfirm={() => onDelete(articleUuid, record.uuid)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          }
        </div>);
      },
    }];

  function renderColumns(dataSource, index, key, text) {
    if (typeof dataSource[index]["editable"] === 'undefined' || !dataSource[index]["editable"]) {
      return text;
    }
    return (<RowEditableCell
      editable={dataSource[index]["editable"]}
      value={text}
      onChange={value => handleChange(key, dataSource, index, value)}
      autoFocus={key == "qpcStr" ? true : false}
      status={status}
    />);
  }

  function handleChange(key, dataSource, index, value) {
    dataSource[index]["new" + key] = value;
  }

  return (<div>
      <Button className={styles.editable_add_btn} type="ghost" onClick={() => onAdd(articleUuid)}>增加</Button>
      <Table bordered dataSource={dataSource} columns={columns} />
  </div>);
}

ArticleEditableQpcStr.propTypes = {
  dataSource: PropTypes.array,
  articleUuid: PropTypes.string,
  count: PropTypes.number,
  onSaveQpcStr: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onSetDefaultQpcStr: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func
};

export default ArticleEditableQpcStr;