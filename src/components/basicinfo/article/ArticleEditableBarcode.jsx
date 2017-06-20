import { Table, Input, Popconfirm, Button } from 'antd';
import styles from '../../less/EditTable.less';
import React, { Component, PropTypes } from 'react';
import commonStyles from '../../less/common.less';
import PermissionUtil from '../../../utils/PermissionUtil';

const RowEditableCell = require('../../Widget/RowEditCell');
const ArticleEditableBarcode = ({
  dataSource,
  articleUuid,
  count,
  onSaveBarcode,
  onAdd,
  onDelete,
  onEdit,
  onCancel
}) => {
  const columns = [{
    title: '条码',
    dataIndex: 'barcode',
    render: (text, record, index) => renderColumns(dataSource, index, "barcode", text)
  }, {
    title: '规格',
    dataIndex: 'qpcStr',
    render: (text, record, index) => renderColumns(dataSource, index, "qpcStr", text)
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
      return (<div className={styles.editable_row_operations}>
        {
          record.editable ?
            <span>
              <a onClick={() => onSaveBarcode(dataSource, articleUuid, index)} disabled={!PermissionUtil("article:edit")}>保存</a>
              <Popconfirm title="确定要取消编辑吗？" onConfirm={() => onCancel(index)}>
                <a>取消</a>
              </Popconfirm>
            </span>
            :
            <span>
              <a onClick={() => onEdit(dataSource, index)} disabled={!PermissionUtil("article:edit")}>编辑</a>
              <Popconfirm title="确定要删除吗?" onConfirm={() => onDelete(articleUuid, record.uuid)}>
                <a disabled={!PermissionUtil("article:edit")}>删除</a>
              </Popconfirm>
            </span>
        }
      </div>);
    }
  }];

  function renderColumns(dataSource, index, key, text) {
    if (typeof dataSource[index]["editable"] === 'undefined' || !dataSource[index]["editable"]) {
      return text;
    };
    return (<RowEditableCell
      editable={dataSource[index]["editable"]}
      value={text}
      onChange={value => handleChange(key, dataSource, index, value)}
      autoFocus={key == "barcode" ? true : false}
      status={status}
    />);
  };

  function handleChange(key, dataSource, index, value) {
    dataSource[index]["new" + key] = value;
  };

  return (
    <div>
      <div className={commonStyles.button}>
        <Button type="ghost" onClick={() => onAdd(articleUuid)} disabled={!PermissionUtil("article:edit")}>增加</Button>
      </div>
      <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} />
    </div>);
};

ArticleEditableBarcode.propTypes = {
  dataSource: PropTypes.array,
  articleUuid: PropTypes.string,
  count: PropTypes.number,
  onSaveBarcode: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func
};

export default ArticleEditableBarcode;